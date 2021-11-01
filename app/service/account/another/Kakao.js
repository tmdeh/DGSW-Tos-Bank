const request = require('request')

exports.getAccountInfo = (phoneNumber) => {
    const url = 'http://10.80.162.195:8000/communication/' + phoneNumber;
    
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) => {
            if(err || body == undefined || body == []) {
                reject({
                    msg : "kakao 요청오류",
                    data : err
                })
            }
            body = JSON.parse(body);
            let tmp = [];
            for(i in body) {
                tmp.push({
                    bankName : "kakao",
                    accountName : body[i].nickname,
                    accountNumber : body[i].accountNumber,
                    money : body[i].money
                })
            }
            resolve(tmp);
        })
    })
}

