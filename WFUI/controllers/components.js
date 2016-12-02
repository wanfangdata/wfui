var express = require('express');
var router = express.Router();
var menu = require('../data/menu');

/* GET home page. */
router.get('/components/*', function (req, res) {
    var urls = req.url.split('/');
    res.render('index', { page: urls[urls.length - 1], menu: menu });
});

module.exports = router;