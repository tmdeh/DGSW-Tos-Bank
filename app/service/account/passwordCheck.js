const password = require('../user/auth/Encryption')
const accountSql = require('../../DAL/AccountSql')


const check = async(req, res) => {
    try {
        const accountNumber = req.body.accountNumber;
        let reqPassword = req.body.password;
        
        const salt = await accountSql.getSalt(accountNumber);

        reqPassword = await password.resolveHashedPassword(salt, reqPassword);
        await accountSql.passwordCheck(accountNumber, reqPassword);
        
        res.status(200).json({
            msg : "OK",
            status: 200
        })
    }
    catch(e) {
        console.log(e);
        res.status(400).json({
            msg : e,
            status : 400
        })
    }
}

module.exports = check;