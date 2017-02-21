var express = require('express');
var menu = require('../data/menu');
var router = express.Router();

/* GET home page. */
router.get('/*', (req, res) => {
    var urls = req.url.split('/');
    res.render('index', {
        page: urls[urls.length - 1],
        menu: menu,
        title: 'components'
    });
});

module.exports = router;