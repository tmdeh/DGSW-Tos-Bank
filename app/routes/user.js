var express = require('express');
var router = express.Router();
const auth = require('../service/user/auth/IssuingTokens')
// const userService = require('')
const upload = require('../middleware/fileload')
const signUp = require('../service/user/signUp')
const duplicateCheck = require('../service/user/duplicateCheck')


router.post('/sign-up', upload.single('profile'), function(req, res, next) {
    signUp.signUp(req.body, req.file, res)
});

router.post('/login', function(req, res, next) {
    console.log(req.body);
});

router.post('/simple-login', (req, res, next) => {

})

router.get('/duplicate-check/:id', (req, res, neext) => {
    duplicateCheck.check(req.params.id, res);
})

module.exports = router;
