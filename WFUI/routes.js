var express = require('express');

var routes = [
    {
        key: '/',
        value: require('./controllers/home')
    }
];

module.exports = routes;
