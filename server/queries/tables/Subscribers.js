// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Subscribers {
    list = async () => { return (await new Builder(`tbl_subscribers`).select().build()).rows; }
    search = async (data) => { return (await new Builder(`tbl_subscribers`).select().condition(`WHERE series_no LIKE '%${data.condition}%' OR email LIKE '%${data.condition}%'`).build()).rows ;}

    dashboard = async () => {
        return {
            total: (await new Builder(`tbl_subscribers`).select().build()).rowCount,
            subs: (await new Builder(`tbl_subscribers`).select().condition(`WHERE is_subscribe= 1`).build()).rowCount
        }
    }

    save = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS }, tls : { rejectUnauthorized: false } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });
        let subs = await new Builder(`tbl_subscribers`).select().condition(`WHERE email= '${data.email}'`).build();

        if(subs.rowCount > 0) {
            if(subs.rows[0].is_subscribe === 1) { return { result: 'error', error: [{ name: 'email', message: 'Email already subscribed!' }] } }
            else { 
                let mail = generator.generate({
                    body: {
                        name: 'Fur Mom/Dad',
                        intro: `I just wanted to reach out and say thank you for subscribing to our QC ACAC E-Services! <br><br>
                        We're thrilled to have you on board and can't wait to share more Pets with you. We really appreciate your support and hope that you find our QC ACAC valuable. <br><br>
                        If you have any feedback or suggestions, we'd love to hear them.`,
                        
                        outro: 'Please contact me for additional help.'
                    }
                });

                await new Builder(`tbl_subscribers`). update(`is_subscribe= 1, date_subscribe= CURRENT_TIMESTAMP`).condition(`WHERE id= ${subs.rows[0].id}`).build(); 

                transporter.sendMail({ from: global.USER, to: data.email, subject: `Re-subscription`, html: mail });
                return { result: 'success', message: 'Thank you for re-subscribing!' }
            }
        }
        else {
            let mail = generator.generate({
                body: {
                    name: 'Fur Mom/Dad',
                    intro: `I just wanted to reach out and say thank you for subscribing to our QC ACAC E-Services! <br><br>
                    We're thrilled to have you on board and can't wait to share more Pets with you. We really appreciate your support and hope that you find our QC ACAC valuable. <br><br>
                    If you have any feedback or suggestions, we'd love to hear them.`,
                    
                    outro: 'Please contact me for additional help.'
                }
            });
            await new Builder(`tbl_subscribers`)
                                .insert({ columns: `series_no, email, is_subscribe, date_subscribe`, values: `'${global.randomizer(7)}', '${data.email}', 1, CURRENT_TIMESTAMP` })
                                .build();

            transporter.sendMail({ from: global.USER, to: data.email, subject: `Subscription`, html: mail });
            return { result: 'success', message: 'Thank you for subscribing!' }
        }
    }
}

module.exports = Subscribers;