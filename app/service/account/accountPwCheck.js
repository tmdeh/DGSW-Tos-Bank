const password = require('../user/auth/Encryption');
const accountSql = require('../../DAL/AccountSql');

const passwordCheck = async(accountNumber, reqPassword) => {
               
    const salt = await accountSql.getSalt(accountNumber);
    
    reqPassword = await password.resolveHashedPassword(salt, reqPassword);
    await accountSql.passwordCheck(accountNumber, reqPassword);
}


module.exports = passwordCheck;