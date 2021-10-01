const signUpCheck = require('./auth/signUpCheck')
const userSql = require('../../model/DAL/userSql')
const encryption = require('./auth/encryption')


exports.signUp = (body, file, res) => {
    const result = signUpCheck.signUpCheck(body) //id, password 체크
    if(result.msg !== "OK") { //id나 password가 만족하지 못했을테
        res.status(401).json(result);
        return
    }

    body.password = encryption.encryption(body.password); //비밀번호 암호화
    userSql.createUser(body, file)
    .then((result) => {
        res.status(201).json(result);
    }).catch((result) => {
        res.status(401).json(result);
    })

}

