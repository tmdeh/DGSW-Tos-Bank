const mysql = require('mysql');

var pool = mysql.createConnection({
    connectTimeout:10,
    host:'localhost',
    port:'3306',
    user:'root',
    password:'tmdeh3216',
    database : 'tosbank'
});

module.exports=pool;