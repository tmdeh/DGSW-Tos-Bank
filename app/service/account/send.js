const accountSql = require('../../DAL/AccountSql');
const passwordCheck = require('./accountPwCheck');
const deagu = require('./another/daegu');
const kakao = require('./another/Kakao');
const kBank = require('./another/k-bank');

exports.send = async(req, res) => {
    try {
        const sendAccountNumber = req.body.sendAccountNumber;
        const receiveAccountNumber = req.body.receiveAccountNumber;
        const money = req.body.money;
        const reqPassword = req.body.password;
        const identify = receiveAccountNumber.substring(0,2);
        let sendBankName;
        await passwordCheck(sendAccountNumber, reqPassword);

        let result = {};
        if(identify == '11') {
            // k-bank
        } else if(identify == '10') {
            // kakao
        } else if(identify == '71') {
            result = await deagu.send(sendAccountNumber, receiveAccountNumber, money);
            sendBankName = "deagu"
        } else if(identify == '66') {
            // toss(가져오기)
            await accountSql.accountUpdate(sendAccountNumber, receiveAccountNumber, money);
            result = {
                msg : "OK",
                status: 201
            }
        } else {
            throw {
                msg : "없는 은행입니다.",
                status : 400
            }
        }
        await accountSql.transactionInsert(sendAccountNumber, "toss", receiveAccountNumber, sendBankName, money);

        res.status(200).json(result);
    } catch(e) {
        console.log(e);
        res.status(e.status).json(e)
    }
}

