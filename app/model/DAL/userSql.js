const db = require('../db');

const idDuplicateCheck = async (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id FROM user WHERE id = ?`, [id], (err, result) => {
            if(err){
                throw err
            }
            if(result.length == 0){
                resolve({
                    msg : "OK"
                })
            }
            else {
                reject({
                    msg : "이미 동일한 아이디가 존재합니다."
                })
            }
        })
    })
}


const createUser = (body, file) => {
    return new Promise((resolve, reject) => {
        const url = "images/user" + file.filename; //유저 프로필 url
        db.query(`INSERT INTO user(id, password, birthday, name, nickname, profile, simple_password, gender)
            values(?,?,?,?,?,?,?,?)`, 
            [body.id, body.password, body.birthday, body.name, body.nickName, url, body.simplePassword,  body.gender], (err, result) => {
            if(err){
                console.log(err);
                reject({
                    msg : err.code
                })
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