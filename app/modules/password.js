const crypto = require('crypto');

const encryption = (password) => {
    return crypto.createHash('sha512').update(password).digest('base64');
}
module.exports = encryption;