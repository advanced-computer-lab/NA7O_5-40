const express = require('express');
const Admin = require('../models/adminSchema');

const router = express.Router();

router.post('/login', async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);

    try {
        // check if there is an admin with this username
        var admin = await Admin.findOne({ username: username });

        if (admin) {

            // if found, check if password is matching
            if (admin.password == password) {
                return res.status(200).send('Logged in');
            }
        }

        res.status(400).send('Wrong username or password');


    } catch (e) {
        res.send('An error occured');
    }
});



module.exports = router;