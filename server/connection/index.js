// Libraries
const Pool = require('pg').Pool;
const config = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
} : {
    user: 'db_qcacac_user',
    host: 'dpg-cg9htfu4dad5p6r7er2g-a.singapore-postgres.render.com',
    database: 'db_qcacac',
    password: 'qmG0Eat03RE0kx0Rxe2U5RNrA2B1eZaB',
    port: 5432
}

const pool = new Pool(config);
module.exports = pool;