var ccap    = require('ccap');

exports.captchaRouter = function(router){

    router.get('/captcha', function(req, res) {
         var captcha = ccap({
             width:170,
             height:65,
             offset:35,
             quality:200,
             generate:function(){//Custom the function to generate captcha text
                 var key="xy1zd2ef3gh4ij5kl6mn7opq8rst9uvw0abc";
                 var text='',i;
                 for(j=1;j<=4;j++){
                 i = parseInt(35*Math.random(),10);
                 text = text + key.charAt(i);
                 }

                 return text;//return the captcha text

             }

         });
         if(req.url == '/favicon.ico')return res.end('');//Intercept request favicon.ico

         var ary = captcha.get();
         var txt = ary[0];
         var buf = ary[1];
        res.setHeader("Set-Cookie", ["captcha="+txt]);
        res.end(buf);
        //console.log(txt);
    });


}
