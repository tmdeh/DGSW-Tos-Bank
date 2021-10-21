const executeQuery = require('../model/executeQuery');

exports.updateUser = async(body, file) => {
    let sql = 'UPDATE user SET birthday = ?, name = ?, nickname = ?, profile = ?, gender = ?, phone_number = ? WHERE id = ?;'
    let url = "images/user/" + file.filename; //유저 프로필 url

    let param = [body.birthday, body.name, body.nickname, url, body.gender, body.phoneNumber, body.userId];
    
    await executeQuery.executePreparedStatement(sql, param);

    sql = "SELECT id, birthday, name, nickname, profile, phone_number FROM user WHERE id = ?";

    let result = await executeQuery.executePreparedStatement(sql, [body.userId]);

    return result[0];
}

exports.searchUser = async(userId) => {
    let sql = "SELECT birthday, name, nickname, profile, gender, phone_number FROM user WHERE id = ?";
    let result = await executeQuery.executePreparedStatement(sql, [userId]);
    return result[0];
} 