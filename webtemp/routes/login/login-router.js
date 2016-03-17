var DataProxy = require("data-proxy");
var Action = require("../apiaction");
var qs = require('querystring');
var day = 1000*60*60*24;
exports.loginRouter = function(router){

    //登录页面
    router.get(['/','/login'], function(req, res) {
        res.render('login/login',{
            layout  : 'layout/layout-login',
            jscript : 'login/login'
        });
    });

    //核武器登录
    router.get('/doLogin',function(req,res){
        var username = req.param("username");
        var password = req.param("password");
        var remember = req.param("remember");
        var params= {username:username,password:password,remember:remember};
        var contents=qs.stringify(params);
        console.log(username,password,remember);
        new DataProxy({
            req:req,
            res:res,
            reqType:"http",
            reqOption:{
                url:"/admin/adminLogin?"+contents,

                method:"GET",
                success:function(res,data){
                    var json = JSON.parse(data);
                    console.log("doLogin result:",json);
                    //console.log(req);
                    if(json.code == 0 ){
                        //send sessionid to client as cookie
                        if(remember == 'true') {
                            res.cookie('sessionid',json.data.session_id,{path: '/',expires: new Date(Date.now() + (3*day))});
                            res.cookie('username',json.data.username,{path: '/',expires: new Date(Date.now() + (3*day))});
                            res.cookie('admin_id',json.data.admin_id,{path: '/',expires: new Date(Date.now() + (3*day))});
                            res.cookie('create_time',json.data.create_time,{path: '/',expires: new Date(Date.now() + (3*day))});
                        }else {
                            res.cookie('sessionid',json.data.session_id,{path: '/',expires: new Date(Date.now() + day)});
                            res.cookie('username',json.data.login_name,{path: '/',expires: new Date(Date.now() + day)});
                            res.cookie('admin_id',json.data.user_id,{path: '/',expires: new Date(Date.now() + day)});
                            res.cookie('create_time',json.data.create_time,{path: '/',expires: new Date(Date.now() + day)});
                        }
                        res.status(200).send(JSON.stringify(json));
                    }else{
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });

    router.get('/quite', function(req, res) {
        console.log("退出成功");
        res.clearCookie('user');
        res.redirect('/');
    });





    router.get('/logout',function(req,res) {
        var sessionid = req.cookies.sessionid;
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/session/clear",
                params: {sessionid: sessionid},
                success: function (res, data) {
                    res.clearCookie('sessionid', { path: '/' });
                    res.clearCookie('userid', { path: '/' });
                    res.clearCookie('username', { path: '/' });
                    res.clearCookie('usermobile', { path: '/' });
                    res.clearCookie('createdDate', { path: '/' });
                    res.clearCookie('portrait', { path: '/' });
                    res.redirect("/login");

                }
            }
        }).handleRequest();
    });


    router.all('/doEditPwd', function(req, res) {
        var password = req.param("password");
        var oldpassword = req.param("oldpassword");
        var sessionid = req.cookies.sessionid;

        new DataProxy({
            req:req,
            res:res,
            reqType:"http",
            reqOption:{
                url:"/login/updateUserPwd",
                params:{oldPwd:oldpassword,newPwd:password,sessionid:sessionid},
                success:function(res,d){
                    res.status(200).send(d);
                }
            }
        }).handleRequest();

    });

}