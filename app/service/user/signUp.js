const signUpCheck = require('./auth/signUpCheck')
const userSql = require('../../model/DAL/userSql')
// const error = require('../error');
const encryption = require('./auth/encryption')

exports.signUp = (body, file) => {
    const result = signUpCheck.signUpCheck(body)
    if(result.msg !== "OK") {
        console.log(result);
        return result
    }


    body.password = encryption.encryption(body.password);

    userSql.idDuplicateCheck(body)
    .then(userSql.createUser(body, file))
    .catch(error)
}

const error = (msg) => {
    return {
        msg : msg
    }
}