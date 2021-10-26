const userSql = require('../../DAL/UserSql');
const encryption = require('./auth/Encryption')
const Token = require('./auth/IssuingTokens');

exports.login = async(body, res) => {
    try{
        const salt = await userSql.selectId(body.id);
        const password = await encryption.resolveHashedPassword(salt, body.password);
        body.password = password;
        let result = await userSql.loginQuery(body);
        res.status(200).json(Token.issue(result))
    }catch (e) {
        console.log(e);
        res.status(400).json({
            msg : e
        })
        return;
    }
}

exports.simpleLogin = async(res, body, token) => {
    try {
        let id = token.sub;
    
        const salt = await userSql.selectSId(id);
        const simplePw = await encryption.resolveHashedPassword(salt, body.simplePassword);
    
        await userSql.simpleLogin(id, simplePw)
        res.status(200).json({
            msg : "OK"
        })
    } catch (e) {
        res.status(400).json({
            msg : "아이디와 비밀번호가 일치하지 않습니다."
        })
    }
}



