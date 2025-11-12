const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
const port = 1234

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'monu@123',
    database: 'inventory_management'
})

db.connect((err) => {
    err == null ? console.log("Connected to database") : console.log(err.message)
})

const getAll = "select * from products"
const getById = "select * from products where id=?"
const insert = "insert into products(name, category, quantity, price, supplier, added_date) values(?,?,?,?,?,?)"
const update = "update products set name=?, category=?, quantity=?, price=?, supplier=?, added_date=? where id=?"
const delRec = "delete from products where id=?"

app.get("/products", (req, res) => {
    db.query(getAll, (err, results) => {
        if(err) return res.status(500).json({error: err.message})
        else res.json(results)
    })
})

app.get("/products/:id", (req, res) => {
    const {id} = req.params
    db.query(getById,[id], (err, results) => {
        if(err) return res.status(500).json({error: err.message})
        else res.json(results)
    })
})

app.post("/products", (req, res) => {
    const{name, category, quantity, price, supplier, added_date} = req.body
    db.query(insert,[name, category, quantity, price, supplier, added_date], (err, results) => {
        if(err) return res.status(500).json({error: err.message})
        else res.json({id: results.insertId, name, category, quantity, price, supplier, added_date})
    })
})  


app.put("/products/:id", (req, res) => {
    const {id} = req.params
    const{name, category, quantity, price, supplier, added_date} = req.body
    db.query(update,[name, category, quantity, price, supplier, added_date, id], (err, results) => {
        if(err) return res.status(500).json({error: err.message})
        else res.json({"message":"Products updated succesfully"})
    })
})

app.delete("/products/:id", (req, res) => {
    const {id} = req.params
    db.query(delRec,[id], (err, results) => {
        if(err) return res.status(500).json({error: err.message})
        else res.json({"message":"Products deleted succesfully"})
    })
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})
