const mysql = require('mysql2/promise');
const settings = require('../../core/config');

const pool = mysql.createPool({
    host: settings.DB_HOST,
    user: settings.DB_USER,
    password: settings.DB_PASSWORD,
    database: settings.DB_NAME,
    port: settings.DB_PORT,
});

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos exitosa');	
        connection.release();
        return true;
    } catch (error) {
        console.error('Fallo al conectar la base de datos:', error);
        return false;
    }
}

module.exports = {
    pool,
    testConnection
};