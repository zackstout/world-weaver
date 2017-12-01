
var express = require('express');
var router = express.Router();
var passport = require('passport');
var pool = require('../modules/pool.js');


router.get('/', function(req, res) {
  // console.log('here we are');
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
          // console.log(result.rows);
          res.send(result.rows);
        }
      });
    }
  });
}); //END SPECIFIC WORLD GET ROUTE


router.put('/:id', function(req,res){
  var koalaId = req.params.id;
  console.log(koalaId);
  //res.sendStatus(200);
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      // There was an error and no connection was made
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      // We connected to the db!!!!! pool -1
      var queryText = 'UPDATE "koalas" SET "ready" = \'true\' WHERE "id" = $1;';
      db.query(queryText, [koalaId], function (errorMakingQuery, result) {
        // We have received an error or result at this point
        done(); // pool +1
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          // Send back success!
          res.sendStatus(201);
        }
      }); // END QUERY
    }
  }); // END POOL
});





module.exports = router;
