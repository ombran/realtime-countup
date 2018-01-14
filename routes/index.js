var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Count up' });
});

router.get('/show', function(req, res) {
  res.render('show', { title: 'Show' });
});

module.exports = router;
