const crypto = require('crypto');

const createSalt = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
        });
    });
}

const createHashedPassword = (plainPassword) =>{
    return new Promise(async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(plainPassword, salt, 256, 64, 'sha512', (err, key) => {
            if (err) {
                reject(err)
            };
            resolve({ password: key.toString('base64'), salt });
        });
    });
}

const resolveHashedPassword = (salt, password) => {
    return new Promise(async (resolve, reject) => {
        crypto.pbkdf2(password, salt, 256, 64, 'sha512', (err, key) => {
            if (err) {
                reject(err);
            } else {
                resolve(key.toString('base64'));
            }
        })
    })
}

module.exports = {
    createHashedPassword,
    resolveHashedPassword
}