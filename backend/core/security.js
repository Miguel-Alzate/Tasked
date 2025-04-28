const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const settings = require('./config');

// Encriptar contraseña
function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

// Verificar contraseña encriptada
function verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}

// Crear JWT token
function createAccessToken(data) {
    const payload = {
        ...data,
        exp: Math.floor(Date.now() / 1000) + (settings.TOKEN_EXPIRE_MIN * 60),
    };
    return jwt.sign(payload, settings.SECRET_KEY, { algorithm: settings.ALGORITHM });
}

// Verificar JWT token
function verifyToken(token) {
    try {
        const payload = jwt.verify(token, settings.SECRET_KEY, { algorithms: [settings.ALGORITHM] });
        return payload.sub;
    } catch (error) {
        return null;
    }
}

module.exports = {
    hashPassword,
    verifyPassword,
    createAccessToken,
    verifyToken,
};