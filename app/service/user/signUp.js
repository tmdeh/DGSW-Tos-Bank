const signUpCheck = require('./auth/signUpCheck')
const userSql = require('../../DAL/userSql')
const encryption = require('./auth/encryption')


exports.signUp = async(body, file, res) => {
    try{
        signUpCheck.signUpCheck(body) //id, password 체크
        let pw = await encryption.createHashedPassword(body.password);
        let simplePw = await encryption.createHashedPassword(body.simplePassword);
        await userSql.createUser(body, file, pw);

        await userSql.insertSimplePassword(body, simplePw);

        res.status(201).json({
            msg : "OK"
        })
    }catch(e) {
        console.log(e)
        res.status(401).json(e)
        return
    }
}