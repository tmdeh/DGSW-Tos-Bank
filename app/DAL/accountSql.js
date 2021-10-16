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

exports.getSalt = async(sendAccountNumber) => {
    let sql = "SELECT salt FROM account WHERE account_number = ?;"
    let param = [sendAccountNumber];

    let result = await executeQuery.executePreparedStatement(sql, param);

    return result[0].salt
}

exports.accountUpdate = async(sendAccountNumber, receiveAccountNumber, money) => {
    let sql = "SELECT money FROM account WHERE account_number = ? OR account_number = ?";
    let param = [sendAccountNumber, receiveAccountNumber];

    let result = await executeQuery.executePreparedStatement(sql, param);
    
    if(isNaN(money)) { //보낼 돈이 숫자인지 아닌지
        throw "보낼 돈이 숫자가 아닙니다."
    }

    money = parseInt(money);

    if(result[0].money < money) { //금액 잔액 확인
        throw "계좌의 금액이 부족합니다."
    }

    
    const sender = result[0].money - money;
    const receiver = result[1].money + money;

    sql  = "UPDATE account SET money = ? WHERE account_number = ?";
    await executeQuery.executePreparedStatement(sql, [sender, sendAccountNumber]);
    await executeQuery.executePreparedStatement(sql, [receiver, receiveAccountNumber]);

    return;
}


exports.passwordCheck = async(sendAccountNumber, password) => {
    let sql = "SELECT * FROM account WHERE account_number = ? AND password = ?"
    let param = [sendAccountNumber, password];

    let result = await executeQuery.executePreparedStatement(sql, param);

    if(result.length == 0) {
        throw "비밀번호가 일치하지 않습니다.";
    }

    return;
}