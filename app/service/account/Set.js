const accountLIst = require('../../DAL/AccountList');
const auth = require('../user/auth/encryption');


exports.create = async(body, res) => {
    try {
        if(body.password == undefined || body.password.length < 3 || body.password.length > 4) {
            throw "password가 너무 짧거나 깁니다."
        }

        if(body.name == undefined || body.name.length == 0 || body.name.length > 50) {
            throw "계좌 이름이 너무 짧거나 깁니다."
        }    

        body.password = await auth.createHashedPassword(body.password);
    
        await accountSql.insertAccount(body);
        res.status(201).json({
            msg : "OK"
        })
    }catch(e) {
        console.log(e);
        res.status(401).json({
            msg : e
        })
    }
}

exports.insert = async(body, res) => {
    try {
        await accountLIst.insertList(body);
        res.status(201).json({
            msg : "OK"
        })
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg : e
        })
    }
    
}