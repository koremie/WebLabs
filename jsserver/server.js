const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var mysqlConnection = mysql.createConnection(require('./db.config'));

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connection established succesfull");
    } else {
        console.log("Connection failed TwT" + err);
    }
});

// setup server port
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
  
  
app.post("/animal", (req, res) => {
    mysqlConnection.query(
        "INSERT INTO animal(name, spesies, size, lifespan, dangerLevel, diet, daysNotFed) values(?,?,?,?,?,?,?)",
        [
        req.body.name,
        req.body.spesies,
        req.body.size,
        req.body.lifespan,
        req.body.dangerLevel,
        req.body.diet,
        req.body.daysNotFed,
        ],
        (err, response) => {
            if (!err) {
                res.send("Animal has been inserted succesfull");
            } else {
                throw err;
            }
        }
    );
});

app.get("/animal", (req, res) => {
    mysqlConnection.query("SELECT * FROM animal", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            throw err;
        }
    });
});

app.delete("/animal/:id", (req, res) => {
    mysqlConnection.query('DELETE FROM animal WHERE id=?', [req.params.id],(err, rows, fields)=>{
        if(!err) {
            res.send('Animal has been deleted successfully');
        } else {
            throw err;
        }
    })
});

app.put("/animal/:id", (req, res) => {
    mysqlConnection.query('UPDATE animal SET name=?, spesies=?, size=?, lifespan=?, dangerLevel=?, diet=?, daysNotFed=? WHERE id=?', 
    [
        req.body.name,
        req.body.spesies,
        req.body.size,
        req.body.lifespan,
        req.body.dangerLevel,
        req.body.diet,
        req.body.daysNotFed,
        req.params.id
    ],
    (err, rows, fields)=>{
        if(!err) {
            res.send('Animal has been updated successfully');
        } else {
            throw err;
        }
    })
});