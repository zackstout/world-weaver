
var express = require('express');
var router = express.Router();
var passport = require('passport');
var pool = require('../modules/pool.js');

var path = require('path');

router.get('/', function(req, res) {
  console.log('here we are');
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      //we connected to DB
      var queryText = 'SELECT * FROM "worlds" WHERE "id"=1;';
      db.query(queryText, [], function(err, result){
        done();
        if(err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          console.log(result.rows);
          res.send(result.rows);
          // console.log(result.rows);
        }
      });
    }
  });
}); //END GET ROUTE


module.exports = router;
