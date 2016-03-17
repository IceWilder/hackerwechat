/**
 * NodeJS应用服务器启动入口
 *
 * @type {exports|*}
 */
var express = require('express');
var partials = require('express-partials');
var path = require('path');
//var favicon = require('serve-favicon');
/*日志*/
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('dmp-webapp');
var router = require('./routes/router');
var fs = require('fs');
//var checkSession=require('./checkSession');

var app = express();

//端口号
app.set('port', process.env.PORT || 3206);
//设置视图路径
app.set('views', path.join(__dirname, 'views'));
// 设置试图引擎
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//视图片段
app.use(partials());
//日志记录器
app.use(logger('dev'));
//解析客户端请求中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//解析和存储cookie
app.use(cookieParser());
//静态文件支持
app.use(express.static(path.join(__dirname, 'public')));

//拦截器
//app.use(filter.filterFun);
//路由
//app.use(checkSession.checkSession);
app.use(router);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    if (err.status == 404) {
        res.render('404', {
            title: '你找的页面不存在'
        })
    } else {
        res.render('error', {
            message: err.message,
            error: {}
        });
    }
});


var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
//socket io listen
require('./server').listen(server);
