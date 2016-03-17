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
        var grid;
        //每列数据列性
        var columns = [
            {
                title: '社团名',
                dataIndex: 'club_name',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span>" + data[datarow].club_name + "</span>";
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
                title: '社团负责人',
                dataIndex: 'manager',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span>" + data[datarow].manager + "</span>";
                }
            },
            {
                title: '社团联系方式',
                dataIndex: 'club_contact',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span>" + data[datarow].club_contact + "</span>";
                }
            },
            {
                title: '学校',
                dataIndex: 'school',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span>" + data[datarow].school + "</span>";
                }
            },
            {
                title: '宣传视频链接',
                dataIndex: 'video_url',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span style='word-wrap: break-word;word-break:break-all;table-layout:fixed;display:block; overflow：hidden；'>" + data[datarow].video_url.substr(0, 26) + "...</span>";
                }
            },
            {
                title: '查看详情',
                dataIndex: 'action',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span><a href='/hewuqi/club_info?club_id=" + data[datarow].club_id + "' style='color: orange'>查看详情</a></span>";
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
            grid = new Grid("/hewuqi/api/clubs", $("#table_my_toast"), $("#paging_my_toast"), 1, 8, columns, params, 10);

            //初始化
            grid.Init();
        }
        dataInit(params);
        $(".btn").click(function(){
            location.href = '/hewuqi/createclub';
        })

    });

});