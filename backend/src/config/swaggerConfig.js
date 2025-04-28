const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const settings = require('../../core/config');

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tasked API',
            version: '0.0.1',
            description: 'Documentación de la API de Tasked',
        },
        servers: [
            {
                url: settings.URL_SERVER,
                description: 'url actual de la API',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', //
                },
            },
        },
    },
    apis: ['./src/routes/*.js'], // Ruta a los archivos donde están definidas las rutas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
    swaggerUi,
    swaggerSpec,
};