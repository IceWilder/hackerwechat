/**
 * Created by gakuin on 2/26/16.
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
                title: '上传时间',
                dataIndex: 'create_time',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span>" + data[datarow].create_time + "</span>";
                }
            },
            {
                title: '赛事名称',
                dataIndex: 'compete_name',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span>" + data[datarow].compete_name + "</span>";
                }
            },

            {
                title: '赛事状态',
                dataIndex: 'status',
                dataSource: function (data, datarow, gridobj, current_column) {
                    if (data[datarow].category == 0) {
                        return "<span style='word-wrap: break-word;word-break:break-all;table-layout:fixed;display:block; overflow：hidden；'>赛后展示</span>";

                    }
                    if (data[datarow].category == 1) {
                        return "<span style='word-wrap: break-word;word-break:break-all;table-layout:fixed;display:block; overflow：hidden；'>报名中</span>";

                    }
                    if (data[datarow].category == 2) {
                        return "<span style='word-wrap: break-word;word-break:break-all;table-layout:fixed;display:block; overflow：hidden；'>报名结束</span>";

                    }
                }
            },
            {
                title: '查看详情',
                dataIndex: 'action',
                dataSource: function (data, datarow, gridobj, current_column) {
                    return "<span><a href='/hewuqi/competeinfo?compete_id=" + data[datarow].compete_id + "' style='color: orange'>查看详情</a></span>";
                }
            }


        ];
        var params = "";
        //数组初始化
        function dataInit(params) {
            grid = new Grid("/hewuqi/api/competes", $("#table_my_toast"), $("#paging_my_toast"), 1, 8, columns, params, 10);

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
            dataInit(params);
        });

    });



});