const express = require('express');
const app = express();
//This is the age service that we just made
const ageService = require('./age-service');

app.get('/', function(req, res) {
  /*
  Get the name from the request query
  For example, localhost:3000/?name=foo
  would give "foo" as the name
 */
  const {name} = req.query
  ageService(name, age => {
    /*
    Once our age service gives us the age,
    send it to the client as a response
    */
    res.end(age)
  })
});

app.listen(3000, function() {
  console.log('App listening on port 3000');
});
