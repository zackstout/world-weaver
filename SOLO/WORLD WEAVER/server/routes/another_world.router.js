
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
      var queryText = 'SELECT "worlds"."id" as id, "users"."id" as user_id, "attempts", "title", "start_x", "start_y", "end_x", "end_y", "username" FROM "worlds" JOIN "users" ON "worlds"."maker_id" = "users"."id";';
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


router.get('/favorites', function(req, res) {
  // console.log('get it boi', req.params.id);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      //we connected to DB
      //issue: will only return worlds that have obstacles in them:
      // var queryText = 'SELECT * FROM "worlds";';
      var queryText = 'SELECT * FROM "favorites" WHERE "user_id" = $1;';
      // JOIN "favorites" on "worlds"."id" = "favorites"."world_id"

      // var queryText = 'SELECT * FROM "worlds" JOIN "obstacles" ON "worlds"."id" = "obstacles"."world_id" WHERE "maker_id" = $1 GROUP BY "worlds"."id", "obstacles"."id";';
      // JOIN "favorites" on "worlds"."id" = "favorites"."world_id"
      db.query(queryText, [req.user.id], function(err, result){
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


router.get('/best', function(req, res) {
  // console.log('get it boi', req.params.id);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      //we connected to DB
      //issue: will only return worlds that have obstacles in them:
      // var queryText = 'SELECT * FROM "worlds";';
      var queryText = 'SELECT "time", "world_id" FROM "plays" WHERE "user_id" = $1;';
      // JOIN "favorites" on "worlds"."id" = "favorites"."world_id"

      // var queryText = 'SELECT * FROM "worlds" JOIN "obstacles" ON "worlds"."id" = "obstacles"."world_id" WHERE "maker_id" = $1 GROUP BY "worlds"."id", "obstacles"."id";';
      // JOIN "favorites" on "worlds"."id" = "favorites"."world_id"
      db.query(queryText, [req.user.id], function(err, result){
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



router.get('/favs', function(req, res) {
  // console.log('get it boi', req.params.id);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      //we connected to DB
      //issue: will only return worlds that have obstacles in them:
      // var queryText = 'SELECT * FROM "worlds";';
      var queryText = 'SELECT COUNT("id"), "world_id" FROM "favorites" GROUP BY "world_id";';
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

router.get('/completions', function(req, res) {
  // console.log('get it boi', req.params.id);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      //we connected to DB
      //issue: will only return worlds that have obstacles in them:
      // var queryText = 'SELECT * FROM "worlds";';
      var queryText = 'SELECT COUNT("id"), "world_id" FROM "plays" GROUP BY "world_id";';
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




router.delete('/delete/:id', function(req, res) {
  console.log('get it boi', req.params.id, req.user.id);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      //we connected to DB

      var queryText = 'DELETE FROM "favorites" WHERE "world_id" = $1 AND "user_id" = $2;';

      db.query(queryText, [req.params.id, req.user.id], function(err, result){
        done();
        if(err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          // console.log(result.rows);
          res.sendStatus(201);
        }
      });
      // res.sendStatus(201);
    }
  });
}); //END ALL WORLDS GET ROUTE (lol "end all worlds")





router.get('/completions/list/', function(req, res) {
  // console.log('get it boi', req.params.id);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      //we connected to DB
      //issue: will only return worlds that have obstacles in them:
      // var queryText = 'SELECT * FROM "worlds";';
      var queryText = 'SELECT "users"."id" as user_id, "plays"."id" as id, "world_id", "time", "username" FROM "plays" JOIN "users" ON "plays"."user_id" = "users"."id";';
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



router.get('/favorites2', function(req, res) {
  // console.log('get it boi', req.params.id);
  pool.connect(function(err, db, done) {
    if(err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    } else {
      //we connected to DB
      //issue: will only return worlds that have obstacles in them:
      // var queryText = 'SELECT * FROM "worlds";';
      var queryText = 'SELECT * FROM "favorites" JOIN "worlds" ON "favorites"."world_id" = "worlds"."id" WHERE "favorites"."user_id" = $1;';
      // JOIN "favorites" on "worlds"."id" = "favorites"."world_id"

      // var queryText = 'SELECT * FROM "worlds" JOIN "obstacles" ON "worlds"."id" = "obstacles"."world_id" WHERE "maker_id" = $1 GROUP BY "worlds"."id", "obstacles"."id";';
      // JOIN "favorites" on "worlds"."id" = "favorites"."world_id"
      db.query(queryText, [req.user.id], function(err, result){
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
  console.log("BODY: ", world.world.attempts, world.id);
  var moreAttempts = world.world.attempts + 1;
  pool.connect(function (err, db, done) {
    if (err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    // } else {
    //   console.log('what up');
    //   res.sendStatus(201);
    // }
    } else {
      var queryText = 'UPDATE "worlds" SET "attempts" = $1 WHERE "id" = $2;';
      db.query(queryText, [moreAttempts, world.id], function (err, result) {
        done(); // pool +1
        if (err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
}); //END POST ROUTE

router.post('/stats2', function(req, res){
  var world = req.body;
  console.log("BODY: ", world);
  var moreAttempts = world.attempts + 1;
  pool.connect(function (err, db, done) {
    if (err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    // } else {
    //   console.log('what up');
    //   res.sendStatus(201);
    // }
    } else {
      var queryText = 'UPDATE "worlds" SET "attempts" = $1 WHERE "id" = $2;';
      db.query(queryText, [moreAttempts, world.id], function (err, result) {
        done(); // pool +1
        if (err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
      // res.sendStatus(201);
    }
  });
}); //END POST ROUTE



router.post('/favorites', function(req, res){
  var world = req.body;
  var user = req.user;
  console.log("BODY: ", world);
  // var moreFaves = world.world.favorites + 1;
  pool.connect(function (err, db, done) {
    if (err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    // } else {
    //   console.log('what up');
    //   res.sendStatus(201);
    // }
    } else {
      var queryText = 'INSERT INTO "favorites" ("world_id", "user_id") VALUES ($1, $2);';
      db.query(queryText, [world.id, req.user.id], function (err, result) {
        done(); // pool +1
        if (err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
      // res.sendStatus(201);
    }
  });
}); //END POST ROUTE


router.post('/times', function(req, res){
  var finish = req.body;
  var user = req.user;
  console.log("BODY: ", finish);
  // var moreFaves = world.world.favorites + 1;
  pool.connect(function (err, db, done) {
    if (err) {
      console.log('Error connecting', err);
      res.sendStatus(500);
    // } else {
    //   console.log('what up');
    //   res.sendStatus(201);
    // }
    } else {
      var queryText = 'INSERT INTO "plays" ("world_id", "user_id", "time") VALUES ($1, $2, $3);';
      db.query(queryText, [finish.worldId, req.user.id, finish.time], function (err, result) {
        done(); // pool +1
        if (err) {
          console.log('Error making query', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
      // res.sendStatus(201);
    }
  });
}); //END POST ROUTE




module.exports = router;
