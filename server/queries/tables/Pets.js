// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Pets {
    dashboard = async () => {
        return {
            total: (await new Builder(`tbl_pets`).select().condition(`WHERE status= 1`).build()).rowCount,
            adopted: (await new Builder(`tbl_pets`).select().condition(`WHERE is_adopt= 1`).build()).rowCount
        }
    }

    specific = async (id) => {
        return (await new Builder(`tbl_pets AS pet`)
                                        .select(`pet.id, pet.series_no, pet.category_id, ctg.name AS category, pet.breed_id, brd.name AS breed, pet.coat_id, coat.name AS coat, 
                                                        pet.life_stages_id, ls.name AS stage, pet.gender, pet.sterilization, pet.energy_level, pet.weight, pet.color, pet.tags, pet.photo, pet.is_adopt, pet.status`)
                                        .join({ table: `tbl_category AS ctg`, condition: `pet.category_id = ctg.id`, type: 'LEFT' })
                                        .join({ table: `tbl_breed AS brd`, condition: `pet.breed_id = brd.id`, type: 'LEFT' })
                                        .join({ table: `tbl_coat AS coat`, condition: `pet.coat_id = coat.id`, type: `LEFT` })
                                        .join({ table: `tbl_life_stages AS ls`, condition: `pet.life_stages_id = ls.id`, type: `LEFT` })
                                        .condition(`WHERE pet.id= ${id}`)
                                        .build()).rows;
    }

    search = async (data) => {
        return (await new Builder(`tbl_pets AS pet`)
                                        .select(`pet.id, pet.series_no, ctg.name AS category, brd.name AS breed, coat.name AS coat, ls.name AS stage, pet.weight, pet.is_adopt,
                                                        pet.color, pet.gender, pet.tags, pet.photo, pet.status, pet.date_created`)
                                        .join({ table: `tbl_coat AS coat`, condition: `pet.coat_id = coat.id`, type: `LEFT` })
                                        .join({ table: `tbl_life_stages AS ls`, condition: `pet.life_stages_id = ls.id`, type: `LEFT` })
                                        .join({ table: `tbl_category AS ctg`, condition: `pet.category_id = ctg.id`, type: 'LEFT' })
                                        .join({ table: `tbl_breed AS brd`, condition: `pet.breed_id = brd.id`, type: 'LEFT' })
                                        .condition(`WHERE (pet.series_no LIKE '%${data.condition}%' OR ctg.name LIKE '%${data.condition}%' OR brd.name LIKE '%${data.condition}%'
                                                            OR pet.tags LIKE '%${data.condition}%') ${data.is_adopt !== undefined ? `AND pet.is_adopt= ${data.is_adopt}` : ''}`)
                                        .except(`WHERE pet.status = 0 ORDER BY 13 DESC`)
                                        .build()).rows;
    }

    recommend = async (data) => {
        return (await new Builder(`tbl_pets AS pts`)
                                        .select(`pts.id, pts.series_no, ctg.name AS category, brd.name AS breed, coat.name AS coat, ls.name AS stage, pts.weight, pts.is_adopt,
                                                        pts.color, pts.gender, pts.tags, pts.photo, pts.status, pts.date_created`)
                                        .join({ table: `tbl_coat AS coat`, condition: `pts.coat_id = coat.id`, type: `LEFT` })
                                        .join({ table: `tbl_life_stages AS ls`, condition: `pts.life_stages_id = ls.id`, type: `LEFT` })
                                        .join({ table: `tbl_category AS ctg`, condition: `pts.category_id = ctg.id`, type: 'LEFT' })
                                        .join({ table: `tbl_breed AS brd`, condition: `pts.breed_id = brd.id`, type: 'LEFT' })
                                        .condition(`WHERE pts.is_adopt= ${data.is_adopt} AND pts.category_id= ${data.category_id} AND (pts.breed_id= ${data.breed_id} AND pts.coat_id= ${data.coat_id}
                                                            AND pts.life_stages_id= ${data.life_stages_id} AND pts.gender= '${data.gender}' AND pts.sterilization= '${data.sterilization}'
                                                            AND pts.energy_level= '${data.energy_level}' AND pts.weight= '${data.weight}' OR pts.is_adopt= 0)
                                                            ${data.color !== '' ? ` OR pts.color LIKE '%${data.color}%'` : ''} ${(data.tags).length > 0 ? `OR pts.tags LIKE '%${JSON.stringify(data.tags)}%'` : ''}`)
                                        .except(`WHERE pts.status = 0 ORDER BY 13 DESC`)
                                        .build()).rows;
    }

    list = async (data) => {
        return (await new Builder(`tbl_pets AS pts`)
                                        .select(`pts.id, pts.series_no, ctg.name AS category, brd.name AS breed, coat.name AS coat, ls.name AS stage, pts.weight, pts.is_adopt,
                                                        pts.color, pts.gender, pts.tags, pts.photo, pts.status, pts.date_created`)
                                        .join({ table: `tbl_coat AS coat`, condition: `pts.coat_id = coat.id`, type: `LEFT` })
                                        .join({ table: `tbl_life_stages AS ls`, condition: `pts.life_stages_id = ls.id`, type: `LEFT` })
                                        .join({ table: `tbl_category AS ctg`, condition: `pts.category_id = ctg.id`, type: 'LEFT' })
                                        .join({ table: `tbl_breed AS brd`, condition: `pts.breed_id = brd.id`, type: 'LEFT' })
                                        .condition(`${data.is_adopt !== undefined ? `WHERE pts.is_adopt= ${data.is_adopt} AND pts.status= 1` : ''}`)
                                        .build()).rows;
    }

    top = async (data) => { 
        return (await new Builder(`tbl_pets AS pts`)
                                        .select(`pts.id, pts.series_no, ctg.name AS category, brd.name AS breed, coat.name AS coat, ls.name AS stage, pts.weight, pts.is_adopt,
                                                        pts.color, pts.gender, pts.tags, pts.photo, pts.status, pts.date_created`)
                                        .join({ table: `tbl_coat AS coat`, condition: `pts.coat_id = coat.id`, type: `LEFT` })
                                        .join({ table: `tbl_life_stages AS ls`, condition: `pts.life_stages_id = ls.id`, type: `LEFT` })
                                        .join({ table: `tbl_category AS ctg`, condition: `pts.category_id = ctg.id`, type: 'LEFT' })
                                        .join({ table: `tbl_breed AS brd`, condition: `pts.breed_id = brd.id`, type: 'LEFT' })
                                        .condition(`${data.is_adopt !== undefined ? `WHERE pts.is_adopt= ${data.is_adopt} AND pts.status = 1` : ''} ORDER BY pts.date_created DESC LIMIT ${data.limit}`)
                                        .build()).rows;
    }
    
    save = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS }, tls : { rejectUnauthorized: false } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });
        let emails = (await new Builder(`tbl_subscribers`).select(`email`).build()).rows;

        let pet = (await new Builder(`tbl_pets`)
                            .insert({ columns: `series_no, category_id, breed_id, coat_id, life_stages_id, gender, sterilization, energy_level, weight,
                                            color, tags, photo, is_adopt, status, created_by ,date_created`, 
                                            values: `'${global.randomizer(7)}', ${data.category_id}, ${data.breed_id}, ${data.coat_id}, ${data.life_stages_id},
                                                            '${data.gender}', '${data.sterilization}', '${data.energy_level}', '${data.weight}', '${(data.color).toUpperCase()}',
                                                            '${JSON.stringify(data.tags)}', '${data.photo}', 0, 1, ${data.created_by}, CURRENT_TIMESTAMP` })
                            .condition(`RETURNING series_no`)
                            .build()).rows[0];

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `Hello, Good news! We have a new friend that is in need of your love and care. Let's welcome Pet ID:<b> ${pet.series_no} </b>. 
                <br><br>To see more about our new pet, please visit https://mailgen.js//. Thank you!
                `,
                
                outro: 'Please contact me for additional help.'
            }
        });

        emails.forEach(data => transporter.sendMail({ from: global.USER, to: data.email, subject: `QC ACAC: Pet Posted`, html: mail }));
        return { result: 'success', message: 'Successfully saved!' }
    }

    update = async (data) => {
        let pet = (await new Builder(`tbl_pets`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];
        
        await new Builder(`tbl_pets`)
                            .update(`category_id= ${data.category_id}, breed_id= ${data.breed_id}, coat_id= ${data.coat_id}, life_stages_id= ${data.life_stages_id}, gender= '${data.gender}', 
                                            sterilization= '${data.sterilization}', energy_level= '${data.energy_level}', weight= '${data.weight}', color= '${(data.color).toUpperCase()}',
                                            tags= '${JSON.stringify(data.tags)}', photo= '${data.photo}', status= ${data.status}, updated_by= ${data.updated_by}, date_updated= CURRENT_TIMESTAMP`)
                            .condition(`WHERE id= ${pet.id}`)
                            .build();

        return { result: 'success', message: 'Successfully updated!' }
    }
}

module.exports = Pets;