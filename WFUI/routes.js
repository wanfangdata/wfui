var express = require('express');

var routes = [
    {
        key: '/',
        value: require('./controllers/home')
    },
    {
        key: '/',
        value: require('./controllers/test')
    }
];

module.exports = routes;
