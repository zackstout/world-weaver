
var express = require('express');
var router = express.Router();
var passport = require('passport');
var pool = require('../modules/pool.js');


router.post('/world', function(req, res) {
  console.log("BODY: ", req.body, "USER: ", req.user.id);
  var newWorld = req.body;
  if (!newWorld.title) {
    newWorld.title = 'Untitled';
  }
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

          if (newWorld.portals) {
          var queryText1 = 'INSERT INTO "portals" ("world_id", "y1", "y2") VALUES ($1, $2, $3);';
          db.query(queryText1, [result.rows[0].id, newWorld.portals.y1, newWorld.portals.y2], handlePost);
        }
          if (leng !== 0) {

            for (var i = 0; i < leng - 1; i++) {
              queryText = 'INSERT INTO "obstacles" ("world_id", "x", "y", "h", "w", "type", "a") VALUES ($1, $2, $3, $4, $5, $6, $7);';
              db.query(queryText, [result.rows[0].id, newWorld.obstacles[i].x, newWorld.obstacles[i].y, newWorld.obstacles[i].h, newWorld.obstacles[i].w, newWorld.obstacles[i].type, newWorld.obstacles[i].a], handlePost);
            }


            queryText = 'INSERT INTO "obstacles" ("world_id", "x", "y", "h", "w", "type", "a") VALUES ($1, $2, $3, $4, $5, $6, $7);';
            db.query(queryText, [result.rows[0].id, newWorld.obstacles[leng - 1].x, newWorld.obstacles[leng - 1].y, newWorld.obstacles[leng - 1].h, newWorld.obstacles[leng - 1].w, newWorld.obstacles[leng - 1].type, newWorld.obstacles[leng - 1].a], function(err, result) {
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

              if (newWorld.portals) {
                  var queryText1 = 'INSERT INTO "portals_saved" ("world_id", "y1", "y2") VALUES ($1, $2, $3);';
                  db.query(queryText1, [result.rows[0].id, newWorld.portals.y1, newWorld.portals.y2], handlePost);
                }
              if (leng !== 0) {

                for (var i = 0; i < leng - 1; i++) {
                  queryText = 'INSERT INTO "obstacles_saved" ("world_id", "x", "y", "h", "w", "type", "a") VALUES ($1, $2, $3, $4, $5, $6, $7);';
                  db.query(queryText, [result.rows[0].id, newWorld.obstacles[i].x, newWorld.obstacles[i].y, newWorld.obstacles[i].h, newWorld.obstacles[i].w, newWorld.obstacles[i].type, newWorld.obstacles[i].a], handlePost);
                }

                queryText = 'INSERT INTO "obstacles_saved" ("world_id", "x", "y", "h", "w", "type", "a") VALUES ($1, $2, $3, $4, $5, $6, $7);';
                db.query(queryText, [result.rows[0].id, newWorld.obstacles[leng - 1].x, newWorld.obstacles[leng - 1].y, newWorld.obstacles[leng - 1].h, newWorld.obstacles[leng - 1].w, newWorld.obstacles[leng - 1].type, newWorld.obstacles[leng - 1].a], function(err, result) {
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


  router.get('/portals', function(req, res) {
    // console.log('get it boi', req.params.id);
    pool.connect(function(err, db, done) {
      if(err) {
        console.log('Error connecting', err);
        res.sendStatus(500);
      } else {
        //we connected to DB
        //issue: will only return worlds that have obstacles in them:
        // var queryText = 'SELECT * FROM "worlds";';
        var queryText = 'SELECT * FROM "portals";';
        // JOIN "favorites" on "worlds"."id" = "favorites"."world_id"

        // var queryText = 'SELECT * FROM "worlds" JOIN "obstacles" ON "worlds"."id" = "obstacles"."world_id" WHERE "maker_id" = $1 GROUP BY "worlds"."id", "obstacles"."id";';
        // JOIN "favorites" on "worlds"."id" = "favorites"."world_id"
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

  router.get('/savedPortals', function(req, res) {
    console.log('WHATUPWHATUP');
    pool.connect(function(err, db, done) {
      if(err) {
        console.log('Error connecting', err);
        res.sendStatus(500);
      } else {
        //we connected to DB
        //issue: will only return worlds that have obstacles in them:
        // var queryText = 'SELECT * FROM "worlds";';
        var queryText = 'SELECT * FROM "portals_saved";';
        // JOIN "favorites" on "worlds"."id" = "favorites"."world_id"

        // var queryText = 'SELECT * FROM "worlds" JOIN "obstacles" ON "worlds"."id" = "obstacles"."world_id" WHERE "maker_id" = $1 GROUP BY "worlds"."id", "obstacles"."id";';
        // JOIN "favorites" on "worlds"."id" = "favorites"."world_id"
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


  router.delete('/saved/delete/:id', function(req, res) {
    console.log(req.params.id, 'idididid');

    pool.connect(function(err, db, done) {
      if(err) {
        console.log('Error connecting', err);
        res.sendStatus(500);
      } else {

        var queryText = 'DELETE FROM "portals_saved" WHERE "world_id" = $1;';

        db.query(queryText, [req.params.id], function(err, result){
          done();
          if(err) {
            console.log('Error making query', err);
            res.sendStatus(500);
          } else {
            var queryText = 'DELETE FROM "obstacles_saved" WHERE "world_id" = $1;';

            db.query(queryText, [req.params.id], function(err, result){
              done();
              if(err) {
                console.log('Error making query', err);
                res.sendStatus(500);
              } else {
                var queryText = 'DELETE FROM "worlds_saved" WHERE "id" = $1;';

                db.query(queryText, [req.params.id], function(err, result){
                  done();
                  if(err) {
                    console.log('Error making query', err);
                    res.sendStatus(500);
                  } else {
                    res.sendStatus(201);
                  }
                });
                // res.sendStatus(201);
              }
            });
            // res.sendStatus(201);
          }
        });
      }
    });

  });

  router.delete('/delete/:id', function(req, res) {
    console.log('get it boi', req.params.id);

    pool.connect(function(err, db, done) {
      if(err) {
        console.log('Error connecting', err);
        res.sendStatus(500);
      } else {
        var queryText = 'DELETE FROM "portals" WHERE "world_id" = $1;';

        db.query(queryText, [req.params.id], function(err, result){
          done();
          if(err) {
            console.log('Error making query', err);
            res.sendStatus(500);
          } else {
            // console.log(result.rows);
            // res.send(result.rows);
            var queryText = 'DELETE FROM "obstacles" WHERE "world_id" = $1;';

            db.query(queryText, [req.params.id], function(err, result){
              done();
              if(err) {
                console.log('Error making query', err);
                res.sendStatus(500);
              } else {
                // console.log(result.rows);
                // res.send(result.rows);
                var queryText = 'DELETE FROM "plays" WHERE "world_id" = $1;';

                db.query(queryText, [req.params.id], function(err, result){
                  done();
                  if(err) {
                    console.log('Error making query', err);
                    res.sendStatus(500);
                  } else {
                    // console.log(result.rows);
                    // res.send(result.rows);
                    var queryText = 'DELETE FROM "favorites" WHERE "world_id" = $1;';

                    db.query(queryText, [req.params.id], function(err, result){
                      done();
                      if(err) {
                        console.log('Error making query', err);
                        res.sendStatus(500);
                      } else {
                        // console.log(result.rows);
                        // res.send(result.rows);
                        var queryText = 'DELETE FROM "worlds" WHERE "id" = $1;';

                        db.query(queryText, [req.params.id], function(err, result){
                          done();
                          if(err) {
                            console.log('Error making query', err);
                            res.sendStatus(500);
                          } else {
                            // console.log(result.rows);
                            res.sendStatus(201);
                          }
                        });

                      }
                    });

                  }
                });

              }
            });

          }
        });
      }
    });
  }); //END DELETE ROUTE



    function handlePost(err, result) {
      if (err) {
        console.log('whoops dog');
      } else {
        console.log('well done amigo');
      }
    }

    module.exports = router;
