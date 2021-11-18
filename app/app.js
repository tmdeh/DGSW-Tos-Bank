var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var accountRouter = require('./routes/account');
var usersRouter = require('./routes/user');
var profileRounter = require('./routes/profile');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/images',express.static(path.join(__dirname, 'images')));
app.use(cors());

app.use('/user', usersRouter);
app.use('/account', accountRouter);
app.use('/profile', profileRounter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 에러 핸들러
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {err};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
