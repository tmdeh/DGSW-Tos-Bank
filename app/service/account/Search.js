const accountSql = require('../../DAL/accountSql');
const userSql = require('../../DAL/UserSql')
const kakao = require('./Kakao');

exports.tossBankSearch = async(userId, res) => {
    try {
        let query = await accountSql.selectAccount(userId);
        let result = [];
        for(i in query) {
            let tmp = {};
            tmp.bankName = "toss";
            tmp.accountName = query[i].name;
            tmp.accountNumber = query[i].account_number;
            tmp.money = query[i].money;
            result[i] = tmp; 
        }
        res.status(200).json({
            msg : "OK",
            data : result
        })
    } catch(e) {
        res.status(400).json({
            msg : "error"
        })
    }
}

exports.forAnotherBank = async(phoneNumber, res) => {
    try {
        let result = await accountSql.selectPhoneNumber(phoneNumber);
        if(result.length == 0) {
            res.status(200).json({
                msg : "정보가 없습니다."
            })
            return;
        }
        let array = [];
        for(i in result) {
            let tmp = {};
            tmp.name = result[i].name;
            tmp.money = result[i].money;
            tmp.accountNumber = result[i].account_number;

            array[i] = tmp;
        }

        res.status(200).json(array)
    }catch (e) {
        res.status(400).json({
            msg : e
        })
    }
}

exports.add = async(body, res) => {
    try {
        let phoneNumber = await userSql.getId(body.userId);
        kakao.getAccount(phoneNumber)
        .then((result) => {
            res.status(200).json(result);
        }).catch((e) => {
            console.log(e);
            res.status(400).json({
                msg : e
            })
        })
    } catch (e) {
        res.status(400).json({
            msg : e
        })
    }
}