var express = require('express');
var router = express.Router();
const upload = require('../middleware/fileload');
const signUp = require('../service/user/signUp');
const login = require('../service/user/login');
const duplicateCheck = require('../service/user/duplicateCheck');
const tokendecode = require('../middleware/token');


router.post('/sign-up', upload.single('profile'), function(req, res, next) {
    signUp.signUp(req.body, req.file, res)
});

router.post('/login', function(req, res, next) {
    login.login(req.body, res);
});

router.post('/simple-login', tokendecode, (req, res, next) => {
    let token = req.token;
    login.simpleLogin(res, req.body, token);
})

router.get('/duplicate-check/:id',(req, res, neext) => {
    duplicateCheck.check(req.params.id, res);
})

module.exports = router;
