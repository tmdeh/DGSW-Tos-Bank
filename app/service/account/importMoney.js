const accountSql = require('../../DAL/accountSql');
const encryption = require('../user/auth/encryption');

exports.get = async(body, res) => {
    try {
        let salt = await accountSql.getSalt(body.sendAccountNumber); //salt 조회
        let password = await encryption.resolveHashedPassword(salt,body.password); //salt로 암호화

        await accountSql.passwordCheck(body.sendAccountNumber, password); //비밀번호 확인

        await accountSql.accountUpdate(body.sendAccountNumber, body.receiveAccountNumber, body.money); //계좌 정보 변경
        
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