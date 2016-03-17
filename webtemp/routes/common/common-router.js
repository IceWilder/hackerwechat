var fs = require('fs');
var ejs = require('ejs');
var Action = require("../apiaction");

exports.commonRouter = function(router){
    //获取省
    router.get('/api/getProvinces',function(req,res){
        Action.send(req, res,"getProvinces");
    });
    //根据上一级id 获取城市列表
    router.get('/api/getCities',function(req,res){
        var parentid = req.param("parentid");
        Action.send(req, res,"getCities",{parenid:parentid});
    });

    //新增收货地址
    router.post('/api/createDeliAddr',function(req,res){
        var address = req.param("address");
        var city = req.param("city");
        var county = req.param("county");
        var mobile = req.param("mobile");
        var name = req.param("name");
        var province = req.param("province");
        var zipcode = req.param("zipcode");
        var param = {address:address,city:city,county:county,mobile:mobile,name:name,province:province,zipcode:zipcode};
        Action.send(req, res,"createDeliveryAddr",param,function(res,data){
            var json = JSON.parse(data);
            res.status(200).json(json);
        });
    });

    //更新收货地址
    router.post('/api/updateDeliveryAddr',function(req,res){
        var addresid = req.param("addressid");
        var address = req.param("address");
        var city = req.param("city");
        var county = req.param("county");
        var mobile = req.param("mobile");
        var name = req.param("name");
        var province = req.param("province");
        var zipcode = req.param("zipcode");
        Action.send(req, res,"updateDeliveryAddr",{addresid:addresid,address:address,city:city,county:county,mobile:mobile,name:name,province:province,zipcode:zipcode});
    });

    router.get('/common/cmsTree',function(req,res){
        var url="getCmsTreeData";
        var treeData;
        Action.send(req, res,url,function(res,data) {
            var json = JSON.parse(data);
            if(json.code==0){
                treeData=json.data;
                console.log(json.data);
            }
            res.render ('common/cms/arbor',{layout:'layout-iframe',treeData:JSON.stringify(treeData)});
        });
    });

}