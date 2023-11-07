const { pool } = require('../config/db');

module.exports = async(name, color) => {
    try {        
        const res = await pool.query(
            'INSERT INTO shark (name, color) VALUES ($1, $2)', 
            [name, color]
        );
        console.log(`Added a shark with the name ${name}`);
    } catch (error) {
        console.error(error);
    }
};