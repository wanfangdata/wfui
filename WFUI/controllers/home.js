var express = require('express');
var router = express.Router();
var menu = require('../data/menu');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        page: 'getstarted',
        menu: menu,
        title: 'components'
    });
});

module.exports = router;