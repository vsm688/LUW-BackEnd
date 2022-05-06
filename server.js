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
const connection = require("./config/db");

const userRoute = require("./routes/User");
app.use("/student", userRoute);

app.use(bodyParser.json());
app.use(cors());

// Grabs student information based on ID

app.get("/student/:id", async (req,res) =>{
    const id = req.params.id;
    let student = await stndtQuery.queryStudent(id,connection);
 
  
    let teacherName = await stndtQuery.queryTeacherName(id,connection);
    student.TeacherName = teacherName.TeacherName;
    
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
    res.status(200).send(finalArr);
})


app.listen(5000);