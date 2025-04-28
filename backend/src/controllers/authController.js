const AuthModel = require('../models/authModel');
const { verifyPassword, createAccessToken } = require('../../core/security');

class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const result = await AuthModel.login(email);

            if (result.error) {
                return res.status(404).json(result);
            }

            const user = result.user;

            const isPasswordValid = await verifyPassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: true, message: 'Credenciales inválidas' });
            }

            const token = createAccessToken({ sub: user.user_id, role: user.role_id });

            res.status(200).json({
                success: true,
                message: 'Inicio de sesión exitoso',
                token,
                user: {
                    user_id: user.user_id,
                    user_name: user.user_name,
                    email: user.email,
                    role_id: user.role_id,
                },
            });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ error: true, message: 'Error en el servidor', details: error.message });
        }
    }

    async register(req, res) {
        const userData = req.body;
        // Validar que el no usuario exista
        const userExists = await AuthModel.checkUserExists(userData.email);
        if (!userExists) {
            return res.status(400).json({ error: true, message: 'El usuario ya existe' });
        }

        // Si el usuario no existe, validar que el correo tenga formato valido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            return res.status(400).json({ error: true, message: 'El correo electrónico no es válido' });
        }

        // Si el usuario no existe, validar que la password sea de 8 o mas caracteres
        if (userData.password.length < 8) {
            return res.status(400).json({ error: true, message: 'La contraseña debe tener al menos 8 caracteres' });
        }

        try {
            const result = await AuthModel.registerUser(userData);

            if (result.error) {
                return res.status(400).json(result);
            }

            res.status(201).json(result);
        } catch (error) {
            console.error('Error en registro:', error);
            res.status(500).json({ error: true, message: 'Error en el servidor', details: error.message });
        }
    }
}

module.exports = new AuthController();