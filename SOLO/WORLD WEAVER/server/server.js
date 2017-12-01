
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var pool = require('modules/pool.js');

var passport = require('./strategies/sql.localstrategy');
var sessionConfig = require('./modules/session.config');

// Route includes
var indexRouter = require('./routes/index.router');
var userRouter = require('./routes/user.router');
var registerRouter = require('./routes/register.router');
var worldRouter = require('./routes/world.router.js');
var moreRouter = require('./routes/another_world.router.js');
var editRouter = require('./routes/edit.router.js');
var tutRouter = require('./routes/tutorial.router.js');




var port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use('/edit', editRouter);
app.use('/worlds', worldRouter);
app.use('/more', moreRouter);
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/tutorial', tutRouter);


// Catch all bucket, must be last!
app.use('/', indexRouter);

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});
