// Importing Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

const addUserMiddleware = require('./middlewares/addUser'); 

// Importing Routers
const studentAuthRouter = require('./routes/studentAuth');

// Initializing App
const app = express();

//Connecting To Database
mongoose.connect(config.DB.URL, { useNewUrlParser: true , useCreateIndex: true});
let db = mongoose.connection;
db.once('open', () => {
    console.log('Connected To MongoDB');
})

db.on('error', (error) => {
    console.log(error);
});


// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(addUserMiddleware);

// Routes
app.use('/api/auth/student', studentAuthRouter);

// Stating Server
app.listen(config.PORT, () => {
    console.log("Server Started On Port " + config.PORT);
})


