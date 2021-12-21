const express = require('express');
const Admin = require('../models/adminSchema');
const User = require('../models/userSchema');

const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var jwtSecret = process.env.JWTSECRET;


router.post('/register', (req, res) => {
    console.log(req.body);

    const { firstName, lastName, address, email, phoneNumbers, passportNumber, password } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const newUser = new User({
                ...req.body,
                password: hash
            })

            await newUser.save();

            res.status(200).send('Registered successfully');
        });
    });
});

router.post('/login', async (req, res) => {
    // console.log(req.headers.authorization);

    const { email, password } = req.body;

    var isAdmin = false;

    var dbUser = await Admin.find({ email: email });

    if (dbUser.length != 0)
        isAdmin = true;


    if (!isAdmin) {
        dbUser = await User.find({ email: email });

        if (dbUser.length == 0) {
            return res.status(400).send('User not found, please register first');
        }
    }

    bcrypt.compare(password, dbUser[0].password, function (err, result) {
        // console.log(result)
        if (result) {

            const jwtToken = jwt.sign(
                {
                    'email': email,
                    'isAdmin': isAdmin,
                    'id': dbUser[0]._id
                }
                , jwtSecret
            );

            res.status(200).send({
                'message': `Logged in as ${isAdmin ? 'admin' : 'user'}`,
                'token': jwtToken
            });
        } else {
            res.status(400).send('Invalid password');
        }
    });
});

module.exports = router;