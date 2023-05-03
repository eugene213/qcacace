// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Breed {
    specific = async (id) => { return (await new Builder(`tbl_breed`).select().condition(`WHERE id= ${id}`).build()).rows; }
    dropdown = async (data) => { return (await new Builder(`tbl_breed`).select(`id, name`).condition(`WHERE status = 1 AND category_id = ${data.id}`).build()).rows; }

    list = async () => { 
        return (await new Builder(`tbl_breed AS brd`)
                                        .select(`brd.id, brd.series_no, ctg.name AS pet_category, brd.name, brd.date_created`)
                                        .join({ table: `tbl_category AS ctg`, condition: `brd.category_id = ctg.id`, type: 'LEFT' })
                                        .condition(`ORDER BY brd.date_created DESC`)
                                        .build()).rows; 
    }

    dashboard = async() => {
        let summary = [];
        let _count = (await new Builder(`tbl_category`).select(`id, name`).condition(`WHERE status= 1 ORDER BY date_created ASC LIMIT 2`).build()).rows;

        for(let count = 0; count < _count.length; count++) {
            summary.push({ name: _count[count].name,
                                        count: (await new Builder(`tbl_breed`).select(`COUNT(*)`).condition(`WHERE category_id= ${_count[count].id} AND status= 1`).build()).rows[0].count });
        }

        return {
            others: (await new Builder(`tbl_breed`).select(`COUNT(*)`).build()).rows[0].count,
            summary
        }
    }

    search = async (data) => { 
        return (await new Builder(`tbl_breed AS brd`)
                                        .select(`brd.id, brd.series_no, ctg.name AS pet_category, brd.name, brd.date_created`)
                                        .join({ table: `tbl_category AS ctg`, condition: `brd.category_id = ctg.id`, type: 'LEFT' })
                                        .condition(`WHERE brd.series_no LIKE '%${data.condition}%' OR brd.name LIKE '%${data.condition}%' 
                                                            OR ctg.name LIKE '%${data.condition}%' ORDER BY brd.date_created DESC`)
                                        .build()).rows;
    }

    save = async (data) => {
        if(!(await new Builder(`tbl_breed`).select().condition(`WHERE category_id= ${data.category_id} AND name= '${(data.name).toUpperCase()}'`).build()).rowCount > 0) {
            await new Builder(`tbl_breed`)
                                .insert({ columns: `series_no, category_id, name, status, created_by, date_created`,
                                                values: `'${(data.series_no).toUpperCase()}', ${data.category_id}, '${(data.name).toUpperCase()}',  
                                                                ${data.status ? 1 : 0}, ${data.created_by}, CURRENT_TIMESTAMP` })
                                .build();
            return { result: 'success', message: 'Successfully saved!' }
        }
        else { return { result: 'error', error: [{ name: 'name', message: 'Breed already exist! Change your breed name or choose another pet category!' }] } }
    }

    update = async (data) => {
        let brd = (await new Builder(`tbl_breed`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];
        let _errors = [];

        if(global.compare(brd.category_id, data.category_id)) {
            if((await new Builder(`tbl_breed`).select().condition(`WHERE category_id= ${data.category_id} AND name= '${(data.name).toUpperCase()}'`).build()).rowCount > 0) {
                _errors.push({ name: 'category_id', message: 'Breed already exist in this pet category!' });
            }
        }

        if(global.compare(brd.name, data.name)) {
            if((await new Builder(`tbl_breed`).select().condition(`WHERE category_id= ${data.category_id} AND name= '${(data.name).toUpperCase()}'`).build()).rowCount > 0) {
                _errors.push({ name: 'name', message: 'Breed already exist in this pet category! Please change your breed name or choose another pet category' });
            }
        }

        if(!(_errors.length > 0)) {
            await new Builder(`tbl_breed`)
                                .update(`category_id= ${data.category_id}, name= '${(data.name).toUpperCase()}', status= ${data.status === true || data.status === 'true' ? 1 : 0},
                                                updated_by= ${data.updated_by}, date_updated= CURRENT_TIMESTAMP`)
                                .condition(`WHERE id= ${brd.id}`)
                                .build();
            return { result: 'success', message: 'Successfully updated!' }
        }
        else { return { result: 'error', error: _errors } }
    }
}

module.exports = Breed;