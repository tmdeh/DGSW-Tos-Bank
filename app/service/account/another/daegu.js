const request = require('request');
const accountList = require('../../../DAL/AccountList');
exports.getAccountInfo = (phoneNumber) => {
    const url = 'http://10.80.163.17:8000/account/find/phone/' + phoneNumber;
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
            let result = {msg : "OK"};
            let data = [];
            for(i in body.data) {
                data.push({
                    bankName : "daegu",
                    accountName : body.data[i].name,
                    accountNumber : body.data[i].accountNum,
                    money : body.data[i].pay,
                    password : body.data[i].password
                });
            }
            result.data = data;
            resolve(result);
        })
    })
}

exports.accountExistCheck = (accountNumber) => {
    const url = 'http://10.80.163.17:8000/account/find/account/' + accountNumber;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({msg : "daegu 은행 불러오기 실패", status:400});
            return;
        }, 3000);
        request.get(url, (err, res, body) => {
            if(body == undefined) {
                resolve({msg : "daegu 은행 불러오기 실패", status:400});
                return;
            }
            body = JSON.parse(body);
            // console.log(body);

            if(body.status == 200) {
                resolve({msg : "OK", status:200});
                return;
            } else if(body.status == 404) {
                resolve({msg : "존재하지 않는 계좌", status:400});
                return;
            } else {
                resolve({msg : "deagu 은행 오류"})
                return;
            }
        })
    })
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
exports.send = (sendAccountNumber, receiveAccountNumber, money) => {
    const option = {
        uri : "http://10.80.163.17:8000/account/transacation/receive",
        method: 'POST',
        form : {
            sendAccountNum : sendAccountNumber,
            receiveAccountNum : receiveAccountNumber,
            receivePay : money
        }
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject({msg : "daegu 은행 불러오기 실패", status:400});
            return;
        }, 3000);
        request.post(option, (err, res, body) => {
            if(body == undefined) {
                reject({msg : "daegu 은행 불러오기 실패", status:400});
                return;
            }
            body = JSON.parse(body);
            // console.log(body);

            if(body.status == 200) {
                resolve({msg : "OK", status:200});
                return;
            } else if(body.status == 404) {
                reject({msg : "존재하지 않는 계좌", status:400});
                return;
            } else {
                reject({msg : "deagu 은행 오류"})
                return;
            }
        })


    })
}