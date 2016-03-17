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
var Conf = require("../pay/wx/wxPay.pub.config").WxpayConfig();
var https = require('https');
var http = require('http');
var crypto = require("crypto");

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
exports.createOauthUrlForCode = function (redirectUrl,appid){
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
exports.createOauthUrlForOpenid = function(code,appid,appsecret) {
  var urlJson = {};

  urlJson["appid"] = appid;
  urlJson["secret"] = appsecret;
  urlJson["code"] = code;
  urlJson["grant_type"] = "authorization_code";

  var bizString = formatBizQueryParaMap(urlJson);
  return "https://api.weixin.qq.com/sns/oauth2/access_token?" + bizString;
}