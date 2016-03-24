$(function(){
    $("#number1").on("click",function () {
        var element = document.getElementById('myimage1');
        var Flag=(element.getAttribute("src",1)=="/images/hackerwechati/sanjiao01.jpg")
        element.src=Flag?"/images/hackerwechati/7.pic.jpg":"/images/hackerwechati/sanjiao01.jpg";

        $("#number1-info").toggle(100,function(){

        })
    });
    $("#number2").on("click", function () {
        var element = document.getElementById('myimage2');
        var Flag=(element.getAttribute("src",2)=="/images/hackerwechati/7.pic.jpg")
        element.src=Flag?"/images/hackerwechati/sanjiao01.jpg":"/images/hackerwechati/7.pic.jpg";
        $("#number2-info").toggle(100,function(){

        })
    });
    $("#number3").on("click", function () {
        var element = document.getElementById('myimage3');
        var Flag=(element.getAttribute("src",3)=="/images/hackerwechati/7.pic.jpg")
        element.src=Flag?"/images/hackerwechati/sanjiao01.jpg":"/images/hackerwechati/7.pic.jpg";
        $("#number3-info").toggle(100,function(){

        })
    });

});
function changeColor(num){
    for(var i=1;i<=7;i++){
        var str = document.getElementById('btn_'+i);
        if(i==num){
            $("#btn_"+i).css('background','rgb(148,200,224)').css('color','#fff');


        }else{
            $("#btn_"+i).css('background-color','#fff').css('color','rgb(148,200,244)');
        }
    }
}
var cancelbtn=document.getElementById('cancelbtn');
if(cancelbtn){
    cancelbtn.onclick=function(){
        var divalt6=document.getElementById('divalt5');
        divalt6.style.display='none';
    };
}


var surebtn=document.getElementById('surebtn');
if(surebtn){
    surebtn.onclick=function(){
        window.location.href='/Hackerwechat/PersonalCenter';

    }
}
define([
    "jquery",
    "IO",
    "bootbox"
], function ($, IO, bootbox) {
    $(function(){

        $("#number3-info ").hide();
        $("#number2-info").hide();
        $("#n3").hide();
        $("#n2").hide();







        var i=1;
        $("#addnum").on("click",function(){
            if( i==1){
                $("#n2").show();
                $("#number2-info").show();
                i++;

            }

            $("#addnum").on("click", function () {
                if(i==2){
                    $("#n3").show();
                    $("#number3-info").show();
                }
            })

        })



    })

});