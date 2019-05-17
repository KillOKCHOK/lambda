var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'utopiadb.cqohiovhe2ls.us-east-2.rds.amazonaws.com',
    user     : 'root',
    password : 'root1234',
    database : 'utopiadb'
});

module.exports = connection;