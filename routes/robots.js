const express = require('express');
const routes = express.Router();
const db = require('../db');


routes.get('/', (req, res) => {
  let collection1 = db.get().collection('robot');


    collection1.find({}).toArray(function(err, robot) {
    res.render('home', { robot: robot });
  });
});



routes.get('/:username', (req, res) => {
  let collection2 = db.get().collection('robot');

  collection2.find({username: req.params.username}).toArray((err, robot) => {
    res.render('userInfo', {robot: robot});
    console.log(req.params.username);
  });
});

module.exports = routes;
