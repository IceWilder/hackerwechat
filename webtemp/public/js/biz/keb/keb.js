/**
 * Created by novem on 2015/5/21.
 */
define([
    "jquery",
    "bootbox"
], function($,bootbox) {
    //全局设置bootbox为中文
    bootbox.setLocale("zh_CN");
    $(function(){
        var activemenu=$("#active").val();
        if (activemenu) {
            $("."+activemenu).addClass("active");
            $("."+activemenu).parent().parent().addClass("active");
        }
    });
});