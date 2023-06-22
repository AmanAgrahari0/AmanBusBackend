const mysql = require('mysql');
require('dotenv').config();
let connection = mysql.createConnection({
    host: process.env.localhost,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

connection.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Database connected");
    }
})

module.exports = connection;