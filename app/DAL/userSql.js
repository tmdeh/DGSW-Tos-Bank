const executeQuery = require('../model/executeQuery');
const mysql = require('../model/mysql');

const idDuplicateCheck = (id) => {
    return new Promise((resolve, reject) => {
        mysql.query(`SELECT id FROM user WHERE id = ?`, [id], (err, result) => {
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


const createUser = (body, file, pw, simplePw) => {
    return new Promise((resolve, reject) => {
        let sql1 = 'INSERT INTO user(id, password, birthday, name, nickname, profile, gender, salt) values(?,?,?,?,?,?,?,?);'
        // let sql2 = "INSERT INTO simple_user(user_id, simple_password, salt) values(?, ?, ?);"
        let url = "images/user/" + file.filename; //유저 프로필 url
        let param1 = [body.id, pw.password, body.birthday, body.name, body.nickName, url, body.gender, pw.salt]
        // let param2 = [body.id, simplePw.password, simplePw.salt];

        // sql2 = mysql.format(sql2, param2);
        mysql.query(sql1, param1, (err, result) => {
            if(err) {
                reject({
                    msg : err
                })
            }
            resolve(body, simplePw);
        })
    }).then(insertSimplePassword(body, simplePw))
}

const insertSimplePassword = (body, simplePw) => {
    return new Promise((resolve, reject) => {
        mysql.query("INSERT INTO simple_user(user_id, simple_password, salt) values(?, ?, ?);", 
        [body.id, simplePw.password, simplePw.salt], (err, result) => {
            if(err) {
                reject({
                    msg : err
                })
            }
            resolve({
                msg : "OK"
            })
        })
    })
}



const loginQuery = async(body) => {
    let sql = 'SELECT user_pk ,id, password FROM user WHERE id = ? AND password = ?'
    let param = [body.id, body.password];
    let result = await executeQuery.executePreparedStatement(sql, param);
    return new Promise((resolve, reject) => {
        if(result.length == 0) {
            reject({
                msg : "아이디와 비밀번호가 일치하지 않습니다."
            })
        }
        resolve(result);
    })
}

const selectId = async(id) => {
    let sql = `SELECT salt FROM user WHERE id = ?`
    let param = [id]
    const salt = await executeQuery.executePreparedStatement(sql, param);
    return salt[0].salt;
}



module.exports = {
    idDuplicateCheck : idDuplicateCheck,
    createUser : createUser,
    loginQuery : loginQuery,
    selectId : selectId
}