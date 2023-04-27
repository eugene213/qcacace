// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class AnimalCare {
    specific = async (id) => { return (await new Builder(`tbl_animal_care`).select().condition(`WHERE id= ${id}`).build()).rows; }

    list = async (data) => { 
        return (await new Builder(`tbl_animal_care`)
                                        .select()
                                        .condition(`${data.status !== undefined ? `WHERE status= ${data.status}` : ''} ORDER BY date_created DESC`)
                                        .build()).rows; 
    }

    search = async (data) => {
        return (await new Builder(`tbl_animal_care`)
                                        .select()
                                        .condition(`WHERE title LIKE '%${data.condition}%' OR subtitle LIKE '%${data.condition}%' OR 
                                                            description LIKE '%${data.condition}%' OR series_no LIKE '%${(data.condition).toUpperCase()}%'`)
                                        .build()).rows;
    }

    save = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS }, tls : { rejectUnauthorized: false } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://qcacace.vercel.app' } });
        let emails = (await new Builder(`tbl_subscribers`).select(`email`).build()).rows;
        
        let program = (await new Builder(`tbl_animal_care`)
                            .insert({ columns: `series_no, title, subtitle, date, description, photo, status, created_by, date_created`, 
                                            values: `'${global.randomizer(7)}', '${data.title}', ${data.subtitle !== '' ? `'${data.subtitle}'` : null}, '${data.date}', 
                                                            '${data.description}', ${data.photo !== undefined ?  `'${data.photo}'` : null}, ${data.status ? 1 : 0},
                                                            ${data.created_by}, CURRENT_TIMESTAMP` })
                            .condition(`RETURNING title`)
                            .build()).rows[0]; 

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `Good day! We are happy to tell you that we have a new program entitled <b> ${program.title}
                            </b>. This program will surely make our pet happy, and healthy! To see more details about this
                            program, please visit <a href= "https://qcacace.vercel.app">https://qcacace.vecel.app</a>`,
                
                outro: 'Please contact me for additional help.'
            }
        });

        emails.forEach(data => transporter.sendMail({ from: global.USER, to: data.email, subject: `QC ACAC: Animal Care`, html: mail }));
        return { result: 'success', message: 'Successfully saved!' }
    }

    update = async (data) => {
        await new Builder(`tbl_animal_care`)
                            .update(`title= '${data.title}', subtitle= ${data.subtitle !== '' || data.subtitle !== null ? `'${data.subtitle}'` : null}, date= '${data.date}', 
                                            description= '${data.description}', photo= ${data.photo !== undefined && data.photo !== null ? `'${data.photo}'` : null},
                                            status= ${data.status ? 1 : 0}, updated_by= ${data.updated_by}, date_updated= CURRENT_TIMESTAMP`)
                            .condition(`WHERE id= ${data.id}`)
                            .build();
        
        return { result: 'success', message: 'Successfully updated!' }
    }

    remove = async (id) => {
        await new Builder(`tbl_animal_care`).remove(id).build();
        return { result: 'success', message: 'Animal care deleted!' }
    }
}

module.exports = AnimalCare;