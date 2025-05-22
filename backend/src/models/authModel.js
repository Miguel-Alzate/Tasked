const { pool } = require('../config/databaseConfig');
const { generateGeneralId } = require('../../core/utils');
const { hashPassword, verifyPassword } = require('../../core/security');
const { getDefaultRoleId } = require('../config/roleConfig');

class AuthModel {
    async login(email, password) {
        try {
            // Get user by email
            const query = 'SELECT user_id, user_name, email, password, role_id FROM users WHERE email = $1';
            const { rows } = await pool.query(query, [email]);

            if (rows.length === 0) {
                return { success: false, message: 'Invalid credentials' };
            }

            const user = rows[0];
            const isValidPassword = await verifyPassword(password, user.password);

            if (!isValidPassword) {
                return { success: false, message: 'Invalid credentials' };
            }

            // Remove password from response
            delete user.password;
            
            return {
                success: true,
                data: user
            };
        } catch (error) {
            return { success: false, message: 'Login failed' };
        }
    }

    async registerUser(user_name, email, password) {
        try {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return { success: false, message: 'Invalid email format' };
            }

            // Validate password length
            if (password.length < 8) {
                return { success: false, message: 'Password must be at least 8 characters long' };
            }

            // Validate user_name length
            if (user_name.length < 3 || user_name.length > 50) {
                return { success: false, message: 'Username must be between 3 and 50 characters' };
            }

            // Check if user already exists
            const userExists = await this.checkUserExists(email);
            if (userExists) {
                return { success: false, message: 'Email already registered' };
            }

            const userId = generateGeneralId();
            const hashedPassword = await hashPassword(password);
            const defaultRoleId = getDefaultRoleId(); 

            const query = `
                INSERT INTO users (user_id, user_name, email, password, role_id)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING user_id, user_name, email, role_id
            `;

            const { rows } = await pool.query(query, [
                userId,
                user_name,
                email,
                hashedPassword,
                defaultRoleId
            ]);

            const user = rows[0];

            delete user.user_id, user.role_id;

            return {
                success: true,
                data: user
            };

        } catch (error) {
            return { success: false, message: 'Registration failed' };
        }
    }

    async checkUserExists(email) {
        try {
            const query = 'SELECT COUNT(*) FROM users WHERE email = $1';
            const { rows } = await pool.query(query, [email]);
            return parseInt(rows[0].count) > 0;
        } catch (error) {
            throw new Error('Error checking user existence');
        }
    }
}

module.exports = new AuthModel();