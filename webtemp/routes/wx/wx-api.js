var Action = require("../apiaction");

exports.wxAPI = function(router) {
    router.post('/api/wx/addacc', function (req, res) {
        var formdata = req.param("formdata"),
            url     = "addacc",
            params  = {jsonStr:formdata};
        console.log(params);
        Action.send(req, res,url,params);
    });
    router.get('/api/wx/acclist', function (req, res) {
        Action.send(req, res,"acclist");
    });
    router.get('/api/wx/delacc', function (req, res) {
        var wa_id = req.param("wa_id"),
            url     = "delacc",
            params  = {wa_id:wa_id};
        Action.send(req, res,url,params);
    });

};