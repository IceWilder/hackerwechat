var info = require("./config").AlipayConfig();
var api = require("./alipay-wap-api");
var async = require('async');
var xmlreader = require('xmlreader');
var Action = require("../routes/apiaction");

exports.alipayto = function(request,response) {
    var orderid = request.param("orderid");
    console.log("orderid"+orderid);
    ////请与贵网站订单系统中的唯一订单号匹配,给订单号加个时间戳
    var out_trade_no = orderid + "_" + api.createTimestamp();
    console.log("out_no=",out_trade_no)
    //订单名称，显示在支付宝收银台里的“商品名称”里，显示在支付宝的交易管理的“商品名称”的列表里。
    //var subject = request.param("title");
    var subject = "订单支付";
    //订单总金额，显示在支付宝收银台里的“应付总额”里
    var total_fee = request.param("amount");
    var host = "http://" + request.headers.host;
    console.log(out_trade_no,subject,total_fee);

        //var partner ="2088411712474720";
        //var seller_account_name = "conbamall@126.com";
        //var key = "4hbrfb2szivl5t2ryq6q7pzmjfd5q8gt";
    //后台配置取出配置   partner   account  key
    var configed=true;//是否已配置
    Action.send(request,response,"getAliConf",{novem:request.cookies.novem},function(response,data){
        var json = JSON.parse(data);
        console.log("后台配置"+data);

        if(json.code==0){
            json=json.data;
            info.partner=json.alipay_partner;
            info.seller_account_name=json.alipay_seller_account_name;
            info.key=json.alipay_key;

            console.log('当前配置',info)
            var partner =info.partner;
            var seller_account_name =info.seller_account_name;
            var key = info.key;

            var req = api.createReq(api.services.create, partner);
            var ret = {
                redirect: '',
                token: null
            };
            req.req_id = out_trade_no;
            return async.series([
                function(cb) {
                    req.req_data = {
                        subject: subject,
                        out_trade_no: out_trade_no,
                        total_fee: total_fee,
                        seller_account_name: seller_account_name,
                        call_back_url: host + info.call_back_url,
                        notify_url: host + info.notify_url,
                        merchant_url: host + info.merchant_url
                    };
                    req.req_data = api.toReqData('direct_trade_create_req', req.req_data);
                    console.log(req.req_data);
                    req.sign = api.getSign(req, key);

                    return api.sendCreate(req,function(err, res) {
                        console.log(err);
                        console.log(res);
                        if (err) {
                            return cb(err);
                        }
                        //if (req.sign !== api.getSign(req)) {
                        //    return cb('bad sign from alipay server');
                        //}
                        ret.token = api.parseTokenFromXml(res.res_data);
                        ret.redirect = api.createAuthUrl(ret.token,partner,key);
                        return cb(null);
                    });
                }
            ], function(err) {
                console.log("redirect",ret.redirect);
                response.redirect(ret.redirect);//手机即时到帐
            });
        }else{
            response.status(200).send('商家未配置支付宝配置');
            return;
        }
    });

};

exports.notify = function(req,res) {
    console.log("notify",req.notify_data);
    return xmlreader.read(req.notify_data, function(err, xdoc) {
        var done, notify, notify_id, _ref;
        if (err) {
            return done(err);
        }
        notify = xdoc.notify;
        notify_id = notify != null ? (_ref = notify.notify_id) != null ? _ref.text() : void 0 : void 0;
        if (!notify_id) {
            return done('bad notify_data');
        }
        done = function(response) {
            var _ref1, _ref2;
            if ('string' !== typeof response) {
                console.error("response notify error: " + ((_ref1 = (_ref2 = response != null ? response.stack : void 0) != null ? _ref2 : response) != null ? _ref1 : ''));
                response = 'server error';
            }
            if (response !== 'success') {
                console.error("response notify: " + response);
            }
            return callback(response === 'success' ? err : response);
        };
        var out_trade_no, trade_status;
        trade_status = notify.trade_status.text();
        if (trade_status === 'TRADE_FINISHED' || trade_status === 'TRADE_SUCCESS') {
            if (req.sign !== api.getNotitySign(req)) {
                return done('bad sign');
            }
            out_trade_no = notify.out_trade_no.text();
            return done('success');
        } else {
            return done('unknown trade status');
        }
    });
};
exports.back = function(req,res) {
    var result = req.param("result"),
        out_trade_no = req.param("out_trade_no"),
        request_token = req.param("request_token"),
        trade_no = req.param("trade_no"),
        sign = req.param("sign");

    var orderid = out_trade_no.split("_")[0];
    var signJson = {
        "out_trade_no":out_trade_no,
        "request_token":request_token,
        "result" :result,
        "trade_no":trade_no
    };
    //后台验证订单状态，必须为等待付款的状态下才可修改
    var partner =info.partner;
    var seller_account_name =info.seller_account_name;
    var key = info.key;

        //对回调进行签名验证
        if(api.getSign(signJson,key) != sign) {
            res.send("签名有误,订单支付未完成，请联系管理员");
            return;
        }
        if (orderid && result == "success") {
        	console.log('paid');
            Action.send(req,res,"payOrder",{order_id:orderid ? orderid : -1,type:'ali'},function(res,data){
                var json = JSON.parse(data);
                if(json.code == 0) {
                    //res.statusCode = 302;
                    //res.setHeader("Location", "/wap/orderlist?status=2");
                    //res.end();
                    res.send('支付成功请回到微信端确认');
                } else if(json.code == 1) {
                    res.send(json.msg);
                }
            });
        } else {
            var sessionid = req.cookies.sessionid;
            if(!sessionid) {
                res.render ('mobile/login',{layout:'mobile/layout-mobile',bottom:'',prodid:0,prodnum:0});
            }else {
                Action.send(req,res,"getOrderById",{order_id:orderid ? orderid : -1},function(res,data){
                    var json = JSON.parse(data);
                    var order = json.data;
                    res.render ('mobile/pay',{layout:'mobile/layout-mobile',bottom:'',order:order});
                });
            }
        }
};
exports.merchant = function(req,res) {
    console.log("back",req.notify_data);
};
////手机充值
//exports.alipayrecharge = function(request,response) {
//
//    //请与贵网站订单系统中的唯一订单号匹配,使用时间戳作为订单号
//    var out_trade_no = "";//parseInt(new Date().getTime());
//
//    //订单名称，显示在支付宝收银台里的“商品名称”里，显示在支付宝的交易管理的“商品名称”的列表里。
//    var subject = "账户充值";
//
//    //订单总金额，显示在支付宝收银台里的“应付总额”里
//    var total_fee = request.param("amount");
//
//    var sessionid = request.cookies.sessionid;
//
//    //获取商家支付宝配置信息
//    Action.send(request,response,"getAliPayConfig",function(res,data){
//        var json = JSON.parse(data);
//        if(!json.data) {
//            res.status(200).json("商家关闭支付接口，请联系管理员");
//            return;
//        }
//        var alipay = json.data;
//
//        var partner = alipay.alipay_partner;
//        var seller_account_name = alipay.alipay_seller_account_name;
//        var key = alipay.alipay_key;
//
//        var req = api.createReq(api.services.create, partner);
//        var ret = {
//            redirect: '',
//            token: null
//        };
//        //创建支付流水
//        var host = "http://" + request.headers.host;
//        Action.send(request,response,"createAlipayStream",{amount:total_fee},function(res,data){
//            var json    = JSON.parse(data),
//                ms      = json.data;
//            out_trade_no = "res_"+ms.ums_id;//支付流水号，作为订单号
//
//            req.req_id = out_trade_no;
//            return async.series([
//                function(cb) {
//                    req.req_data = {
//                        subject: subject,
//                        out_trade_no: out_trade_no,
//                        total_fee: total_fee,
//                        seller_account_name: seller_account_name,
//                        extra_common_param:sessionid,
//                        call_back_url: host + "/wap/returnma",
//                        notify_url: host + "/wap/notifyma",
//                        merchant_url: host + "/wap/myaccount"
//                    };
//                    req.req_data = api.toReqData('direct_trade_create_req', req.req_data);
//                    req.sign = api.getSign(req, key);
//
//                    return api.sendCreate(req,function(err, res) {
//                        if (err) {
//                            return cb(err);
//                        }
//                        //if (req.sign !== api.getSign(req)) {
//                        //    return cb('bad sign from alipay server');
//                        //}
//                        ret.token = api.parseTokenFromXml(res.res_data);
//                        ret.redirect = api.createAuthUrl(ret.token,partner,key);
//                        return cb(null);
//                    });
//                }
//            ], function(err) {
//                console.log(ret.redirect);
//                response.redirect(ret.redirect);//手机即时到帐
//            });
//        });
//    });
//};
////支付宝充值通知回调
//exports.notifyma = function(req,res) {
//    var result = req.param("result");
//    var flowid = req.param("out_trade_no");
//    console.log("notifyma",req.notify_data,result,flowid);
//
//    //return xmlreader.read(req.notify_data, function(err, xdoc) {
//    //    var done, notify, notify_id, _ref;
//    //    if (err) {
//    //        return done(err);
//    //    }
//    //    notify = xdoc.notify;
//    //    notify_id = notify != null ? (_ref = notify.notify_id) != null ? _ref.text() : void 0 : void 0;
//    //    if (!notify_id) {
//    //        return done('bad notify_data');
//    //    }
//    //    done = function(response) {
//    //        var _ref1, _ref2;
//    //        if ('string' !== typeof response) {
//    //            console.error("response notify error: " + ((_ref1 = (_ref2 = response != null ? response.stack : void 0) != null ? _ref2 : response) != null ? _ref1 : ''));
//    //            response = 'server error';
//    //        }
//    //        if (response !== 'success') {
//    //            console.error("response notify: " + response);
//    //        }
//    //        return callback(response === 'success' ? err : response);
//    //    };
//    //    var out_trade_no, trade_status;
//    //    trade_status = notify.trade_status.text();
//    //    if (trade_status === 'TRADE_FINISHED' || trade_status === 'TRADE_SUCCESS') {
//    //        if (req.sign !== api.getNotitySign(req)) {
//    //            return done('bad sign');
//    //        }
//    //        out_trade_no = notify.out_trade_no.text();
//    //        console.log("=========",out_trade_no);
//    //        return done('success');
//    //    } else {
//    //        return done('unknown trade status');
//    //    }
//    //});
//};
////支付宝账户充值回调
//exports.backma = function(req,res) {
//    var result = req.param("result");
//    var flowid = req.param("out_trade_no");
//    if (flowid && result == "success") {
//        Action.send(req,res,"updateAlipayStream",{flowid:flowid ? flowid : "res_0"},function(res,data){
//            var json = JSON.parse(data);
//            console.log(json)
//            res.render ('mobile/myaccount',{layout:'mobile/layout-single'});
//        });
//    } else {
//        console.log("充值失败");
//    }
//};
//
////购买购物卡
//exports.alipayvo = function(request,response) {
//
//    //请与贵网站订单系统中的唯一订单号匹配,使用时间戳作为订单号
//    var out_trade_no = "";//parseInt(new Date().getTime());
//
//    //订单名称，显示在支付宝收银台里的“商品名称”里，显示在支付宝的交易管理的“商品名称”的列表里。
//    var subject = "购买购物卡";
//
//    //订单总金额，显示在支付宝收银台里的“应付总额”里
//    var total_fee = request.param("amount");
//    var type=request.param("type");
//    console.log(type);
//    var sessionid = request.cookies.sessionid;
//
//    //获取商家支付宝配置信息
//    Action.send(request,response,"getAliPayConfig",function(res,data){
//        var json = JSON.parse(data);
//        if(!json.data) {
//            res.status(200).json("商家关闭支付接口，请联系管理员");
//            return;
//        }
//        var alipay = json.data;
//
//        var partner = alipay.alipay_partner;
//        var seller_account_name = alipay.alipay_seller_account_name;
//        var key = alipay.alipay_key;
//
//        var req = api.createReq(api.services.create, partner);
//        var ret = {
//            redirect: '',
//            token: null
//        };
//        //创建购买购物卡流水
//        var host = "http://" + request.headers.host;
//        Action.send(request,response,"createVoucherStream",{buy_num:total_fee,type:type==1?type:""},function(res,data){
//            var json    = JSON.parse(data),
//                svs      = json.data;
//            out_trade_no = "res_"+svs.svs_id;//支付流水号，作为订单号
//
//            req.req_id = out_trade_no;
//            return async.series([
//                function(cb) {
//                    req.req_data = {
//                        subject: subject,
//                        out_trade_no: out_trade_no,
//                        total_fee: total_fee,
//                        seller_account_name: seller_account_name,
//                        extra_common_param:sessionid,
//                        call_back_url: host + "/wap/returnvo",
//                        notify_url: host + "/wap/notifyvo",
//                        merchant_url: host + "/wap/ms"
//                    };
//                    req.req_data = api.toReqData('direct_trade_create_req', req.req_data);
//                    req.sign = api.getSign(req, key);
//
//                    return api.sendCreate(req,function(err, res) {
//                        if (err) {
//                            return cb(err);
//                        }
//                        //if (req.sign !== api.getSign(req)) {
//                        //    return cb('bad sign from alipay server');
//                        //}
//                        ret.token = api.parseTokenFromXml(res.res_data);
//                        ret.redirect = api.createAuthUrl(ret.token,partner,key);
//                        return cb(null);
//                    });
//                }
//            ], function(err) {
//                console.log(ret.redirect);
//                response.redirect(ret.redirect);//手机即时到帐
//            });
//        });
//    });
//};
//
////购买幸福卡
//exports.xingfuka = function(request,response) {
//    //请与贵网站订单系统中的唯一订单号匹配,使用时间戳作为订单号
//    var out_trade_no = "";//parseInt(new Date().getTime());
//
//    //订单名称，显示在支付宝收银台里的“商品名称”里，显示在支付宝的交易管理的“商品名称”的列表里。
//    var subject = "购买购物卡";
//
//    //订单总金额，显示在支付宝收银台里的“应付总额”里
//    var total_fee = request.param("amount");
//
//    var sessionid = request.cookies.sessionid;
//
//    //获取商家支付宝配置信息
//    Action.send(request,response,"getAliPayConfig",function(res,data){
//        var json = JSON.parse(data);
//        if(!json.data) {
//            res.status(200).json("商家关闭支付接口，请联系管理员");
//            return;
//        }
//        var alipay = json.data;
//
//        var partner = alipay.alipay_partner;
//        var seller_account_name = alipay.alipay_seller_account_name;
//        var key = alipay.alipay_key;
//
//        var req = api.createReq(api.services.create, partner);
//        var ret = {
//            redirect: '',
//            token: null
//        };
//        //创建购买购物卡流水
//        var host = "http://" + request.headers.host;
//        Action.send(request,response,"buyFelicityCard",{mon_amount:total_fee},function(res,data){
//            var json    = JSON.parse(data);
//            var svs     = json.data;
//            if(json.code == 1) {
//                res.status(200).json(json.msg);
//                return;
//            }
//            out_trade_no = "res_"+svs.sfc_id;//支付流水号，作为订单号
//
//            req.req_id = out_trade_no;
//            return async.series([
//                function(cb) {
//                    req.req_data = {
//                        subject: subject,
//                        out_trade_no: out_trade_no,
//                        total_fee: total_fee,
//                        seller_account_name: seller_account_name,
//                        extra_common_param:sessionid,
//                        call_back_url: host + "/wap/returnvo",
//                        notify_url: host + "/wap/notifyvo",
//                        merchant_url: host + "/wap/ms"
//                    };
//                    req.req_data = api.toReqData('direct_trade_create_req', req.req_data);
//                    req.sign = api.getSign(req, key);
//
//                    return api.sendCreate(req,function(err, res) {
//                        if (err) {
//                            return cb(err);
//                        }
//                        //if (req.sign !== api.getSign(req)) {
//                        //    return cb('bad sign from alipay server');
//                        //}
//                        ret.token = api.parseTokenFromXml(res.res_data);
//                        ret.redirect = api.createAuthUrl(ret.token,partner,key);
//                        return cb(null);
//                    });
//                }
//            ], function(err) {
//                console.log(ret.redirect);
//                response.redirect(ret.redirect);//手机即时到帐
//            });
//        });
//    });
//};
////购买购物卡通知回调
//exports.notifyvo = function(req,res) {
//    var result = req.param("result");
//    var flowid = req.param("out_trade_no");
//    console.log("notifyma",req.notify_data,result,flowid);
//
//    //return xmlreader.read(req.notify_data, function(err, xdoc) {
//    //    var done, notify, notify_id, _ref;
//    //    if (err) {
//    //        return done(err);
//    //    }
//    //    notify = xdoc.notify;
//    //    notify_id = notify != null ? (_ref = notify.notify_id) != null ? _ref.text() : void 0 : void 0;
//    //    if (!notify_id) {
//    //        return done('bad notify_data');
//    //    }
//    //    done = function(response) {
//    //        var _ref1, _ref2;
//    //        if ('string' !== typeof response) {
//    //            console.error("response notify error: " + ((_ref1 = (_ref2 = response != null ? response.stack : void 0) != null ? _ref2 : response) != null ? _ref1 : ''));
//    //            response = 'server error';
//    //        }
//    //        if (response !== 'success') {
//    //            console.error("response notify: " + response);
//    //        }
//    //        return callback(response === 'success' ? err : response);
//    //    };
//    //    var out_trade_no, trade_status;
//    //    trade_status = notify.trade_status.text();
//    //    if (trade_status === 'TRADE_FINISHED' || trade_status === 'TRADE_SUCCESS') {
//    //        if (req.sign !== api.getNotitySign(req)) {
//    //            return done('bad sign');
//    //        }
//    //        out_trade_no = notify.out_trade_no.text();
//    //        console.log("=========",out_trade_no);
//    //        return done('success');
//    //    } else {
//    //        return done('unknown trade status');
//    //    }
//    //});
//};
////购买购物卡充值回调
//exports.backvo = function(req,res) {
//    var result = req.param("result");
//    var flowid = req.param("out_trade_no");
//
//    var request_token = req.param("request_token"),
//        trade_no = req.param("trade_no"),
//        sign = req.param("sign");
//
//    var signJson = {
//        "out_trade_no":flowid,
//        "request_token":request_token,
//        "result" :result,
//        "trade_no":trade_no
//    };
//    //获取支付宝配置信息
//    Action.send(req,res,"getAliPayConfig",function(res,data){
//        var json = JSON.parse(data);
//        var alipay = json.data;
//        var partner = alipay.alipay_partner;
//        var seller_account_name = alipay.alipay_seller_account_name;
//        var key = alipay.alipay_key;
//
//        //对回调进行签名验证
//        if(api.getSign(signJson,key) != sign) {
//            res.send("签名有误,订单支付未完成，请联系管理员");
//            return;
//        }
//        if (flowid && result == "success") {
//            Action.send(req,res,"payVoucherStream",{flowid:flowid ? flowid : "res_0"},function(res,data){
//                var json = JSON.parse(data);
//                console.log(json)
//                if(json.code == 0) {
//                    res.render ('mobile/vouchersrule',{layout:'mobile/layout-single'});
//                } else if(json.code == 1) {
//                    res.send(json.msg);
//                }
//            });
//        } else {
//            res.send("支付宝回调有误,订单支付未完成，请联系管理员");
//        }
//    });
//};