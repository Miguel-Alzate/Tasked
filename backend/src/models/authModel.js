const { pool } = require('../config/databaseConfig');
const { generateGeneralId } = require('../../core/utils');
const { hashPassword, verifyPassword } = require('../../core/security');

class AuthModel {
    async login(email, password) {
    }

    async registerUser(username, email, password) {  
    }

    async checkUserExists(email) {
    }
}

module.exports = new AuthModel();