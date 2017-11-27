
var express = require('express');
var router = express.Router();
var passport = require('passport');
var pool = require('../modules/pool.js');


router.post('/world', function(req, res) {
  console.log("BODY: ", req.body, "USER: ", req.user.id);
  var newWorld = req.body;
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      var queryText = 'INSERT INTO "worlds" ("start_x", "start_y", "end_x", "end_y", "maker_id", "title") VALUES ($1, $2, $3, $4, $5, $6) RETURNING "id";';
      db.query(queryText, [newWorld.start_x, newWorld.start_y, newWorld.end_x, newWorld.end_y, req.user.id, newWorld.title], function(err, result){
        done();
        if(err) {
          console.log('Error making query', err);
          // res.sendStatus(500);
        } else {
          //don't send anything just yet amigo! UNLESS THERE ARE NO OBSTACLES!
          var leng = newWorld.obstacles.length;

          if (leng == 0) {
            res.sendStatus(201);
          }
          // res.sendStatus(201);
          console.log("RESULT: ", result.rows[0].id);
          //this is a truly disgusting way to do this:
          if (leng !== 0) {

            for (var i = 0; i < leng - 1; i++) {
              queryText = 'INSERT INTO "obstacles" ("world_id", "x", "y", "h", "w", "type", "angle") VALUES ($1, $2, $3, $4, $5, $6, $7);';
              db.query(queryText, [result.rows[0].id, newWorld.obstacles[i].x, newWorld.obstacles[i].y, newWorld.obstacles[i].h, newWorld.obstacles[i].w, newWorld.obstacles[i].type, newWorld.obstacles[i].angle], handlePost);
            }

            queryText = 'INSERT INTO "obstacles" ("world_id", "x", "y", "h", "w", "type", "angle") VALUES ($1, $2, $3, $4, $5, $6, $7);';
            db.query(queryText, [result.rows[0].id, newWorld.obstacles[leng - 1].x, newWorld.obstacles[leng - 1].y, newWorld.obstacles[leng - 1].h, newWorld.obstacles[leng - 1].w, newWorld.obstacles[leng - 1].type, newWorld.obstacles[leng - 1].angle], function(err, result) {
              done();
              if(err) {
                console.log('Error making query', err);
                res.sendStatus(500);
              } else {
                res.sendStatus(201);
              }
            }); //close second query

            // res.sendStatus(201);
          }

        }});
      }
    });
  }); //END POST ROUTE


  router.post('/save', function(req, res) {
    console.log("BODY: ", req.body, "USER: ", req.user.id);
    var newWorld = req.body;
    pool.connect(function(err, db, done) {
      if(err) {
        console.log('Error connecting', err);
        res.sendStatus(500);
      } else {
        var queryText = 'INSERT INTO "worlds_saved" ("start_x", "start_y", "end_x", "end_y", "maker_id") VALUES ($1, $2, $3, $4, $5) RETURNING "id";';
        db.query(queryText, [newWorld.start_x, newWorld.start_y, newWorld.end_x, newWorld.end_y, req.user.id], function(err, result){
          done();
          if(err) {
            console.log('Error making query', err);
            res.sendStatus(500);
          } else {
            //don't send anything just yet amigo! UNLESS THERE ARE NO OBSTACLES!
            var leng = newWorld.obstacles.length;

            if (leng == 0) {
              res.sendStatus(201);
            }
            // res.sendStatus(201);
            console.log("RESULT: ", result.rows[0].id);
            //this is a truly disgusting way to do this:
            if (leng !== 0) {

              for (var i = 0; i < leng - 1; i++) {
                queryText = 'INSERT INTO "obstacles_saved" ("world_id", "x", "y", "h", "w", "type", "angle") VALUES ($1, $2, $3, $4, $5, $6, $7);';
                db.query(queryText, [result.rows[0].id, newWorld.obstacles[i].x, newWorld.obstacles[i].y, newWorld.obstacles[i].h, newWorld.obstacles[i].w, newWorld.obstacles[i].type, newWorld.obstacles[i].angle], handlePost);
              }

              queryText = 'INSERT INTO "obstacles_saved" ("world_id", "x", "y", "h", "w", "type", "angle") VALUES ($1, $2, $3, $4, $5, $6, $7);';
              db.query(queryText, [result.rows[0].id, newWorld.obstacles[leng - 1].x, newWorld.obstacles[leng - 1].y, newWorld.obstacles[leng - 1].h, newWorld.obstacles[leng - 1].w, newWorld.obstacles[leng - 1].type, newWorld.obstacles[leng - 1].angle], function(err, result) {
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
    }); //END SAVEDWORLDS POST ROUTE

  function handlePost(err, result) {
    if (err) {
      console.log('whoops dog');
    } else {
      console.log('well done amigo');
    }
  }

module.exports = router;
