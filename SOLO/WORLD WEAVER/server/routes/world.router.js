
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
      var queryText = 'SELECT * FROM "worlds" JOIN "obstacles" ON "worlds"."id" = "obstacles"."world_id" WHERE "worlds"."id" = 2;';
      db.query(queryText, [], function(err, result){
        done();
        if(err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          console.log(result.rows);
          res.send(result.rows);
        }
      });
    }
  });
}); //END SPECIFIC WORLD GET ROUTE


router.get('/:id', function(req, res) {
  console.log('get it boi', req.params.id);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      //we connected to DB
      //issue: will only return worlds that have obstacles in them:
      var queryText = 'SELECT * FROM "worlds" WHERE "maker_id" = $1;';
      // var queryText = 'SELECT * FROM "worlds" JOIN "obstacles" ON "worlds"."id" = "obstacles"."world_id" WHERE "maker_id" = $1 GROUP BY "worlds"."id", "obstacles"."id";';
      db.query(queryText, [req.params.id], function(err, result){
        done();
        if(err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          console.log(result.rows);
          res.send(result.rows);
        }
      });
    }
  });
}); //END WORLDS GET ROUTE


router.get('/obstacles/:id', function(req, res) {
  console.log('get it boi', req.params.id);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      //we connected to DB
      //issue: will only return worlds that have obstacles in them:
      // var queryText = 'SELECT * FROM "worlds" WHERE "maker_id" = $1;';
      var queryText = 'SELECT * FROM "worlds" JOIN "obstacles" ON "worlds"."id" = "obstacles"."world_id" WHERE "maker_id" = $1;';
      db.query(queryText, [req.params.id], function(err, result){
        done();
        if(err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          console.log(result.rows);
          res.send(result.rows);
        }
      });
    }
  });
}); //END WORLDS-OBSTACLES GET ROUTE





router.get('/save/:id', function(req, res) {
  console.log('hashtag savin');
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      //we connected to DB
      //this way gets us all the worlds (regardless of whether they have obstacles), but DOESN'T get the obstacles:
      var queryText = 'SELECT * FROM "worlds_saved" WHERE "maker_id" = $1;';
      db.query(queryText, [req.params.id], function(err, result){
        done();
        if(err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          console.log(result.rows);
          res.send(result.rows);
        }
      });
    }
  });
}); //END SAVEDWORLDS GET ROUTE

router.get('/save/obstacles/:id', function(req, res) {
  console.log('hashtag savin');
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      //we connected to DB
      //this way gets us all the worlds (regardless of whether they have obstacles), but DOESN'T get the obstacles:
      var queryText = 'SELECT * FROM "worlds_saved" JOIN "obstacles_saved" ON "worlds_saved"."id" = "obstacles_saved"."world_id" WHERE "maker_id" = $1;';
      db.query(queryText, [req.params.id], function(err, result){
        done();
        if(err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          console.log(result.rows);
          res.send(result.rows);
        }
      });
    }
  });
}); //END SAVEDWORLDS-OBSTACLES GET ROUTE





router.post('/', function(req, res) {
  console.log("BODY in this route: ", req.body);
  var newWorld = req.body;
  if (!req.body.title) {
    newWorld.title = 'Untitled';
  }
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {

      var queryText = 'INSERT INTO "worlds" ("start_x", "start_y", "end_x", "end_y", "maker_id", "title") VALUES ($1, $2, $3, $4, $5, $6) RETURNING "id";';
      db.query(queryText, [newWorld.start_x, newWorld.start_y, newWorld.end_x, newWorld.end_y, newWorld.userId, newWorld.title], function(err, result){
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
              queryText = 'INSERT INTO "obstacles" ("world_id", "x", "y", "h", "w", "type") VALUES ($1, $2, $3, $4, $5, $6);';
              db.query(queryText, [result.rows[0].id, newWorld.obstacles[i].x, newWorld.obstacles[i].y, newWorld.obstacles[i].h, newWorld.obstacles[i].w, newWorld.obstacles[i].type], handlePost);
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


  router.post('/save', function(req, res) {
    console.log("BODY: ", req.body);
    var newWorld = req.body;
    pool.connect(function(err, db, done) {
      if(err) {
        console.log('Error connecting', err);
        res.sendStatus(500);
      } else {
        var queryText = 'INSERT INTO "worlds_saved" ("start_x", "start_y", "end_x", "end_y", "maker_id") VALUES ($1, $2, $3, $4, $5) RETURNING "id";';
        db.query(queryText, [newWorld.start_x, newWorld.start_y, newWorld.end_x, newWorld.end_y, newWorld.userId], function(err, result){
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
                queryText = 'INSERT INTO "obstacles_saved" ("world_id", "x", "y", "h", "w", "type") VALUES ($1, $2, $3, $4, $5, $6);';
                db.query(queryText, [result.rows[0].id, newWorld.obstacles[i].x, newWorld.obstacles[i].y, newWorld.obstacles[i].h, newWorld.obstacles[i].w, newWorld.obstacles[i].type], handlePost);
              }

              queryText = 'INSERT INTO "obstacles_saved" ("world_id", "x", "y", "h", "w", "type") VALUES ($1, $2, $3, $4, $5, $6);';
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
    }); //END SAVEDWORLDS POST ROUTE

  function handlePost(err, result) {
    if (err) {
      console.log('whoops dog');
    } else {
      console.log('well done amigo');
    }
  }


  module.exports = router;
