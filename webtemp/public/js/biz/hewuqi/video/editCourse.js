
define([
    "jquery",
    "IO",
    "bootbox",
    "UPLOADUI",
    "UPLOAD"
], function ($, IO, bootbox) {
    $(function () {
    var bill = $(".bill");
        console.log(course_type);
        $(".radio input").each(function(){
            if($(this).attr("id")==course_type) {
                $(this).attr("checked","checked");
            }
        });
    bill.on("click", function () {
        $("#upload").click();
    });
        $('#upload').fileupload({
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
            var img=$(".bill img");
            img.attr("src",data._response.result.url);



        }).on('fileuploadfail', function (e, data) {

          bootbox.alert("文件上传失败");
        });

        $("#addCourse").bind("click",function(){
            tag=tag+1;
            var content=$(".wrapper-content");
            var html=["<div class=\"rows\" id=\"new\">",
                "<p style=\"float: left;margin-right: 15px\">第"+tag+"课:</p>",

            "<div class=\"col-xs-4\"><input type=\"text\" class=\"form-control\"",
            "id=\"video_name\" required=\"required\"></div>",
                "<p style=\"float: left;margin-right: 5px\">视频链接&nbsp;&nbsp;",
            "<div class=\"col-xs-4\"><input type=\"text\" class=\"form-control\"",
            "id=\"video_url\" required=\"required\"></div>",
                "<p style=\"float: left;\">时长&nbsp;", "<div class=\"col-xs-2\"><input type=\"text\" class=\"form-control\"",
            "id=\"video_playtime\" required=\"required\"></div></div>"
            ].join("");
            content.append(html);
        });
        $("#publish").click(function(){
                var course_name=$("#course_name").val();
                var course_bill=$(".bill img").attr("src");
                    course_type=$(":checked").attr("id");
                var course_intro=$("textarea").val();
                var params={course_id:course_id,course_type:course_type,course_bill:course_bill,course_intro:course_intro};
                if(course_name){
                    params.course_name=course_name;
                }else{
                    bootbox.alert("课程名称不能为空");
                    return;
                }
                var allVideos=[];
                var video_flag=true;
                var url_flag=true;
                var time_flag=true;
                $(".rows").each(function(){
                    var video={};
                    var video_id=$(this).attr("id");
                    if(video_id=='new'){
                        video_id=-1;
                    }
                    video.video_id=video_id;
                //    console.log(video.video_id);
                    if($(this).find("#video_name").val()){
                        video.video_name=$(this).find("#video_name").val();
                      //  console.log(video.video_name);
                    }else{
                        video_flag=false;
                        return;
                    }
                    if($(this).find("#video_url").val()){
                        video.video_url=$(this).find("#video_url").val();
                    }else{
                        url_flag=false;
                        return;
                    }
                    if($(this).find("#video_playtime").val()){
                        video.video_playtime=$(this).find("#video_playtime").val();
                    }else{
                        time_flag=false;
                        return;
                    }
              //      console.log(video);
                    allVideos.push(video);
                });
                if(!video_flag){
                    bootbox.alert("视频名称不能为空");
                    return;
                }
                if(!url_flag){
                    bootbox.alert("视频链接不能为空");
                    return;
                }
                if(!time_flag){
                    bootbox.alert("时长不能为空");
                    return;
                }
                else{
                    var videos_num=allVideos.length;
                    params.allVideos=JSON.stringify(allVideos);

                    params.user_id=user_id;

                    params.videos_num=videos_num;
                    console.log(params);
                    bootbox.confirm("确定修改该课程？",function(result){
                        if(result) {
                            IO.post("/hewuqi/api/editCourse",params,function(d){
                                bootbox.alert(d.msg,function(){
                                    if (d.code == 0) {
                                        location.href = '/hewuqi/editCourse?course_id='+course_id;
                                    }

                                })
                            });
                        }
                    });
                }

        });


})});


