const request = require('request')

exports.getAccount = (phoneNumber) => {
    const url = 'http://10.80.162.195:8000/communication/' + phoneNumber;
    
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) => {
            if(err) {
                reject("kakao 요청 오류")
            }
            
            body = JSON.parse(body);
            resolve(body);
        })
    })
}
