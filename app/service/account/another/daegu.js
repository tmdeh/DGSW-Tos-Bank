const request = require('request');
const accountList = require('../../../DAL/AccountList');
exports.getAccountInfo = (phoneNumber) => {
    const url = 'http://10.80.163.17:8000/account/find/' + phoneNumber;
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) => {
            if(err || body.status == 400 || body == undefined) {
                return resolve({msg : "daegu 은행 불러오기 실패", data : []});
            }
            body = JSON.parse(body);
            let result = {msg : "OK"};
            let data = [];
            for(i in body.data.account) {
                data.push({
                    bankName : "daegu",
                    accountName : body.data.account[i].name,
                    accountNumber : body.data.account[i].accountNum,
                    money : body.data.account[i].pay,
                    password : body.data.account[i].password
                });
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