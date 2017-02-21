var express = require('express');

var routes = [
    {
        key: '/',
        value: require('./controllers/home')
    },
    {
        key: '/components',
        value: require('./controllers/components')
    },
    {
        key: '/guide',
        value: require('./controllers/guide')
    }
];

module.exports = routes;