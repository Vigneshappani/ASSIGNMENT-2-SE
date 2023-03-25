var passport = require('passport');
var config = require('./auth');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;
var User = require("../models/user");
const { getAccessToken } = require('../controllers/user');

var localOptions = {
	usernameField: 'email'
};

var localLogin = new LocalStrategy(localOptions, function(username, password, done){
	User.findOne(
		{
		  email: username,
		},
		(err, user) => {
			if (err) {				
				return done(null, false, {err: 'Login failed. Please try again.'});
			}
			return done(error= null, user= user);
		}
	).catch(err => {
		return done(null, false, {err: 'Login failed. Please try again.'});
	});
});


var jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.secret,
	ignoreExpiration: false,
	passReqToCallback: true
};

var jwtLogin = new JwtStrategy(jwtOptions, function(cli_request, payload, done){
	console.log("jwtLogin");	
	if (payload.refresh){
		User.findOne(
			{
			  email: payload.user.email,
			},
			(err, user) => {
				if(err){
					return cli_request.res.status(401).send({ message: `No permission granted since ${err}` })
				}
				if (user == null){
					return cli_request.res.status(401).send({ message: `No permission granted since user not fount` })
				}else{					
					return cli_request.res.status(200).send({
						token: getAccessToken(user)
					})
				}
			}
		)
	}else{
		User.findOne(
			{
			  email: payload.email,
			},
			(err, user) => {
				if(err){
					return done(null, false, {error: 'Please try again.'});
				}
				if (user == null){
					return done(null, false, {error: 'Please try again.'});
				}else{					
					return done(null,  {...user,userId: user._id} );
				}
			}
		)
	}
});

passport.use(jwtLogin);
passport.use(localLogin);