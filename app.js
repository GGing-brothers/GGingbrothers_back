const express = require("express");
const app = express();
const mysql = require("mysql");
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
const port = 5000;
require("dotenv").config()

const conn = {
    host : process.env.DB_host,
    port : process.env.DB_port,
    user : process.env.DB_user,
    password : process.env.DB_password,
    database : process.env.DB_database,
};
let connection = mysql.createConnection(conn);
connection.connect();

app.get("/api/body_data/:data", (req,res) => { // 값 받을 때  /api/body_data/{데이터}
    const params = req.params
    const data = req.params.data
    let sql = `INSERT INTO data VALUES (${1}, ${data})`;
    connection.query(sql, function(err, results, fields){
        console.log("dd");
        if(err){
            console.log(err)
        }else{
            console.log(results);
        }
    })
    console.log(params.data)
    res.send(params.data)
})
app.post("/test", (req,res) => {
    res.send()
})




app.listen(port, () => {
    console.log(`127.0.0.1:${port} is running`);
})