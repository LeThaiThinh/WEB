var express = require('express');
var router = express.Router();

/* GET userlisting. */
router.get('/', function(req, res, next) {
  res.render('home/home', { title: 'home' });
});


module.exports = router;
