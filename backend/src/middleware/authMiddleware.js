const { verifyToken } = require('../../core/security');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: true, message: 'No token provided' });
    }

    try {
        const payload = verifyToken(token);
        if (!payload) {
            return res.status(403).json({ error: true, message: 'Invalid Token' });
        }

        req.user = payload;
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.status(403).json({ error: true, message: 'Invalid Token' });
    }
}

module.exports = authenticateToken;