const router = require('express').Router();
const mysql = require('mysql');
const connection = require('../db/conn');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

require('dotenv').config();

// const transporter = require('./Email/sendEmail')

const jwt_key = process.env.SECRET_KEY


const { signupValidation, loginValidation } = require('../validation/validation');

router.post('/getBusesByDate', (req, res) => {
    const origin = req.body.origin;
    const destination = req.body.destination
    const dateOfJourney = req.body.dateOfJourney;


    connection.query(`select * from bus_info where origin=? AND destination=? AND dateOfJourney=?`, [origin, destination, dateOfJourney], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send({ message: 'Got the bus result', result: result });
        }
    })
})


// Customer Register
router.post('/signup', (req, res) => {
    const f_name = req.body.f_name;
    const l_name = req.body.l_name;
    const phone = req.body.phone;
    const password = req.body.password;
    const address = req.body.address;

    connection.query('insert into customers value (?,?,?,?,?)', [f_name, l_name, phone, password, address], (err, result) => {
        if (err) {
            res.send(err)
        }
        else {
            res.send({ message: 'You are registered with the app', result: result[0] });
        }
    })
});

// Customer Login
router.post('/login', loginValidation, (req, res) => {
    const { phone, password } = req.body;
    connection.query('select * from customers where phone = ? AND password=? ', [phone, password], (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result.length) {
            try {
                jwt.sign({ result }, jwt_key, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        res.send(err);
                    }
                    res.send({ message: 'Login Successful', result: result[0], auth: token });
                })

                // res.redirect('/school-dashboard');
                console.log("You are Logged in")
            }
            catch (err) {
                res.send({ message: "Invalid Credentials" });
            }
        }
        else {
            res.send({
                message: err,
            })
        }
    })
})




// Customer check profile
router.get('/profile/:phone', (req, res) => {
    const phone = req.params.phone;
    if (req.session) {
        connection.query(`select * from customers where phone = ?`, [phone], (err, result) => {
            if (err) {
                res.send(err);
            }
            else {
                req.session.userData = result[0]
                res.send(result[0])
            }

        })
    } else {
        res.send("User Logged Out")
    }
});


// Customer profile update
router.post('/update-profile/:phone', (req, res) => {
    const phone = req.params.phone;
    var updateData = req.body;

    if (req.session) {
        connection.query(`update customers
        set ? where phone=?`, [updateData, phone], (err, result) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(result);
            }
        })
    } else {
        res.send("User Logged Out")
    }

})



// Ticket Counter
router.get('/ticket-counter/:id', (req, res) => {

})


// Buy Ticket
router.post('/add-passenger-details', (req, res) => {
    const { PassengerName, PassengerPhone, price, dateOfJourney, time, BusID, customerNumber } = req.body

    if (req.body) {
        connection.query(`insert into passenger (PassengerName, PassengerPhone, price, dateOfJourney, time, BusID, customerNumber) values (?,?,?,?,?,?,?)`
            , [PassengerName, PassengerPhone, price, dateOfJourney, time, BusID, customerNumber]
            , (err, result) => {
                if (err) {
                    console.log(err)
                    res.send(err);
                }
                else {
                    console.log(result)
                    res.send(result);
                }
            })
    } else {
        res.send("User Logged Out");
    }
});

router.post('/create-checkout-session', async (req, res) => {
    const YOUR_DOMAIN = 'http://localhost:3000/';
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1NJdN8SIT3Y2fD3yfeFeUuqm',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.redirect(303, session.url);
});

router.post('/payment', async (req, res) => {
    const {amount, token} = req.body;
    console.log(token)
    try {
        await stripe.charges.create({
            amount: amount,
            currency: "inr",
            source: token.id,
            description: "Payment for Bus Ticket"
        }, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
        )
    } catch (err) {
        console.log(err)
    }

});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.send("Session ended")
})






module.exports = router;