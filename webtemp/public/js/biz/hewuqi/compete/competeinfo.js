/**
 * Created by gakuin on 2/26/16.
 */
/**
 * Created by gakuin on 1/21/16.
 */
/**
 * Created by gakuin on 1/19/16.
 */
/**
 * Created by gakuin on 1/13/16.
 */
/**
 * Created by gakuin on 1/12/16.
 */
/**
 * Created by novem on 2015/12/1.
 */
define([
    "jquery",
    "IO",
    "bootbox"
], function ($, IO, bootbox) {
    $(function () {
        var params="compete_id="+compete_id;
        $.ajax({
            url:'/hewuqi/api/competeVideo',
            data:params,
            type:'get',
            dataType:'json',
            success:function(data){
                showTag(data);
            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
            // 通常 textStatus 和 errorThrown 之中
            // 只有一个会包含信息
            this; // 调用本次AJAX请求时传递的options参数
        }


        });
        $("#btn-change").click(function(){
            location.href="/hewuqi/changecompete?compete_id="+compete_id;
        });
        function showTag(data){
            var tags=[];
            var tagsVideos=data.data.tagsVideos;
            var length=tagsVideos.length;
            var nav=$(".nav");

            var panel=$(".panel");
            for(var i=0;i<length;i++){
                var li_dom=$("<li role=\"presentation\"></li>");
                if(i==0){
                    li_dom.addClass("active");
                    var panel_body=$("<div class=\"panel-body\"></div>");
                    var video_length=tagsVideos[0].videos.length;
                    var videoinfo="";
                    for(var j=0;j<video_length;j++){
                        var video=tagsVideos[0].videos[j];
                        videoinfo+="<div style='height: 30px;font-size: 16px;width:100%" +
                            "line-height:30px;'>视频介绍:"+video.video_intro+"&nbsp;&nbsp;视频链接:<a href=\""+video.video_url+"\">";
                        videoinfo+=video.video_url+"</a></div>";
                        panel_body.html(videoinfo);
                        panel.append(panel_body);
                    }

                }
                li_dom.html("<a>"+tagsVideos[i].tag_name+"</a>");
                nav.append(li_dom);
            }
            showTagVideos(tagsVideos);
        }
        function showTagVideos(tagsVideos){

            $("li").click(function(){
                //console.log(this);
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                var index=$(this).index();
                var videos=tagsVideos[index].videos;
                var panel=$(".panel");
                if(videos.length!=0){
                    var video_length=videos.length;

                    panel.html("");
                    var panel_body=$("<div class=\"panel-body\"></div>");
                    var video_info="";
                    for(var i=0;i<video_length;i++){
                        var video=videos[i];

                        video_info+="<div style='height: 30px;font-size: 16px;width:100%" +
                            "line-height:30px;'>视频介绍:"+video.video_intro+"&nbsp;&nbsp;视频链接:<a href=\""+video.video_url+"\">";
                        video_info+=video.video_url+"</a></div>";
                        panel_body.html(video_info);
                        panel.append(panel_body);



                    }
                }else{
                    panel.html("");
                    var panel_body=$("<div class=\"panel-body\"></div>");
                    var videoinfo="<p style='font-size: 20px'>暂无视频</p>";
                    panel_body.html(videoinfo);
                    panel.append(panel_body);
                }

            })
        }

    });

});



