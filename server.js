const { json } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const lgnQuery = require("./loginQuery");
const stndtQuery = require("./studentQuery");
const cors = require('cors')
const connection = mysql.createConnection({
    host: "sg1-ts6.a2hosting.com",
    database: "missio20_team3",
    user: "missio20_team3",
    password: "=BWEzH(R-(&A",
    port: 3306
});


app.use(bodyParser.json());
app.use(cors());

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
    
        const student = await lgnQuery.queryEmail(email,connection);
        
        console.log("this is the student " , student);

        if(student.length !== 0 ){
            res.status(400).send("error student already exists");
        } else{
            const salt = await bcrypt.genSalt(10);
            const ePassword = await bcrypt.hash(password, salt);
            connection.query(`INSERT INTO Student (Name,EMAIL,PASSWORD) VALUES ('${name}', '${email}', '${ePassword}')`);
            res.status(200).send("ok");
        }
    }
    catch (e) {
        res.status(500).send("error!" + e);
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        let encryptedPassword = await lgnQuery.queryPassword(email, connection);
        const equals = await bcrypt.compare(password, encryptedPassword);
        if (equals) {
            res.status(200).json("logged in!");
        } else {
            res.status(403).send("incorrect login!");        }
    } catch (e) {
        console.log(e);
    }


})

app.get("/student/:id", async (req,res) =>{
    const id = req.params.id;
    let student = await stndtQuery.queryStudent(id,connection);
    res.status(200).send(student);
})

app.listen(5000);