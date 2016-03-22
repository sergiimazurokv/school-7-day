var koa = require('koa'),
    config = require('config');
    koamemcached = require('./helpers/koa-memcached')('127.0.0.1:11211');

var app = koa();

app.use(koamemcached);

//Comment this line to disable koa-body-parser
require('./helpers/bodyparser')(app);
require('./routes')(app);

app.listen(config.server.port, function () {
    console.log('%s listening at port %d', config.app.name, config.server.port);
});
