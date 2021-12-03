const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reservationSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    departureFlightId: {
        type: String,
        required: true
    },
    returnFlightId: {
        type: String,
        required: true
    },
    chosenCabinDeparture: {
        type: String,
        required: true
    },
    chosenCabinReturn: {
        type: String,
        required: true
    },
    seatNumbersDeparture: {
        type: [String],
        required: true
    },
    seatNumbersReturn: {
        type: [String],
        required: true
    },
    adults: {
        type: Number,
        default: 1,
    },
    children: {
        type: Number,
        default: 0,
    },
    price:{
        type:Number,
        default:0
    }
}
    , { timestamps: true }
);
const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
