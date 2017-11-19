
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
      // var queryText = 'SELECT * FROM "worlds" WHERE "id"=1;';
      var queryText = 'SELECT * FROM "worlds" JOIN "obstacles" ON "worlds"."id" = "obstacles"."world_id" WHERE "worlds"."id" = 2;';
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

router.post('/', function(req, res) {
  console.log(req.body);
  var newWorld = req.body;
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      //we connected to DB
      // var queryText = 'SELECT * FROM "worlds" WHERE "id"=1;';
      var queryText = 'INSERT INTO "worlds" ("start_x", "start_y", "end_x", "end_y") VALUES ($1, $2, $3, $4);';
      db.query(queryText, [newWorld.start_x, newWorld.start_y, newWorld.end_x, newWorld.end_y], function(err, result){
        done();
        if(err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
}); //END POST ROUTE


module.exports = router;
