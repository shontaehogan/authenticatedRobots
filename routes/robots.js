const express = require('express');
const routes = express.Router();
const Robot = require('../models/robot')

// require the login
const requireLogin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

routes.use(requireLogin);

routes.get('/', (req, res) => {
// let collection1 = db.get().collection('robot');//  (with mongo)  Robot.find({}, function(err, robot) {
res.render('home', {
  robot: robot
});
});
//   collection1.find({}).toArray(function(err, robot) {
//   res.render('home', { robot: robot });
// }); //  (with mongo)
});

routes.get('/:username', (req, res) => {
  // let collection2 = db.get().collection('robot');  //  (with mongo)
  Robot.findOne({
    'username': req.params.username
  }, (err, robot) => {
    res.render('userInfo', robot);
  });

  // collection2.find({username: req.params.username}).toArray((err, robot) => {
  //   res.render('userInfo', {robot: robot});
  //   console.log(req.params.username);
  // });  // (with mongo);
});

module.exports = routes;
