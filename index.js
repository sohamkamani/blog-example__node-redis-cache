const express = require('express');
const app = express();
const ageService = require('./age-service');

app.get('/', function(req, res) {
  const {name} = req.query
  ageService(name, age => {
    res.end(age)
  })
});

app.listen(3000, function() {
  console.log('App listening on port 3000');
});
