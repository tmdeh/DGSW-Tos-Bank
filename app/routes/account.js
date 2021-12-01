var express = require('express');
const decode = require('../middleware/tokenDecode');
const setAccount = require('../service/account/Set')
const Search = require('../service/account/Search');
const importMoney = require('../service/account/importMoney');
const getAccount = require('../service/account/getAccount');
const accountPWCheck = require('../service/account/passwordCheck');
const receive = require('../service/account/receive');
const send = require('../service/account/send')
const deagu = require('../service/account/another/daegu');
const kakao = require('../service/account/another/Kakao');
const kBank = require('../service/account/another/k-bank');

const exist = require('../service/account/exist');
const passwordCheck = require('../service/account/accountPwCheck');
const reduceMoney = require('../service/account/reduceMoney');
const accountSql = require('../DAL/AccountSql');
 
var router = express.Router();
router.get('/', decode, (req, res) => { //계좌 조회
    // console.log(req.headers);
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

router.post('/money', decode, async(req, res) => { //송금, 가져오기
    req.body.userId = req.token.sub;
    const sendBankName = req.body.sendBankName;
    const receiveBankName = req.body.receiveBankName;
    const sendAccountNumber = req.body.sendAccountNumber;
    const receiveAccountNumber = req.body.receiveAccountNumber;
    const reqPassword = req.body.password
    const money = req.body.money;
    try {
        let result = {};
        if(sendBankName == 'toss') { //toss => 타은행
            await passwordCheck(sendAccountNumber, reqPassword); //비밀번호 확인
            if(receiveBankName == 'toss') { //가져오기
                result = await importMoney.get(req.body);
            }
            else if(receiveBankName == 'kakao') {
                //toss => kakao
                let commission = await reduceMoney(sendAccountNumber, money);
                result = await kakao.send(sendAccountNumber, receiveAccountNumber, money);
                result.commission = commission;
            }
            else if(receiveBankName == 'deagu') {
                //toss => deagu
                let commission = await reduceMoney(sendAccountNumber, money);
                result = await deagu.send(sendAccountNumber, receiveAccountNumber, money);
                result.commission = commission;
            }
            else if(receiveBankName == 'k-bank') {
                //toss => k-bank
                let commission = await reduceMoney(sendAccountNumber, money);
                result = await kBank.send(sendAccountNumber, receiveAccountNumber, money);
                result.commission = commission;
            } else {
                throw {
                    msg : "없는 은행입니다.",
                    status: 400
                }
            }
        } else if(sendBankName == "kakao") {
            
        } else if(sendBankName == "deague") {
            //deagu => kakao
            //대구 은행에 request할 때 비밀번호 필요e
    
        } else if(sendBankName == "k-bank") {
    
        }
        else {
            throw {
                msg : "없는 은행입니다",
                status: 400
            }
        }
        // sender, sendBank, receiver, receiveBank, money
        await accountSql.transactionInsert(sendAccountNumber, "toss", receiveAccountNumber, receiveBankName, money);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})

router.get('/account-number/:accountNumber', getAccount); //계좌 번호로 계좌 정보 가져오기


router.get('/:phoneNumber', (req,res) => { //전화번호로 계좌리스트 가져오기
    const phoneNumber = req.params.phoneNumber;
    Search.forAnotherBank(phoneNumber, res);
})

router.post('/receive', receive); //송금 받기

router.post('/send', send.send);

router.post('/password-check', accountPWCheck); //비밀번호 확인

router.get('/exist/:accountNumber', exist);

module.exports = router;