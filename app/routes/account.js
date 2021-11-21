var express = require('express');
const decode = require('../middleware/tokenDecode');
const setAccount = require('../service/account/Set')
const Search = require('../service/account/Search');
const importMoney = require('../service/account/importMoney');
const getAccount = require('../service/account/getAccount');
const accountPWCheck = require('../service/account/passwordCheck');
const deagu = require('../service/account/another/daegu');
const kakao = require('../service/account/another/Kakao');
const kBank = require('../service/account/another/k-bank');
 
var router = express.Router();
router.get('/', decode, (req, res) => { //계좌 조회
    const userId = req.token.sub;
    Search.allBankSearch(userId, res)
})

router.post('/', decode, (req, res) => { //계좌 생성
    req.body.userId = req.token.sub;
    setAccount.create(req.body, res);
})

router.get('/add', decode, (req, res) => { //타은행 계좌 조회
    req.body.userId = req.token.sub;
    Search.add(req.body, res);
})

router.post('/confirm', decode, (req, res) => { //계좌 추가 확인
    req.body.userId = req.token.sub;
    setAccount.insert(req.body, res);
})

router.post('/money', decode, (req, res) => { //송금, 가져오기
    req.body.userId = req.token.sub;
    if(req.body.receiveBankName == 'toss') { //가져오기
        importMoney.get(req.body, res);
    }
    //송금
    else if(req.body.receiveBankName == 'kakao') {
        kakao.send(req.body, res);
    }
    else if(req.body.receiveBankName == 'deagu') {
        deagu.send(req.body, res);
    }
    else if(req.body.receiveBankName == 'k-bank') {
        kBank.send(req.body, res);
    }
    else {
        res.status(400).json({
            msg : "없는 은행 입니다.",
            status: 400
        })
    }
})

router.get('/account-number/:accountNumber', getAccount); //계좌 번호로 계좌 정보 가져오기


router.delete('/',)

router.get('/:phoneNumber', (req,res) => { //전화번호로 계좌리스트 가져오기
    const phoneNumber = req.params.phoneNumber;
    Search.forAnotherBank(phoneNumber, res);
})

router.post('/password-check', accountPWCheck); //비밀번호 확인

module.exports = router;