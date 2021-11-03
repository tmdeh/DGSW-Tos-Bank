const request = require('request')
const accountList = require('../../../DAL/AccountList');

exports.getAccountInfo = (phoneNumber) => {
    const url = 'http://10.80.161.192:8000/api/open/accounts/' + phoneNumber;
    
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) => {
            if(err || body == undefined || body == []) {
                return resolve({msg : "KB 은행 불러오기 실패", data : []});
            }
            body = JSON.parse(body);
            let tmp = [];
            for(i in body) {
                if(!body[i].AccountNickname.Valid) {
                    tmp.push({
                        bankName : "K-Bank",
                        accountName : "KB 통장",
                        accountNumber : body[i].ID,
                        money : body[i].Balance,
                        password : body[i].Password
                    })
                }
                else {
                    tmp.push({
                        bankName : "K-Bank",
                        accountName : body[i].AccountNickname.String,
                        accountNumber : body[i].ID,
                        money : body[i].Balance,
                        password : body[i].Password
                    })
                }
            }
            resolve(tmp);
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
