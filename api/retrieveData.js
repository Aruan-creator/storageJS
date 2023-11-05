'use strict';

const { pool } = require('../config/db');

module.exports = async () => {
    try {
        const res = await pool.query('SELECT * FROM shark');
        console.log(res.rows);
    } catch (error) {
        console.error(error);
    }
};