var express = require('express');

var routes = [
    {
        key: '/',
        value: require('./controllers/home')
    },
    {
        key: '/',
        value: require('./controllers/components')
    }
];

module.exports = routes;