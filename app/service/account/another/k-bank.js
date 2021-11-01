const request = require('request')

exports.getAccountInfo = (phoneNumber) => {
    const url = 'http://10.80.161.192:8000/api/open/accounts/' + phoneNumber;
    
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) => {
            if(err || body == undefined || body == []) {
                reject({
                    msg : "k-bank 요청오류",
                    data : err
                })
            }
            body = JSON.parse(body);
            let tmp = [];
            for(i in body) {
                if(!body[i].AccountNickname.Valid) {
                    tmp.push({
                        bankName : "K-Bank",
                        accountName : "KB 통장",
                        accountNumber : body[i].ID,
                        money : body[i].Balance
                    })
                }
                else {
                    tmp.push({
                        bankName : "K-Bank",
                        accountName : body[i].AccountNickname.String,
                        accountNumber : body[i].ID,
                        money : body[i].Balance
                    })
                }
            }
            resolve(tmp);


        //     "ID": "110513388530",
        // "BankID": "110",
        // "UserID": "kjw2262",
        // "Password": "$2a$10$KVYY5vMYXyvPZf5j2BPZG.nhmd1oKOHKZ.cPNN1KbZhXHS2azFeL2",
        // "AccountNickname": {
        //     "String": "됐냐?",
        //     "Valid": true
        // },
        // "Balance": 10000,
        // "CreatedAt": "2021-10-30T19:13:12.542Z",
        // "State": "normal",
        // "Limit": 10000,
        // "History": null
        })
    })
}

