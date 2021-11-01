const accountSql = require('../../DAL/accountSql');
const userSql = require('../../DAL/UserSql')
const kakao = require('./another/Kakao');
const daegu = require('./another/daegu');
const kBank = require('./another/k-bank');


exports.allBankSearch = async(userId, res) => {
    try {
        let result = [];
        let phoneNumber = await userSql.getWithId(userId);
        let tossAccounts = await tossBankSearch(userId);
        // let daeguAccounts = await daegu.getConfirmedAccounts(userId,phoneNumber);

        result = createAccountsArr(tossAccounts, result)
        // kakaoResult = await kakaoBankSearch(userId, phoneNumber);
        res.status(200).json({
            msg : "OK",
            result
        })
    } catch(e) {
        res.status(400).json({
            msg : e
        })
    }
    
}

exports.allBankSearchtest = async(userId, res) => {
    try {
        let phoneNumber = await userSql.getWithId(userId);
        tossResult = await tossBankSearch(userId);
        kakaoResult = await kakaoBankSearch(userId, phoneNumber);
        res.status(200).json({
            msg : "OK",
            tossResult
        })
    } catch(e) {
        res.status(400).json({
            msg : e
        })
    }
    
}

const tossBankSearch = async(userId) => {
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
    return result;
}

const kakaoBankSearch = async(userId, phoneNumber) => {
    let kakaoResult = await kakao.getAccountInfo(phoneNumber);
    
}

const daeguBankSearch = async(userId) => {

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
        let phoneNumber = await userSql.getWithId(body.userId);
        let deaguAccouts = await daegu.getAccountInfo(phoneNumber);
        let kBankAccounts = await kBank.getAccountInfo(phoneNumber);
        let kakaoAccounts = await kakao.getAccountInfo(phoneNumber)
        let result = [];
        result = createAccountsArr(deaguAccouts, result);
        result = createAccountsArr(kBankAccounts, result);
        result = createAccountsArr(kakaoAccounts, result);

        res.status(200).json(result)
    } catch (e) {
        res.status(400).json({
            msg : e
        })
    }
}

const createAccountsArr = (Accounts, result) => {
    for(i in Accounts) {
        result.push(Accounts[i]);
    }
    return result
}