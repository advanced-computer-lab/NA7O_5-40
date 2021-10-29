const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    flightNo: {
        type: String,
        required: true,
        unique: true
    },
    depature: {
        type: Date,
        required: true
    },
    arrival: {
        type: Date,
        required: true
    },
    economySeats: {
        type: Number,
        required: true
    },
    buisnessSeats: {
        type: Number,
        required: true
    },
    airport: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;