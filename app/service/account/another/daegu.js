const request = require('request');

exports.getAccountInfo = (phoneNumber) => {
    const url = 'http://10.80.163.17:8000/account/find/' + phoneNumber;
    
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) => {
            if(err || body.status == 400) {
                reject("daegu 요청 오류")
            }
            body = JSON.parse(body);

            let tmp = [];
            for(i in body.data.account) {
                tmp.push({
                    bankName : "daegu",
                    accountName : body.data.account[i].name,
                    accountNumber : body.data.account[i].accountNum,
                    money : body.data.account[i].pay
                });
            }
            resolve(tmp);
        })
    })
}

exports.getConfirmedAccounts = async(suserId, phoneNumber) => {
    let accoounts = await this.getAccountInfo(phoneNumber);
    console.log(accoounts);
}