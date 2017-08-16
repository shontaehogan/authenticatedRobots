const express = require('express');
const db = require('./db');
const handlebars = require('express-handlebars');
const app = express();
const url = 'mongodb://localhost:27017/newrobotsdb';
const routes = require('./routes/robots');

// NEW PACKAGES
const robotRoutes = require('./routes/robots');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('express-flash-messages');
const Robot = require('./models/robot');
const bodyParser = require('body-parser');

// BOILERPLATE

// FOR handlebars-express
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', './views');

// for express
app.use(express.static('public'));

// tells express to use body-parser middleware to parse form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//start app
db.connect(url, (err, conection) => {
  if (!err)
    console.log('connected to Mongo.');

    app.listen(3000,() =>  console.log('We goodie!!'));

});
