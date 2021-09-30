const pwCheck = require('./pwPatternCheck.js')

const signUpCheck = (id, password) => {
    return new Promise((resolve, reject) => {
        if(id.length < 3 || id.length > 12){
            reject(new Error("아이디가 너무 짧거나 깁니다."));
        }

        if(pwCheck.checkIdPattern(id)){
            reject(new Error("아이디에는 영어와 숫자가 포함 되어야 합니다."));
        }

        if(password.length < 8 || password > 13) {
            reject(new Error("비밀번호가 너무 길거나 짧습니다."));
        }
        
        if(pwCheck.checkSpace(password)) {
            reject(new Error("공백이 없어야 합니다."));
        }

        if(pwCheck.checkPasswordPattern(password)) {
            reject(new Error("특수 문자를 포함해야 합니다."))
        }

        resolve();
    })
}

module.exports = {
    signUpCheck : signUpCheck
}