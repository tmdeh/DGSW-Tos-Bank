const accountSql = require('../../DAL/AccountSql');

const receive = async(req, res) => { //타은행 -> toss로
    try {
        const sender = req.body.sendAccountNumber;
        const receiver = req.body.receiveAccountNumber;
        const money = req.body.money;
        const identify = sender.substring(0,2);
        let sendBank;
    
        if(receiver.substring(0,3) !== '666') {
            throw "toss은행 계좌가 아닙니다.";
        };
    
        await accountSql.receiveMoney(receiver, money);
        
         // 장우 - 110 - kb
        // 승도 - 666 - toss
        // 승우 - 031 - 
        // 새찬 - 108 - kakao
        // 지나 - 719 - deagu
        if(identify == '11') {
            sendBank = "k-bank";
        } else if(identify == '10') {
            sendBank = "kakao";
        } else if(identify == '71') {
            sendBank = "deague";
        } else if(identify == '66') {
            sendBank = 'toss'
        } else {
            throw "없는 은행입니다."
        }
        await accountSql.transactionInsert(sender, sendBank, receiver, "toss", money)

        res.status(201).json({
            msg : "OK",
            status: 201
        })
    } catch(e) {
        console.log(e);
        res.status(400).json({
            meg : e,
            status : 400
        })
    }
}

module.exports = receive;