var mysql = require('mysql');
var config = require("../config");
db = config.database;

var pool      =    mysql.   createPool({
    connectionLimit : 30,
    host     : 'localhost',
    port     : 3306,
    user     : db.user,
    password : db.password,
    database : 'jayesh',
    debug    :  false
});
module.exports = pool;

setInterval(keepalive, 28800); // default timeout

function keepalive() {
  pool._freeConnections.forEach((connection) => pool.acquireConnection(connection,function () {
    connection.query('SELECT 1 + 1 AS solution', function (err) {
      if (err) {
        console.log(err.code); // 'ER_BAD_DB_ERROR'
      }
      console.log('Keepalive RDS connection pool using connection id', connection.threadId);
    })
  }));
}