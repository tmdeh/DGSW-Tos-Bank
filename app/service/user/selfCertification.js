const userSql = require('../../DAL/userSql');

exports.certification = (body, res) => {
    userSql.certification(body)
    .then((result) => {
        res.status(201).json(result);
    })
    .catch((e) => {
        res.status(401).json(e);
    })
}