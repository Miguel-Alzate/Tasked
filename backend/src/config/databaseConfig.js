const { Pool } = require('pg');
const settings = require('../../core/config');

const pool = new Pool({
    host: settings.DB_HOST,
    user: settings.DB_USER,
    password: settings.DB_PASSWORD,
    database: settings.DB_NAME,
    port: settings.DB_PORT,
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Conexión a la base de datos PostgreSQL exitosa');
        client.release();
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