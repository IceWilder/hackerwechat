/**
 * 微信支付帮助库
 * ====================================================
 * 接口分三种类型：
 * 【请求型接口】--Wxpay_client_
 * 		统一支付接口类--UnifiedOrder
 * 		订单查询接口--OrderQuery
 * 		退款申请接口--Refund
 * 		退款查询接口--RefundQuery
 * 		对账单接口--DownloadBill
 * 		短链接转换接口--ShortUrl
 * 【响应型接口】--Wxpay_server_
 * 		通用通知接口--Notify
 * 		Native支付——请求商家获取商品信息接口--NativeCall
 * 【其他】
 * 		静态链接二维码--NativeLink
 * 		JSAPI支付--JsApi
 * =====================================================
 * 【CommonUtil】常用工具：
 * 		trimString()，设置参数时需要用到的字符处理函数
 * 		createNoncestr()，产生随机字符串，不长于32位
 * 		formatBizQueryParaMap(),格式化参数，签名过程需要用到
 * 		getSign(),生成签名
 * 		arrayToXml(),array转xml
 * 		xmlToArray(),xml转 array
 * 		postXmlCurl(),以post方式提交xml到对应的接口url
 * 		postXmlSSLCurl(),使用证书，以post方式提交xml到对应的接口url
 */
var Conf = require("../../weixin/wx.pub.config").WxConfig();
var https = require('https');
var http = require('http');
var Action = require("../../routes/apiaction");
var async = require('async');
var crypto = require("crypto");
var utils = require("../../utils");
var querystring = require('querystring');
var xmlreader = require('xmlreader');

var parameters = "";//jsapi参数，格式为json

/**
 * 	作用：格式化参数，签名过程需要使用
 */
var formatBizQueryParaMap = function (args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function (key) {
        newArgs[key] = args[key];
    });

    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
};
/**
 * 生成时间戳
 * @returns {string}
 */
var createTimestamp = function () {
    return parseInt(new Date().getTime() / 1000) + '';
};
/**
 * 生成随机字符串
 * @returns {string}
 */
var createNonceStr = function () {
    return Math.random().toString(36).substr(2, 32);
};
/**
 * 生成签名
 * @param jsapi_ticket
 * @param url
 * @returns {{jsapi_ticket: *, nonceStr: string, timestamp: string, url: *}}
 */
var getSign = function (args,key) {
    console.log("==========开始签名==========")
    var Str = formatBizQueryParaMap(args);
    console.log(Str)
    Str += "&key=" + key;
    console.log(Str)
    //MD5加密
    Str = crypto.createHash('md5').update(Str, 'utf8').digest('hex');

    //所有字符转为大写
    Str = Str.toUpperCase();
    return Str;
};

var toXml = function(params) {
    var keys = Object.keys(params);
    var xml = "<xml>";
    keys.forEach(function (key) {
        var val = params[key];
        if (!isNaN(val)) {
            xml += "<"+key+">"+val+"</"+key+">";

        }
        else {
            //xml += "<"+key+"><![CDATA["+val+"]]></"+key+">";
            xml += "<"+key+">" + val + "</"+key+">";
        }

    });
    xml += "</xml>";
    return xml;
}
var JsApi_pub = function(request,response,callback) {

}

/**
 * 	作用：生成可以获得code的url
 */
var  createOauthUrlForCode = function (redirectUrl,appid){
    var urlJson = {};
    urlJson["appid"] = appid;
    urlJson["redirect_uri"] = redirectUrl;
    urlJson["response_type"] = "code";
    urlJson["scope"] = "snsapi_base";
    urlJson["state"] = "STATE" + "#wechat_redirect";

    var bizString = formatBizQueryParaMap(urlJson);

    return "https://open.weixin.qq.com/connect/oauth2/authorize?" + bizString;
}

/**
 * 	作用：生成可以获得openid的url
 */
var createOauthUrlForOpenid = function(code,appid,appsecret) {
    var urlJson = {};

    urlJson["appid"] = appid;
    urlJson["secret"] = appsecret;
    urlJson["code"] = code;
    urlJson["grant_type"] = "authorization_code";

    var bizString = formatBizQueryParaMap(urlJson);
    return "https://api.weixin.qq.com/sns/oauth2/access_token?" + bizString;
}
//微信支付 统一下单参数
exports.jsApiParameters = function(req,res,params,callback,type) {
    var code = req.param("code");
    var openid = "";
    var ip = utils.getClientIP(req);
    var url_code = "";
    var order_id = params.order_id;//订单
    var flower_id= params.id;//鲜花
    var host = req.hostname;
    var hosturl = "http://"+host;
    var url     = req.originalUrl;
    var ret = {};

    //orderid = orderid ? orderid : params.orderid;
    console.log("微信支付 统一下单参数")
    var config = Conf;
    //替换微信支付配置  APPID  MCHID  KEY APPSECRET
    var payjson="";

    console.log(config);

    var NOTIFY_URL = Conf.NOTIFY_URL;


    //商家微信支付
        return async.waterfall([
            //获取商家微信支付配置信息
            function(cb) {
                openid = req.cookies.openid;
                console.log("=========Step1: 获取openid============",openid);
                cb(null,openid);
            },
            function(openid,cb) {
                console.log("=========Step2: 调用微信统一支付接口 获取prepay_id============",openid);
                var url_unifiedorder = "https://api.mch.weixin.qq.com/pay/unifiedorder";

                var parameters = {
                    "appid"         : config.APPID,//公众账号ID
                    "attach"        : params.sessionid,//商家数据，
                    "body"          : params.body,//商品描述
                    "mch_id"        : config.MCHID,//商户号
                    "nonce_str"     : createNonceStr(),//createNonceStr(),//随机字符串
                    "notify_url"    : hosturl + NOTIFY_URL,//通知地址
                    "openid"        : openid,
                    "out_trade_no"  : order_id+"_"+flower_id+"_"+createTimestamp(),//订单号
                    "spbill_create_ip" : ip,//终端ip
                    "total_fee"     : params.total_fee,//总金额
                    "trade_type"    : "JSAPI"//交易类型
                };
                parameters["sign"] = getSign(parameters,config.KEY);//签名

                var xml = toXml(parameters);

                var options = {
                    hostname: 'api.mch.weixin.qq.com',
                    port: 443,
                    path: '/pay/unifiedorder',
                    method: 'POST'
                };

                var wx_req = https.request(options,function(res) {
                    res.on('data', function(buffer){
                        var return_xml = buffer.toString();
                        console.log("=============获取prepay_id返回结果=",return_xml);
                        return xmlreader.read(return_xml, function(err, xdoc) {
                            var  xmlbody,prepay_id, _ref;
                            if (err) {
                                console.log(err)
                            }
                            xmlbody = xdoc.xml;
                            if(xmlbody.return_code.text() == "SUCCESS" && xmlbody.result_code.text() == "SUCCESS") {
                                prepay_id = xmlbody.prepay_id.text();
                            } else {
                                prepay_id = xmlbody.return_msg.text();
                            }
                            cb(null,prepay_id);
                        });
                    });
                }).on('error', function(e) {
                    console.error(e);
                });

                wx_req.write(xml);
                wx_req.end();
            },
            function(prepay_id,cb) {
                console.log("==============Step3: prepay_id 返回前台调起支付================");
                var jsApiObj = {
                    "appId":config.APPID,
                    "timeStamp" : createTimestamp(),
                    "nonceStr" : createNonceStr(),
                    "package" : "prepay_id="+prepay_id,
                    "signType" : "MD5"
                };
                jsApiObj["paySign"] = getSign(jsApiObj,config.KEY);

                ret.parameters = jsApiObj;
                cb(null);
            },
        ], function(err) {
            console.log("ret::::::::",ret);
            callback(ret.parameters);
        });
}