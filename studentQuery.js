

// Grabs student information based on if their ID equals the specified ID
const queryStudent = (id,connection) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM Student WHERE StudentID = '${id}'`, (err, result) => {
            if (err) {
                console.log("query doesnt work")
                return reject(err)
            }
            else {
                console.log("query made")
                return resolve(result[0]);
                

            }
        });
    });

};

const queryInstructions = (connection) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM Project WHERE ProjectID = "1"`, (err, result) => {
            if (err) {
                console.log("query doesnt work")
                return reject(err)
            }
            else {
                console.log("query made")
               
                return resolve(result[0].Instructions.toString());
                

            }
        });
    });

};


module.exports = {
    queryStudent,
    queryInstructions
}