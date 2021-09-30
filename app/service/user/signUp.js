const signUpCheck = require('./auth/pwPatternCheck')
const userSql = require('../../model/DAL/userSql')
const error = require('../error');
const encryption = require('./auth/encryption')

const signUp = (body) => {
    signUpCheck(body)
    .then(encryption(body))
    .then(userSql.idDuplicateCheck(body))
    .then(userSql.createUser(body))
    .catch(error.error())
}

module.exports = signUp