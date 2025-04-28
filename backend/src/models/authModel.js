const { pool } = require('../config/databaseConfig');
const { generateGeneralId } = require('../../core/utils');
const { hashPassword, verifyPassword } = require('../../core/security');

class AuthModel {
    async login(email) {
        try {
            const query = `
                SELECT user_id, user_name, email, password, role_id
                FROM users
                WHERE email = ?
            `;
            const [rows] = await pool.query(query, [email]);

            if (rows.length === 0) {
                return { error: true, message: 'Credenciales inválidas' };
            }

            return { success: true, user: rows[0] };
        } catch (error) {
            console.error('Error al obtener usuario por email:', error);
            return { error: true, message: 'Error al obtener usuario', details: error.message };
        }
    }

    async registerUser(userData) {
        try {
            const userId = generateGeneralId();
            const hashedPassword = await hashPassword(userData.password);
            const role_id = '11f94b9b-54e6-4269-b3b0-7270f2783a8f'; // Id para empleado

            const query = `
                INSERT INTO users (user_id, user_name, password, email, role_id)
                VALUES (?, ?, ?, ?, ?)
            `;
            const values = [userId, userData.user_name, hashedPassword, userData.email, role_id];

            await pool.query(query, values);
            return { success: true, message: 'Usuario registrado exitosamente' };
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            return { error: true, message: 'Error al registrar usuario', details: error.message };
        }
    }

    async checkUserExists(email) {
        try{
            const query = `
                SELECT COUNT(*) as count
                FROM users
                WHERE email = ?
            `;
            
            const [rows] = await pool.query(query, [email]);

            if (rows.length === 0) {
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error al verificar si el usuario existe:', error);
            return { error: true, message: 'Error al verificar si el usuario existe', details: error.message };
        }
    }
}

module.exports = new AuthModel();