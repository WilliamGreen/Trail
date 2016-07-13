var express = require('express');
var router = express.Router();
var Sequelize = require("sequelize");

/* GET home page. */
router.get('/', function(req, res, next) {
		
  res.render('index', { title: 'BigWhoop' });
  
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello there!' });
});

module.exports = router;
