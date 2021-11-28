const express = require('express');
const Admin = require('../models/adminSchema');
const Flight = require('../models/flightSchema');

const router = express.Router();


router.get('/home', (req, res) => {
    res.send('home from /admin/home')
});


router.post('/newAdmin', async (req, res) => {
    const newAdmin = new Admin({
        username: req.body.username,
        password: req.body.password
    });

    try {
        await newAdmin.save();
        res.send('Admin added successfully');
    } catch (e) {
        res.send('An error occured');
    }
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
    const newFlight = new Flight(
        req.body
    );

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
    try {
        const allFlights = await Flight.find();
        res.status(200).send(allFlights);
    } catch (e) {
        res.status(400).send('An error occured');
    }
});


module.exports = router;