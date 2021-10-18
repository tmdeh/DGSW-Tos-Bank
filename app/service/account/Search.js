const accountSql = require('../../DAL/accountSql');

exports.tosBankSearch = async(userId, res) => {
    try {
        let query = await accountSql.selectAccount(userId);
        let result = [];
        // console.log(query);
        for(i in query) {
            let tmp = {};
            tmp.bankName = "toss";
            tmp.accountNumber = query[i].account_number;
            tmp.money = query[i].money;
            result[i] = tmp; 
        }
    
        res.status(200).json({
            msg : "OK",
            data : result
        })
    } catch(e) {
        res.status(400).json({
            msg : "error"
        })
    }
}