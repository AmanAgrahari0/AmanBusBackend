const router = require('express').Router();
const mysql = require('mysql');
const connection = require('../db/conn');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

require('dotenv').config();



router.get('/ticket', (req, res)=>{
    res.send("Hello")
})

router.get('/:customerNumber', (req, res)=>{
    const customerNumber = req.params.customerNumber
    connection.query(`select * from passenger where customerNumber = ?`, [customerNumber]
    , (err, result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send({message: 'Result', result: result[0]})
        }
    })
})

module.exports = router;