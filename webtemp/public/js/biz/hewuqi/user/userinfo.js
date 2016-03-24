/**
 * Created by gakuin on 2/20/16.
 */
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

        $("#btn-del").click(function () {
            bootbox.confirm("确定删除该用户？", function (result) {
                if (result) {
                    IO.post("/hewuqi/api/deleteUser", params, function (d) {
                        bootbox.alert(d.msg, function () {
                            if (d.code == 0) {
                                location.href = '/hewuqi/userlist';
                            }

                        });
                    });
                }else{
                    bootbox.alert('删除失败！');
                }


            })


        });
        $("#btn-upgrade").click(function () {
            bootbox.confirm("确定将该用户升级为导师？", function (result) {
                if (result) {
                    IO.post("/hewuqi/api/upgradeUser", params, function (d) {
                        bootbox.alert(d.msg, function () {
                            if (d.code == 0) {
                                location.href = '/hewuqi/userlist';
                            }

                        });
                    });
                }else{
                    bootbox.alert('升级失败！');
                }


            })


        });
    })
});


