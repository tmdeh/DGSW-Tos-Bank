const signUpCheck = require('./auth/signUpCheck')
const userSql = require('../../DAL/UserSql')
const encryption = require('./auth/Encryption')


exports.signUp = async(body, file, res) => {
    try{
        signUpCheck.signUpCheck(body) //id, password 체크
        await signUpCheck.phoneNumberDuplicateCHeck(body.phoneNumber);
        let pw = await encryption.createHashedPassword(body.password);
        let simplePw = await encryption.createHashedPassword(body.simplePassword);
        let result = await userSql.createUser(body, file, pw);

        await userSql.insertSimplePassword(body, simplePw);

        res.status(201).json({
            msg : "OK",
            result
        })
    }catch(e) {
        console.log(e)
        res.status(400).json({
            msg : e
        })
        return
    }
}