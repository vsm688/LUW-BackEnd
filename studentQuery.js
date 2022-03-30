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


module.exports = {
    queryStudent
}