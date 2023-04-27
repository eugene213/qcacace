// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Schedule {
    dashboard = async () => {
        return {
            total: (await new Builder(`tbl_services AS srvc`)
                        .select()
                        .join({ table: `tbl_documents AS docu`, condition: `srvc.docu_id = docu.id`, type: `LEFT` })
                        .join({ table: `tbl_schedule AS sched`, condition: `srvc.schedule_id = sched.id`, type: `LEFT` })
                        .condition(`WHERE docu.status = 'approved'`)
                        .build()).rowCount,
            approved: (await new Builder(`tbl_services AS srvc`)
                                .select()
                                .join({ table: `tbl_documents AS docu`, condition: `srvc.docu_id = docu.id`, type: `LEFT` })
                                .join({ table: `tbl_schedule AS sched`, condition: `srvc.schedule_id = sched.id`, type: `LEFT` })
                                .condition(`WHERE docu.status = 'approved' AND sched.status = 'approved'`)
                                .build()).rowCount,
            pending: (await new Builder(`tbl_services AS srvc`)
                                .select()
                                .join({ table: `tbl_documents AS docu`, condition: `srvc.docu_id = docu.id`, type: `LEFT` })
                                .join({ table: `tbl_schedule AS sched`, condition: `srvc.schedule_id = sched.id`, type: `LEFT` })
                                .condition(`WHERE docu.status = 'approved' AND sched.status = 'pending'`)
                                .build()).rowCount,
            failed: (await new Builder(`tbl_services AS srvc`)
                            .select()
                            .join({ table: `tbl_documents AS docu`, condition: `srvc.docu_id = docu.id`, type: `LEFT` })
                            .join({ table: `tbl_schedule AS sched`, condition: `srvc.schedule_id = sched.id`, type: `LEFT` })
                            .condition(`WHERE docu.status = 'approved' AND sched.status = 'failed'`)
                            .build()).rowCount,
        }
    }

    list = async () => {
        return (await new Builder(`tbl_services AS srvc`)
                        .select(`srvc.id, srvc.furr_parent_id, srvc.pet_id, srvc.docu_id, srvc.payment_id, srvc.schedule_id, sched.series_no, fp.contact_no,
                                        fp.email, fp.fname, fp.lname, sched.appointment_id, sched.evaluated_by, sched.status, sched.date_filed, sched.date_evaluated, srvc.type,
                                        appnt.month, appnt.day, appnt.year`)
                        .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: ` LEFT` })
                        .join({ table: `tbl_schedule AS sched`, condition: `srvc.schedule_id = sched.id`, type: `LEFT` })
                        .join({ table: `tbl_documents AS docu`, condition: `srvc.docu_id = docu.id`, type: `LEFT` })
                        .join({ table: `tbl_appointments AS appnt`, condition: `sched.appointment_id = appnt.id`, type: `LEFT` })
                        .condition(`WHERE srvc.schedule_id IS NOT NULL`)
                        .except(`WHERE docu.status = 'pending' AND sched.status = 'pending' ORDER BY 15 DESC`)
                        .build()).rows;
    }

    search = async (data) => {
        return (await new Builder(`tbl_services AS srvc`)
                        .select(`srvc.id, srvc.furr_parent_id, srvc.pet_id, srvc.docu_id, srvc.payment_id, srvc.schedule_id, sched.series_no, fp.contact_no,
                                        fp.email, fp.fname, fp.lname, sched.appointment_id, sched.evaluated_by, sched.status, sched.date_filed, sched.date_evaluated, srvc.type,
                                        appnt.month, appnt.day, appnt.year`)
                        .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: ` LEFT` })
                        .join({ table: `tbl_schedule AS sched`, condition: `srvc.schedule_id = sched.id`, type: `LEFT` })
                        .join({ table: `tbl_documents AS docu`, condition: `srvc.docu_id = docu.id`, type: `LEFT` })
                        .join({ table: `tbl_appointments AS appnt`, condition: `sched.appointment_id = appnt.id`, type: `LEFT` })
                        .condition(`WHERE (sched.series_no LIKE '%${data.condition}%' OR fp.email LIKE '%${(data.condition).toLowerCase()}%' OR
                                            fp.fname LIKE '%${data.condition}%' OR fp.lname LIKE '%${data.condition}%') AND srvc.schedule_id IS NOT NULL`)
                        .except(`WHERE docu.status = 'pending' AND sched.status = 'pending' ORDER BY 15 DESC`)
                        .build()).rows;
    }

    approve = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS }, tls : { rejectUnauthorized: false } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://qcacace.vercel.app' } });
        let _intro = '';

        await new Builder(`tbl_schedule`)
            .update(`status= 'approved', evaluated_by= ${data.evaluator}, date_evaluated= CURRENT_TIMESTAMP`)
            .condition(`WHERE id= ${data.schedule_id}`)
            .build();

        let list = (await new Builder(`tbl_services AS srvc`)
                            .select(`srvc.id, srvc.furr_parent_id, srvc.pet_id, srvc.docu_id, srvc.payment_id, srvc.schedule_id, sched.series_no, fp.contact_no,
                                            fp.email, fp.fname, fp.lname, sched.appointment_id, sched.evaluated_by, sched.status, sched.date_filed, sched.date_evaluated, srvc.type,
                                            appnt.month, appnt.day, appnt.year`)
                            .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                            .join({ table: `tbl_schedule AS sched`, condition: `srvc.schedule_id = sched.id`, type: `LEFT` })
                            .join({ table: `tbl_appointments AS appnt`, condition: `sched.appointment_id = appnt.id`, type: `LEFT` })
                            .condition(`WHERE srvc.schedule_id IS NOT NULL ORDER BY 15 DESC`)
                            .build()).rows;

        if(data.type === 'adoption') {  
            _intro = `Hi Fur Mom/Dad,

                                Thank you for taking the time to be interviewed as part of the pet surrender process.
                                We are pleased to inform you that you passed the interview. You can now proceed for the next phase by clicking the button below for the payment details.
                                
                                Please contact us for additional help.
                                
                                Yours truly,
                                
                                QC Animal Care and Adoption Center`;
        }
        else {
            _intro = `Thank you so much for taking the time to apply for the pet adoption in QC Animal Care and
                                Adoption Center.<br><br>
                                We have reviewed your application and submitted documents, and we want to inform
                                you that you are pre-qualified for the next phase of the adoption process.
                                Please wait for the interview via google meet or phone call or you may also proceed for
                                the onsite interview located at Clemente
                                St., Lupang Pangako, Payatas, Quezon City, Philippines if you wish to visit the pet. <br>
                                <br>
                                Please reply to this email if you have any questions or need to reschedule. We look
                                forward to seeing you.`;
        }

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: _intro,
                action: { button: { text: 'Pay here', link: `https://qcacace.vercel.app/payment/${data.id}` } },
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Application Interview Status`, html: mail });
        return { result: 'success', message: 'Interview passed!', list: list }
    }

    reject = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS }, tls : { rejectUnauthorized: false } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://qcacace.vercel.app' } });
        let _intro = '';

        let sched = (await new Builder(`tbl_schedule`).select().condition(`WHERE id= ${data.schedule_id}`).build()).rows[0];
        let appnt = (await new Builder(`tbl_appointments`).select().condition(`WHERE id= ${sched.appointment_id}`).build()).rows[0];
        
        await new Builder(`tbl_schedule`).update(`status= 'failed', evaluated_by= ${data.evaluator}, date_evaluated= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.schedule_id}`).build();

        if(data.type === 'adoption') {
            await new Builder(`tbl_appointments`).update(`slot= ${parseInt(appnt.slot) + 1}`).condition(`WHERE id= ${sched.appointment_id}`).build();
            await new Builder(`tbl_pets`).update(`is_adopt= 0`).condition(`WHERE id= ${data.pet_id}`).build();
        }

        await new Builder(`tbl_services`).update(`status= 'cancelled', date_evaluated= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();

        let list = (await new Builder(`tbl_services AS srvc`)
                            .select(`srvc.id, srvc.furr_parent_id, srvc.pet_id, srvc.docu_id, srvc.payment_id, srvc.schedule_id, sched.series_no, fp.contact_no,
                                            fp.email, fp.fname, fp.lname, sched.appointment_id, sched.evaluated_by, sched.status, sched.date_filed, sched.date_evaluated, srvc.type,
                                            appnt.month, appnt.day, appnt.year`)
                            .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                            .join({ table: `tbl_schedule AS sched`, condition: `srvc.schedule_id = sched.id`, type: `LEFT` })
                            .join({ table: `tbl_appointments AS appnt`, condition: `sched.appointment_id = appnt.id`, type: `LEFT` })
                            .condition(`WHERE srvc.schedule_id IS NOT NULL ORDER BY 15 DESC`)
                            .build()).rows

        if(data.type === 'adoption') {
            _intro = `We really appreciate you taking the time to come in for an interview regarding your application to adopt a pet from the QC Animal Care and Adoption Center. 
                                It was a pleasure to us to meet and thank you for your interest in adopting our pets. Unfortunately, 
                                we are sorry to inform you that you failed the interview. `;
        }
        else {
            _intro = `Good day! We are sorry to inform you that your surrender interview has been canceled 
            because you did not clarify the reason why you want to surrender your animal. 
            Please take note that we do not encourage pet owners to surrender their pet. Thank you!`;
        }

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: _intro,
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Application Failed`, html: mail });
        return { result: 'success', message: 'Interview failed!', list: list }
    }

    save = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS }, tls : { rejectUnauthorized: false } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://qcacace.vercel.app' } });

        let appointment = (await new Builder(`tbl_appointments`).select().condition(`WHERE month= ${data.appmonth} AND day= ${data.appday} AND year= ${data.appyear}`).build()).rows[0];
        let adopt = (await new Builder(`tbl_services`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];

        
        let sched = (await new Builder(`tbl_schedule`)
                                .insert({ columns: `series_no, furr_parent_id, appointment_id, status, date_filed`, 
                                                values: `'${global.randomizer(7)}', ${data.adopter_id}, ${appointment.id}, 'pending', CURRENT_TIMESTAMP` })
                                .condition(`RETURNING id`)
                                .build()).rows[0];
                                                
        await new Builder(`tbl_appointments`).update(`slot= ${appointment.slot - 1}`).condition(`WHERE id= ${appointment.id}`).build();
        await new Builder(`tbl_pets`).update(`is_adopt= 1`).condition(`WHERE id= ${adopt.pet_id}`).build();
        await new Builder(`tbl_services`).update(`schedule_id= ${sched.id}, date_filed= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `We would like to confirm your set schedule on <b>${appointment.month}/${appointment.day}/${appointment.year}</b>. 
                On this day, the QC Animal Care and Adoption Center staff will conduct an interview regarding your application and you will 
                have the chance to see your preferred pet at our shelter located at Clemente St.,Lupang Pangako, Payatas, Quezon City, Philippines. 
                We are looking forward to seeing you. `,
                
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Appointment Schedule`, html: mail });
        return { result: 'success', message: 'Successfully saved!' }
    }
}

module.exports = Schedule;