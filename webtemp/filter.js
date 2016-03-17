/**
 * 路由拦截器
 * Created by wdb
 */
var sysConfig       = require('./config');
var wxUtils         = require("./weixin/weixin");
var wxConf          = require("./weixin/wx.pub.config").WxConfig();
var utils           = require("./utils");
var DataProxy       = require("data-proxy");
var async           = require('async');
var Action          = require("./routes/apiaction");
var https           = require('https');
var jssdk			= require('./weixin/jssdk');
var expiredTime     = 900000000;
var webdebug        = true;
//var t=1;
exports.filterFun = function (req, res, next) {
    //clearCookies(req, res, next);
    console.log("***************开始******************")
    //白名单校验
    var url = req.originalUrl;
    console.log(url);
    var boo = sysConfig.isWhiteList(url);
    if(boo) {
        return next();
    } else {
        console.log("*******************拦截************************");
        clientFun(req, res,next);
    }

}

var clearCookies = function(req, res, next){
    res.clearCookie('sessionid', { path: '/wap' });
    res.clearCookie('username', { path: '/wap' });
    res.clearCookie('userid', { path: '/wap' });
    res.clearCookie('role', { path: '/wap' });
    req.cookies.sessionid = undefined;
    req.cookies.username = undefined;
    req.cookies.userid = undefined;
    req.cookies.role = undefined;

    clearWxCookies(req, res, next);
}
var clearWxCookies = function(req, res, next){
    res.clearCookie('openid', { path: '/wap' });
    res.clearCookie('jsapi_ticket', { path: '/wap' });
    res.clearCookie('access_token', { path: '/wap' });
    res.clearCookie('wx_appid', { path: '/wap' });
    res.clearCookie('wx_signature', { path: '/wap' });
    res.clearCookie('wx_nonceStr', { path: '/wap' });
    res.clearCookie('wx_timestamp', { path: '/wap' });

    req.cookies.openid = undefined;
    req.cookies.jsapi_ticket = undefined;
    req.cookies.access_token = undefined;
    req.cookies.wx_appid = undefined;
    req.cookies.wx_signature = undefined;
    req.cookies.wx_nonceStr = undefined;
    req.cookies.wx_timestamp = undefined;
}
//保存分享链接参数
var saveSharelink = function(req, res,to_openid,from_openid) {
    var param={to_open_id:to_openid,from_open_id:from_openid,url:encodeURIComponent(req.url)};
    console.log(param);
    Action.send(req, res,"saveShareLink",param,function(res,data) {
        console.log("保存分享参数成功",data);
    });
}

var clientFun = function(req, res, next) {

    var url     = req.originalUrl;
    var referer = req.headers.referer;
    console.log("    ====clientFun=======",url,referer);
    //if(url.indexOf("/api/") != -1 || url.indexOf("/callback") != -1 || url.indexOf("/wxnotify/") != -1||url.indexOf('/alipayto')!=-1||url.indexOf('/return')!=-1||url.indexOf('/notify')!=-1) {//调用接口
    if(url.indexOf("/api/") != -1 || url.indexOf("/js/biz") != -1||url.indexOf("/upload")!=-1 || url.indexOf("/wxnotify/") != -1) {//调用接口
        return next();
    } else if(url.indexOf("/wap") == -1) {//PC
        console.log("[[[PC]]]");
        clientPc(req, res, next);
    }else {//移动端
        console.log("[[[移动端]]]");
        if(url.indexOf("/pay") != -1 || (referer && referer.indexOf("/pay") != -1)){//前面页面是支付页面
            console.log("要跳往的或者要离开的是支付页面,clearWxCookies");
            clearWxCookies(req, res, next);
        }
        clientWap(req, res, next);
    }
}
//PC
var clientPc = function(req, res, next) {
    var url         = req.originalUrl;
    var oldurl      = url;
    var sessionid   = req.cookies.sessionid;
    var boo         = false,//标记是否需要登录,false=不需要登录，true=要登录
        login       = "",

        boo     = sysConfig.isPcAuthor(url);
    login   = "/login?tourl=" + oldurl;

    if (boo) {//需要登录
        if(!sessionid) {
            res.redirect('/login');
        }else {
            Action.send(req, res,"check",{sessionid:sessionid},function(res,data){
                var json = JSON.parse(data);
                if(json.code == 1 ){
                    res.redirect('/login');
                }else {
                    return next();
                }
            });
        }
    }else {
        return next();
    }
}
//Mobile
var clientWap = function(req, res, next) {
    nextWx(req,res,next);
}
//处理微信浏览器打开
var nextWx = function(req,res,next) {

    if(utils.brows(req.headers['user-agent']).weixin) {//从微信客户端进入
        //初始化openid
        initOpenID(req,res,next,function(){
            nextLink(req,res,next);
        });

    } else {//浏览器打开
        if(webdebug){
            console.log("浏览器打开")
            var url = req.originalUrl;
            var boo = sysConfig.isWapAuthor(url);

            var openid="o0Edot4YVIzSUYbdwMxJBgLWREKI";//王超  openid，非VIP



            res.cookie('openid', openid, {path: '/wap', maxAge: 7000000});
            res.cookie('mobile',"test",{path:'/wap', maxAge: 7000000});
            var sessionid   = req.cookies.sessionid;
            req.cookies.openid = openid;
            doWxLogin(req,res,next,function(){
                nextLink(req,res,next);
            });
        }else{
            res.send('非调试模式无权查看');
        }
    }
}
var nextLink = function(req,res,next) {
    console.log("*****************[[[nextLink]]]*************************")
    var openid = req.cookies.openid;
    var code = req.param("code");//如果只存在则说明 连接从微信客户端授权过来
    var from_openid = req.param("from_openid");//分享链接带参数
    var state = req.param("state");//分享链接带参数
    console.log(req.url);
    if(!from_openid) {
        console.log('no from_openid',from_openid)
        from_openid = "";
    }
    if(state && state != 'STATE') {
        from_openid = state;
    }

    if(openid && from_openid) {
        console.log("点击分享url"+req.url);
        saveSharelink(req, res,openid,from_openid);
    }

    //if(sysConfig.needSdk(req.url)){
    jssdk.initSignPackage(req,res,function(){
        return next();
    });
    //}else{
    //    return next();
    //}
    console.log("*************************************************************")
    console.log("***************结束******************")
    console.log("*************************************************************")

}

//初始化openid,订阅号和服务号不一样
var initOpenID = function(req,res,next,callback) {

    var url         = req.originalUrl;
    var openid      = req.cookies.openid;

    console.log("一、连接从微信客户端进入， url: "+url+"  openid=" + openid);

    if(!openid) {
        getOpenID(req,res,next,callback);
    } else {
        if(url.indexOf("/pay")!=-1) {
            console.log("二、openid存在,支付页面,重新取openid")
            getOpenID(req,res,next,callback);
        } else {
            console.log("二、openid存在,并且不是支付页面")
            doWxLogin(req,res,next,callback);

        }
    }
}
//获取openid
var getOpenID = function(req,res,next,callback) {
    var code        = req.param("code");

    var url         = req.originalUrl;
    var openid      = req.cookies.openid;
    var hostname    = req.hostname;
    var from_openid = req.param("from_openid");//分享链接带参数
    var hosturl = "http://" + hostname + url;
    if(hosturl.indexOf('&state=STATE')!=-1)
        hosturl=hosturl.replace('&state=STATE','');

    //有时微信请求来时有2个code 导致一直 invalid code 一直获取
    if(code&&code.length==2){//测试是否应该使用第一个
        var errorcode=code[1];
        hosturl=hosturl.replace("code="+errorcode+"","fake=fake");
    }
    var config = wxConf;
    type = 0;//服务号

    return async.waterfall([
        function(cb) {
            console.log("=========Step1: 授权页面 ============",code);
            if(!code) {
                //触发微信返回code码
                var url_code = wxUtils.createOauthUrlForCode(hosturl,config.APPID,from_openid);
                console.log("触发微信返回code码",url_code);
                res.redirect(url_code);
            } else {
                //获取code码，以获取openid
                cb(null,code);
            }
        },
        function(code,cb) {

            console.log("=========Step2: 获取openid ============",code);
            if(!typeof code == "string"){
                code=code.split(",")[0]
            }
            var url_openid = wxUtils.createOauthUrlForOpenid(code,config.APPID,config.APPSECRET);
            console.log("=========Step2: url_openid ============",url_openid);
            https.get(url_openid, function(res) {
                res.on('data', function(d) {
                    var dd = d.toString("utf-8");
                    var _res = JSON.parse(dd);
                    console.log("    ======result=",_res);
                    if(_res.errcode) {
                        openid = -1;
                        cb(null);
                    }
                    if(_res.openid) {
                        openid = _res.openid;
                        console.log("成功取得openid=",openid);
                        cb(null);
                    }
                });

            }).on('error', function(e) {
                console.error(e);
            });
        }
    ], function(err) {
        if(openid != -1) {
            console.log("=======Step3-0: 将openid保存到cookie ========");
            req.cookies.openid = openid;
            res.cookie('openid', openid, {path: '/wap', maxAge: 7000000});
            doWxLogin(req,res,next,callback);
        } else {
            console.log("=======Step3-1: 重新取openid ========");
            var url_code = wxUtils.createOauthUrlForCode(hosturl,config.APPID,from_openid);
            console.log("触发微信返回code码",url_code);
            res.redirect(url_code);
        }
    });
}
//微信端自动登录
var doWxLogin = function(req,res,next,callback) {
    var url         = req.originalUrl;
    var sessionid   = req.cookies.sessionid;
    var openid      = req.cookies.openid;

    console.log("doWxLogin",sessionid,openid);
    if(!sessionid) {//没做自动登录
        console.log("三、sessionid不存在")
        if(openid) {
            autoWxLogin(req,res,next,callback);
        } else {
            res.redirect("/wap/login?tourl="+url);
        }
    }else {
        console.log("三、sessionid存在",sessionid)

        Action.send(req, res,"check",{sessionid:sessionid},function(res,data){
            var json = JSON.parse(data);
            console.log('check'+data);
            if(json.code == 1 ){
                if(openid) {
                    autoWxLogin(req,res,next,callback);
                } else {
                    //res.redirect("/wap/login?tourl="+url);
                }
            }else {
                if(callback) {
                    callback();
                }
            }
        });
    }
    //}
}
var autoWxLogin = function(req,res,next,callback) {
    var openid = req.cookies.openid || "";
    console.log("autoWxLogin")
    Action.send(req, res,"doWxLogin",{openid:openid},function(res,data){
        //console.log(openid);
        var json = JSON.parse(data);
        console.log("登录结果：",json)
        if(json.code == 0){
            res.cookie('sessionid',  json.data.sessionid,{path: '/wap', maxAge: expiredTime});
            res.cookie('userid', json.data.user_id,{path: '/wap', maxAge: expiredTime});
            res.cookie('mobile', json.data.user_mobile,{path: '/wap', maxAge: expiredTime});
            req.cookies.sessionid = json.data.sessionid;
            req.cookies.userid = json.data.user_id;
            req.cookies.mobile = json.data.user_mobile;

            if(callback) {
                callback();
            }
        } else if(json.code == 1 || json.code == 2) {
            res.end(json.msg);
        } else if(json.code == 3) { //用户不存在
            console.log("    用户不存在=====")
            initWxUser(req,res,next,callback);
        }
    });
}
//初始化微信用户
var initWxUser = function(req,res,next,callback) {
    var code            = req.param("code");
    var url             = req.originalUrl;
    var openid          = req.cookies.openid;
    var hostname        = req.hostname;
    var from_openid     = req.param("from_openid");//分享链接带参数
    var state           = req.param('state');
    var hosturl         = "http://" + hostname + url;
    var ui_access_token = req.cookies.ui_access_token;

    if(hosturl.indexOf('&state=STATE')!=-1)
        hosturl=hosturl.replace('&state=STATE','');
    if(state&&state!='undefined')
        from_openid=state;
    var user = {};

    console.log("=================初始化微信用户 initWxUser==================")
    var config = wxConf;

    //如果用户第一次进 getopenid后有code再拉取用户信息时也会使用code造成冲突
    hosturl=hosturl.replace('code=','fake=');
    return async.waterfall([
        function(cb) {
            console.log("=========Step1: 授权页面[initWxUser]============",code);
            if(!code) {
                //触发微信返回code码
                var url_code = wxUtils.createOauthUrlForCodeUInfo(hosturl,config.APPID,from_openid);
                console.log("触发微信返回code码",url_code);
                res.redirect(url_code);
            } else {
                //获取code码，以获取openid
                cb(null,code);
            }
        },
        function(code,cb) {
            console.log("=========Step2: 获取openid[initWxUser] ============",code);
            var url_accesstoken = wxUtils.createOauthUrlForAccessToken(config.APPID,config.APPSECRET,code);
            console.log("[url_accesstoken]",url_accesstoken)
            if(ui_access_token) {
                cb(null,ui_access_token);
            } else {
                https.get(url_accesstoken, function(res) {
                    res.on('data', function(d) {
                        var dd = d.toString("utf-8");
                        var _res = JSON.parse(dd);
                        console.log("    ======[url_accesstoken]result=",_res);
                        if(_res.errcode) {
                            openid = -1;
                            ui_access_token = -1;
                        }
                        if(_res.openid) {
                            openid = _res.openid;
                            ui_access_token = _res.access_token;
                            console.log("成功取得openid access_token=",_res);
                        }
                        cb(null,ui_access_token);
                    });

                }).on('error', function(e) {
                    console.error(e);
                });
            }
        },
        function(access_token,cb) {
            console.log("=========Step3: 根据获取access_token openid拉取用户信息 ============access_token=",access_token);
            if(ui_access_token == -1) {
                cb(null);
            } else {
                var url_user = wxUtils.createOauthUrlForUserinfo(access_token,openid);
                console.log("=========Step3-0: url_user ============",url_user);
                https.get(url_user, function(res) {
                    res.on('data', function(d) {
                        var dd = d.toString("utf-8");
                        var _res = JSON.parse(dd);
                        console.log("    ======result=",_res);
                        if(_res.errcode) {
                            user = null;
                            cb(null);
                        }
                        if(_res.openid) {
                            user.openid         = _res.openid;
                            user.nickname       = _res.nickname;
                            user.sex            = _res.sex;
                            user.province       = _res.province;
                            user.city           = _res.city;
                            user.country        = _res.country;
                            user.headimgurl     = _res.headimgurl;

                            console.log("成功取得user=",user);
                            cb(null);
                        }
                    });

                }).on('error', function(e) {
                    console.error(e);
                });
            }
        }
    ], function(err) {
        if(openid == -1) {
            //触发微信返回code码
            var url_code = wxUtils.createOauthUrlForCodeUInfo(hosturl,config.APPID,from_openid);
            console.log("触发微信返回code码",url_code);
            res.redirect(url_code);
        } else {
            if(ui_access_token) {
                console.log("=======Step2-0: 将access_token保存到cookie[initWxUser] ========");
                req.cookies.ui_access_token = ui_access_token;
                res.cookie('ui_access_token', ui_access_token, {path: '/wap', maxAge: 7000});
            }
            saveWxUser(req,res,next,user,callback);
        }
    });
}
//保存微信用户信息

var saveWxUser = function(req,res,next,user,callback) {
    if(user) {
        console.log(user);
        Action.send(req, res,"saveWxUser",user,function(res,data) {
            var json = JSON.parse(data);
            if(json.code == 0) {
                doWxLogin(req,res,next,callback);
            } else {
                console.log(data);
                console.log("保存微信用户信息失败")
            }
        });
    }
}