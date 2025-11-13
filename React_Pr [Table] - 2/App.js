const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 1234;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "monu@123",
    database: "student_management"
})

db.connect((err) => {
    err == null ? console.log("Connected to Database") : console.log(err.message)
})

const getAll = "select * from students"
const getById = "select * from students where id=?"
const insert = "insert into students(name, roll_number, department, year, contact, date) values (?,?,?,?,?,?)"
const update = "update students set name=?, roll_number=?, department=?, year=?, contact=?, date=? where id=?"
const delRec = "delete from students where id=?"

app.get("/students", (req, res) => {
    db.query(getAll, (err, results) => {
        if(err) return res.status(500).json({error: err.message})
        else res.json(results)
    })
})

app.get("/students/:id", (req, res) => {
    const {id} = req.params;
    db.query(getById, [id], (err, results) => {
        if(err) return res.status(500).json({error: err.message})
        else res.json(results)
    })
})

app.post("/students", (req, res) => {
    const {name, roll_number, department, year, contact, date} = req.body;
    db.query(insert, [name, roll_number, department, year, contact, date], (err, results) => {
        if(err) return res.status(500).json({error: err.message})
        else res.json({id: results.insertId, name, roll_number, department, year, contact, date})
    })
})

app.put("/students/:id", (req, res) => {
    const {id} = req.params;
    const {name, roll_number, department, year, contact, date} = req.body;
    db.query(update, [name, roll_number, department, year, contact, date, id], (err, results) => {
        if(err) return res.status(500).json({error: err.message})
        else res.json({"message":"Updated Students Succesfully"})
    })
})

app.delete("/students/:id", (req, res) => {
    const {id} = req.params;
    db.query(delRec, [id], (err, results) => {
        if(err) return res.status(500).json({error: err.message})
        else res.json({"message":"Deleted Students Succesfully"})
    })
})

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`)
})





