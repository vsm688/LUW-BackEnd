const mysql = require("mysql2");


// const db = mysql.createConnection({
//     host: 'localhost',
//     database: 'LoginSystem',
//     user: 'root',
//     password: 'S#93Browser',
// });

// const db = mysql.createConnection({
//     host: 'sg1-ts6.a2hosting.com',
//     database: '`missio20_team3`',
//     user: 'missio20_team3',
//     password: '=BWEzH(R-(&A',
// });

const db = mysql.createConnection({    
host: process.env.DBHOST,
database: process.env.DBNAME,
user: "missio20_team3",
password: process.env.DBPASSWORD,
port: 3306
});

module.exports = db;