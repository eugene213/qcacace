// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Users {
    specific = async (id) => { return (await new Builder(`tbl_users AS usr`)
                                                            .select()
                                                            .join({ table: `tbl_users_info AS info`, condition: `info.user_id = usr.id`, type: 'LEFT' })
                                                            .condition(`WHERE usr.id= ${id}`)
                                                            .build()).rows; }

    login = async (data) => {
        let email = await new Builder(`tbl_users`).select().condition(`WHERE status = 1 AND email= '${data.email}'`).build();
        let verified = await new Builder(`tbl_users`).select().condition(`WHERE email= '${data.email}' AND is_email_verified= 1`).build();
        let creds = await new Builder(`tbl_users`).select().condition(`WHERE email= '${data.email}' AND password= '${data.password}'`).build();

        if(email.rowCount > 0) {
            if(verified.rowCount > 0) {
                if(creds.rowCount > 0) {
                    if(creds.rows[0].is_logged === 0) {
                        let logged_in = await new Builder(`tbl_users`).update(`is_logged= 1`).condition(`WHERE id= ${creds.rows[0].id} RETURNING id`).build();
                        return { result: 'success', id: logged_in.rows[0].id }
                    }
                    else { return { result: 'error', error: [{ name: 'email', message: 'Account already used in another device' }] } }
                }
                else { return { result: 'error', error: [{ name: 'password', message: 'Incorrect password!' }] } }
            }
            else { return { result: 'error', error: [{ name: 'email', message: 'Email is not yet verified!' }] } }
        }
        else { return { result: 'error', error: [{ name: 'email', message: 'Email doesn`t exist!' }] } }
    }

    logout = async (data) => {
        await new Builder(`tbl_users`).update(`is_logged= 0`).condition(`WHERE id= ${data.id}`).build();
        return { result: 'success', message: 'Successfully logged out!' }
    }

    profile = async (id) => {
        return (await new Builder(`tbl_users AS usr`)
                                        .select(`usr.*, info.fname, info.mname, info.lname, info.gender, info.address, info.avatar`)
                                        .join({ table: `tbl_users_info AS info`, condition: `info.user_id = usr.id`, type: `LEFT` })
                                        .condition(`WHERE usr.id= ${id}`)
                                        .build()).rows;
    }

    dashboard = async () => {
        return {
            total: (await new Builder(`tbl_users`).select(`id`).except(`WHERE id= 1`).build()).rowCount,
            active: (await new Builder(`tbl_users`).select(`id`).condition(`WHERE status= 1`).except(`WHERE id= 1`).build()).rowCount,
            inactive: (await new Builder(`tbl_users`).select(`id`).condition(`WHERE status= 0`).except(`WHERE id= 1`).build()).rowCount
        }
    }

    search = async (data) => {
        return (await new Builder(`tbl_users AS usr`)
                                        .select(`usr.id, usr.series_no, usr.email, usr.user_level, usr.status, usr.date_created, info.fname, info.mname, info.lname, info.avatar`)
                                        .join({ table: `tbl_users_info AS info`, condition: `info.user_id = usr.id`, type: `LEFT` })
                                        .condition(`WHERE usr.user_level LIKE '%${data.condition}%' OR usr.series_no LIKE '%${data.condition}%'
                                                            OR info.fname LIKE '%${data.condition}%' OR info.mname LIKE '%${data.condition}%' OR info.lname LIKE '%${data.condition}%'`)
                                        .except(`WHERE usr.user_level= 'superadmin' OR usr.id= ${data.id} ORDER BY 6 DESC`)
                                        .build()).rows;
    }

    list = async (data) => {
        return (await new Builder(`tbl_users AS usr`)
                                        .select(`usr.id, usr.series_no, usr.email, usr.user_level, usr.status, usr.date_created, info.fname, info.mname, info.lname, info.avatar`)
                                        .join({ table: `tbl_users_info AS info`, condition: `info.user_id = usr.id`, type: `LEFT` })
                                        .except(`WHERE usr.user_level= 'superadmin' OR usr.id= ${data.id} ORDER BY 6 DESC`)
                                        .build()).rows;
    }

    save = async (data) => {
        let _errors = [];
        
        if((await new Builder(`tbl_users`).select().condition(`WHERE email= '${data.email}'`).build()).rowCount > 0) { _errors.push({ name: 'email', message: 'Email already used!' }); }
        if((await new Builder(`tbl_users_info`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
            _errors.push({ name: 'lname', message: 'Name already existing!' });
        }
        
        if(!(_errors.length > 0)) {
            let usr = (await new Builder(`tbL_users`)
                                                .insert({ columns: `series_no, email, password, is_email_verified, user_level, is_logged, code, status, created_by, date_created`, 
                                                                values: `'${global.randomizer(7)}', '${data.email}', '${data.password}', 1, '${data.user_level}', 0, '${global.randomizer(6)}',
                                                                                ${data.status === true || data.status === 'true' ? 1 : 0}, ${data.created_by}, CURRENT_TIMESTAMP` })
                                                .condition(`RETURNING id`)
                                                .build()).rows[0];
            await new Builder(`tbl_users_info`)
                                .insert({ columns: `user_id, fname, mname, lname, gender, address, avatar`, 
                                                values: `${usr.id}, '${(data.fname).toUpperCase()}', ${data.mname !== '' ? `'${(data.mname).toUpperCase()}'` : null},
                                                                '${(data.lname).toUpperCase()}', '${data.gender}', '${(data.address).toUpperCase()}', '${data.avatar}'` })
                                .build();
            return { result: 'success', message: 'Successfully saved!' }
        }
        else { return { result: 'errors', error: _errors } }
    }

    update = async (data) => {
        console.log(data);
        let usr = (await new Builder(`tbl_users AS usr`)
                                            .select()
                                            .join({ table: `tbl_users_info AS info`, condition: `info.user_id = usr.id`, type: `LEFT` })
                                            .condition(`WHERE usr.id= ${data.id}`)
                                            .build()).rows[0];
        let _errors = [];
        
        if(global.compare(usr.email, data.email)) {
            if((await new Builder(`tbl_users`).select().condition(`WHERE email= '${data.email}'`).build()).rowCount > 0) { _errors.push({ name: 'email', message: 'Email already used!' }); }
        }
        if(global.compare(usr.fname, data.fname)) {
            if((await new Builder(`tbl_users_info`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
                _errors.push({ name: 'lname', message: 'Name already exist!' });
            }
        }
        if(global.compare(usr.lname, data.lname)) {
            if((await new Builder(`tbl_users_info`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
                _errors.push({ name: 'lname', message: 'Name already exist!' });
            }
        }

        if(!(_errors.length > 0)) {
            await new Builder(`tbl_users`)
                                .update(`email= '${data.email}', password= '${data.password}', user_level= '${data.user_level}', status= ${data.status === true || data.status === 'true' ? 1 : 0},
                                                updated_by= ${data.updated_by}, date_updated= CURRENT_TIMESTAMP`)
                                .condition(`WHERE id= ${usr.id}`)
                                .build();
            await new Builder(`tbl_users_info`)
                                .update(`fname= '${(data.fname).toUpperCase()}', mname= ${data.mname !== '' ? `'${(data.mname).toUpperCase()}'` : null}, lname= '${(data.lname).toUpperCase()}',
                                                gender= '${data.gender}', address= '${(data.address).toUpperCase()}'`)
                                .condition(`WHERE id= ${usr.id}`)
                                .build();

            return { result: 'success', message: 'Successfully updated!' }
        }
        else { return { result: 'error', error: _errors } }
    }
}

module.exports = Users;