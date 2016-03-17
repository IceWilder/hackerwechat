/**
 * 后台API Action
 * @author wdb
 * @param name
 */

var URL         = require("./apiurl");
var DataProxy   = require("data-proxy");
var qs = require('querystring');
function send(req, res, url, params, method,callback) {
    var path = URL.geturl(url);
    console.log(path);
    if(typeof params == "function") {
        callback = params;
        params = {};
    }
    if(method=="GET"){
        params=qs.stringify(params);
        path=path+"?"+params;
    }
    console.log(path);
    new DataProxy({
        req : req,
        res : res,
        reqType : "http",
        reqOption : {
            url :path,
            method:method,
            params : params || {},
            success : callback || function(res,data){
                console.log(data);
                var json = JSON.parse(data);
                //console.log("[[[json]]]",json.data);
                if(json.data === "" || json.data===null) {
                    res.status(200).json(json);
                }else {
                    res.status(200).json(json.data);
                }
            }
        }
    }).handleRequest();
}
exports.send = send;