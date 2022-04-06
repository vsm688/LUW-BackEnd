const queryPassword = (email,connection) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM Student WHERE EMAIL = '${email}'`, (err, result) => {
            if (err) {
                return reject(err)
            }
            else {

                return resolve(result[0].PASSWORD);

            }
        });
    });

};

const queryEmail = (email,connection) =>{
    return new Promise((resolve,reject) =>{
        connection.query(`SELECT * FROM Student WHERE EMAIL = '${email}'`,(err,result) =>{
            if(err){
                return reject(err);
            } else{
                return resolve(result);
            }
        })
    })
}


module.exports = {
    queryPassword,
    queryEmail
}