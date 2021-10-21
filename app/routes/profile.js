var express = require('express'); 
var router = express.Router();
const upload = require('../middleware/fileload');
const tokendecode = require('../middleware/tokenDecode');
const profile = require('../service/profile/Profile');

router.put('/', tokendecode, upload.single('profile'), (req, res) => {
    req.body.userId = req.token.sub;
    profile.update(req.body, res, req.file);
})
    

router.get('/', tokendecode, (req, res) => {
    req.body.userId = req.token.sub;
    profile.get(req.body, res);
})



module.exports = router;