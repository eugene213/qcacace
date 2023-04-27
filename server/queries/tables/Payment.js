// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions 
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Payment {
    dashboard = async () => {
        return {
            total: (await new Builder(`tbl_payments`).select().build()).rowCount,
            paid: (await new Builder(`tbl_payments`).select().condition(`WHERE status= 'paid'`).build()).rowCount,
            pending: (await new Builder(`tbl_payments`).select().condition(`WHERE status= 'pending'`).build()).rowCount,
            failed: (await new Builder(`tbl_payments`).select().condition(`WHERE status= 'failed'`).build()).rowCount,
        }
    }

    list = async () => {
        return (await new Builder(`tbl_services AS srvc`)
                                        .select(`srvc.id, srvc.furr_parent_id, srvc.pet_id, srvc.payment_id, srvc.schedule_id, pymnt.series_no, pymnt.transaction_no, pymnt.method,
                                                        fp.email, fp.fname, fp.lname, CONCAT(eb.lname, ', ', eb.fname, ' ', eb.mname) AS evaluated_by, pymnt.status, 
                                                        pymnt.date_filed, pymnt.date_evaluated, srvc.type, pymnt.payment_date`)
                                        .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                        .join({ table: `tbl_payments AS pymnt`, condition: `srvc.payment_id = pymnt.id`, type: `LEFT` })
                                        .join({ table: `tbl_users_info AS eb`, condition: `pymnt.evaluated_by = eb.user_id`, type: `LEFT` })
                                        .except(`WHERE srvc.payment_id IS NULL ORDER BY 14 DESC `)
                                        .build()).rows;
    }
    
    search = async (data) => {
        return (await new Builder(`tbl_services AS srvc`)
                                            .select(`srvc.id, srvc.furr_parent_id, srvc.pet_id, srvc.payment_id, srvc.schedule_id, pymnt.series_no, pymnt.transaction_no, pymnt.method,
                                                            fp.email, fp.fname, fp.lname, CONCAT(eb.lname, ', ', eb.fname, ' ', eb.mname) AS evaluated_by, pymnt.status, 
                                                            pymnt.date_filed, pymnt.date_evaluated, srvc.type`)
                                        .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                        .join({ table: `tbl_payments AS pymnt`, condition: `srvc.payment_id = pymnt.id`, type: `LEFT` })
                                        .join({ table: `tbl_users_info AS eb`, condition: `pymnt.evaluated_by = eb.user_id`, type: `LEFT` })
                                        .condition(`WHERE pymnt.transaction_no LIKE '%${data.condition}%' OR pymnt.series_no LIKE '%${data.condition}%'`)
                                        .except(`WHERE srvc.payment_id IS NULL ORDER BY 14 DESC `)
                                        .build()).rows;
    }

    approve = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS }, tls : { rejectUnauthorized: false } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://qcacace.vercel.app' } });
        let _intro = '';

        await new Builder(`tbl_payments`).update(`status= 'paid', evaluated_by= ${data.evaluator}, date_evaluated= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.payment_id}`).build();

        let list = (await new Builder(`tbl_services AS srvc`)
                                        .select(`srvc.id, srvc.furr_parent_id, srvc.pet_id, srvc.payment_id, srvc.schedule_id, pymnt.series_no, pymnt.transaction_no, pymnt.method,
                                                        fp.email, fp.fname, fp.lname, CONCAT(eb.lname, ', ', eb.fname, ' ', eb.mname) AS evaluated_by, pymnt.status, 
                                                        pymnt.date_filed, pymnt.date_evaluated, srvc.type`)
                                        .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                        .join({ table: `tbl_payments AS pymnt`, condition: `srvc.payment_id = pymnt.id`, type: `LEFT` })
                                        .join({ table: `tbl_users_info AS eb`, condition: `pymnt.evaluated_by = eb.user_id`, type: `LEFT` })
                                        .except(`WHERE srvc.payment_id IS NULL ORDER BY 14 DESC`)
                                        .build()).rows;

        if(data.type === 'adoption') {
            _intro = `Good day! We would like to inform you that your payment has been validated by QC Animal Care and Adoption Center's evaluator. 
                            You can now proceed to the last part of the pet adoption process which is the releasing of pets at QC
                            Animal Care and Adoption Center
                            located at Clemente St., Lupang Pangako, Payatas, Quezon City, Philippines.<br><br>
                            To help your pet get released quickly, please bring the following items:<br><br>
                            1. Cage or Pet carrier (depends on the size of pet)<br>
                            2. Leash and Collar`;
        }
        else {
            _intro = `Hi Fur Mom/Dad,


            Good day! We would like to inform you that your payment has been sent. Please wait within 48 hours for the validation email of your payment. If you don't receive an email within the specified time limit, you can go directly to our center located at Clemente St., Lupang Pangako, Payatas, Quezon City, Philippines and bring the transaction number of your payment for the validation.
            
            
            Please contact us for additional help.
            
            
            Yours truly,
            
            QC Animal Care and Adoption Center
            
            `;
        }

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: _intro,
                outro: 'If you have any concerns, Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Payment Received`, html: mail });
        return { result: 'success', message: 'Payment confirmed!', list: list }
    }

    reject = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS }, tls : { rejectUnauthorized: false } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://qcacace.vercel.app' } });
        let _intro = '';

        let sched = (await new Builder(`tbl_schedule`).select().condition(`WHERE id= ${data.schedule_id}`).build()).rows[0];
        let appnt = (await new Builder(`tbl_appointments`).select().condition(`WHERE id= ${sched.appointment_id}`).build()).rows[0];

        await new Builder(`tbl_payments`).update(`status= 'failed', evaluated_by= ${data.evaluator}, date_evaluated= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.payment_id}`).build();

        if(data.type === 'adoption') {
            await new Builder(`tbl_appointments`).update(`slot= ${parseInt(appnt.slot) + 1}`).condition(`WHERE id= ${sched.appointment_id}`).build();
            await new Builder(`tbl_pets`).update(`is_adopt= 0`).condition(`WHERE id= ${data.pet_id}`).build();
        }

        await new Builder(`tbl_services`).update(`status= 'cancelled', date_evaluated= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();

        let list = (await new Builder(`tbl_services AS srvc`)
                                        .select(`srvc.id, srvc.furr_parent_id, srvc.pet_id, srvc.payment_id, srvc.schedule_id, pymnt.series_no, pymnt.transaction_no, pymnt.method,
                                                        fp.email, fp.fname, fp.lname, CONCAT(eb.lname, ', ', eb.fname, ' ', eb.mname) AS evaluated_by, pymnt.status, 
                                                        pymnt.date_filed, pymnt.date_evaluated, srvc.type`)
                                        .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                        .join({ table: `tbl_payments AS pymnt`, condition: `srvc.payment_id = pymnt.id`, type: `LEFT` })
                                        .join({ table: `tbl_users_info AS eb`, condition: `pymnt.evaluated_by = eb.user_id`, type: `LEFT` })
                                        .except(`WHERE srvc.payment_id IS NULL ORDER BY 14 DESC`)
                                        .build()).rows;

        if(data.type === 'adoption') {
            _intro = `<b>FAILED</b>. Good day! Unfortunately, your transaction has been canceled due to the failure of payment within 3 days or incorret referrence number.`
        }
        else {
            _intro = `Sorry your referrence number is invalid, Please contact the Quezon City Treasurer's Office to clarify your payment. Thank you!`;
        }

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: _intro,
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Payment Reject`, html: mail });
        return { result: 'success', message: 'Payment failed!', list: list }
    }

    pay = async (data) => {
        let errors = [];
        switch(data.application_type) {
            case 'walk-in':
                let adopt = (await new Builder(`tbl_services`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];

                if(adopt.payment_id === null) {
                    if(data.payment === 'gcash') {
                        if((await new Builder(`tbl_payments`).select().condition(`WHERE transaction_no= '${data.transaction_no}'`).build()).rowCount > 0) {
                            errors.push({ name: 'transaction_no', message: 'Transaction number already used!' });
                        }
                    }
    
                    if(!(errors.length > 0)) {
                        let payment = (await new Builder(`tbl_payments`)
                                                                    .insert({ columns: `series_no, furr_parent_id, method, transaction_no, evaluated_by, status, date_filed, date_evaluated`, 
                                                                                    values: `'${global.randomizer(7)}', ${adopt.furr_parent_id}, 
                                                                                                    ${data.type !== 'surrender' ? `'${data.payment}'` : null}, 
                                                                                                    ${data.payment === 'gcash' ? `'${(data.transaction_no).toUpperCase()}'` : null},
                                                                                                    ${data.evaluated_by}, 'paid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP` })
                                                                    .condition(`RETURNING id`)
                                                                    .build()).rows[0];
                        
                        await new Builder(`tbl_services`).update(`payment_id= ${[payment.id]}, status= 'released'`).condition(`WHERE id= ${adopt.id}`).build();
                        return { result: 'success', message: 'Successfully paid!', id: adopt.id }
                    }
                    else { return { result: 'error', error: errors } }
                }
                else { return { result: 'success', message: 'Successfully paid!', id: adopt.id } }
            default:
                let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS }, tls : { rejectUnauthorized: false } }
                let transporter = nodemailer.createTransport(config);
                let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://qcacace.vercel.app' } });
        
                let adpt = (await new Builder(`tbl_services AS srvc`)
                                    .select()
                                    .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                    .condition(`WHERE srvc.id= ${data.id}`)
                                    .build()).rows[0];
        
                if(data.payment === 'gcash') {
                    if((await new Builder(`tbl_payments`).select().condition(`WHERE transaction_no= '${data.transaction_no}'`).build()).rowCount > 0) {
                        errors.push({ name: 'transaction_no', message: 'Transaction number already used!' });
                    }
                }
        
                if(!(errors.length > 0)) {
                    let payment = (await new Builder(`tbl_payments`)
                                                .insert({ columns: `series_no, furr_parent_id, method, transaction_no, status, date_filed, payment_date`, 
                                                                values: `'${global.randomizer(7)}', ${adpt.furr_parent_id}, ${data.type !== 'surrender' ? `'${data.payment}'` : null}, 
                                                                                ${data.payment === 'gcash' ? `'${data.transaction_no}'` : null}, 'pending', CURRENT_TIMESTAMP, '${data.payment_date}'` })
                                                .condition(`RETURNING id`)
                                                .build()).rows[0];
        
                    await new Builder(`tbl_services`).update(`payment_id= ${payment.id}, date_filed= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();
        
                    let mail = generator.generate({
                        body: {
                            name: 'Fur Mom/Dad',
                            intro: `Good day! We would like to inform you that your payment has been sent. 
                            Please wait within 48 hours for the validation email of your payment. 
                            If you don't receive an email within the specified time limit, you can go directly to our center 
                            located at Clemente St.,Lupang Pangako, Payatas, Quezon City, Philippines and bring the transaction number of your payment for the validation.

                            `,
                            
                            outro: 'Please contact me for additional help.'
                        }
                    });
        
                    transporter.sendMail({ from: global.USER, to: adpt.email, subject: `Payment Status`, html: mail });
                    return { result: 'success', message: 'Payment sent!' }
                }
                else { return { result: 'error', errors: errors } }
        }
    }
}

module.exports = Payment;