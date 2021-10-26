const executeQuery = require('../model/executeQuery');
const mysql = require('../model/mysql');

exports.idDuplicateCheck = (id) => {
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


exports.createUser = async(body, file, pw) => {
    let sql = 'INSERT INTO user(id, password, birthday, name, nickname, profile, gender, salt, phone_number) values(?,?,?,?,?,?,?,?,?);'
    let url = "images/user/" + file.filename; //유저 프로필 url

    let param = [body.id, pw.password, body.birthday, body.name, body.nickName, url, body.gender, pw.salt, body.phoneNumber]
    
    await executeQuery.executePreparedStatement(sql, param);;
    

    sql = "SELECT id, name, nickname, profile, gender FROM user WHERE id = ?";
    let result = await executeQuery.executePreparedStatement(sql, [body.id]);
    return result[0];
}

exports.insertSimplePassword = (body, simplePw) => {
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



exports.loginQuery = async(body) => {
    let sql = 'SELECT id FROM user WHERE id = ? AND password = ?'
    let param = [body.id, body.password];
    let result = await executeQuery.executePreparedStatement(sql, param);
    if(result.length == 0) {
        throw "아이디와 비밀번호가 일치하지 않습니다.";
    }
    return result
}

exports.selectId = async(id) => {
    console.log(id);
    let sql = `SELECT salt FROM user WHERE id = ?`
    let param = [id]
    const salt = await executeQuery.executePreparedStatement(sql, param);
    if(salt.length == 0) {
        throw "아이디를 찾을 수 없습니다."
    }
    return salt[0].salt;
}

exports.selectSId = async(id) => {
    let sql = `SELECT salt FROM simple_user WHERE user_id = ?`
    let param = [id]
    const salt = await executeQuery.executePreparedStatement(sql, param);
    if(salt.length == 0) {
        throw "찾을 수 없습니다."
    }
    return salt[0].salt;
}

exports.simpleLogin = async(id, pw) => {
    let sql = 'SELECT user_id FROM simple_user WHERE user_id = ? AND simple_password = ?'
    let param = [id, pw];
    let result = await executeQuery.executePreparedStatement(sql, param);
    if(result.length == 0) {
        throw "아이디와 비밀번호가 일치하지 않습니다.";
    }
}

exports.certification = async(body) => {
    let sql = "SELECT * FROM user WHERE name = ? AND birthday = ?";
    let param = [body.name, body.birthday];

    let result = await executeQuery.executePreparedStatement(sql, param);

    if(result.length == 0) {
        throw "일치하는 정보가 없습니다."
    }
}

exports.getPhoneNumber = async(phoneNumber) => {
    let sql = "SELECT * FROM user WHERE phone_number = ?";
    let result = await executeQuery.executePreparedStatement(sql, [phoneNumber])

    return result
}

exports.getId = async(userId) => {
    let sql = "SELECT phone_number FROM user WHERE id = ?";
    let result = await  executeQuery.executePreparedStatement(sql, [userId]);

    return result[0].phone_number;
}