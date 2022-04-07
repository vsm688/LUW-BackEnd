const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 4000;

const db = mysql.createConnection({
    host: "sg1-ts6.a2hosting.com",
    user: "missio20_team3",
    password: "=BWEzH(R-(&A",
    database: "missio20_team3"
})



app.get('/TeacherProfile/:id', function(request, response) {
    console.log('received a get request');
    const id = request.params.id;
    
    
    db.query(`SELECT * FROM missio20_team3.Teacher WHERE TeacherID = "${id}";`, function(error, result) {
        if(error) {
            
            response.send('you got an error' + error.code);
        }
        else(result)
            response.send(result);
            console.log(result);
    })
    
    

})
console.log("server running at port", PORT)
app.listen(PORT);



