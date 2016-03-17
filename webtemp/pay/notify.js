var xmlreader = require('xmlreader');
var api = require("./alipay-wap-api");
exports.notify = function(req, callback) {
    console.log(req.notify_data);
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
                return storeNotifyResponse(notify_id, response, function(err) {
                    return callback(response === 'success' ? err : response);
                });
            };
            return storeNotifyDetails(notify_id, notify, req, function(err, success) {
                var out_trade_no, trade_status;
                if (err) {
                    return done(err);
                }
                if (!success) {
                    return done("store detail error");
                }
                trade_status = notify.trade_status.text();
                if (trade_status === 'TRADE_FINISHED' || trade_status === 'TRADE_SUCCESS') {
                    if (req.sign !== api.getNotitySign(req)) {
                        return done('bad sign');
                    }
                    out_trade_no = notify.out_trade_no.text();
                    return getTradeUser(out_trade_no, function(err, user) {
                        var user_id;
                        if (err) {
                            return done(err);
                        }
                        user_id = user != null ? user.user : void 0;
                        if (!user_id) {
                            return done('unknown user');
                        }
                        return onPayed(user_id, function(err, success) {
                            if (err) {
                                return done(err);
                            }
                            if (!success) {
                                return done("onPayed error");
                            }
                            storeTradeFinalState(out_trade_no, false, console.error);
                            return done('success');
                        });
                    });
                } else {
                    return done('unknown trade status');
                }
            });
        });
    };
