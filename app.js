var express = require('express');
var app = express();
var http = require('http');
var path = require('path');

var config = require('config');
var log= require('libs/log')(module);

http.createServer(app).listen(config.get('port'), function(){
  log.info('Express server listening on port' + config.get('port'))
});
app.set('templates', __dirname + '/templates');
app.set('view engine', 'ejs');

// var favicon = require('serve-favicon');
// app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
// app.use(express.favicon('./public/images/favicon.ico'));

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(express.favicon());
// app.use(express.logger('dev'));
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//middleware
app.use(function (req, res, next) {
  if(req.url=='/') {
      res.end("hallo");
  } else {
    next();
  }
});

app.use(function (req, res, next) {
    if(req.url=='/test') {
        res.end("test");
    } else {
        next();
    }
});
app.use(function (req) {
    if(req.url=='/error') {
  setTimeout(function(){throw new Error("...");});
  return(req.url=='/');
    } else {
        next();
    }
});
app.use(function (req, res, next) {
    if(req.url=='/forbidden') {
        next(new Error("Wops, denied!"));
    } else {
        next();
    }
});

app.use(function (err, req, res, next){
  //NODE_ENV='production'
if (app.get('ENV')=='development') {
  var errorHandler = express.errorhandler();
  errorHandler(err, req, res, next);
 } else {
  res.status(500, 'Error: Something blew up');
}
});

app.use(function (req, res) {
    if(req.url=='/nopage')
        res.send(404, "Page not found, sorry boys");
});


/*
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');



// view engine setup
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', '');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; */
