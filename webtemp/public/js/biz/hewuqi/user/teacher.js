/**
 * Created by gakuin on 2/22/16.
 */
/**
 * Created by gakuin on 1/25/16.
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
                title: '用户ID',
                dataIndex: 'user_id',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span>" + data[datarow].user_id + "</span>";
                }
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span>" + data[datarow].create_time + "</span>";
                }
            },
            {
                title: '昵称',
                dataIndex: 'nick_name',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span>" + data[datarow].nick_name + "</span>";
                }
            },
            {
                title: '粉丝量',
                dataIndex: 'fans_num',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span>" + data[datarow].fans_num + "</span>";
                }
            },
            {
                title: '关注数',
                dataIndex: 'atten_num',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span>" + data[datarow].atten_num + "</span>";
                }
            },
            {
                title: '性别',
                dataIndex: 'sex',
                dataSource: function (data, datarow, gridobj, current_column) {
                    if (data[datarow].sex == 0) {
                        return "<span style='word-wrap: break-word;word-break:break-all;table-layout:fixed;display:block; overflow：hidden；'>男</span>";

                    }
                    if (data[datarow].sex == 1) {
                        return "<span style='word-wrap: break-word;word-break:break-all;table-layout:fixed;display:block; overflow：hidden；'> 女</span>";

                    }
                }
            },
            {
                title: '查看详情',
                dataIndex: 'action',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span><a href='/hewuqi/user_info?user_id=" + data[datarow].user_id + "' style='color: orange'>查看详情</a></span>";
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
            grid = new Grid("/hewuqi/api/teachers", $("#table_my_toast"), $("#paging_my_toast"), 1, 8, columns, params, 10);

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
            // var category = $("#search-header-rows1  .btn-primary").attr("indexid");
            var ordertype = $("#search-header-rows2 .btn-primary").attr("ordertype");
            params = params + "&ordertype=" + ordertype;
            dataInit(params);
        });
        $(".btn").bind("click", function () {
            $(this).removeClass("btn-default").addClass("btn-primary");
            $(this).siblings().removeClass("btn-primary").addClass("btn-default");
            var ordertype = $("#search-header-rows2 .btn-primary").attr("ordertype");
            var params=get_input_param();
            params = params + "&ordertype=" + ordertype;
            dataInit(params);

        });

    });



});