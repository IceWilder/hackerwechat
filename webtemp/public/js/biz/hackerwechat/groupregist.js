/**
 * Created by hcadmin on 16/3/16.
 */
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

define([
    "jquery",
    "IO",
    "bootbox"
], function ($, IO, bootbox) {
    $(function () {

        $(function(){
            $("#number3-info ").hide();
            $("#number2-info").hide();
            $("#n3").hide();
            $("#n2").hide();

        })

        $(function(){
            $("#number1").on("click", function () {

                $("#number1-info").toggle(100,function(){

                })
            });
            $("#number2").on("click", function () {
                $("#number2-info").toggle(100,function(){

                })
            });
            $("#number3").on("click", function () {
                $("#number3-info").toggle(100,function(){

                })
            });

        });



        $(function(){
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

});