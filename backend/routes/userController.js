const express = require('express');
const Flight = require('../models/flightSchema');
const User = require('../models/userSchema');
const Reservation = require('../models/reservationSchema');
const endOfDayfrom = require('date-fns/endOfDay')
const startOfDay = require('date-fns/startOfDay');

const router = express.Router();

router.post('/update', async (req, res) => {
    console.log(req.body);
    User.findByIdAndUpdate(
        req.body._id,
        req.body,
        function (err, newUser) {
            if (err) {
                //duplicate key error
                if (err.code === 11000) {
                    res.status(400).send('User does not exist');
                    return;
                }

                return res.status(400).send(err.codeName)
            }

            res.status(200).send('User updated');
        });
})

router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    User.findById(req.params.id, function (err, user) {
        if (!err) {
            res.status(200).send(user)
        }
        else {
            console.log(err)
            return res.status(400).send(err);
        }
    });
});

router.get('/reservations/:id', async (req, res) => {
    console.log(req.params.id);
    Reservation.find({ userId: req.params.id }, function (err, reservation) {
        if (!err) {
            res.status(200).send(reservation)
        }
        else {
            console.log(err)
            return res.status(400).send(err);
        }
    });
});

router.post('/Reservation/create', async (req, res) => {
    console.log(req.body)
    const newReservation = new Reservation(
        req.body
    );

    try {
        await newReservation.save();
        res.status(200).send('Reservation added successfully');
    } catch (e) {
        if (e.code === 11000) {
            res.status(400).send('Reservation no already exists');
            return;
        }

        res.status(400).send(e.codeName);
    }
});

router.post('/flights/search', async (req, res) => {
    console.log(req.body)

    var adults = req.body.adults;
    var children = req.body.children;
    var depAirport = req.body.depAirport;
    var arrivalAirport = req.body.arrivalAirport;
    var depDate = req.body.depDate;
    var cabinClass = req.body.cabinClass;

    var noOfSeats = adults + children;

    var candidateFlights = Flight.find(
        {
            departureAirport: depAirport,
            arrivalAirport: arrivalAirport,
            departureDate: {
                $gte: startOfDay(depDate),
                $lte: endOfDay(depDate),
            }
        });


});




module.exports = router;