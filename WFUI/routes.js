module.exports = [
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