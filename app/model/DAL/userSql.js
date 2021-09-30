const db = require('../db');

const idDuplicateCheck = (body) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id FROM user WHERE id = ?`, [body.id], (err, result) => {
            if(body.id == result[0].id) {
                console.log("중복체크");
                reject("아이디가 중복되었습니다.");
            }
            else if(err) {
                reject(err);
            }
            else{
                resolve({msg : "OK"});
            }
        })
    })
}

const createUser = (body, file) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO user(id, password, birthday, name, nickname, profile, simple_password, gender)
         values(?,?,?,?,?,?,?,?)`, 
        [body.id, body.password, body.birthday, body.name, body.nickName, file.filename, body.simplePassword,  body.gender], (err, result) => {
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