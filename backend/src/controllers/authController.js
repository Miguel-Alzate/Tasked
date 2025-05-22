const AuthModel = require('../models/authModel');

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(422).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            const result = await AuthModel.login(email, password);
            
            if (!result.success) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result.data
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    async register(req, res) {
        try {
            const { user_name, email, password } = req.body;

            if (!user_name || !email || !password) {
                return res.status(422).json({
                    success: false,
                    message: 'All fields are required'
                });
            }

            const result = await AuthModel.registerUser(user_name, email, password);

            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }

            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: result.data
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}

module.exports = new AuthController();