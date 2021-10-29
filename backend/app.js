const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express();
const port = process.env.port || '3000'
app.use(express.json());

mongoose.connect(process.env.DBLINK, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));


// routes
const adminController = require('./routes/adminController');

app.get('/home', (req, res) => {
    res.send('home from /')
})

app.use('/admin', adminController);

app.listen(port, () => console.log(`app running on port ${port}`));
