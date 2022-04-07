const express = require("express");
const router = express.Router();
const db = require("../config/db");
const cors = require("cors");

router.use(express.json());
router.use(cors());

router.post('/register', (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "INSERT INTO Student (name, email, password) VALUES (?, ?, ?)",
        [name, email, password],
        (err, res) => {
            console.log(err);
        }
    );
});

router.post('/login', (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    db.query(
        "SELECT * FROM Student WHERE email = ? ",
        // "SELECT ID, name, email FROM User WHERE email = ? ",

        [email],
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            if (result.length > 0) {
                 if (password == result[0].Password) {
                    res.json({loggedIn: true, email: email, name: name});
            } else {
                    res.json({loggedIn: false, message: "Wrong email/password combination"
                });
            }
            } else {
                res.json({loggedIn: false, message: "User doesn't exist"});
            }
        }
);
});

module.exports = router;