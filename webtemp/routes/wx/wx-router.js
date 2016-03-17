var DataProxy = require("data-proxy");
var fs = require('fs');
var ejs = require('ejs');
var Action = require("../apiaction");
var jssdk = require('../../weixin/jssdk.js');
var WxPay = require('../../pay/wx/wxpay-wap-api.js');
var xmlreader = require('xmlreader');


exports.wxRouter = function(router){
    router.get('/wx/list',function(req,res){
        res.render ('wx/accountlist',{layout:'wx/layout-iframe'});
    });
    router.get('/wx/addacc',function(req,res){
        res.render ('wx/addaccout',{layout:'wx/layout-iframe'});
    });

    router.get('/wx/article/:id',function(req,res){
        var art_id = req.param("id"),
            url="selarticlelist",
            params={art_id:art_id};
        Action.send(req,res,url,params, function (res,data) {
            var json=JSON.parse(data);
            res.render ('agent/article/sharepage',{articlist:json.data,layout:false});
        });
    });
    //商城订单微信支付成功回调
    router.post('/wxnotify/', function(req, res) {
        console.log("[[[[[[[[[[-----------商城订单微信支付成功回调--------]]]]]]]]]]")
        req.on('data', function(d) {
            var XML_RES = d.toString("utf-8");
            console.log("result XML:",XML_RES);
            return xmlreader.read(XML_RES, function(err, xdoc) {
                var _xml, out_trade_no,orderid,sessionid;
                _xml = xdoc.xml;

                out_trade_no = _xml.out_trade_no.text();
                sessionid = _xml.attach.text();
                if(out_trade_no) {
                    orderid = out_trade_no;
                    console.log("orderid:",out_trade_no,"sessionid:",sessionid);
                    req.cookies.sessionid = sessionid;
                    Action.send(req,res,"payOrder",{order_id:orderid,sessionid:sessionid,type:'wx'},function(res,data){
                        var json = JSON.parse(data);
                        console.log(json);
                        if(json.code == 0) {
                            var orders = json.data;
                            //res.render ('mobile/orderlist',{layout:'mobile/layout-mobile',bottom:'',orders:orders});
                            res.end("success");
                        } else if(json.code == 1) {
                            console.log("微信支付回调,修改订单有误：",json.msg);
                        }
                    });
                }
            });
        });
    });

}