const router = require('express').Router();
const mysql = require('mysql');
const connection = require('../db/conn');



router.post('/postBuses', (req, res)=>{
    const id = req.body.id;
    const number_plate = req.body.number_plate;
    const origin = req.body.origin;
    const destination = req.body.destination;
    const dateOfArrival = req.body.dateOfArrival;
    const dateOfJourney= req.body.dateOfJourney;
    const timeOfDeparture = req.body.timeOfDeparture;
    const timeOfArrival = req.body.timeOfArrival;
    const price = req.body.price;

    connection.query(`create table if not exists bus_info(id INTEGER PRIMARY KEY AUTO_INCREMENT, number_plate varchar(255), origin varchar(255), destination varchar(255), dateOfArrival varchar(255), dateOfJourney varchar(255), timeOfDeparture varchar(255), timeOfArrival varchar(255), price varchar(255))`, (err, result)=>{
        if(err){
            res.send(err);
        }else{
            console.log(result);
            connection.query('insert into bus_info values (?,?,?,?,?,?,?,?,?)', [id,number_plate, origin, destination, dateOfArrival, dateOfJourney, timeOfDeparture, timeOfArrival, price], (err, result)=>{
                if(err){
                    res.send(err);
                }else{
                    console.log(result)
                    res.send("Result Posted")
                }
            })
        }

    })
})

// Admin Managing Bus


router.get('/getAllBuses', (req, res)=>{
    connection.query('select * from bus_info', (err, result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result);
        }
    })
})
// Admin Delete bus
router.delete('/deleteBus', (req, res)=>{
    const number_plate = req.body.number_plate;

    connection.query(`delete from bus_info where number_plate =${number_plate}`, (err, result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
});

// Admin Update Bus

router.put('/updateBus/:id', (req, res)=>{
    const id = req.params.id;
    const updateData = req.body;

    connection.query(`update bus_info set ? where id=?`, [updateData, id], (err, result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})


module.exports = router;