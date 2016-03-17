/**
 * Created by gakuin on 3/1/16.
 */
/**
 * Created by gakuin on 1/21/16.
 */

var _status = status;
define([
    "jquery",
    "IO",
    "bootbox",
    "UPLOADUI",
    "UPLOAD",
    "jqueryUI"
], function ($, IO, bootbox) {
    $(function () {
        var bill = $(".bill");
        for (var i = 0; i < bill.length; i++) {
            (function (index) {

                bill[index].addEventListener('click', function () {
                    var id = "input#pic" + (index + 1);
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
                        var img = $("#img" + (index + 1));
                        console.log(img);
                        img.attr("src", data._response.result.url);


                    }).on('fileuploadfail', function (e, data) {

                        bootbox.alert("文件上传失败");
                    })
                });
            })(i);
        }
        $("#register .btn").each(function () {
            if ($(this).attr("id") == data.online) {
                $(this).addClass("btn-primary");
            }
        });
        $("#status .btn").each(function () {
            if ($(this).attr("id") == _status) {
                $(this).addClass("btn-primary");
            }
        });
        var club_name = $("#compete_name").val();
        var status = $("#status .active").attr("id");
        var host = $("#host").val();
        var address = $("#address").val();
        var time = $("#time").val();
        var online = $("#register .active").attr("id");
        var compete_url = $("#video_url").val();
        var first_bill = $("#img1").attr("src");
        var second_bill = $("#img2").attr("src");
        var three_bill = $("#img3").attr("src");
        var myTab = $("#myTab");
        var tagsVideos = data.tagsVideos;
        var tag_length = tagsVideos.length;
        if (tag_length == 0) {
            var tab_str = "<li class='active'></li>";
            var tab = $(tab_str);
            var tag_str = "<a href='#前三强' data-toggle='tab'>前三强</a>";
            tab.html(tag_str);
            myTab.append(tab);
            showVideos([], "前三强", 0);
        } else {
            for (var i = 0; i < tag_length; i++) {
                var tag_name = tagsVideos[i].tag_name;
                var tab_str = "<li></li>";
                var tab = $(tab_str);
                var tag_str = "<a href='#" + tag_name + "'" + "data-toggle='tab'>" + tag_name + "</a>";
                tab.html(tag_str);
                myTab.append(tab);
                if (i == 0) {
                    $("#myTab li:first").addClass("active");
                }
                showVideos(tagsVideos[i].videos, tag_name, i);
            }
        }
        $("#editTab").click(function () {
            $("#editModal").modal('show');
            clean();
            $("#editModal").attr('type', 0);
            var value = $("#myTab .active a").text();
            console.log(value);
            $(".modal-header input").attr("value", value);
            var index = $("#myTab .active").index();
            if (tagsVideos[index]) {
                var videos = tagsVideos[index].videos;
                for (var i = 0; i < videos.length; i++) {
                    addTab(videos[i].video_intro, videos[i].video_url);
                }
            }


        });
        $("deleteTab").click(function () {
            var params = {};
            params.compete_id = data.compete_id;
            params.tag_id =
                bootbox.confirm("确认删除该栏目？", function (result) {
                    if (result) {
                        var index = $("#myTab .active").index();
                        var len = $("#myTab li").size();
                        $("#myTab .active").remove();
                        $("#myTabContent .active").remove();
                        if (index != len - 1) {
                            $("#myTab li").get(index + 1).addClass("active");
                            $("#myTabContent .tab-pane").get(index + 1).addClass("active");
                        } else {
                            $("#myTab li").get(index - 1).addClass("active");
                            $("#myTabContent .tab-pane").get(index - 1).addClass("active");
                        }
                    }

                })
        });


    });
    $("#addTabVideo").click(function () {
        addTab();
    });
    $("#addTab").click(function () {
        clean();
        addTab();
        $("#editModal").attr('type', 1);

    });
    function clean() {
        $(".modal-header input").attr("value", "");
        $(".modal-body form").html("");
    }

    function addTab(intro, url) {
        var str = "";
        if (arguments.length === 2) {
            str = "<div class=\"form-group\">";
            str += "<label for=\"recipient-name\" class=\"control-label\" style=\"float: left;margin-right: 10px\">视频介绍:</label>";
            str += "<input type=\"text\" class=\"form-control\" id=\"video_intro\" value='" + intro + "'";
            str += " style=\"float: left;margin-right: 20px\">";
            str += "<label for=\"recipient-name\" class=\"control-label\" style=\"float: left;margin-right: 10px\">视频链接:</label>";
            str += "<input type=\"text\" class=\"form-control\" id=\"video_url\" value='" + intro + "'";
            str += " style=\"float: left\">";
            str += "</div>";
        } else {
            str = ["<div class=\"form-group\">",
                "<label for=\"recipient-name\" class=\"control-label\" style=\"float: left;margin-right: 10px\">视频介绍:</label>",
                "<input type=\"text\" class=\"form-control\" id=\"video_intro\" style=\"float: left;margin-right: 20px\">",
                "<label for=\"recipient-name\" class=\"control-label\" style=\"float: left;margin-right: 10px\">视频链接:</label>",
                "<input type=\"text\" class=\"form-control\" id=\"video_url\" style=\"float: left\">",
                "</div>"].join("");
        }
        $(".modal-body form").append(str);
    }

    $("#publishCompete").click(function () {
        var url_flag = true;
        var intro_flag = true;
        var tag_name = $("#tag_name").val();
        if (!tag_name) {
            bootbox.alert("栏目名称不能为空!");
            return;
        }
        videos[i].video_intro = video_intro;
        videos[i].video_url = video_url;
        var videos = [];
        var params = {};
        params.compete_id = data.compete_id;
        if ($("#editModal").attr("type") == 0) {
            var index = $("#myTab .active").index();
            params.tag_id = tagsVideos[index].tag_id;
        }
        var size = $(".modal-body .form-group").size();

        params.videos = JSON.stringify(videos);


    })
    $("#publishTag").click(function () {
        bootbox.confirm("确认添加该栏目？", function (result) {
            if (result) {
                var url_flag = true;
                var intro_flag = true;
                var tag_name = $("#tag_name").val();
                if (!tag_name) {
                    bootbox.alert("栏目名称不能为空!");
                    return;
                }
                for (var i = 0; i < size; i++) {
                    var video_dom = $(".form-group").get(i);
                    var video_intro = video_dom.children("#video_intro").val();
                    var video_url = video_dom.children("#video_url").val();
                    if (!video_intro) {
                        intro_flag = false;
                        return;
                    }
                    if (!video_url) {
                        url_flag = false;
                        return;
                    }

                }
                if (!intro_flag) {
                    bootbox.alert("视频介绍不能为空!");
                    return;
                }
                if (!url_flag) {
                    bootbox.alert("视频链接不能为空!");
                    return;
                }
                if ($("#editModal").attr("type") == 1) {
                    var li_dom = "<li class='active'></li>";
                    var tag_str = "<a href='#" + tag_name + "'" + "data-toggle='tab'>" + tag_name + "</a>";
                    li_dom.html(tag_str);
                    $(".myTab").append(li_dom);
                    $("#myTab .active").siblings().removeClass("active");
                    $("#myTabContent .active").removeClass("active");
                    showVideos(videos, tag_name, 0);
                } else {
                    var li_dom = $(".myTab .active");
                    li_dom.html(tag_name);
                    showVideos(videos, tag_name, 0);
                }
            }
        });
    });
    function showVideos(videos, tag_name, index) {
        var myTabContent = $("#myTabContent");
        var len = videos.length;
        var str = "";
        if (index == 0) {
            str = "<div class='tab-pane fade in active' id='" + tag_name + "'" + "></div>"
        } else {
            str = "<div class='tab-pane fade' id='" + tag_name + "'" + "></div>";
        }
        var tab = $(str);
        if (len == 0) {
            var p = $("<div class='rows' style='line-height: 40px'></div>");
            var content = "暂无视频";
            p.html(content);
            tab.append(p);
            myTabContent.append(tab);
        } else {
            for (var i = 0; i < len; i++) {
              var p = $("<div class='rows' style='line-height: 40px'></div>");
                var content = "视频介绍:" + videos[i].video_intro + "&nbsp;&nbsp;视频链接:";
                content += "<a href='" + videos[i].video_url + "'>";
                content += videos[i].video_url + "</a>";
                p.html(content);
                tab.append(p);
                myTabContent.append(tab);
            }
        }
    }

})
;



