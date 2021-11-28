const accountSql = require('../../DAL/AccountSql');

const send = async(req, res) => {
    try {
        const sendAccountNumber = req.body.sendAccountNumber;
        const receiveAccountNumber = req.body.sendAccountNumber;
        const money = req.body.money;
        const password = req.body.password;
        const identify = receiveAccountNumber.substring(0,3);

        await passwordeCheck(sendAccountNumber, password);

        let result = {};
        if(identify == '11') {
            // k-bank
        } else if(identify == '10') {
            // kakao
        } else if(identify == '71') {
            // deague
        } else if(identify == '66') {
            // toss(가져오기)
            await accountSql.accountUpdate(sendAccountNumber, receiveAccountNumber, money);
            // sender, sendBank, receiver, receiveBank,money
            await accountSql.transactionInsert(sendAccountNumber, "toss", receiveAccountNumber, money);
            result = {
                msg : "OK",
                status: 201
            }
        } else {
            throw "없는 은행입니다."
        }
        res.status(200).json(result);
    } catch(e) {
        console.log(e);
        res.status(400).json({
            msg : e,
            status : 400
        })
    }
}

const passwordeCheck = async(accountNumber, password) => {
               
    const salt = await accountSql.getSalt(sendAccountNumber);
    
    password = await password.resolveHashedPassword(salt, password);
    await accountSql.passwordCheck(accountNumber, password);
}

module.exports = send;