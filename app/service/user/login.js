const userSql = require('../../DAL/userSql');
const encryption = require('./auth/encryption')
const jwt = require('jsonwebtoken');
const secret = require('../../secret/primary');
const Token = require('./auth/IssuingTokens');

exports.login = async(body, res) => {
    
    const salt = await userSql.selectId(body.id);
    const password = await encryption.resolveHashedPassword(salt, body.password);

    body.password = password;


    userSql.loginQuery(body)
    .then((result) => {
        res.status(201).json(Token.issue(result));
    })
    .catch((msg) => {
        console.log(msg);
        res.status(401).json(msg);
    })
}

exports.simpleLogin = (res, pw, token) => {
    
}

// exports.login = (body, res) => {
    
//     body.password = encryption.encryption(body.password); //암호화
//     userSql.loginQuery(body)
//     .then(Token.issue(body))
//     .then((token) => {
//         res.status(201).json({
//             loginToken : token
//         })
//     })
//     .catch((msg) => {
//         console.log(msg);
//         res.status(401).json(msg);
//     })
// }



