var express = require('express');
const decode = require('../middleware/tokenDecode');
const createAccount = require('../service/account/Create')
const Search = require('../service/account/Search');
var router = express.Router();


router.get('/', decode, (req, res) => { //계좌 조회
    const userId = req.token.sub;
    Search.tosBankSearch(userId, res)
})

router.post('/', decode, (req, res) => { //계좌 생성
    req.body.userId = req.token.sub;
    createAccount.create(req.body, res);
})

router.get('/add', (req, res) => { //타은행 계좌 조회

})

router.post('/send-money', (req, res) => { //송금, 가져오기

})

router.delete('/', (req, res) => { //계좌 삭제

})

module.exports = router;