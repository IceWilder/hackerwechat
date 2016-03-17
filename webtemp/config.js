/**
 * 系统参数配置
 * Created by wdb
 */

exports.upyunPath = function(){
    return {
        //↓↓↓↓↓↓↓↓↓↓请在这里配置您的又拍云存储地址↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        path        : "/",
        bucket      : "hewuqi-image",//空间名
        operator    : "zph",//操作员
        password    : "admin123456",//操作员密码
        endpoint    : "v0"//
    }
}
/**
 * 是否需要流量统计（PV,UV）,true=是，false=否
 * @param url
 * @returns {boolean}
 */
exports.isVisitStat = function(url) {
    var enurl = url;
    if(url.indexOf("?") != -1) {
        enurl = url.substring(0,url.indexOf("?"));
    }
    var filter = ["/wx/article/","/wap/pinfo"];
    for(var i=0;i<filter.length;i++) {
        if(enurl.indexOf(filter[i]) != -1) {
            return true;
        }
    }
    return false;
}
/**
 * 是否,true=是，false=否
 * @param url
 * @returns {boolean}
 */
exports.isVisitStat = function(url) {
    var enurl = url;
    if(url.indexOf("?") != -1) {
        enurl = url.substring(0,url.indexOf("?"));
    }
    var filter = ["/wx/article/","/wap/pinfo"];
    for(var i=0;i<filter.length;i++) {
        if(enurl.indexOf(filter[i]) != -1) {
            return true;
        }
    }
    return false;
}
//拦截白名单
exports.isWhiteList = function(url) {
    var enurl = url;
    if(url.indexOf("?") != -1) {
        enurl = url.substring(0,url.indexOf("?"));
    }
    var filter = ["/favicon.ico"];
    for(var i=0;i<filter.length;i++) {
        if(enurl == filter[i]) {
            return true;
        }
    }
    return false;
}
//验证路由权限,移动端需要登录才能查看的路径
exports.isWapAuthor = function(url) {
    var enurl = url;
    if(url.indexOf("?") != -1) {
        enurl = url.substring(0,url.indexOf("?"));
    }
    var filter = [];
    for(var i=0;i<filter.length;i++) {
        if(enurl == filter[i]) {
            return true;
        }
    }
    return false;
}
//PC端不需要登录就能查看的路径
exports.isPcAuthor = function(url) {
    var enurl = url;
    if(url.indexOf("?") != -1) {
        enurl = url.substring(0,url.indexOf("?"));
    }
    var filter = ["/","/hewuqi/sharevideos","/wechat","/captcha","/login","/quite","/regist","/findpw","/findbyphone",
        "/findbyemail","/resetpwdbyemail","/sendCaptcha","/doResetByMail","/doLogin","/doRegist","/logout", "/doEditPwd"];
    for(var i=0;i<filter.length;i++) {
        if(enurl == filter[i]) {
            return false;
        }
    }
    return true;
}
/**
 * 是否是微信菜单打开的url
 * @param url
 * @returns {boolean}
 */
exports.isOAuthUrl = function(url){
    var enurl = url;
    if(url.indexOf("?") != -1) {
        enurl = url.substring(0,url.indexOf("?"));
    }
    var filter = ['/wap/ms'];
    for(var i=0;i<filter.length;i++) {
        if(enurl == filter[i]) {
            return true;
        }
    }
    return false;
}