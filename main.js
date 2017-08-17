const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const url = 'mongodb://localhost:27017/newrobotsdb';
const routes = require('./routes/robots');

// NEW PACKAGES
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('express-flash-messages');
const Robot = require('./models/robot');
const bodyParser = require('body-parser');

// BOILERPLATE

// for passport
passport.use(
  new localStrategy(function(username, password, done) {
    console.log('localStrategy', username, password);
    Robot.authenticate(username, password)
      // successful
      .then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, null, {
            message: 'Email and password not recognized.'
          });
        }
      })
      // incorrect
      .catch(err => done(err));
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
  //done(null, user.username);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// FOR handlebars-express
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', './views');

// for express
app.use(express.static('public'));

//for session
app.use(session({
  secret: 'password',
  resave: false,
  saveUninitialized: false,
}));

//for passport
app.use(passport.initialize());
//for passport session
app.use(passport.session());
// use body-parser middleware to parse form data
//for flash
app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//ROUTES

// local login form
app.get('/login', (req, res) => {
  res.render('login', {
    failed: req.query.failed
  });
});

// endpoint for local login sumbit
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?failed=true',
    failureFlash: true
  })
);

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  let robot = new Robot(req.body);
  robot.provider = 'local';
  robot.setPassword(req.body.password);

  robot
    .save()
    // if good...
    .then(() => res.redirect('/'))
    // if bad...
    .catch(err => console.log(err));
});

app.use('/', routes);

//LISTEN
mongoose.connect(url, {
    useMongoClient: true
  })
  .then(() => {
    app.listen(3000, function() {
      console.log('Application Started.');
    });
  });
