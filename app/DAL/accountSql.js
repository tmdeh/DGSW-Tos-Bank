const executeQuery = require('../model/executeQuery');
const accountNumber = require('../service/account/accountNumber');

exports.insertAccount = async(body) => {
    while(true) {
        number = accountNumber.createAccount();
    
        let result = await executeQuery.executePreparedStatement("SELECT * FROM account WHERE account_number = ?", [number]);
        if(result.length == 0) {
            break;
        }
    }
    let sql = "INSERT INTO account(user_fk, name, password, money, salt, account_number) values(?,?,?,?,?,?)";
    let param = [body.userPk, body.name, body.password.password, 10000, body.password.salt, number];
    await executeQuery.executePreparedStatement(sql, param);
}

exports.selectUserPk = async(userId) => {
    let sql = "SELECT user_pk FROM user WHERE id = ?";
    let result = await executeQuery.executePreparedStatement(sql, [userId]);

    return result[0].user_pk;
}

exports.selectAccount = async(userId) => {
    let sql = "SELECT * FROM account WHERE user_fk = (SELECT user_pk FROM user WHERE id = ?);";
    let result = await executeQuery.executePreparedStatement(sql, [userId]);
    return result;
}