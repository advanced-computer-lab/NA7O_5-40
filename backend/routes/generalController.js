const express = require("express");
const Admin = require("../models/adminSchema");
const User = require("../models/userSchema");
const Flight = require("../models/flightSchema");
const endOfDay = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");
const { parseISO, parse } = require("date-fns");

const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

var jwtSecret = process.env.JWTSECRET;


function checkFreeSeatsAvailable(cabin, flight, requiredSeats) {
  var freeBuisinessSeats = flight.freeSeats.filter((seat) => seat.startsWith('B'));
  var freeEconomySeats = flight.freeSeats.filter((seat) => seat.startsWith('E'));

  var seats = cabin == 'economy' ? freeEconomySeats : freeBuisinessSeats;

  if (seats.length >= requiredSeats)
    return true;

  return false;
}

// flight search
router.post("/flights/search", async (req, res) => {
  console.log(req.body);
  // console.log(req.payload);

  var { adults, children, departureAirport, returnAirport, cabinClass } = req.body;



  var depDate = new Date(req.body.departureDate)
  var returnDate = new Date(req.body.returnDate);

  console.log(depDate);
  console.log(startOfDay(depDate));
  console.log(endOfDay(depDate));

  var noOfRequiredSeats = parseInt(adults) + parseInt(children);

  var candidateDepFlights = await Flight.find({
    departureAirport: departureAirport,
    arrivalAirport: returnAirport,
    departureDate: {
      $gte: startOfDay(depDate),
      $lte: endOfDay(depDate),
    },
  });

  var candidateReturnFlights = await Flight.find({
    departureAirport: returnAirport,
    arrivalAirport: departureAirport,
    departureDate: {
      $gte: startOfDay(returnDate),
      $lte: endOfDay(returnDate),
    },
  });

  // console.log(candidateFlights);
  var departureFlights = [];
  var returnFlights = [];

  candidateDepFlights.forEach((flight) => {
    if (checkFreeSeatsAvailable(cabinClass, flight, noOfRequiredSeats))
      departureFlights.push(flight);

  });

  candidateReturnFlights.forEach((flight) => {
    if (checkFreeSeatsAvailable(cabinClass, flight, noOfRequiredSeats))
      returnFlights.push(flight);
  });

  if (returnFlights.length == 0 || departureFlights.length == 0)
    return res.status(400).send('No flights found matching your criteria');

  // console.log(result);
  res.status(200).send({
    departureFlights,
    returnFlights
  });

  // res.status(400).send(e.codeName);
});

router.post("/register", (req, res) => {
  console.log(req.body);

  const {
    firstName,
    lastName,
    address,
    email,
    phoneNumber,
    passportNumber,
    password,
  } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      const newUser = new User({
        ...req.body,
        password: hash,
      });

      try {
        await newUser.save();
      } catch (e) {
        return res.json({
          status: false,
          message: "An error occured",
          error: e
        });
      }
      // res.status(200).send("Registered successfully");
      return res.json({
        status: true,
        message: "Registered successfully",
      });
    });
  });
});

router.post("/login", async (req, res) => {
  console.log(req.headers.authorization);

  const { email, password } = req.body;

  var isAdmin = false;

  var dbUser = await Admin.find({ email: email });

  if (dbUser.length != 0) isAdmin = true;

  if (!isAdmin) {
    dbUser = await User.find({ email: email });

    if (dbUser.length == 0) {
      return res.json({
        status: false,
        message: "User not found, please register first",
      });
    }
  }

  bcrypt.compare(password, dbUser[0].password, function (err, result) {
    // console.log(result)
    if (result) {
      const jwtToken = jwt.sign(
        {
          email: email,
          isAdmin: isAdmin,
          id: dbUser[0]._id,
        },
        jwtSecret
      );

      var userData = {
        "id": dbUser[0]._id,
        "isAdmin": isAdmin,
        "email": dbUser[0].email
      }

      return res.json({
        status: true,
        message: `Logged in as ${isAdmin ? "admin" : "user"}`,
        data: userData,
        accessToken: jwtToken,
      });
    } else {
      return res.json({
        status: false,
        message: "Invalid password",
      });
    }
  });
});

module.exports = router;
