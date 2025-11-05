const express = require('express')
const mysql =  require('mysql2')
const cors = require('cors')

const app = express()
const port = 1234

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'monu@123',
    database: 'LibraryDB'
})

db.connect((err) => {
    err == null ? console.log("Connected to Database"): console.log(err.message);
})

const getAll = "select * from Books"
const getById = "select * from Books where book_id = ?"
const insert = "insert into Books(title, publication_year, author, genre, availability) values (?,?,?,?,?)"
const update = "update Books set title=?, publication_year=?, author=?, genre=?, availability=? where book_id=?"
const delRec = "delete from Books where book_id = ?"

//fetch complete data
app.get("/books", (req, res) => {
    db.query(getAll, (err, results) => {
        if(err) return res.status(500).json({error: err.message})
            else res.json(results)
    })
})

//fetch data for particular id
app.get("/books/:book_id", (req, res) => {
    const{book_id} = req.params;
    db.query(getById, book_id, (err, results) => {
        if(err) return res.status(500).json({error: err.message});
        else res.json(results)
    })
})

//insert data
app.post("/books", (req,res) => {
    const{title, publication_year, author, genre, availability} = req.body;
    db.query(insert, [title, publication_year, author, genre, availability], (err, results) => {
        if(err) return res.status(500).json({error: err.message});
        else res.json({book_id: results.insertId, title, publication_year, author, genre, availability})
    })
})

//update data
app.put("/books/:book_id", (req, res) => {
    const{book_id} = req.params;
    const {title, publication_year, author, genre, availability} = req.body;
    db.query(update, [title, publication_year, author, genre, availability, book_id], (err,results) =>{
        if(err) return res.status(500).json({error: err.message});
        else res.json({"message": "Book updated succesfully"});
    } )
})

app.delete("/books/:book_id", (req, res) => {
    const{ book_id } = req.params;
    db.query(delRec, [book_id], (err, results) => {
        if(err) return res.status(500).json({error: err.message});
        res.json({"message" : "Book deleted Succesfully"});
    })
})

// Start server
app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})

