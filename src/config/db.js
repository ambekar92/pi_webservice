// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'postgres',
//   host: '172.16.16.161',
//   database: 'postgres',
//   password: 'root',
//   port: 5432,
//   timezone: 'utc'
// })

var mysql = require('mysql');
const con = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin'
});


module.exports = con;

