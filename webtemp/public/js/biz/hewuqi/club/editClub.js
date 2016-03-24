/**
 * Created by gakuin on 1/21/16.
 */

define([
    "jquery",
    "IO",
    "bootbox",
    "UPLOADUI",
    "UPLOAD"
], function ($, IO, bootbox) {
    $(function () {
        var bill = $(".bill");
     //   console.log(bill.length);
        for(var i=0;i<bill.length;i++){
            (function(index){

                bill[index].addEventListener('click',function(){
                    var id="input#pic"+(index+1);
                    $(id).click();
                    $(id).fileupload({
                        url: '/upload',
                        dataType: 'json',
                        autoUpload: true,
                        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                        maxFileSize: 10000000, // 10 MB
                        disableImageResize: /Android(?!.*Chrome)|Opera/
                            .test(window.navigator.userAgent),
                        previewMaxWidth: 150,
                        previewMaxHeight: 150,
                        previewCrop: true
                    }).on('fileuploadadd', function (e, data) {

                    }).on('fileuploadprocessalways', function (e, data) {
                    }).on('fileuploadprogressall', function (e, data) {
                    }).on('fileuploaddone', function (e, data) {
                        var img=$("#img"+(index+1));
                        console.log(img);
                        img.attr("src",data._response.result.url);



                    }).on('fileuploadfail', function (e, data) {

                        bootbox.alert("文件上传失败");
                    })
                });
            })(i);
        }
        var club_name=$("#club_name").val();
        var manager=$("#manager").val();
        var school=$("#school").val();
        var club_intro=$("#club_intro").val();
        var club_contact=$("#club_contact").val();
        var video_url=$("#video_url").val();
        var club_one_pic=$("#img1").attr("src");
        var club_two_pic=$("#img2").attr("src");
        $("#publish").click(function(){
            if(manager&&school&&club_intro&&club_contact&&video_url&&club_name){
                var params={
                    manager:manager,
                    school:school,
                    club_intro:club_intro,
                    club_contact:club_contact,
                    video_url:video_url,
                    club_one_pic:club_one_pic,
                    club_two_pic:club_two_pic,
                    video_id:video_id,
                    club_id:club_id,
                    club_name:club_name


                };
                bootbox.confirm("确定修改社团信息？",function(result){
                    if(result) {
                        IO.post("/hewuqi/api/createCourse",params,function(d){
                            bootbox.alert(d.msg,function(){
                                if (d.code == 0) {
                                    location.href = '/hewuqi/editClub?club_id='+club_id;
                                }

                            })
                        });
                    }
                });
            }else{
                bootbox.alert("社团信息不完整");
            }

        })



    })});


