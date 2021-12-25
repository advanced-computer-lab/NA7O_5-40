const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        default: []
    },
    passportNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    }, 
    customerAccount: {
        type: String
    }
},
    { timestamps: true })
const User = mongoose.model('User', userSchema);
module.exports = User;

