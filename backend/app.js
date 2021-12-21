const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

var cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express();
const port = process.env.port || '8000'

app.use(cookieParser())
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.DBLINK, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("MongoDB is now connected"))
    .catch(err => console.log(err));


// routes
const adminController = require('./routes/adminController');
const generalController = require('./routes/generalController');
const userController = require('./routes/userController');

const { checkAdmin, checkUser, verifyJWT } = require('./middlewares')

app.use('/admin', verifyJWT, checkAdmin, adminController);
app.use('/user', verifyJWT, checkUser, userController);
app.use('/', generalController);

app.listen(port, () => console.log(`app running on port ${port}`));
