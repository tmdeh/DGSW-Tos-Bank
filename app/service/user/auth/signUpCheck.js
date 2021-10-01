const pwCheck = require('./pwPatternCheck.js')


exports.signUpCheck = function(body) {


    // if(typeof body == "undefined" || body == null || body == "") {
    //     return({msg : "body가 비었습니다."});
    // }

    if(body.id.length < 3 || body.id.length > 12){
        return({msg : "아이디가 너무 길거나 짧습니다."});
    }

    if(!pwCheck.checkIdPattern(body.id)){
        return({msg : "아이디에 영문과 숫자가 포함되어야 합니다."});
    }

    if(body.password.length < 8 || body.password > 13) {
        return({msg : "비밀번호가 너무 짧거나 깁니다."});
    }
    
    if(pwCheck.checkSpace(body.password)) {
        return({msg : "비밀번호에는 공백이 없어야 합니다."});
    }

    if(pwCheck.checkPasswordPattern(body.password)) {
        return({msg : "비밀번호에는 영문 숫자 특수문자가 포함되어야 합니다"})
    }
    return {
        msg : "OK"
    }
}