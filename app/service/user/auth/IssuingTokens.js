const jwt = require('jsonwebtoken');
const secret = require('../../../secret/primary');


const issue = (body) => {
    let user = {
        id: bodyu.id,
        password: body.password, 
        iat: new Date().getTime() / 1000
    };
    return jwt.sign(user, secret, {
        expiresIn: "24H"
    })
}



module.exports = issue;