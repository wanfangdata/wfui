var express = require('express');
var router = express.Router();
var guide = require('../data/guide');

/* GET home page. */
router.get('/guide/*', function (req, res) {
    var urls = req.url.split('/');
    res.render('guide', {
        page: urls[urls.length - 1],
        menu: guide,
        title: 'guide'
    });
});

module.exports = router;