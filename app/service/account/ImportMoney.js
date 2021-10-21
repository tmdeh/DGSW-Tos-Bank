const accountSql = require('../../DAL/AccountSql');
const encryption = require('../user/auth/Encryption');

exports.get = async(body, res) => {
    try {
        await accountSql.isExistAccount(body.sendAccountNumber, body.receiveAccountNumber); //계좌가 존재하는지 확인
        
        let salt = await accountSql.getSalt(body.sendAccountNumber); //salt 조회
        let password = await encryption.resolveHashedPassword(salt,body.password); //salt로 암호화
        
        await accountSql.passwordCheck(body.sendAccountNumber, password); //비밀번호 확인
  
        
        await accountSql.accountUpdate(body.sendAccountNumber, body.receiveAccountNumber, body.money); //계좌 정보 변경
        
        await accountSql.transactionInsert(body);

        res.status(201).json({
            msg : "OK"
        })
    }catch(e) {
        console.log(e);
        res.status(401).json({
            msg : e
        })
    }

}