var express = require('express');
var menu = require('../data/menu');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        page: 'getstarted',
        menu: menu,
        title: 'components'
    });
});

module.exports = router;