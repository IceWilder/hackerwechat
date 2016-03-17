/**
 * Created by wdb on 5/15/15.
 */
requirejs.config({
    baseUrl:'/plugins/',

    paths:{
        wap         : '/js/biz/mobile',
        Mobile      : '/js/biz/mobile/mobile',
        jquery      : ['http://cdn.bootcss.com/jquery/2.0.0/jquery.min','/js/lib/jquery.min'],
        jqueryrotate: 'http://www.helloweba.com/demo/lottery/jQueryRotate.2.2',
        jqueryeasing: 'http://www.helloweba.com/demo/lottery/jquery.easing.min',
        IO          : '/js/lib/novem-io',
        text         : '/js/text',
        UPLOADUI    : 'bootstrap-upload/js/vendor/jquery.ui.widget',
        UPLOAD      : 'bootstrap-upload/js/jquery.fileupload',
        jqueryUI     :'jQueryUI/jquery-ui-1.10.3.min',
        Juicer      : '/js/biz/mobile/juicer',
        Flipsnap    : '/js/lib/flipsnap.min',
        Slide       : '/js/biz/mobile/slide',
        ovreall     : '/js/biz/mobile/index/overall',
        Layer       : '/js/lib/novem/components',
        wx          :  ['http://res.wx.qq.com/open/js/jweixin-1.0.0','/js/lib/jweixin-1.0.0'],
        Utils       : '/js/biz/mobile/utils',
        QRCODE      : '/js/lib/jquery.qrcode.min'
    },

    "shim": {
        "IO"        : ["jquery"],
        "Juicer"    : ["jquery"],
        "QRCODE"    : ["jquery"],
        "Layer"     : ["jquery"],
        "jqueryrotate": ["jquery"],
        "jqueryeasing": ["jquery"]
    }
});

requirejs(["wap/wap"]);
