/* MAIN BACKEND APP.JS */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Sequelize = require("sequelize");
var connect = require('connect');
var http = require('http');
var session = require('express-session');
var Q = require('q');

// LOCAL DB
var db = new Sequelize('mydbname', 'root', '', { // YOU MUST FIRST CREATE A DB IN MYSQL CALLED mydbname
  host: "localhost",
  port: 3306,
  dialectOptions: {
     charset: 'utf8mb4',
     supportBigNumbers: true,
     multipleStatements: true
  }
})

	  Posts = db.define('posts', {
		  
		  postId: {
			 type: Sequelize.UUID,
   			 defaultValue: Sequelize.UUIDV4,
			 primaryKey: true
		  },
		  content: {
		  		type: Sequelize.TEXT 
		  },
		  latitude: {
				type: Sequelize.STRING
		  },
		  longitude: {
				type: Sequelize.STRING
		  },
		  altitude: {
		  		type: Sequelize.STRING
		  }
		},
	
		{
		  freezeTableName: true // Model tableName will be the same as the model name
		});
		
	db.sync(); 
 		
// routes
var app = express();
var routes = require('./routes/index');
var makePost = require('./routes/makePost');
var getPosts = require('./routes/getPosts');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  resave: true, 
  saveUninitialized: true,
  secret: 'something_very_secret',
  cookie : { secure : false, maxAge : (10 * 365 * 24 * 60 * 60 * 1000) }, // 10 yrs
}));

app.use('/', routes);
app.use('/makePost', makePost);
app.use('/getPosts', getPosts);

app.use(express.static(path.join(__dirname, 'public')));

// Session-persisted message middleware
app.use(function(req, res, next){

  req.db = db;
  next(); 
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;