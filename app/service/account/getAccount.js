const accountSql = require('../../DAL/AccountSql')

const getAccount = async(req, res) => {
    try {
        const accountNumber = req.params.accountNumber;
        let result = await accountSql.selectAccountNumber(accountNumber);
        if(result === undefined) {
            throw "해당하는 계좌가 없습니다."
        }
        res.status(200).json({
            msg : "OK",
            status: 200,
            data : {
                accountNumber : result.account_number,
                name : result.name
            }
        })
    } catch (e) {
        res.status(400).json({
            msg: e,
            status: 400,
            data : {}
        })
    }
}

module.exports = getAccount;