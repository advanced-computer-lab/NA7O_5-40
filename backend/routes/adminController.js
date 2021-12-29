const express = require('express');
const Admin = require('../models/adminSchema');
const Flight = require('../models/flightSchema');
const bcrypt = require('bcrypt')
const router = express.Router();


router.get('/home', (req, res) => {
    res.send('home from /admin/home')
});


router.post('/newAdmin', async (req, res) => {
    console.log(req.body);

    const {
        email,
        password
    } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const newAdmin = new Admin({
                email: email,
                password: hash,
            });

            try {
                await newAdmin.save();
            } catch (e) {
                return res.json({
                    status: false,
                    message: "An error occured",
                    error: e
                });
            }

            return res.json({
                status: true,
                message: "Registered successfully",
            });
        });
    });
});


// create flight
router.post('/flight/update', async (req, res) => {
    console.log(req.body);
    Flight.findByIdAndUpdate(
        req.body._id,
        req.body,
        function (err, newFlight) {
            if (err) {
                //duplicate key error
                if (err.code === 11000) {
                    res.status(400).send('Flight no already exists');
                    return;
                }

                return res.status(400).send(err.codeName)
            }

            res.status(200).send('Flight updated');
        });
})

router.post('/flight/create', async (req, res) => {
    console.log(req.body)

    var economySeatsNo = req.body.economySeats;
    var businessSeatsNo = req.body.businessSeats;

    freeSeats = [];

    for (var i = 1; i <= businessSeatsNo; i++) {
        freeSeats.push(`B${i}`);
    }

    for (var i = 1; i <= economySeatsNo; i++) {
        freeSeats.push(`E${i}`);
    }


    const newFlight = new Flight(
        {
            ...req.body,
            freeSeats,
        }
    );

    console.log(newFlight);

    try {
        await newFlight.save();
        res.status(200).send('Flight added successfully');
    } catch (e) {
        if (e.code === 11000) {
            res.status(400).send('Flight no already exists');
            return;
        }

        res.status(400).send(e.codeName);
    }
});


router.get('/flight/delete/:id', async (req, res) => {
    console.log(req.params.id);
    Flight.findByIdAndDelete(req.params.id, function (err, deleteflight) {
        if (!err) {
            res.status(200).send('Flight deleted')
        }
        else {
            console.log(err)
            return res.status(400).send(err);
        }
    });
});

router.get('/flights', async (req, res) => {
    console.log('GETTING FLIGHTS');
    try {
        const allFlights = await Flight.find();
        res.status(200).send(allFlights);
    } catch (e) {
        res.status(400).send('An error occured');
    }
});


module.exports = router;