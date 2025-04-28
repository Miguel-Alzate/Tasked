const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const settings = {
    PROJECT_NAME: "Tasked",
    PROJECT_VERSION: "0.0.1",
    PROJECT_DESCRIPTION: "Tasked API",

    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT || 3306,

    DATABASE_URL: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT || 3306}/${process.env.DB_NAME}`,

    URL_SERVER: process.env.URL_SERVER,

    SECRET_KEY: process.env.SECRET_KEY,
    TOKEN_EXPIRE_MIN: 360,
    ALGORITHM: process.env.ALGORITHM || 'HS256'
};

module.exports = settings;