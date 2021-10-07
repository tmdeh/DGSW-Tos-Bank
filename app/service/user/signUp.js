const signUpCheck = require('./auth/signUpCheck')
const userSql = require('../../DAL/userSql')
const encryption = require('./auth/encryption')


exports.signUp = async(body, file, res) => {
    const result = signUpCheck.signUpCheck(body) //id, password 체크
    if(result.msg !== "OK") { //id나 password가 만족하지 못했을테
        res.status(401).json(result);
        return
    }

    const pw = await encryption.createHashedPassword(body.password);
    const simplePw = await encryption.createHashedPassword(body.simplePassword);
    
    userSql.createUser(body, file, pw, simplePw)
    .then(() => {
        res.status(201).json({
            msg : "OK"
        })
    })
    .catch((err) => {
        res.status(401).json({ msg : err.msg.code});
    })
}