var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    var items = [];
    for (var i = 0; i < 10; i++) {
        
        items.push({ nick: 'nick' + i, date: new Date(), args: ['zero', 'one'] });
    }
    res.render('index', {
        channel: 'Express'
        , buffer: items
    });
});

module.exports = router;