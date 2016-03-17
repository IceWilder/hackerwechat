var crypto = require("crypto");
var request = require("request");
var querystring = require('querystring');
var api_url = "http://wappaygw.alipay.com/service/rest.htm";
var info = require("./config").AlipayConfig();
var regexTokenXml = /<request_token>(.*)<\/request_token>/;

module.exports = api = {
        services: {
            create: "alipay.wap.trade.create.direct",
            auth: "alipay.wap.auth.authAndExecute"
        },
        toReqData: function(name, obj) {
            var arr, k, v;
            arr = ["<" + name + ">"];
            for (k in obj) {
                v = obj[k];
                arr.push("<" + k + ">" + v + "</" + k + ">");
            }
            arr.push("</" + name + ">");
            return arr.join('');
        },
        createReq: function(service, partner, req_data) {
            return {
                service: service,
                format: 'xml',
                v: '2.0',
                partner: partner,
                sec_id: 'MD5',
                sign: null,
                req_data: req_data
            };
        },
        parseTokenFromXml: function(xml) {
            var m, _ref;
            if (!xml) {
                return null;
            }
            m = regexTokenXml.exec(xml);
            return m != null ? (_ref = m[1]) != null ? _ref.trim() : void 0 : void 0;
        },
        getSign: function(obj, key) {
            var arr, i, k, src, v;
            if (key == null) {
                key = '';
            }
            if (!obj) {
                return null;
            }
            arr = (function() {
                var _results;
                _results = [];
                for (k in obj) {
                    v = obj[k];
                    if (k !== 'sign' && (v != null) && v !== '') {
                        _results.push([k, v]);
                    }
                }
                return _results;
            })();
            arr.sort();
            src = ((function() {
                var _i, _len, _results;
                _results = [];
                for (_i = 0, _len = arr.length; _i < _len; _i++) {
                    i = arr[_i];
                    _results.push("" + i[0] + "=" + i[1]);
                }
                return _results;
            })()).join('&');
            src = "" + src + key;
            return crypto.createHash('md5').update(src, 'utf8').digest('hex');
        },
        getNotitySign: function(obj, key) {
            var k, src;
            if (key == null) {
                key = '';
            }
            if (!obj) {
                return null;
            }
            src = ((function() {
                var _i, _len, _ref, _results;
                _ref = ["service", "v", "sec_id", "notify_data"];
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    k = _ref[_i];
                    _results.push("" + k + "=" + obj[k]);
                }
                return _results;
            })()).join('&');
            src = "" + src + key;
            return crypto.createHash('md5').update(src, 'utf8').digest('hex');
        },
        sendCreate: function(req,done) {
            var opt;
            opt = {
                url: createCreateUrl(req)
            };
            request.get(opt, function(err, res, body) {
                var ret;
                if (err) {
                    return done(err);
                }
                if (!body) {
                    body = "";
                }
                ret = querystring.parse(body);
                body = null;
                return done(null, ret);
            });
        },
        createAuthUrl: function(token, partner,key) {
            var req;
            if (token == null) {
                token = '';
            }
            if (key == null) {
                key = '';
            }
            req = api.createReq(api.services.auth,partner);
            req.req_data = "<auth_and_execute_req><request_token>" + token + "</request_token></auth_and_execute_req>";
            req.sign = api.getSign(req, key);
            return createAuthUrl(req);
        },
        createTimestamp : function () {
            return parseInt(new Date().getTime() / 1000) + '';
        }
    };

    var createCreateUrl = function(req) {
        //var url;
        //url = "" + api_url + "?";
        //url += "req_data=" + (encodeURIComponent(req.req_data));
        //url += "&service=" + (encodeURIComponent(req.service));
        //url += "&sec_id=" + (encodeURIComponent(req.sec_id));
        //url += "&partner=" + (encodeURIComponent(req.partner));
        //url += "&req_id=" + (encodeURIComponent(req.req_id));
        //url += "&sign=" + (encodeURIComponent(req.sign));
        //url += "&format=" + (encodeURIComponent(req.format));
        //url += "&v=" + (encodeURIComponent(req.v));
        //return url;
        var url;
        url = "" + api_url + "?";
        url += "req_data=" + (req.req_data);
        url += "&service=" + (req.service);
        url += "&sec_id=" + (req.sec_id);
        url += "&partner=" + (req.partner);
        url += "&req_id=" + (req.req_id);
        url += "&sign=" + (req.sign);
        url += "&format=" + (req.format);
        url += "&v=" + (req.v);
        return url;
    };

    var createAuthUrl = function(req) {
        //var url;
        //url = "" + api_url + "?";
        //url += "req_data=" + (encodeURIComponent(req.req_data));
        //url += "&service=" + (encodeURIComponent(req.service));
        //url += "&sec_id=" + (encodeURIComponent(req.sec_id));
        //url += "&partner=" + (encodeURIComponent(req.partner));
        //url += "&sign=" + (encodeURIComponent(req.sign));
        //url += "&format=" + (encodeURIComponent(req.format));
        //url += "&v=" + (encodeURIComponent(req.v));
        //return url;
        var url;
        url = "" + api_url + "?";
        url += "req_data=" + (req.req_data);
        url += "&service=" + (req.service);
        url += "&sec_id=" + (req.sec_id);
        url += "&partner=" + (req.partner);
        url += "&sign=" + (req.sign);
        url += "&format=" + (req.format);
        url += "&v=" + (req.v);
        return url;
    };
