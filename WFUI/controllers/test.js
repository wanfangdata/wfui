var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test', function (req, res) {
    res.render('index', { title: 'test' });
});

router.get('/test/index', function (req, res) {
    res.render('index', { title: 'test index' });
});

module.exports = router;