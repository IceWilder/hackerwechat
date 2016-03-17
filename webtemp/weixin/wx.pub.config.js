/**
 * Created by novem on 2/10/15.
 */
exports.WxConfig = function() {
    var Config = {
        //=======【基本信息设置】=====================================
        //微信公众号身份的唯一标识。审核通过后，在微信发送的邮件中查看
        //APPID : 'wx2569350388929e2e',
        APPID : 'wx73b7c476f270efe9',
        //受理商ID，身份标识
        //MCHID : '1231122502',
        MCHID : '1253777401',
        //商户支付密钥Key。
        KEY : 'wdb8hufh7dsfsy7y72udhshsdudsj9tu',
        //JSAPI接口中获取openid，审核后在公众平台开启开发模式后可查看
        APPSECRET : '15f8934339375a9a3ca395413d212fee',

        //=======【JSAPI路径设置】===================================
        //获取access_token过程中的跳转uri，通过跳转将code传入jsapi支付页面
        JS_API_CALL_URL : '/wap/pay/',

        //=======【证书路径设置】=====================================
        //证书路径,注意应该填写绝对路径
        SSLCERT_PATH : '/xxx/xxx/xxxx/WxPayPubHelper/cacert/apiclient_cert.pem',
        SSLKEY_PATH : '/xxx/xxx/xxxx/WxPayPubHelper/cacert/apiclient_key.pem',

        //=======【异步通知url设置】===================================
        //异步通知url，商户根据实际开发过程设定
        NOTIFY_URL : '/wxnotify/',
        //=======【curl超时设置】===================================
        //本例程通过curl使用HTTP POST方法，此处可修改其超时时间，默认为30秒
        CURL_TIMEOUT : 30
    }
    return Config;
};
