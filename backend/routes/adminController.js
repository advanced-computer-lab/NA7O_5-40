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

    try{
        await newAdmin.save();
        res.send('Admin added successfully');
    } catch(e) {
        res.send('An error occured');
    }
});

// create flight
router.post('/flight', async (req, res) => {
    const newFlight = new Flight(
        req.body
    );

    try{
        await newFlight.save();
        res.send('Flight added successfully');
    } catch(e) {
        res.send('An error occured');
    }
});


module.exports = router;