// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class FurrParent {
    specific = async (id) => { return (await new Builder(`tbl_furr_parent`).select().condition(`WHERE id= ${id}`).build()).rows; }

    save = async (data) => {
        switch(data.application_type) {
            case 'walk-in':
                let errors = [];
                if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE email= '${data.email}'`).build()).rowCount > 0) {
                    let furr_parent = (await new Builder(`tbl_furr_parent`).select().condition(`WHERE email= '${data.email}'`).build()).rows[0];

                    if(global.compare(furr_parent.fname, data.fname)) {
                        if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
                            errors.push({ name: 'lname', message: 'Name already used!' });
                        }
                    }

                    if(global.compare(furr_parent.lname, data.lname)) {
                        if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE lname= '${(data.lname).toUpperCase()}' AND fname= '${(data.fname).toUpperCase()}'`).build()).rowCount > 0) {
                            errors.push({ name: 'lname', message: 'Name already used!' });
                        }
                    }

                    if(global.compare(furr_parent.contact_no, data.contact_no)) {
                        if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE contact_no= '${data.contact_no}'`).build()).rowCount > 0) {
                            errors.push({ name: 'contact_no', message: 'Contact no already used!' });
                        }
                    }

                    if(!(errors.length > 0)) {
                        await new Builder(`tbl_furr_parent`)
                                            .update(`fname= '${(data.fname).toUpperCase()}', mname= ${data.mname !== '' ? `'${(data.mname).toUpperCase()}'` : null},
                                                            lname= '${(data.lname).toUpperCase()}', contact_no= '${data.contact_no}', gender= '${data.gender}', 
                                                            address= ${data.address !== '' ? `'${(data.address).toUpperCase()}'` : null}, date_updated= CURRENT_TIMESTAMP`)
                                            .condition(`WHERE id= ${furr_parent.id}`)
                                            .build();
                        
                        let adopt = (await new Builder(`tbl_services`)
                                                                .insert({ columns: `series_no, furr_parent_id, type, status, date_filed`, 
                                                                                values: `'${global.randomizer(7)}', ${furr_parent.id}, 'adoption', 'pending', CURRENT_TIMESTAMP` })
                                                                .condition(`RETURNING id`)
                                                                .build()).rows[0];

                        return { result: 'success', message: 'Successfully saved!', id: adopt.id }
                    }
                    else { return { result: 'error', error: errors } }
                }
                else {
                    if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
                        errors.push({ name: 'lname', message: 'Name already used!' });
                    }

                    if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE lname= '${(data.lname).toUpperCase()}' AND fname= '${(data.fname).toUpperCase()}'`).build()).rowCount > 0) {
                        errors.push({ name: 'lname', message: 'Name already used!' });
                    }

                    if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE contact_no= '${data.contact_no}'`).build()).rowCount > 0) {
                        errors.push({ name: 'contact_no', message: 'Contact no already used!' });
                    }

                    if(!(errors.length > 0)) {
                        let furr_parent = (await new Builder(`tbl_furr_parent`)
                                                                        .insert({ columns: `series_no, email, fname, mname, lname, gender, address, contact_no, date_created`, 
                                                                                        values: `'${global.randomizer(7)}', '${data.email}', '${(data.fname).toUpperCase()}',
                                                                                                        ${data.mname !== '' ? `'${(data.mname).toUpperCase()}'` : null}, '${(data.lname).toUpperCase()}',
                                                                                                        '${data.gender}', ${data.address !== '' ? `'${(data.address).toUpperCase()}'` : null},
                                                                                                        '${data.contact_no}', CURRENT_TIMESTAMP` })
                                                                        .condition(`RETURNING id`)
                                                                        .build()).rows[0];
                        
                        let adopt = (await new Builder(`tbl_services`)
                                                                .insert({ columns: `series_no, furr_parent_id, type, status, date_filed`, 
                                                                                values: `'${global.randomizer(7)}', ${furr_parent.id}, 'adoption', 'pending', CURRENT_TIMESTAMP` })
                                                                .condition(`RETURNING id`)
                                                                .build()).rows[0];

                        return { result: 'success', message: 'Successfully saved!', id: adopt.id }
                    }
                    else { return { result: 'error', error: errors } }
                }
            default:
                let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS }, tls : { rejectUnauthorized: false } }
                let transporter = nodemailer.createTransport(config);
                let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });
        
                let id = null;
                let code = null;
        
                if(!((await new Builder(`tbl_furr_parent`).select().condition(`WHERE email= '${data.email}'`).build()).rowCount > 0)) {
                    let usr = (await new Builder(`tbl_furr_parent`)
                                                        .insert({ columns: `series_no, email, code, date_created`, 
                                                                        values: `'${global.randomizer(7)}', '${data.email}', '${global.randomizer(6)}', CURRENT_TIMESTAMP` })
                                                        .condition(`RETURNING id, code`)
                                                        .build()).rows[0];
                    id = usr.id;
                    code = usr.code;
                }
                else {
                    let usr = (await new Builder(`tbl_furr_parent`).update(`code= '${global.randomizer(6)}'`).condition(`WHERE email= '${data.email}' RETURNING id, code`).build()).rows[0];
        
                    id = usr.id;
                    code = usr.code;
                }
        
                let mail = generator.generate({
                    body: {
                        name: 'Fur Mom/Dad',
                        intro: `Thank you for your interest in adopting our loveable pets! To complete your profile and continue your application, 
                        you'll need to verify your email address.Your verification code is: <br><center><b><span style="color: black; font-size: 40px;">${code}</span></b></center>`,
                        
                        outro: 'Please contact me for additional help.'
                    }
                });
        
                transporter.sendMail({ from: global.USER, to: data.email, subject: `Email verification`, html: mail });
                return { result: 'success', message: 'Email verification sent, Please check your Email. Thank you!', id: id }
        }
    }

    resend = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS }, tls : { rejectUnauthorized: false } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });

        let usr = (await new Builder(`tbl_furr_parent`).update(`code= '${global.randomizer(6)}'`).condition(`WHERE email= '${data.email}' RETURNING id, code`).build()).rows[0];

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `Thank you for your interest in adopting our loveable pets! To complete your profile and continue your application, 
                you'll need to verify your email address. Your verification code is: <b>${usr.code}</b>`,
                
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Email verification`, html: mail });
        return { result: 'success', message: 'Email verification sent!', id: usr.id }
    }

    verifying = async (data) => { 
        if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE id= ${data.id} AND code= '${(data.code).toUpperCase()}'`).build()).rowCount > 0) {
            return { result: 'success', message: 'Input your Personal Information', id: data.id }
        }
        else {  return { result: 'error', errors: [{ name: 'code', message: 'Verification doesn`t match!' }] } }
    }

    update = async (data) => {
        let errors = [];
        let furr_parent = null;
        switch(data.application_type) {
            case 'walk-in':
                let adopt = (await new Builder(`tbl_services`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];
                furr_parent = (await new Builder(`tbl_furr_parent`).select().condition(`WHERE id= ${adopt.furr_parent_id}`).build()).rows[0];
                
                if(global.compare(furr_parent.fname, data.fname)) {
                    if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
                        errors.push({ name: 'lname', message: 'Name already used!' });
                    }
                }

                if(global.compare(furr_parent.lname, data.lname)) {
                    if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
                        errors.push({ name: 'lname', message: 'Name already used!' });
                    }
                }

                if(global.compare(furr_parent.contact_no, data.contact_no)) {
                    if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE contact_no= '${data.contact_no}'`).build()).rowCount > 0) {
                        errors.push({ name: 'contact_no', message: 'Contact no. already used!' });
                    }
                }

                if(!(errors.length > 0)) {
                    await new Builder(`tbl_furr_parent`)
                                        .update(`fname= '${(data.fname).toUpperCase()}', mname= ${data.mname !== '' ? `'${(data.mname).toUpperCase()}'` : null},
                                                        lname= '${(data.lname).toUpperCase()}', contact_no= '${data.contact_no}', gender= '${data.gender}', 
                                                        address= ${data.address !== '' ? `'${(data.address).toUpperCase()}'` : null}, date_updated= CURRENT_TIMESTAMP`)
                                        .condition(`WHERE id= ${furr_parent.id}`)
                                        .build();

                    return { result: 'success', message: 'Successfully updated!', id: adopt.id }
                }
                else { return { result: 'error', error: errors } }
            default:
                furr_parent = (await new Builder(`tbl_furr_parent`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];
                
                if(global.compare(furr_parent.fname, data.fname)) {
                    if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
                        errors.push({ name: 'lname', message: 'Name already used!' });
                    }
                }

                if(global.compare(furr_parent.lname, data.lname)) {
                    if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
                        errors.push({ name: 'lname', message: 'Name already used!' });
                    }
                }

                if(global.compare(furr_parent.contact_no, data.contact_no)) {
                    if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE contact_no= '${data.contact_no}'`).build()).rowCount > 0) {
                        errors.push({ name: 'contact_no', message: 'Contact no. already used!' });
                    }
                }

                if(!(errors.length > 0)) {
                    await new Builder(`tbl_furr_parent`)
                                        .update(`fname= '${(data.fname).toUpperCase()}', mname= ${data.mname !== '' ? `'${(data.mname).toUpperCase()}'` : null},
                                                        lname= '${(data.lname).toUpperCase()}', contact_no= '${data.contact_no}', gender= '${data.gender}', 
                                                        address= ${data.address !== '' ? `'${(data.address).toUpperCase()}'` : null}, date_updated= CURRENT_TIMESTAMP`)
                                        .condition(`WHERE id= ${furr_parent.id}`)
                                        .build();

                    return { result: 'success', message: 'Next, Upload your Documents. Thank you!' }
                }
                else { return { result: 'error', error: errors } }
        }
    }
}

module.exports = FurrParent;