const accountSql = require('../../DAL/AccountSql');
const kakao = require('./another/Kakao');
const deagu = require('./another/daegu');
const kBank = require('./another/k-bank');

   // 장우 - 110 - kb
    // 승도 - 666 - toss
    // 승우 - 031 - 
    // 새찬 - 108 - kakao
    // 지나 - 719 - deagu
const exist = async(req, res) => {
    try {
        const accountNumber = req.params.accountNumber;

        let accountIdentify = accountNumber.substring(0,2);
        let result = {};
        if(accountIdentify == '66'){
            if(await accountSql.isExistAccount(accountNumber)) {
                result.msg = "OK";
                result.status = 200;
            } else {
                result.msg = "존재하지 않은 계좌 입니다.";
                result.status = 400;
                throw result;
            }
        } else if(accountIdentify == '11') {
            result = await kBank.accountExistCheck(accountNumber);
        } else if(accountIdentify == '10') {
            result  = await kakao.accountExistCheck(accountNumber);
        } else if(accountIdentify == '71') {
            result = await deagu.accountExistCheck(accountNumber);
        } else {    
            res.status(400).json({
                msg : "없는 은행입니다.",
                status : 400
            })
        }
        res.status(200).json(result);
    } catch(e) {
        res.status(400).json(e);
    }
}


module.exports = exist;