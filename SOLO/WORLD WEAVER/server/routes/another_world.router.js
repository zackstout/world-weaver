
var express = require('express');
var router = express.Router();
var passport = require('passport');
var pool = require('../modules/pool.js');

router.get('/', function(req, res) {
  // console.log('get it boi', req.params.id);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      //we connected to DB
      //issue: will only return worlds that have obstacles in them:
      // var queryText = 'SELECT * FROM "worlds";';
      var queryText = 'SELECT "worlds"."id" as id, "users"."id" as user_id, "attempts", "completions", "favorites", "title", "start_x", "start_y", "end_x", "end_y", "username" FROM "worlds" JOIN "users" ON "worlds"."maker_id" = "users"."id";';
      // var queryText = 'SELECT * FROM "worlds" JOIN "obstacles" ON "worlds"."id" = "obstacles"."world_id" WHERE "maker_id" = $1 GROUP BY "worlds"."id", "obstacles"."id";';
      db.query(queryText, [], function(err, result){
        done();
        if(err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          // console.log(result.rows);
          res.send(result.rows);
        }
      });
    }
  });
}); //END ALL WORLDS GET ROUTE (lol "end all worlds")

router.get('/obstacles', function(req, res) {
  // console.log('get it boi', req.params.id);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      //we connected to DB
      //issue: will only return worlds that have obstacles in them:
      // var queryText = 'SELECT * FROM "worlds" WHERE "maker_id" = $1;';
      // var queryText = 'SELECT * FROM "worlds" JOIN "obstacles" ON "worlds"."id" = "obstacles"."world_id";';
      var queryText = 'SELECT * FROM "obstacles";';

      db.query(queryText, [], function(err, result){
        done();
        if(err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          // console.log(result.rows);
          res.send(result.rows);
        }
      });
    }
  });
}); //END ALL WORLDS-OBSTACLES GET ROUTE


router.post('/stats', function(req, res){
  var world = req.body;
  console.log(world);
  pool.connect(function (err, db, done) {
    if (err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      console.log('what up');
      res.sendStatus(201);
    }
    // } else {
    //   var queryText = 'UPDATE "worlds" SET "first_name", "last_name") VALUES ($1, $2);';
    //   db.query(queryText, [owner.first_name, owner.last_name], function (err, result) {
    //     done(); // pool +1
    //     if (err) {
    //       console.log('Error making query', err);
    //       res.sendStatus(500);
    //     } else {
    //       res.sendStatus(201);
    //     }
    //   });
    // }
  });
}); //END POST ROUTE




module.exports = router;
