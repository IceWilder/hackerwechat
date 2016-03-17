var fs =require('fs');
var UPYUN = require('upyun');//又拍云
var path = require('path');
var crypto = require('crypto');
var Busboy = require('busboy');

var upyunConfig = require('../../config');

var FrontCommonUse = require('./upload_upyun_commuse.js');

//var operator_name = "whiplash"; // 操作员名称
//var operator_password = "zhang171040185"; // 操作员密码
//
//var space_name_realame = "whiplash";
//var space_prefix_relaname = "http://whiplash.b0.upaiyun.com/";
//var space_path_realname = "realname";
//
//
//
//var space_name_resource = "";
//var space_prefix_resource = "http://hewuqi.b0.upaiyun.com";
//var space_path_resource = "images";
//
//var areaname = "hewuqi";

exports.uploadRouter = function(router){

    router.get(['/upyun/getkeyresource'], function(req, res) {
        var time = req.param("time");
        var openid = req.param("openid");
        console.log("time============time");
        console.log("time============time=========="+FrontCommonUse.randompic(time,openid));
        var upyun_pic_1 = FrontCommonUse.get_upyun_array(FrontCommonUse.randompic(time,openid) ,"sheyingshi");


        var  array = "{\"policy\":\""+upyun_pic_1.policy+"\",\"sign\":\""+upyun_pic_1.sign+"\",\"picpath\":\""+upyun_pic_1.picpath+"\"}";


        res.status(200).send(array);


    });


    //页面直接上传回调
    router.get('/upyun/callback', function(req, res) {
        var url=req.param("url");//默认充值
        var code=req.param("code");//默认

        if(code == null)
        {
            url = "";
        }

        if(code == "200")
        {
            if(url == null)
                url = "";
        } else {
            url = "";
        }

        res.render("mobile/other/uploadback",{layout:false,url:url});

    });

    //文件上传
    router.post('/upload', function(req, res) {
        var busboy = new Busboy({ headers: req.headers });
        var bufs = [],
            newfilename = "",
            contenttype = "";

        var upyunPath = upyunConfig.upyunPath().path;//又拍云保存地址
        var bucket = upyunConfig.upyunPath().bucket;//空间名
        var operator = upyunConfig.upyunPath().operator;
        var password = upyunConfig.upyunPath().password;
        var endpoint = upyunConfig.upyunPath().endpoint;
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            contenttype = mimetype;
            var random_string = fieldname + filename + Date.now() + Math.random();
            newfilename = crypto.createHash('md5').update(random_string).digest('hex');
            if (filename.indexOf('.') > 0) { var ext = '.' + filename.split('.').slice(-1)[0]; newfilename += ext;}
            file.on('data', function(data) {
                bufs.push(data);
            });
            file.on('end', function() {
            });
        });
        busboy.on('finish', function() {
            var buffer = Buffer.concat(bufs);
            //var upyun = new UPYUN('estate', 'estate', 'estate123456', 'v1', 'legacy');
            var upyun = new UPYUN(bucket, operator, password, endpoint, 'legacy');
            upyun.uploadFile(upyunPath + newfilename, buffer,contenttype,true,function(err,data){
                if(data == null) {
                    var result = {code:1,msg:'上传失败',error:'fail'};
                    res.status(500).json(result);
                }else {
                    if(data.statusCode == 200) {
                        var result = {code:0,msg:'上传成功',url:"http://"+bucket+".b0.upaiyun.com"+upyunPath+newfilename};
                        res.status(data.statusCode).json(result);
                    }else {
                        console.log(data);
                        var result = {code:1,msg:'上传失败',error:'fail'};
                        res.status(data.statusCode).json(result);
                    }
                }
            });
        });
        req.pipe(busboy);
    });

}