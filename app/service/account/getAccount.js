const accountSql = require('../../DAL/AccountSql')

const getAccount = async(req, res) => {
    try {
        const accountNumber = req.params.accountNumber;
        let result = await accountSql.selectAccountNumber(accountNumber);
        if(result === undefined) {
            res.status(204).json({msg : "조회된 계좌가 없습니다."})
        }
        res.status(200).json({
            msg : "OK",
            data : {
                accountNumber : result.account_number,
                name : result.name
            }
        })
    } catch (e) {
        res.status(400)
    }
}

module.exports = getAccount;