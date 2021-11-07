const userSql = require('../../DAL/UserSql');

exports.certification = async(body, res) => {
    try {
        await userSql.certification(body)
        res.status(201).json({
            msg : "OK"
        });
    }catch (e) {
        res.status(400).json({
            msg : e
        });
    }
}