var express = require('express');
var router = express.Router();
var Sequelize = require("sequelize");

/* GET LOCAL posts. */
router.post('/', function(req, res, next) {
			
		console.log(" looking for local posts");
		
		var latitudeUser = new Number(req.body.params.latitude) ;
		var longitudeUser = new Number(req.body.params.longitude) ;
		
		console.log("latitude: " + latitudeUser);
		console.log("longitude: " + longitudeUser);
		
		Posts.findAll({ order: [['createdAt', 'DESC']] , 
			where: { latitude: {$between: [latitudeUser - 0.3, latitudeUser + 0.3 ]}, 
					longitude: {$between: [longitudeUser - 0.4, longitudeUser + 0.4 ]}}
				   })
					.then(function(posts) {
			    	console.log("found posts " + JSON.stringify(posts) );
				  res.send(posts);
			}).catch(function(err) {
				console.log(" can't find posts " + err);
				res.send('error_getting_posts');
		  });
	
});

module.exports = router;