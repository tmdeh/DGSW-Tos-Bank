const crypto = require('crypto');



function checkSpace(str) {
	if(str.search(/\s/) != -1) {
		return true;
	} else {
		return false;
	}
}

// 특수 문자가 있나 없나 체크
function checkSpecial(str) {
	var special_pattern = /[`~!@#$%^&*.|\\\'\";:\/?]/gi;

	if(special_pattern.test(str) == true) {
		return true;
	} else {
		return false;
	}
}

// 비밀번호 패턴 체크 (8자 이상, 문자, 숫자, 특수문자 포함여부 체크)
function checkPasswordPattern(str) {
	var pattern1 = /[0-9]/;				// 숫자
	var pattern2 = /[a-zA-Z]/;			// 문자
	var pattern3 = /[~!@#$%^&*()_+|<>?:{}.]/;	// 특수문자

	if(!pattern1.test(str) || !pattern2.test(str) || !pattern3.test(str)) {
		// alert("비밀번호는 8자리 이상 문자, 숫자, 특수문자로 구성하여야 합니다.");
		return true;
	} else {
		return false;
	}

}
//아이디 숫자 문자 포함 체크
function checkIdPattern(str) {
	var pattern1 = /[0-9]/;				// 숫자
	var pattern2 = /[a-zA-Z]/;			// 문자

	if(!pattern1.test(str) || !pattern2.test(str)) {
		// alert("비밀번호는 8자리 이상 문자, 숫자, 특수문자로 구성하여야 합니다.");
		return false;
	} else {
		return true;
	}

}


module.exports = {
    checkSpace : checkSpace,
    checkPasswordPattern : checkPasswordPattern,
    checkIdPattern : checkIdPattern
   // checkSpecial : checkSpecial
}