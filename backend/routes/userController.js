const express = require('express');
//const Flight = require('../models/flightSchema');
const User = require('../models/userSchema');

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

module.exports = router;