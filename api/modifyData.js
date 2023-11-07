'use strict';

const { pool } = require('../config/db');

module.exports = async (id, name) => {
    try {
        const res = await pool.query('UPDATE shark SET name = $1 WHERE id = $2', [
            name,
            id,
        ]);
        console.log(`Updated the shark name to ${name}`);
    } catch (error) {
        console.error(error);
    }
};