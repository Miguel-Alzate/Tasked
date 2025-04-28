const { verifyToken } = require('../../core/security');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // El token debe venir en el formato "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: true, message: 'Token no proporcionado' });
    }

    try {
        const payload = verifyToken(token);
        if (!payload) {
            return res.status(403).json({ error: true, message: 'Token inválido o expirado' });
        }

        // Adjuntar el payload del token al objeto `req` para usarlo en las rutas
        req.user = payload;
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.status(403).json({ error: true, message: 'Token inválido o expirado' });
    }
}

module.exports = authenticateToken;