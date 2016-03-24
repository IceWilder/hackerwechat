/**
 * Created by hcadmin on 16/3/21.
 */
define([
    "jquery",
    "IO",
    "bootbox"
], function ($, IO, bootbox) {
    $(function(){


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

            }

        }



    })

});


