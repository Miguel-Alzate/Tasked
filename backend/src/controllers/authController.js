const AuthModel = require('../models/authModel');

class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
            
    }

    async register(req, res) {
        const { username, email, password } = req.body;
    }
}

module.exports = new AuthController();