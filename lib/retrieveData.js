'use strict';

const { pool } = require('./lib/db');

const retrieveData = async () => {
    try {
        const res = await pool.query('SELECT * FROM shark');
        console.log(res.rows);
    } catch (error) {
        console.error(error);
    }
};

retrieveData(); 