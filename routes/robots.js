const express = require('express');
const routes = express.Router();
const db = require('../db');


routes.get('/', (req, res) => {
  let collection1 = db.get().collection('robot');

console.log("test")

    collection1.find({}).toArray(function(err, robot) {
    res.render('index', { robot: robot });
  });
});


console.log("test2")

routes.get('/:username', (req, res) => {
  let collection2 = db.get().collection('robot');

  collection2.find({username: req.params.username}).toArray((err, robot) => {
    res.render('userInfo', {robot: robot});
    console.log(req.params.username);
  });
});
console.log("test3")

module.exports = routes;
