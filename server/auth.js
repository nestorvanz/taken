var config = require('./config'),
	crypto = require('crypto'),
	jwt = require('jsonwebtoken'),
	path = require('path'),
	session = require('client-sessions');

module.exports = {
	api: function( req, res, next ){
		var token = req.headers.token || req.query.token;
		if( token ){
			try{
				req.user = jwt.verify(token, config.secretString);
				next();
			} catch( error ){
				res.status(403).send("Invalid token. Renew your session and try again.");
			}
		} else {
			res.status(500).send("You need a token to complete the request.");
		}
	},
	cookie: function(){
		return session({
			cookieName: config.cookieName, // cookie name dictates the key name added to the request object
			secret: this.hash(config.secretString), // should be a large unguessable string
			duration: config.maxDays * 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
			requestKey: 'session', // requestKey overrides cookieName for the key name added to the request object.
			cookie: {
				// path: '/api', // cookie will only be sent to requests under '/api'
				// maxAge: 60000, // duration of the cookie in milliseconds, defaults to duration above
				ephemeral: false, // when true, cookie expires when the browser closes
				httpOnly: true, // when true, cookie is not accessible from javascript
				secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
			}
		});
	},
	hash: function( str ){
		return crypto.createHmac("sha256", config.secretString).update(str).digest("hex");
	},
	token: function( data, days ){
		return jwt.sign(data, config.secretString, {
			expiresIn: days * 24 * 60 * 60
		});
	},
	tokenData: function( token ){
		try{ return jwt.verify(token, config.secretString); }
		catch( error ){ return false; }
	},
	web: function( req, res, next ){
		if( req.session && req.session.token ){
			try{
				jwt.verify(req.session.token, config.secretString);
				next();
			} catch( error ){
				res.sendFile(path.join(__dirname, '../app/sign_in/index.html'));
			}
		} else {
			res.sendFile(path.join(__dirname, '../app/sign_in/index.html'));
		}
	}
};
