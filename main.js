const express = require('express');
const db = require('./db');
const mustacheExpress = require('mustache-express');
const app = express();
const url = 'mongodb://localhost:27017/newrobotsdb';


// are these the same?
const routes = require('./routes/robots');
// const path = require('path');

// BOILERPLATE

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use(express.static('public'));



app.use('/', routes);

//start app
db.connect(url, (err, conection) => {
  if (!err)
    console.log('connected to Mongo.');


    app.listen(3000,() =>  console.log('We goodie!!'));

});
