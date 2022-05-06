const mysql = require("mysql2");

const db = mysql.createConnection({    
host: process.env.DBHOST,
database: process.env.DBNAME,
user: "missio20_team3",
password: process.env.DBPASSWORD,
port: 3306
});

module.exports = db;