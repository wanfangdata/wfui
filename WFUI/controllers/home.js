var express = require('express');
var menu = require('../data/menu');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    var items = [];
    
    res.render('index', {
        menu: menu
    });
});

module.exports = router;