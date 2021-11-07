const request = require('request')
const accountList = require('../../../DAL/AccountList');

exports.getAccountInfo = (phoneNumber) => {
    const url = 'http://10.80.161.192:8000/api/open/accounts/' + phoneNumber;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({msg : "KB 은행 불러오기 실패", data : []});
            return;
        }, 3000);
        request.get(url, (err, res, body) => {
            if(err || body == undefined || body == []) {
                resolve({msg : "KB 은행 불러오기 실패", data : []});
                return;
            }
            body = JSON.parse(body);
            let tmp = [];
            // console.log(body);
            for(let i =0; i < body.accounts.length; i++) {
                if(!body.accounts[i].account_nickname.Valid) {
                    tmp.push({
                        bankName : "K-Bank",
                        accountName : "KB 통장",
                        accountNumber : body.accounts[i].id,
                        money : body.accounts[i].balance,
                        password : body.accounts[i].password
                    })
                }
                else {
                    tmp.push({
                        bankName : "K-Bank",
                        accountName : body.accounts[i].account_nickname.String,
                        accountNumber : body.accounts[i].id,
                        money : body.accounts[i].balance,
                        password : body.accounts[i].password
                    })
                }
            }
            // console.log(tmp);
            resolve({msg : "OK", data : tmp});
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
