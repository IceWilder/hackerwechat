var express = require('express');
var router = express.Router();

//登录注册模块路由
require("./login/login-router").loginRouter(router);


//文件上传路由
require("./upload/upload-router").uploadRouter(router);

//通用路由
require("./common/common-router").commonRouter(router);

//PC路由
require("./keb/keb-router").hwqRouter(router);
require("./keb/keb-api").hwqAPI(router);
require("./hacker/hacker-router").hackerRouter(router);
module.exports = router;
