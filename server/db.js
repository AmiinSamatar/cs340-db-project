const mysql = require("mysql");

// Set up your database connection details
const db = mysql.createConnection({
	connectionLimit: 10,
	host: "classmysql.engr.oregonstate.edu",
	user: "cs340_amarem",
	password: "5097",
	database: "cs340_amarem",
});

// Connect to the database
db.connect((err) => {
	if (err) {
		console.error("Error connecting to the database", err);
		return;
	}
	console.log("Database connection established");
});

module.exports = db;
