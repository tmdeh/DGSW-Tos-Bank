const executeQuery = require('../model/executeQuery');

exports.getAccount = async(account) => {
    let sql = `SELECT account FROM account_list WHERE id = ?`;
    let param = [account];

    return await executeQuery.executePreparedStatement(sql, param);
}

exports.insertList = async(body) => { //계좌 리스트에 추가
    let sql = "INSERT INTO account_list(account, id, password) values";
    let param = [];
    for(let i = 0; i< body.length; i++) {
        sql += "(?,?,?), ";
        param.push(body[i].accountNumber);
        param.push(body.userId);
        param.push(body[i].password);
    }
    sql = sql.substring(0, sql.length-2);

    await executeQuery.executePreparedStatement(sql, param);
}

exports.insertListNew = async(userId, number, password) => {
    let sql = "INSERT INTO account_list(account, id, password) values(?,?,?)";
    let param = [number, userId, password];
    await executeQuery.executePreparedStatement(sql, param);
}