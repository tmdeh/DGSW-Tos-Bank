const accountSql = require('../../DAL/AccountSql');
const encryption = require('../user/auth/Encryption');

exports.get = async(body) => {
    await accountSql.isExistAccount(body.sendAccountNumber, body.receiveAccountNumber); //계좌가 존재하는지 확인
    
    let salt = await accountSql.getSalt(body.sendAccountNumber); //salt 조회
    let password = await encryption.resolveHashedPassword(salt,body.password);
    
    await accountSql.passwordCheck(body.sendAccountNumber, password); //비밀번호 확인
    await accountSql.accountUpdate(body.sendAccountNumber, body.receiveAccountNumber, body.money); //계좌 정보 변경
    //sender, sendBank, receiver, receiveBank, money
    await accountSql.transactionInsert(body.sendAccountNumber, "toss", body.receiveAccountNumber, "toss", body.money);
    return {
        msg : "OK",
        commission: 0,
        status : 201
    }
}