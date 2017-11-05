
// requires
var express = require( 'express' );
var app = express();

var port = 6006;

app.use(express.static('server/public'));

// spin up server
app.listen(port, function (req, res) {
  console.log('thx for listening on:', port);
});
