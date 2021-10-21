const executeQuery = require('../model/executeQuery');
const accountNumber = require('../service/account/AccountNumber');

exports.insertAccount = async(body) => {
    while(true) {
        number = accountNumber.createAccount();
    
        let result = await executeQuery.executePreparedStatement("SELECT * FROM account WHERE account_number = ?", [number]); //중복 제거
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

exports.transactionInsert = async(body) => {
    let sql = "SELECT user_fk FROM account WHERE account_number = ? OR account_number = ?" ;
    let param = [body.sendAccountNumber, body.receiveAccountNumber];

    let result = await executeQuery.executePreparedStatement(sql, param);

    let sender = result[0].user_fk;
    let receiver = result[1].user_fk;

    sql = "INSERT INTO transaction(receiver, sender, money, sender_bank, receiver_bank) VALUES(?,?,?,'toss','toss)";
    param = [receiver, sender, body.money];

    await executeQuery.executePreparedStatement(sql, param);
}

exports.isExistAccount = async(sendAccountNumber, receiveAccountNumber) => {
    let sql = "SELECT * FROM account WHERE account_number = ?";
    let param = [sendAccountNumber];

    let result_1 = await executeQuery.executePreparedStatement(sql, param);

    if(result_1.length == 0) {
        throw "sender의 계좌가 존재하지 않습니다.";
    }

    sql = "SELECT * FROM account WHERE account_number = ?";
    param = [receiveAccountNumber];

    let result_2 = await executeQuery.executePreparedStatement(sql, param);

    if(result_2.length == 0) {
        throw "receiver의 계좌가 존재하지 않습니다.";
    }
}
