const signUpCheck = require('./auth/signUpCheck')
const userSql = require('../../model/DAL/userSql')
// const error = require('../error');
const encryption = require('./auth/encryption')

exports.signUp = (body, file) => {
    const result = signUpCheck.signUpCheck(body) //id, password 체크
    if(result.msg !== "OK") { //id나 password가 만족하지 못했을테
        console.log(result);
        return result
    }
    
    
    body.password = encryption.encryption(body.password); //비밀번호 암호화

    let sqlResult = userSql.idDuplicateCheck(body) //id 중복체크
    // .then(userSql.createUser(body, file)) //user에 insert
    .catch((error) => {
        return error
    })
    
    return sqlResult
}

