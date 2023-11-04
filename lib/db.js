const { Pool } = require('pg');

const pool = new Pool({
    user: 'fish_user',
    database: 'fish',
    password: 'password',
    port: 5432,
    host: 'localhost',
});

module.exports = { pool };