/**
 * Created by gakuin on 1/11/16.
 */
var DataProxy       = require("data-proxy");
var async           = require('async');
var Action          = require("./routes/apiaction");
var https           = require('https');
var utils           = require("./utils");
var sysConfig       = require('./config');
exports.checkSession= function(req, res, next) {
    var url         = req.originalUrl;
    var oldurl      = url;
    var sessionid   = req.cookies.sessionid;
    var boo=sysConfig.isPcAuthor(url);
    if(boo){

        if(!sessionid) {
            console.log('sessionid不正确!');
            res.redirect('/login');
        }else {
            Action.send(req, res,"/admin/checkSession",{session_id:sessionid},"GET",function(res,data){
                var json = JSON.parse(data);
                if(json.code == 1 ){
                    //console.log('账号密码错误!');
                    res.redirect('/login');
                }else {
                    next();
                }
            });
        }
    }else{
         next();
    }


};