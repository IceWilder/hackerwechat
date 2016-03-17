exports.AlipayConfig = function() {
    var Config = {
        //↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        // 合作身份者ID，以2088开头由16位纯数字组成的字符串,2088701589786009  2088411712474720
        partner:"2088411712474720",

        // 交易安全检验码，由数字和字母组成的32位字符串,7l8ik0xef68xgjygqlr455m0mfeuwazt  4hbrfb2szivl5t2ryq6q7pzmjfd5q8gt
        key:"4hbrfb2szivl5t2ryq6q7pzmjfd5q8gt",

        // 签约支付宝账号或卖家收款支付宝帐户,corp@novemideas.com  conbamall@126.com
        seller_account_name:"conbamall@126.com",

        // 支付宝服务器通知的页面 要用 http://格式的完整路径，不允许加?id:123这类自定义参数
        // 必须保证其地址能够在互联网中访问的到
        notify_url:"/wap/notify",

        // 当前页面跳转后的页面 要用 http://格式的完整路径，不允许加?id:123这类自定义参数
        call_back_url:"/wap/return",

        //操作中断返回地址
        merchant_url : "/merchant",
        //用户付款中途退出返回商户的地址。需http://格式的完整路径，不允许加?id=123这类自定义参数


        //req_data详细信息
        service_create:"alipay.wap.trade.create.direct",

        service_auth:"alipay.wap.auth.authAndExecute",
        // 支付宝通知验证地址
        //ALIPAY_HOST: "mapi.alipay.com",
        //HTTPS_VERIFY_PATH: "/gateway.do?service=notify_verify&",
        //ALIPAY_PATH:"gateway.do?",
        //支付宝网关地址
        ALIPAY_GATEWAY_NEW : "http://wappaygw.alipay.com/service/rest.htm?",

        //↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

        // 调试用，创建TXT日志路径
        log_path:"~/alipay_log_.txt",

        // 字符编码格式 目前支持 gbk 或 utf-8，nodejs只支持utf-8
        input_charset:"utf-8",

        // 签名方式 不需修改
        sign_type:"MD5"
    }
    return Config;
};
