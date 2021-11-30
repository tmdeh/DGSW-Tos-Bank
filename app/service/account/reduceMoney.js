const accountSql = require('../../DAL/AccountSql')

const reduceMoney = async(accountNumber, money) => {
    money = -(parseInt(money));
    return await accountSql.receiveMoney(accountNumber, money);
}

module.exports = reduceMoney;