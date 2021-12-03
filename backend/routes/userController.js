const express = require("express");
const Flight = require("../models/flightSchema");
const User = require("../models/userSchema");
const Reservation = require("../models/reservationSchema");
const endOfDay = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");
const { parseISO } = require("date-fns");
const { body, validationResult } = require("express-validator");
const sendMail = require("../helpers/sendMail");

const router = express.Router();

// edit profile
router.post("/update", async (req, res) => {
  console.log(req.body);
  User.findByIdAndUpdate(req.body._id, req.body, function (err, newUser) {
    if (err) {
      //duplicate key error
      if (err.code === 11000) {
        res.status(400).send("User does not exist");
        return;
      }

      return res.status(400).send(err.codeName);
    }

    res.status(200).send("User updated");
  });
});

// get user
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id, function (err, user) {
    if (!err) {
      res.status(200).send(user);
    } else {
      console.log(err);
      return res.status(400).send(err);
    }
  });
});
//get flight with flight ID
router.get("/flight/:id", async (req, res) => {
  try {
    var flight = await Flight.findById(req.params.id);
    res.status(200).send(flight)
    console.log(flight);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

//get reservation with reservation ID
router.get("/reservation/:id", async (req, res) => {
  try {
    var reservation = await Reservation.findById(req.params.id);
    res.status(200).send(reservation)
    console.log(reservation);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

router.get("/reservations/:id", async (req, res) => {
  Reservation.find({ userId: req.params.id }, function (err, reservations) {
    if (!err) {
      reservations.forEach(async (reservation) => {
        var departureFlight = await Flight.findById(
          reservation.departureFlightId
        );
        var returnFlight = await Flight.findById(reservation.returnFlightId);
        reservation._doc.departureFlight = departureFlight;
        reservation._doc.returnFlight = returnFlight;
        console.log(reservation);
      });
      //console.log(reservations);
      res.status(200).send(reservations);
    } else {
      console.log(err);
      return res.status(400).send(err);
    }
  });
});

// delete reservation
router.delete("/reservation/:id", async (req, res) => {
  try {
    var deletedRes = await Reservation.findByIdAndRemove(req.params.id);
    console.log(deletedRes);

    if (deletedRes == null)
      return res.status(400).send("No reservation with this id");

    var userID = deletedRes.userId;

    var user = await User.findById(userID);

    var userEmail = user.email;

    console.log(userEmail);

    console.log(
      await sendMail(
        userEmail,
        "Reservation cancelled",
        `Your reservation with booking number ${deletedRes._id} was cancelled recently.\nYou will be refunded with an amount of `
      )
    );

    res.status(200).send("succesfully deleted!");
  } catch (err) {
    res.status(400).send(err.message);
    console.log(err);
  }
});

// create reservation
router.post("/reservation/create", async (req, res) => {
  console.log(req.body);
  var {
    userId,
    departureFlightId,
    returnFlightId,
    chosenCabinDeparture,
    chosenCabinReturn,
    seatNumbersDeparture,
    seatNumbersReturn,
    adults,
    children,
  } = req.body;

  var noOfSeats = adults + children;

  if (
    noOfSeats != seatNumbersDeparture.length ||
    noOfSeats != seatNumbersReturn.length
  )
    return res
      .status(400)
      .send("Entered seat numbers do not match required seats");

  var departureFlight = await Flight.findById(departureFlightId);
  var returnFlight = await Flight.findById(returnFlightId);

  var freeSeatsDep = departureFlight.freeSeats;
  var freeSeatsReturn = returnFlight.freeSeats;

  freeSeatsDep = freeSeatsDep.filter(
    (element) => !seatNumbersDeparture.includes(element)
  );
  freeSeatsReturn = freeSeatsReturn.filter(
    (element) => !seatNumbersReturn.includes(element)
  );

  await Flight.findByIdAndUpdate(departureFlightId, {
    freeSeats: freeSeatsDep,
  });
  await Flight.findByIdAndUpdate(returnFlightId, {
    freeSeats: freeSeatsReturn,
  });
  if (chosenCabinDeparture == "economy") {
    var departurePrice =
      adults * departureFlight.economyPrice +
      0.5 * (children * departureFlight.economyPrice);
  } else {
    var departurePrice =
      adults * departureFlight.businessPrice +
      0.5 * (children * departureFlight.businessPrice);
  }
  if (chosenCabinReturn == "economy") {
    var returnPrice =
      adults * returnFlight.economyPrice +
      0.5 * (children * returnFlight.economyPrice);
  } else {
    var returnPrice =
      adults * returnFlight.businessPrice +
      0.5 * (children * returnFlight.businessPrice);
  }

  var price = departurePrice + returnPrice;

  const newReservation = new Reservation({ ...req.body, price });
  console.log(newReservation);
  try {
    await newReservation.save();
    res.status(200).send("Reservation added successfully");
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).send("Reservation no already exists");
      return;
    }

    res.status(400).send(e.codeName);
  }
});

// flight search
router.post("/flights/search", async (req, res) => {
  console.log(req.body);

  var adults = req.body.adults;
  var children = req.body.children;
  var depAirport = req.body.departureAirport;
  var arrivalAirport = req.body.arrivalAirport;
  var depDate = parseISO(req.body.departureDate);
  var cabinClass = req.body.cabinClass;

  var noOfRequiredSeats = adults + children;

  var candidateFlights = await Flight.find({
    departureAirport: depAirport,
    arrivalAirport: arrivalAirport,
    departureDate: {
      $gte: startOfDay(depDate),
      $lte: endOfDay(depDate),
    },
  });

  // console.log(candidateFlights);
  var result = [];
  candidateFlights.forEach((flight) => {
    var freeSeats = [];

    if (cabinClass == "economy") {
      freeSeats = flight.freeSeatsEconomy;
    } else freeSeats = flight.freeSeatsBusiness;

    console.log(freeSeats);

    if (freeSeats.length >= noOfRequiredSeats) result.push(flight);
  });

  res.status(200).send(result);

  res.status(400).send(e.codeName);
});

module.exports = router;
