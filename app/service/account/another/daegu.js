const request = require('request');
const accountList = require('../../../DAL/AccountList');
exports.getAccountInfo = (phoneNumber) => {
    const url = 'http://10.80.163.17:8000/account/find/' + phoneNumber;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({msg : "daegu 은행 불러오기 실패", data : []});
            return;
        }, 3000);
        request.get(url, (err, res, body) => {
            if(body == undefined) {
                resolve({msg : "daegu 은행 불러오기 실패", data : []});
                return;
            }
            body = JSON.parse(body);
            if(err || body.status == 400 || body == undefined) {
                resolve({msg : "daegu 은행 불러오기 실패", data : []});
                return;
            }
            if(body.status == 404) {
                resolve({msg : "daegu 은행 검색 결과가 없습니다.", data : []})
                return
            }
            console.log(body.status)
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

exports.accountExistCheck = (accountNumber) => {
    
}

exports.getConfirmedAccounts = async(userId, phoneNumber) => {
    let accounts = await this.getAccountInfo(phoneNumber);
    // console.log(accounts);
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
exports.send = (body, res) => {

}