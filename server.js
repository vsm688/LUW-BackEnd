const { json } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const lgnQuery = require("./loginQuery");
const stndtQuery = require("./studentQuery");
const dotenv = require("dotenv").config();
const cors = require('cors')
const PrjctQuery = require("./ProjectQuery");
const connection = mysql.createConnection({
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    user: "missio20_team3",
    password: process.env.DBPASSWORD,
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

// Grabs student information based on ID

app.get("/student/:id", async (req,res) =>{
    const id = req.params.id;
    let student = await stndtQuery.queryStudent(id,connection);
    res.status(200).send(student);
})

// Grabs Instructions page information from backend.

app.get("/instructions",async (req,res) =>{
    let code = await stndtQuery.queryInstructions(connection);
    let newcode = JSON.stringify(code);
    res.status(200).send(newcode);
})

// Grabs Projects page information from backend.

app.post("/projects", async (req,res) =>{
    const finalArr = await PrjctQuery.ConstructQueryString(connection,req.body);
    console.log(finalArr.length);
    res.status(200).send(finalArr);
})


app.listen(5000);