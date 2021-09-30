var express = require('express');
var router = express.Router();
const auth = require('../service/user/auth/IssuingTokens')
// const userService = require('')
const upload = require('../middleware/fileload')
const signUp = require('../service/user/signUp')


router.post('/sign-up', upload.single('profile'), function(req, res, next) {
    const result = signUp(req);
    console.log(result);
    res.send(200);
});

router.post('/login', function(req, res, next) {
    console.log(req.body);
    res.send("aaaa");
});

router.post('/simple-login', (req, res, next) => {

})

module.exports = router;
