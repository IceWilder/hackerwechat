/**
 * Created by gakuin on 1/13/16.
 */
define([
    "jquery",
    "IO",
    "bootbox"
], function ($, IO, bootbox) {
    $("#btn-del").on("click", function () {
        var act_id = $(this).attr("video_id");
        if (act_id) {
            bootbox.confirm("确定要删除该视频？", function (result) {
                if (result) {
                    IO.get("/hewuqi/deleteVideo", {video_id: act_id}, function (d) {
                        bootbox.alert(d.msg, function () {
                            if (d.code == 0) {
                                location.href = '/hewuqi/video';
                            }
                        })
                    });
                }
            });
        }
    });
})