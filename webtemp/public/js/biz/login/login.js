/**
 * [PC 登陆页JS]
 *
 * Created by wdb on 5/15/15.
 */
define([
    "jquery",
    "bootstrap",
    "iCheck",
    "bootbox",
    "jqBootstrapValidation",
    "IO"
], function($,bootstrap,icheck,bootbox,jqBootstrapValidation,IO) {
    $(function() {
        $("input,textarea,select").jqBootstrapValidation({
            preventSubmit: true,
            submitError: function($form, event, errors) {
            },
            submitSuccess: function($form, event) {
                event.preventDefault();
                var login = {};
                login.username = $("#username").val();
                login.password = $("#password").val();

                login.remember = $("#remember").is(':checked');
                console.log(login);
                //提交完成
                IO.get("/doLogin",login,function(d){
                    //将当前url存入storage
                    //console.log(d);
                    var storage = window.localStorage;
                    if(storage){
                        data=JSON.stringify(d);
                        storage.setItem("data", data);
                        var data=localStorage.getItem('data');
                        console.log(data)
                    }
                    console.log(typeof d);
                    if(d.code == 0){


                            location.href = '/hewuqi/video';

                    }else
                        bootbox.alert(d.msg);
                });
            }
        });

    });
});