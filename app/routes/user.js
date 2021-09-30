var express = require('express');
var router = express.Router();
const auth = require('../service/user/auth/IssuingTokens')
// const userService = require('')
const upload = require('../middleware/fileload')
const signUp = require('../service/user/signUp')


router.post('/sign-up', upload.single('profile'), function(req, res, next) {
    console.log()
    let result = signUp.signUp(req.body, req.file)
    if(result !== "OK") {
        res.status(401).send(result);
    }
    else {
        res.status(201).send(result);
    }
});

router.post('/login', function(req, res, next) {
    console.log(req.body);
});

router.post('/simple-login', (req, res, next) => {

})

module.exports = router;
