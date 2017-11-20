
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
  console.log("BODY: ", req.body);
  var newWorld = req.body;
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      //we connected to DB
      // var queryText = 'SELECT * FROM "worlds" WHERE "id"=1;';
      var queryText = 'INSERT INTO "worlds" ("start_x", "start_y", "end_x", "end_y") VALUES ($1, $2, $3, $4) RETURNING "id";';
      db.query(queryText, [newWorld.start_x, newWorld.start_y, newWorld.end_x, newWorld.end_y], function(err, result){
        done();
        if(err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          //don't send anything just yet amigo!
          // res.sendStatus(201);
          console.log("RESULT: ", result.rows[0].id);
          var leng = newWorld.obstacles.length;
          //this is a truly disgusting way to do this:
          if (leng !== 0) {

          for (var i = 0; i < leng - 1; i++) {
            // if (i !== newWorld.obstacles.length - 1) {
              queryText = 'INSERT INTO "obstacles" ("world_id", "x", "y", "h", "w", "type") VALUES ($1, $2, $3, $4, $5, $6);';
              db.query(queryText, [result.rows[0].id, newWorld.obstacles[i].x, newWorld.obstacles[i].y, newWorld.obstacles[i].h, newWorld.obstacles[i].w, newWorld.obstacles[i].type], handlePost);
            // } else {
              // queryText = 'INSERT INTO "obstacles" ("world_id", "x", "y", "h", "w", "type") VALUES ($1, $2, $3, $4, $5, $6);';
              // db.query(queryText, [result.rows[0].id, newWorld.obstacles[i].x, newWorld.obstacles[i].y, newWorld.obstacles[i].h, newWorld.obstacles[i].w, newWorld.obstacles[i].type], handlePostDone);
              // done();
            // }
          }

          queryText = 'INSERT INTO "obstacles" ("world_id", "x", "y", "h", "w", "type") VALUES ($1, $2, $3, $4, $5, $6);';
          db.query(queryText, [result.rows[0].id, newWorld.obstacles[leng - 1].x, newWorld.obstacles[leng - 1].y, newWorld.obstacles[leng - 1].h, newWorld.obstacles[leng - 1].w, newWorld.obstacles[leng - 1].type], function(err, result) {
            done();
            if(err) {
              console.log('Error making query', err);
              res.sendStatus(500);
            } else {
              res.sendStatus(201);
          }
        }); //close second query
      }
      }});
    }
  });
}); //END POST ROUTE

function handlePost(err, result) {
  // done();
  if (err) {
    console.log('whoops dog');
    // res.sendStatus(500);
  } else {
    // res.sendStatus(201);
    console.log('well done amigo');
  }
}

//now the problem is "done" is not defined:
// function handlePostDone(err, res) {
//   // done();
//   if (err) {
//     console.log('whoops dog');
//     res.sendStatus(500);
//   } else {
//     res.sendStatus(201);
//   }
// }


module.exports = router;
