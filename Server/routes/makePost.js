var express = require('express');
var router = express.Router();
var Sequelize = require("sequelize");

/* Make a new post. */
router.post('/', function(req, res, next) {

	console.log(" posting -- "  + " , " + req.body  ) ;
	
		 Posts.create({
			content: req.body.params.content,
			latitude: req.body.params.latitude,
			longitude: req.body.params.longitude,
			altitude: req.body.params.altitude
		  });
		  	
	  res.send('posted');
});

module.exports = router;