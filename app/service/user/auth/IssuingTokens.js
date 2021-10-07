const jwt = require('jsonwebtoken');
const secret = require('../../../secret/primary');


exports.issue = (result) => {
    let user = {
        sub: result[0].id,
        pk: result[0].user_pk,
        iat: new Date().getTime() / 1000
    };
    let token = {
        msg : "OK"
    };

    token.loginToken = jwt.sign(user, secret, {
        expiresIn: "48H"
    })
    return(token);
}


