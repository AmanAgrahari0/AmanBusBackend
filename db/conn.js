const mysql = require('mysql');
require('dotenv').config();
let connection = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB
});

connection.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Database connected");
    }
})

module.exports = connection;