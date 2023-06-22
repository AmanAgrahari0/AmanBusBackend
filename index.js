const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookie_parser = require('cookie-parser');
const session = require('express-session');
require('./db/conn')

const port = process.env.PORT || 3500;

// Initialising express app
const app = express();



// Importing Routes
const busRouter = require('./routes/bus.routes');
const customerRoute = require('./routes/customer.route');
const ticketRoute = require('./routes/ticket.router')

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
// app.use(session({ 
//     secret: process.env.JWT_SECRET_KEY,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000*60*24 }
// }))

// Connecting to frontend
// app.use(express.static(path.join(__dirname, './bus-booking/public/index.html')))
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, './bus-booking/public', 'index.html'));
// });




app.use('/api/busRoute', busRouter);
app.use('/api/customer', customerRoute);
app.use('/api/tickets', ticketRoute)


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
});

