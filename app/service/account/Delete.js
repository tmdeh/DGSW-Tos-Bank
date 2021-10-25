const accountSql = require('../../DAL/AccountSql')



exports.delete = (req, res) => {
    accountSql.delete(req.body.accountNumber);
} 