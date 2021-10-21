const userSql = require('../../DAL/UserSql');
const encryption = require('./auth/Encryption')
const Token = require('./auth/IssuingTokens');

exports.login = async(body, res) => {
    try{
        const salt = await userSql.selectId(body.id);
        const password = await encryption.resolveHashedPassword(salt, body.password);
    

    body.password = password;


    userSql.loginQuery(body)
    .then((result) => {
        res.status(200).json(Token.issue(result));
    })
    .catch((msg) => {
        console.log(msg);
        res.status(401).json(msg);
    })
    
    }catch (e) {
        res.status(401).json({
            msg : e
        })
        return;
    }
}

exports.simpleLogin = async(res, body, token) => {
    let id = token.sub;

    const salt = await userSql.selectSId(id);
    const simplePw = await encryption.resolveHashedPassword(salt, body.simplePassword);

    userSql.simpleLogin(id, simplePw)
    .then((result) => {
        res.status(201).json(result);
    })
    .catch((e) => {
        res.status(401).json(e);
    })
}



