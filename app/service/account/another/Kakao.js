const request = require('request')
const accountList = require('../../../DAL/AccountList');

exports.getAccountInfo = (phoneNumber) => {
    const url = 'http://10.80.162.195:8000/communication/' + phoneNumber;
    
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) => {
            if(err || body == undefined || body == []) {
                return resolve({msg : "Kakao 은행 불러오기 실패", data : []});
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