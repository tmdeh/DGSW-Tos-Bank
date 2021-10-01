const mysql = require('mysql');

const pool = mysql.createConnection({
    connectTimeout:1000,
    host:'localhost',
    port:'3306',
    user:'root',
    password:'tmdeh3216',
    database : 'tosbank',
});

module.exports=pool;