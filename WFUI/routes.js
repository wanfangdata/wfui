var express = require('express');

var routes = [
    {
        key: '/',
        value: require('./controllers/home')
    },
    {
        key: '/',
        value: require('./controllers/components')
    },
    {
        key: '/',
        value: require('./controllers/guide')
    }
];

module.exports = routes;