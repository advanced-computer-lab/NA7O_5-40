const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({

    flightNo: {
        type: String,
        required: true,
        unique: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true
    },

    economySeats: {
        type: Number,
        required: true
    },
    businessSeats: {
        type: Number,
        required: true
    },
    departureAirport: {
        type: String,
        required: true
    },
    arrivalAirport: {
        type: String,
        required: true
    },
    departureTerminal: {
        type: String,
        required: true
    },
    arrivalTerminal: {
        type: String,
        required: true
    },
    economyPrice: {
        type: Number,
        required: true
    },
    businessPrice: {
        type: Number,
        required: true
    },
    baggageAllowance: {
        type: Number,
        required: true
    },
    freeSeatsEconomy: {
        type: [String],
        default: []
    },
    freeSeatsBusiness: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
