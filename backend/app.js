const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express();
const port = process.env.port || '8000'
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.DBLINK, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));


// routes
const adminController = require('./routes/adminController');
const generalController = require('./routes/generalController');

app.get('/home', (req, res) => {
    res.send('home from /')
})

app.use('/admin', adminController);
app.use('/', generalController);

app.listen(port, () => console.log(`app running on port ${port}`));
