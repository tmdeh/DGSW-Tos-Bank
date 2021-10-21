const mysql = require('mysql2');


var pool = {
    host:'localhost',
    port:'3306',
    user:'root',
    password:'tmdeh3216',
    database : 'tosbank',
    connectionLimit : 20,
    queueLimit: 0,
};

module.exports=pool;