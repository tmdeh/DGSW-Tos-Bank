var express = require('express');
var router = express.Router();
const secret = require('../secret/primary');



router.post('/login', (req, res, next) => {
    if(req.body.password == secret.managerPassword){
        res.redirect('http:localhost:3000/main');
    }
    else {
        res.redirect('http:localhost:3000/');
    }
})
module.exports = router;