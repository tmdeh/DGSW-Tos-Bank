const db = require('../db');

const idDuplicateCheck = (body) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id FROM tosbank WHERE id = ?`, [body.id], (err, result) => {
            if(err) {
                reject(err);
            }
            resolve();
        })
    })
}

const createUser = (body, file) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO tosbank(id, password, birthday, name, nickname, profile, simple_password, gender)
         values(?,?,?,?,?,?,?,?)`, 
        [body.id, body.password, body.birthday, body.name, body.nickname, file.filename, body.simplePassword,  body.gender], (err, result) => {
            if(err) {
                reject(err);
            }
            resolve({
                msg : "OK"
            })
        })
    })
}

module.exports = {
    idDuplicateCheck : idDuplicateCheck,
    createUser : createUser
}