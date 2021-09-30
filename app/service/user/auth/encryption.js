const encryption = (body) => { //암호화
    return new Promise((resolve, reject) => {
        resolve(crypto.createHash('sha512').update(body.password).digest('base64'));
    })
}



module.exports = {
    encryption : encryption
}