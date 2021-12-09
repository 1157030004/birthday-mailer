const mysql = require("mysql2");
require("dotenv").config();
const { Sequelize } = require("sequelize");

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

pool.connect((err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Connected to database");
	}
});

// let sql = `SELECT * FROM bmka_jamaah`;

// pool.execute(sql, (err, result) => {
// 	if (err) {
// 		console.log("Error---->", err);
// 		return;
// 	}

// 	console.log("Result---->", result);
// });

module.exports = pool.promise();
