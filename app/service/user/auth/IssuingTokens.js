const jwt = require('jsonwebtoken');
const secret = require('../../../secret/primary');


exports.issue = (result) => {
    let user = {
        sub: result[0].id,
        salt : result[0].salt,
        iat: new Date().getTime() / 1000
    };
    let token = {
        msg : "OK"
    };

    token.loginToken = jwt.sign(user, secret.jwtObj, {
        expiresIn: "14d"
    })
    return(token);
}
