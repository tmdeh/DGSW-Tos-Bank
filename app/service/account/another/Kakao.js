const request = require('request')
const accountList = require('../../../DAL/AccountList');
const accountSql = require('../../../DAL/AccountSql');

exports.getAccountInfo = (phoneNumber) => {
    const url = 'http://10.80.162.195:8000/communication/' + phoneNumber;
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({msg : "Kakao 은행 불러오기 실패", data : []});
            return;
        }, 3000);
        request.get(url, (err, res, body) => {
            if(err || body == undefined || body == []) {
                resolve({msg : "Kakao 은행 불러오기 실패", data : []});
                return;
            }
            let result = {msg : "OK"};
            let data = [];
            body = JSON.parse(body);
            for(i in body) {
                data.push({
                    bankName : "kakao",
                    accountName : body[i].nickname,
                    accountNumber : body[i].accountNumber,
                    money : body[i].money,
                    password : body[i].password
                })
            }
            result.data = data;
            resolve(result);
        })
    })
}

exports.accountExistCheck = (accountnUmber) => {
    const url = 'http://10.80.162.195:8000/communication/check/accountNum/' + accountnUmber;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({msg : "Kakao 은행 불러오기 실패", data : [], status: 400});
            return;
        }, 3000);
        request.get(url, (err, res, body) => {
            if(body == undefined) {
                reject({msg : "Kakao 은행 불러오기 실패", data : [], satus: 400});
                return;
            }
            body = JSON.parse(body);
            // console.log(body);
            if( body.message == '존재하지 않는 계좌') {
                resolve({msg : "존재하지 않는 계좌", status:404});
                return;
            }
            else if(body.message == '사용 가능') {
                resolve({msg : "OK", status:200});
                return;
            }
        })
    })
}

exports.getConfirmedAccounts = async(userId, phoneNumber) => {
    let accounts = await this.getAccountInfo(phoneNumber);
    if(accounts.data.length == 0) {
        console.log(accounts.msg);
        return accounts.data;
    }
    let result = await accountList.getAccount(userId);
    let tmp = [];
    
    for(i of result) {
        for(j of accounts.data) {
            if(i.account === Number(j.accountNumber)) {
                tmp.push(j)
            }
        }
    }
    return tmp;
};

exports.send = async(body, res) => {
    //1. 있는 계좌인지 확인하기
    //2. 계좌 비밀번호 확인하기
    //3. 송금하기
    try {
        if(body.sendBankName === "toss") {
            
        } else if(body.sendBankName === "kakao") {

        } else if(body.sendBankName === "deagu") {
    
        } else if(body.sendBankName === "k-bank") {
    
        } else {
            throw "없는 은행입니다.";
        }
    } catch(e) {
        res.status(400).json({
            msg : e,
            status: 400
        })
    }
}