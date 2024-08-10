const express = require("express");
const app = express();
// const cors = require("cors");
const path = require('path');
const mysql = require("mysql2");
const bodyParser = require("body-parser");

buildPath =  path.join(__dirname, '../build'); // serving client
app.use(express.static(buildPath));

app.get('/*', (req, res) => {
    res.sendFile('index.html', {root : buildPath});
});

// const db = mysql.createPool({
//     host: "class3.hopekcc.org",
//     user: "austin",
//     password: "password",
//     database: "testdb"
// });

const db = mysql.createPool({
    host: "localhost",
    user: "austin", //change to root on local
    password: "password",
    database: "testdb"
});

// const corsOptions = {
//     origin: 'http://class3.hopekcc.org/classroom/team-os/logindemo/build',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/register", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    const sqlQuery1 = "SELECT * FROM userinfo WHERE email = ?";
    db.query(sqlQuery1, [email], (err, result) => {
        if(result.length == 0){ // not found and valid to register
            // console.log(result);
            const sqlQuery2 = "INSERT INTO userinfo (name, email, password) VALUES (?,?,?)";
            db.query(sqlQuery2, [name, email, password], (err, result) => {
                if(err){
                    return res.status(500).send({error: "Database Error"});
                } 
                return res.status(200).send({message: "Registration Successful"});
            });
        } else { // found email and shouldnt be able to register 
            return res.status(400).send({message: "Registration Unsuccessful"}); // User with email exists already
        }
    });
}); 


app.post("/api/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sqlQuery = 'SELECT * FROM userinfo WHERE email = ? AND password = ?';
    db.query(sqlQuery, [email, password], (err, result) => { // later modify to only query email, then check if pw == pw, and have only max 1 email/acc
        if(err){
            return res.status(500).send({error: "Database Error"}); // ??? do i even need this
        }
        if(result.length == 0){ 
            return res.status(401).send({message: "Invalid User"});
        }
        return res.status(200).send({message: "Login Successful"});

    })
}); 

app.listen(3001, () => {
    console.log("Running on Port 3001");
});
