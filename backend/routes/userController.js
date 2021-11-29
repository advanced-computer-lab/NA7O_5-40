const express = require('express');
const Flight = require('../models/flightSchema');
const User = require('../models/userSchema');
const Reservation = require('../models/reservationSchema');
const endOfDay = require('date-fns/endOfDay')
const startOfDay = require('date-fns/startOfDay');
const { parseISO } = require('date-fns');
const { body, validationResult } = require('express-validator');

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

router.post('/reservation/create', async (req, res) => {
    console.log(req.body)
    var { userId, departureFlightId, returnFlightId,
        chosenCabinDeparture, chosenCabinReturn, seatNumbersDeparture,
        seatNumbersReturn, adults, children } = req.body

    var noOfSeats = adults + children;

    if (noOfSeats != seatNumbersDeparture.length || noOfSeats != seatNumbersReturn.length)
        return res.status(400).send('Entered seat numbers do not match required seats');

    var departureFlight = await Flight.findById(departureFlightId);
    var returnFlight = await Flight.findById(returnFlightId);

    var freeSeatsDep = departureFlight.freeSeats;
    var freeSeatsReturn = returnFlight.freeSeats;

    freeSeatsDep = freeSeatsDep.filter((element) => !seatNumbersDeparture.includes(element));
    freeSeatsReturn = freeSeatsReturn.filter((element) => !seatNumbersReturn.includes(element));

    await Flight.findByIdAndUpdate(departureFlightId, {freeSeats: freeSeatsDep});
    await Flight.findByIdAndUpdate(returnFlightId, {freeSeats: freeSeatsReturn});

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
    var depAirport = req.body.departureAirport;
    var arrivalAirport = req.body.arrivalAirport;
    var depDate = parseISO(req.body.departureDate);
    var cabinClass = req.body.cabinClass;

    var noOfRequiredSeats = adults + children;

    var candidateFlights = await Flight.find(
        {
            departureAirport: depAirport,
            arrivalAirport: arrivalAirport,
            departureDate: {
                $gte: startOfDay(depDate),
                $lte: endOfDay(depDate),
            }
        });

    // console.log(candidateFlights);
    var result = [];
    candidateFlights.forEach(flight => {
        var freeSeats = [];

        if (cabinClass == 'economy') {
            freeSeats = flight.freeSeatsEconomy;
        }
        else
            freeSeats = flight.freeSeatsBusiness;

        console.log(freeSeats);

        if (freeSeats.length >= noOfRequiredSeats)
            result.push(flight);
    });

    res.status(200).send(result);

});




module.exports = router;