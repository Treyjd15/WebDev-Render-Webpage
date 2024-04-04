var express = require('express');
var router = express.Router();
var path = require('path'); //added new

// Connect to process.env.DATABASE_URL when your app initializes:
// Read only reference value (const)
// get only Client class from pg package
const Client = require('pg').Client;

// create an instance from Client
const client = new Client({
  connectionString: process.env.DATABASE_URL
});

// connect to the DATABASE_URL
client.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// added new
router.get('/madlibs', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..', 'public','madlibs.html'));
});

router.post('/madlibs', function(req, res) {
  //console.log (req.body);
  res.json({ 
    male1: "My two friends " + req.body.male1 + " and " + req.body.male2 + " were going on a double date with " + " two lovely ladies named " + req.body.female1 + " and " + req.body.female2 + ". ",
    clothes: "All was going well until, when they got to the restaurant, " + req.body.male1 + " ripped his " + req.body.clothes + " as he was getting out of " + req.body.male2 + "'s " + req.body.vehicle + "!"
  });
});

router.get('/cars', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..', 'public','cars.html'));
});

router.get('/carsOut', function(req, res, next) {
  // client object enables issuing SQL queries
  client.query('SELECT * FROM cars', function(err, result){
    if (err) {next(err);}
    res.json(result.rows);
    console.log(result.rows);
  });
});

module.exports = router;
