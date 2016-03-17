var sign = require('./sign.js');
var https = require('https');
var Action = require("../routes/apiaction");
var async = require('async');
var Conf = require("./wx.pub.config").WxConfig();

var url_token   = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
var url_ticket  = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=";


function getTocken(appid,appsecret,callback){
    console.log("=====================> get token");
    url_token += "&appid=" + appid + "&secret=" + appsecret;
    https.get(url_token, function(res) {
        res.on('data', function(d) {
            var dd = d.toString("utf-8");
            var _res = JSON.parse(dd);
            console.log("[getTocken]",_res)
            callback(_res.access_token);
        });

    }).on('error', function(e) {
        console.error(e);
    });
}

function getTicket(token,callback){
    console.log("=====================> get ticket");
    https.get(url_ticket+token, function (res) {
        res.on('data', function (d) {
            var dd = d.toString("utf-8");
            var _res = JSON.parse(dd);
            console.log("[getTicket]",_res)
            callback(token,_res.ticket)
        });

    }).on('error', function (e) {
        console.error(e);
    });
}

function initJSSDK(response, token, ticket, http_url, appid,first){
    console.log("六、开始初始化 JSSdk");
    console.log("    JSSdk ticket=",ticket);
    console.log("    JSSdk http_url=",http_url)
    var signPackage = sign(ticket, http_url);

    signPackage.appid = appid;

    console.log("七、签名结果,signPackage======",signPackage);
    if(first){
        response.cookie('jsapi_ticket', ticket, {path: '/wap', maxAge: 7000000});
        response.cookie('access_token', token, {path: '/wap', maxAge: 7000000});
    }
    response.cookie.wx_appid='';
    response.cookie.wx_timestamp='';
    response.cookie.wx_nonceStr='';
    response.cookie.wx_signature='';
    response.cookie('wx_appid', signPackage.appid, {path: '/wap', maxAge: 7000000});
    response.cookie('wx_timestamp', signPackage.timestamp, {path: '/wap', maxAge: 7000000});
    response.cookie('wx_nonceStr', signPackage.nonceStr, {path: '/wap', maxAge: 7000000});
    response.cookie('wx_signature', signPackage.signature, {path: '/wap', maxAge: 7000000});


}

exports.initSignPackage = function(request,response,callback) {
    var url         = request.originalUrl;
    var http_url    = "http://" + request.hostname + url;
    var token       = request.cookies.access_token;
    var ticket      = request.cookies.jsapi_ticket;

    console.log("    token:",token);
    console.log("    ticket:",ticket);

    var APPID = Conf.APPID;
    var MCHID = Conf.MCHID;
    var KEY = Conf.KEY;
    var APPSECRET = Conf.APPSECRET;

    var config = {APPID: APPID, MCHID: MCHID, KEY: KEY, APPSECRET: APPSECRET};
    var _appid = "";
    var _secret = "";
    if(url.indexOf("/wap/pay")==-1) {//非微信支付页面
        console.log("四、非微信支付页面jssdk")
        config = {APPID:APPID,MCHID:MCHID,KEY:KEY,APPSECRET:APPSECRET};
        _appid = config.APPID;
        _secret = config.APPSECRET;
    } else {//微信支付页面
        console.log("四、jssdk微信支付页面")
        config = {APPID:APPID,MCHID:MCHID,KEY:KEY,APPSECRET:APPSECRET};
        _appid = config.APPID;
        _secret = config.APPSECRET;
    }
    console.log("五、初始化jssdk的Appid和Secret：",_appid,_secret);
    if(!token || !ticket){//tocken,ticket不存在或者过期,需要重新取
        console.log("    tocken,ticket不存在或者过期,需要重新取")
        getTocken(_appid,_secret,function(token){
            getTicket(token,function(token, ticket){
                initJSSDK(response, token, ticket, http_url,_appid, true);
                callback();
            });
        });

    }else{
        console.log("    tocken,ticket没有过期");
        initJSSDK(response, token, ticket, http_url,_appid, false);
        callback();
    }

}