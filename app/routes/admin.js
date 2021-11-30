var express = require('express');
const passowrd = require('../secret/admin')
var router = express.Router();


router.post('/', (req, res) => {
    if(req.body.password == passowrd.password) {
        res.status(200).json({
            msg : "OK",
            status : 200
        })
    } else {
        res.status(400).json({
            msg : "실패",
            status : 400
        })
    }
})



module.exports = router;