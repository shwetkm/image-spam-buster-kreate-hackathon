const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api/*',
        proxy({
            target: 'http://139.59.59.9',
            changeOrigin: true,
        })
    );
};