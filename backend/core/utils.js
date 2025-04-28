const { v4: uuidv4 } = require('uuid');

function generateGeneralId() {
    return uuidv4(); // Genera un UUID versión 4
}

module.exports = {
    generateGeneralId,
};