const crypto = require('crypto');

const  encryption = (password) => { //암호화
    return crypto.createHash('sha512').update(password).digest('base64');
}



module.exports = {
    encryption : encryption
}