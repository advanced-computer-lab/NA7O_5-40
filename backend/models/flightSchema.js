// const { number } = require('joi');
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
        type: Number,
        // required: true
        default: 1
    },
    arrivalTerminal: {
        type: Number,
        // required: true
        default: 1
    },
    economyPrice: {
        type: Number,
        // required: true
        default: 100
    },
    businessPrice: {
        type: Number,
        // required: true
        default: 200
    },
    baggageAllowance: {
        type: Number,
        // required: true
        default: 20
    },
    freeSeats: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
