const express = require("express");
const bcrypt = require('bcrypt')
const Flight = require("../models/flightSchema");
const User = require("../models/userSchema");
const Reservation = require("../models/reservationSchema");
const endOfDay = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");
const { parseISO, parse } = require("date-fns");
const sendMail = require("../helpers/sendMail");
const stripe = require('stripe')(process.env.STRIPEKEY);

const router = express.Router();



router.post('/checkout', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3000/user/reserveFlight',
      cancel_url: 'http://localhost:3000/user/cancel',
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        name: "Flight Reservation",
        amount: req.body.amount * 100,
        currency: "USD",
        quantity: 1
      }],
    });

    res.json({
      status: true,
      url: session.url
    })
  } catch (e) {
    console.log(e);
    res.json({
      status: false,
      error: e
    })
  }
})

router.post('/update-password', async (req, res) => {
  const { id } = req.payload;
  const { oldPassword, newPassword } = req.body;

  var dbUser = await User.findById(id);

  if (!oldPassword || !newPassword) {
    return res.status(400).send('Enter old and new password');
  }

  if (dbUser.length == 0) {
    return res.status(400).send('User not found, please register first');
  }


  bcrypt.compare(oldPassword, dbUser.password, function (err, result) {
    if (err) {
      return res.status(500).send('An error occured');
    }

    if (result) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newPassword, salt, async function (err, hash) {
          if (err) {
            return res.status(500).send('An error occured');
          }

          await User.findByIdAndUpdate(id, { 'password': hash });

          res.status(200).send('Password updated successfully');
        });
      });
    } else {
      res.status(400).send('The password you entered is invalid');
    }
  });
});


// edit profile
router.post("/update", async (req, res) => {
  console.log(req.body);
  req.body._id = req.payload.id;
  console.log(req.payload.id)
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
//change seats needs:departure or return flight,new seats,id of reservation
router.post("/changeSeats", async (req, res) => {

  if (req.body.selectedFlight == "departure") {
    Reservation.findByIdAndUpdate(req.body._id, { seatNumbersDeparture: req.body.newSeats }, function (err, newUser) {
      if (err) {
        res.status(400).send("error");
      }
      res.status(200).send("Seat Numbers Updated!");
    })
  }
  else {
    Reservation.findByIdAndUpdate(req.body._id, { seatNumbersReturn: req.body.newSeats }, function (err, newUser) {
      if (err) {
        res.status(400).send("error");
      }
      res.status(200).send("Seat Numbers Updated!");
    })

  }
})
//free seats in flight
router.post("/availableSeats/:id", async (req, res) => {
  try {
    var flight = await Flight.findById(req.params.id);
    if (req.body.cabin == "business") {
      console.log("hereeee");
      var result = flight.freeSeats.filter((seat) => seat.startsWith('B'));
    }
    else {
      var result = flight.freeSeats.filter((seat) => seat.startsWith('E'));
      console.log("thereee");
    }
    res.status(200).send({ availableSeats: result, flightId: req.params.id });
  }
  catch {
    return res.status(400).send("unsuccessful");
  }
})
//search for flights needs:flight id and type(economy or business) of reserved flight  to be edited,cabin class for search,departure date for search
router.post("/searchFlights", async (req, res) => {
  try {
    var test = "test";
    var oldFlight = await Flight.findById(req.body.oldFlightId);
    var oldCabinClass = req.body.oldCabinClass;
    var depDate = parseISO(req.body.departureDate);
    var flights = await Flight.find({
      departureDate: {
        $gte: startOfDay(depDate),
        $lte: endOfDay(depDate),
      }
    });

    if (req.body.cabinClass == "business") {
      console.log("hi");
      var newFlights = flights.filter((flight) => (
        checkFreeSeatsAvailable("business", flight, 1) == 1
      )
      );


    }
    else {
      var newFlights = flights.filter((flight) => (
        checkFreeSeatsAvailable("economy", flight, 1) == 1
      )
      );
    }
    if (oldCabinClass == "business") {
      var priceDifferences = [];
      for (var i = 0; i < newFlights.length; i++) {
        priceDifferences[i] = newFlights[i].businessPrice - oldFlight.businessPrice;

      }
    }
    else {

    }



    var result = { newFlights, priceDifferences };
    console.log(result);
    res.status(200).send(result);
  }

  catch {
    return res.status(400).send("bad request");
  }

})
// needs id of reservation,type of flight(departure or return),id of new flight,chosen Cabin,new seatnumbers
router.post("/changeFlight", async (req, res) => {
  try {
    var reserv = await Reservation.findById(req.body.reservationId);
    var newFlight = await Flight.findById(req.body.newFlightId);
    var newSeats = req.body.newSeats;
    if (req.body.flightType == "departure") {
      var oldFlight = await Flight.findById(reserv.departureFlightId);
      var oldSeats = reserv.seatNumbersDeparture;
      console.log(newSeats);
      console.log(oldSeats);
      if (oldSeats.length != newSeats.length) {
        return res.status(400).send("do not change the number of seats");
      }
      await Reservation.findByIdAndUpdate(req.body.reservationId, { seatNumbersDeparture: newSeats });
    }

    else {
      var oldFlight = await Flight.findById(reserv.returnFlightId);
      var oldSeats = reserv.seatNumbersReturn;
      await Reservation.findByIdAndUpdate(req.body.reservationId, { seatNumbersReturn: newSeats });
    }

    if (req.body.chosenCabin == "business") {
      var updatedPrice = reserv.price - oldFlight.businessPrice + reserv.adults * newFlight.businessPrice +
        0.5 * (reserv.children * newFlight.businessPrice);
    }
    else {

      var updatedPrice = reserv.price - oldFlight.economyPrice + reserv.adults * newFlight.economyPrice +
        0.5 * (reserv.children * newFlight.economyPrice);
      console.log(oldFlight.economyPrice);
    }
    if (req.body.flightType == "departure") {
      await Reservation.findByIdAndUpdate(req.body.reservationId, { departureFlightId: newFlight._id, price: updatedPrice });
    }
    else {
      await Reservation.findByIdAndUpdate(req.body.reservationId, { returnFlightId: newFlight._id, price: updatedPrice });
    }
    res.status(200).send("reservation updated!");

  }
  catch (err) {
    console.log(err);
    return res.status(400).send("not working");
  }
})

// get user
router.get("/", async (req, res) => {
  // console.log(req.payload.id
  User.findById(req.payload.id, function (err, user) {
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
  var id = req.payload.id;

  Reservation.find({ userId: id }, function (err, reservations) {
    if (!err) {
      reservations.forEach(async (reservation) => {
        var departureFlight = await Flight.findById(
          reservation.departureFlightId
        );
        var returnFlight = await Flight.findById(reservation.returnFlightId);
        reservation._doc.departureFlight = departureFlight;
        reservation._doc.returnFlight = returnFlight;
        // console.log(reservation);
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

    // var departureFlightId = deletedRes.departureFlightId;
    // var returnFlightId = deletedRes.returnFlightId;
    // var chosenSeatsDeparture = deletedRes.seatNumbersDeparture;
    // var chosenSeatsReturn = deletedRes.seatNumbersReturn;

    // var departureFlight = await Flight.findById(departureFlightId);
    // var returnFlight = await Flight.findById(returnFlightId);

    // var updatedFreeSeatsDep = [...departureFlight.freeSeats, ...chosenSeatsDeparture].sort();
    // var updatedFreeSeatsRet = [...returnFlight.freeSeats, ...chosenSeatsReturn].sort();

    // await Flight.findByIdAndUpdate(departureFlightId, { 'freeSeats': updatedFreeSeatsDep });
    // await Flight.findByIdAndUpdate(returnFlightId, { 'freeSeats': updatedFreeSeatsRet });


    if (deletedRes == null)
      return res.status(400).send("No reservation with this id");

    var userID = deletedRes.userId;

    var user = await User.findById(userID);

    var userEmail = user.email;

    console.log(userEmail);


    sendMail(
      userEmail,
      "Reservation cancelled",
      `Your reservation with booking number ${deletedRes._id} was cancelled recently.\nYou will be refunded with an amount of `
    )


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


  req.body.userId = req.payload.id;

  var noOfSeats = parseInt(adults) + parseInt(children);

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
  console.log(price);

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

    res.status(400).send(e.message);
  }
});

function checkFreeSeatsAvailable(cabin, flight, requiredSeats) {
  var freeBuisinessSeats = flight.freeSeats.filter((seat) => seat.startsWith('B'));
  var freeEconomySeats = flight.freeSeats.filter((seat) => seat.startsWith('E'));

  var seats = cabin == 'economy' ? freeEconomySeats : freeBuisinessSeats;

  if (seats.length >= requiredSeats)
    return true;

  return false;
}

module.exports = router;
