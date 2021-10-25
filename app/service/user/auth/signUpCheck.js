const pwCheck = require('./PwPatternCheck.js')
const userSql = require('../../../DAL/UserSql')

exports.signUpCheck = function(body) {
        
    if(body == undefined || body == null || body === "") {
        throw "body가 비었습니다.";
    }

    if(body.id == undefined || body.id.length < 3 || body.id.length > 12){
        throw "아이디가 너무 길거나 짧습니다.";
    }

    if(!pwCheck.checkIdPattern(body.id)){
        throw "아이디에 영문과 숫자가 포함되어야 합니다.";
    }

    if(pwCheck.checkSpace(body.password)) {
        throw "비밀번호에는 공백이 없어야 합니다.";
    }
    
    if(pwCheck.checkPasswordPattern(body.password)) {
        throw "비밀번호에는 영문 숫자 특수문자가 포함되어야 합니다";
    }

    if(body.id == undefined || body.password.length < 8 || body.password > 13) {
        throw "비밀번호가 너무 짧거나 깁니다.";
    }
    if(body.simplePassword == undefined || body.simplePassword.length < 5 || body.simplePassword.length > 7) {
        throw "간단 비밀번호가 너무 짧거나 깁니다."
    }
    
}

exports.phoneNumberDuplicateCHeck = async(phoneNumber) => {
   let result = await userSql.getPhoneNumber(phoneNumber);
   if(result.length > 0) {
       throw "전화번호가 중복 되었습니다."
   }
}