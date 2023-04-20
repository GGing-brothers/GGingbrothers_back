const express = require("express");
const timer = require("date-utils")
const app = express();
const mysql = require("mysql2");
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
const port = 3000;
require("dotenv").config()
const conn = {
    host : process.env.DB_host,
    port : process.env.DB_port,
    user : process.env.DB_user,
    password : process.env.DB_password,
    database : process.env.DB_database,
};
let connection = mysql.createConnection(conn);
app.get("/", (req,res) => {
    res.send("Hello World");
})

app.get("/api/data/:data", (req,res) => { // 값 받을 때  /api/body_data/{데이터}
    const params = req.params
    const data = req.params.data
    let newTime = new Date();
    let day = newTime.toFormat('YYYY-MM-DD');
    let time = newTime.toFormat('HH24:MI:SS');
    let sql = `INSERT INTO data(data, data_day, data_time) VALUES (${data}, '${day}', '${time}')`;
    connection.query(sql, function(err, results, fields){
        if(err){
            console.log(err)
        }else{
            console.log("success");
        }
    })
    console.log(params.data)
    res.send(params.data)
})

app.post("/api/get_data", (req, res) => {
    let sql = `SELECT * FROM data ORDER BY num DESC limit 1`;
    connection.query(sql, function(err, results, fields){
        if(err){
            console.log(err);
        }else{
            console.log(results)
            res.send(results)
        }
    })    
})

app.listen(port, () => {
    console.log(`127.0.0.1:${port} is running`);
})