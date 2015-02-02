/****
***================================================
***=======IMPORTATION DES MODULES==================
***================================================
****/
var express  = require('express');
var passport = require('passport');
var mongoose = require('mongoose');

var bcrypt   = require('bcrypt-nodejs');

/****
***================================================
***=======FIN IMPORTATION DES MODULES==============
***================================================
****/

var router   = express.Router();


/*
**IMPORTATION DU MODELE
*/
var User = require('../models/user');
/*
**FIN IMPORTATION DU MODELE
*/

/*
**GET PROFILE UTILISATEUR
*/
router.get('/profile', isLoggedIn, function(req, res) {
	res.render('profile', {
		title        : "Bienvenu " + req.user.name.first + " " + req.user.name.last,
		user         : req.user,
		type_profile : req.user.profile
	});
});
/*
**GET ETUDIANT UTILISATEUR
*/
router.get('/StudentsList', isLoggedIn, function(req, res) {
	User.find({'profile':'etudiant'}, function(err, etudiantList) {
		if (err) { throw err; }
		res.json(etudiantList);
	});
	
});
/*
**GET ETUDIANT UTILISATEUR
*/
// router.post('/AddStudent/:id', isLoggedIn, function(req, res) {
// 	User.update(
// 		{'_id':id},
// 		{
// 			$set : {
// 				'prof':''
// 			}
// 		}
// 	)
// });
/*
**GET LISTE UTILISATEUR
*/
router.get('/UsersList', isLoggedIn, function(req, res) {
	User.find(null, function(err, userList) {
		if (err) { throw err; }
		res.json(userList);
	});
});

/*
**POST DONNÉE POUR LA CREATION UTILISATEUR
*/
router.post('/createUser', isLoggedIn, function(req, res) {
	console.log('CREATION D\'UN NOUVEL UTILISATEUR');

	var postUser = req.body;
	if (postUser.password == postUser.Repassword) {
		postUser.password = bcrypt.hashSync(postUser.password, bcrypt.genSaltSync(8), null);
	}

	var newUser = new User({
		name : postUser.name,
		email: postUser.email,
		password: postUser.password,
		profile : postUser.profile,
		fiche : [{}]
	});

	newUser.save(function (err) {
	  if (err) { throw err; }
	  console.log('Utilisateur : '+newUser.name.first+' '+newUser.name.last+' ajouté avec succès !');
	  res.json(newUser);
	});
});

/*
**DECONNEXION D'UN UTILISATEUR
*/
router.delete('/deleteUser/:id', isLoggedIn, function(req, res) {
	var id =  req.params.id;
	var id = String(id);

	User.remove({_id : mongoose.Types.ObjectId(id)}, function(err, doc) {
		if (err) { throw err; }
		console.log(doc);
	});
});

/*
**DECONNEXION D'UN UTILISATEUR
*/
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});




/*
**VERIFICATION DE CONNEXION
*/
function isLoggedIn (req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}

module.exports = router;
