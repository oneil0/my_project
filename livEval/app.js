/****
***================================================
***=======IMPORTATION DES MODULES==================
***================================================
****/

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var path = require('path');

var favicon = require('serve-favicon');

var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./app/routes/index');
var users = require('./app/routes/users');

/****
***================================================
***=======FIN IMPORTATION DES MODULES==============
***================================================
****/


var app = express();


/***
***================================================
***======CONFIGURATION DE LA BASE DE DONNÉE========
***================================================
***/
var configDB = require('./config/database.js');

mongoose.connect(configDB.url);



require('./config/passport')(passport);

/***
***================================================
***======CONFIGURATION DES ENGINS DE VUE===========
***================================================
***/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/***
***================================================
***======UTILISATION DES MODULES===================
***================================================
***/
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'ericmartialabcz1234'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



/***
***================================================
***======UTILISATION DU MODULE ROUTE===============
***================================================
***/
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Page introuvable');
    err.status = 404;
    next(err);
});




/***
***================================================
***======GESTION DES ERREURS=======================
***================================================
***/
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
