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
        var grid;
        //每列数据列性
        var columns = [
            {
                title: '导师',
                dataIndex: 'user_name',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span>" + data[datarow].user_name + "</span>";
                }
            },
            {
                title: '上传时间',
                dataIndex: 'create_time',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span>" + data[datarow].create_time + "</span>";
                }
            },
            {
                title: '上课人数',
                dataIndex: 'join_num',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span>" + data[datarow].join_num + "</span>";
                }
            },
            {
                title: '课程海报',
                dataIndex: 'course_bill',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span style='word-wrap: break-word;word-break:break-all;table-layout:fixed;display:block; overflow：hidden；'>" + data[datarow].course_bill.substr(0, 26) + "...</span>";
                }
            },
            {
                title: '舞种',
                dataIndex: 'course_type',
                dataSource: function (data, datarow, gridobj, current_column) {
                    if (data[datarow].course_type == 0) {
                        return "<span style='word-wrap: break-word;word-break:break-all;table-layout:fixed;display:block; overflow：hidden；'>HIPPOP</span>";

                    }
                    if (data[datarow].course_type == 1) {
                        return "<span style='word-wrap: break-word;word-break:break-all;table-layout:fixed;display:block; overflow：hidden；'> POPING</span>";

                    }
                    if (data[datarow].course_type == 2) {
                        return "<span style='word-wrap: break-word;word-break:break-all;table-layout:fixed;display:block; overflow：hidden；'>BREAKING</span>";

                    }
                    if (data[datarow].course_type == 3) {
                        return "<span style='word-wrap: break-word;word-break:break-all;table-layout:fixed;display:block; overflow：hidden；'>其它</span>";

                    }
                }
            },
            {
                title: '查看详情',
                dataIndex: 'action',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span><a href='/hewuqi/course_info?course_id=" + data[datarow].course_id + "' style='color: orange'>查看详情</a></span>";
                }
            }

            /*{
             title: '操作',
             dataIndex: 'action',
             dataSource: function (data, datarow, gridobj, current_column) {
             return "<span><a href='/sheyingshi/course_comment?course_id="+data[datarow].course_id+"' style='color: orange'>查看评论</a><br/><a href='/sheyingshi/course_detail?course_apply_id="+data[datarow].course_apply_id+"'>查看详情</a><br/><a href='/sheyingshi/course_edit?course_apply_id="+data[datarow].course_apply_id+"&course_id="+data[datarow].course_id+"' style='color: orange' class='edit' act_id='"+data[datarow].course_id+"'>编辑</a>&nbsp;<a href='javascript:void(0)' style='color: red' class='delete' act_id='"+data[datarow].course_id+"'>删除</a></span>";
             }
             },*/


        ];
        var params = "";
        //数组初始化
        function dataInit(params) {
            grid = new Grid("/hewuqi/api/courses", $("#table_my_toast"), $("#paging_my_toast"), 1, 8, columns, params, 10);

            //初始化
            grid.Init();
        }
        //获取输入框内容
        function get_input_param() {

            var param = "";
            var content = $("#query").val();

            param = "content=" + content;
            return param;
        }
        dataInit(params);
        $("#basic-addon2").bind("click", function () {
            var params = get_input_param();
            var category = $("#search-header-rows1  .btn-primary").attr("indexid");
            var ordertype = $("#search-header-rows2 .btn-primary").attr("indexid");
            if (category == null || category == undefined) {
                params = params + "&ordertype=" + ordertype;
            } else {
                params = params + "&ordertype=" + ordertype + "&course_type=" + category;
            }
            dataInit(params);
        });
        $(".btn").bind("click", function () {
            $(this).removeClass("btn-default").addClass("btn-primary");
            $(this).siblings().removeClass("btn-primary").addClass("btn-default");
            var category = $("#search-header-rows1  .btn-primary").attr("indexid");
            var ordertype = $("#search-header-rows2 .btn-primary").attr("indexid");
            if (category == null || category == undefined) {
                var param = "ordertype=" + ordertype;
            } else {
                var param = "ordertype=" + ordertype + "&course_type=" + category;
            }

            dataInit(param);

        });

    });


    //删除申请成功后的课程
    $(document).on("click", ".delete", function () {
        var act_id = $(this).attr("act_id");
        if (act_id) {
            bootbox.confirm("确定要删除该课程？", function (result) {
                if (result) {
                    IO.get("act/course_delete", {act_id: act_id}, function (d) {
                        bootbox.alert(d.msg, function () {
                            if (d.code == 0) {
                                location.href = '/sheyingshi/course';
                            }
                        })
                    });
                }
            });
        }
    });
});