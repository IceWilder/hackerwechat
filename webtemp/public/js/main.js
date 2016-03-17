/**
 * Created by wdb on 5/15/15.
 */
requirejs.config({
    baseUrl:'/plugins/',

    paths:{
        //jqueryUI匹配的版本
        oldjquery   : '/js/jquery.min',
        jquery      : ['http://cdn.bootcss.com/jquery/2.0.0/jquery.min','/js/lib/jquery.min'],
        IO          : '/js/lib/novem-io',
        bootstrap   : 'bootstrap/js/bootstrap.min',
        iCheck      : 'iCheck/icheck.min',
        APP         : '/js/lib/app',
        KEB         : '/js/biz/keb/keb',
        UPLOADUI    : 'bootstrap-upload/js/vendor/jquery.ui.widget',
        UPLOAD      : 'bootstrap-upload/js/jquery.fileupload',
        CLIP        : '/js/lib/ZeroClipboard',
        QRCODE      : '/js/lib/jquery.qrcode.min',
        eve         : '/js/lib/eve',
        biz         : '/js/biz',
        bizjs       : '/js/biz/keb/biz',
        highcharts  : 'highcharts/highcharts',
        datatables  : 'datatables/1.10.6/jquery.dataTables.min',
        DTBootstrap : 'datatables/dataTables.bootstrap',
        bootbox : 'bootbox',
        jqueryUI :'/js/jquery-ui.min',
        uploadImgPlugin:'bootstrap-upload/js/jquery.fileupload-image',
        uploadProcess:'bootstrap-upload/js/jquery.fileupload-process',
        slimScroll :'slimScroll/jquery.slimscroll.min',
        Utils       : '/js/biz/mobile/utils',
        text : '/js/text',
        jqBootstrapValidation:'/plugins/jqBootstrapValidation',
        iCheck:'/plugins/iCheck/icheck',
        bootstrap_dtpicker:'/plugin/datetimepicker/bootstrap-datetimepicker',
        dtpicker:'/plugin/datetimepicker/DatetimePicker'
    },

    "shim": {
        "bootstrap"                     : ["jquery"],
        "iCheck"                        : ["jquery"],
        "bootbox"                       : ["jquery"],
        "jqBootstrapValidation"         : ["jquery"],
        "IO"                            : ["jquery"],
        "highcharts"                    : ["jquery"],
        "APP"                           : ["bootstrap","jquery"],
        "KEB"                           : ["APP","jquery"],
        "bizjs"                         : ["KEB","jquery"],
        "datatables"                   : ['jquery'],
        "DTBootstrap"                   : ['jquery',"datatables"],
        "jqueryUI"                         :['oldjquery'],
        "slimScroll"                       :['jquery']
    }
});
requirejs(["bizjs"]);