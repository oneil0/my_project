var express  = require('express');
var passport = require('passport');


var router   = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { 
		title   : 'Bienvenu ',
		message : req.flash('loginMessage')
	});
});

/* GET signin page. */
router.post('/login', passport.authenticate('local-login',
	{
		successRedirect : '/users/profile',

		failureRedirect : '/',

		failureFlash    : true
	}
));

/* GET about page. */
router.get('/about', function(req, res) {
	res.render('about', { 
		title  : 'A propos',
	});
});

/*
*	FIN TRAITEMENT FORMULAIRE DE SIGNUP
*/



function isLoggedIn (req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}


module.exports = router;
