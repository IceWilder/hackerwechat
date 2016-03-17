/**
 * Created by js on 15/4/2.
 */

//var upyun_callback_url = "http://keb.360gogreen.com";//本地
//var upyun_callback_url = "http://weixin.dcfe.com.cn";//本地
//var upyun_callback_url = "http://46f820a4.tunnel.mobi";//本地
//var upyun_callback_url = "http://localhost:3333";//本地
var crypto = require('crypto');


/**
 * 修改 form_api_secret
 * @param picpath
 * @param bucket
 * @returns {*}
 */
exports.get_upyun_array = function(picpath,bucket) {

    var upyun_info_array = Array();

    var form_api_secret = "neBJhXZbfiJm5nR8PPwdOu4adBk=";//sheyingshi空间api Key

    var timestamp = (new Date()).valueOf();

    var base_time = parseFloat(timestamp)/1000;

    var expiration = parseInt(base_time+parseFloat(6000));

    var return_url = upyun_callback_url+'/upyun/callback';

    var  options_array = "{\"bucket\":\""+bucket+"\",\"expiration\":\""+expiration+"\",\"return-url\":\""+return_url+"\",\"save-key\":\""+picpath+"\"}";

    var policy = new Buffer(options_array).toString('base64');

    var md5 = crypto.createHash('md5');

    var sign_string =  policy+'&'+form_api_secret;

    md5.update(sign_string);

    var sign =md5.digest('hex');

    upyun_info_array["bucket"] = bucket;
    upyun_info_array["policy"] = policy;
    upyun_info_array["sign"] = sign;

    upyun_info_array["picpath"] = picpath;

    upyun_info_array["prefix_upyun"] = "http://"+bucket+".b0.upaiyun.com/";     //upyun域名

    var  array = "{\"bucket\":\""+bucket+"\",\"policy\":\""+policy+"\",\"return-url\":\""+return_url+"\",\"sign\":\""+sign+"\"}";

    return upyun_info_array;

}

exports.randompic = function  (time ,openid) {
    var final_pic = "/video/";

    final_pic  = final_pic + "video_" + time +"_"+openid+".mp4";


    return final_pic;
}