define([
    "jquery",
    "IO",
    "bootbox"
], function ($, IO, bootbox) {
    $(function(){


        var sleep = 60, interval = null;


        var btn = document.getElementById ('btn');
        if(btn){
            btn.onclick = function ()
            {
                if (!interval)
                {
                    this.style.backgroundColor = 'rgb(182,181,184)';
                    this.disabled = "disabled";
                    this.style.cursor = "wait";
                    this.value = "重新发送 (" + sleep-- + ")";
                    interval = setInterval (function ()
                    {
                        if (sleep == 0)
                        {
                            if (!!interval)
                            {
                                clearInterval (interval);
                                interval = null;
                                sleep = 60;
                                btn.style.cursor = " point";
                                btn.removeAttribute ('disabled');
                                btn.value = "免费获取验证码";
                                btn.style.backgroundColor = '';
                            }
                            return false;
                        }
                        btn.value = "重新发送 (" + sleep-- + ")";
                    }, 1000);
                }
            };


        }















        var cancelbtn=document.getElementById('cancelbtn');
        if(cancelbtn){
            cancelbtn.onclick=function(){
                var divalt6=document.getElementById('divalt6');
                divalt6.style.display='none';
            };
        }
        var surebtn=document.getElementById('surebtn');

        if(surebtn){
            surebtn.onclick=function(){
                window.location.href='/Hackerwechat/PersonalCenter';
            };
        }


        var surebtn1=document.getElementById('surebtn1');

        if(surebtn1){
            surebtn1.onclick=function(){
                var divalt6=document.getElementById('divalt6');
                divalt6.style.display='none';
            };
        }



    })

});