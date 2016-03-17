define([
    "jquery",
], function($) {
    var chart = new AChart({
        theme : AChart.Theme.Base,
        id : 'salesChart',
        //width : 900,

        height : 300,
        plotCfg : {
            margin : [50,50,80] //画板的边距
        },
        //yTickCounts : [1,2,3],  //设置纵坐标的个数，最大值和最小值，只是近似值
        xAxis : {
            categories :categories
        },
        seriesOptions : { //设置多个序列共同的属性
            lineCfg : { //不同类型的图对应不同的共用属性，lineCfg,areaCfg,columnCfg等，type + Cfg 标示
                smooth : true
            }
        },
        tooltip : {
            valueSuffix : '',
            shared : true, //是否多个数据序列共同显示信息
            crosshairs : true //是否出现基准线
        },
        series :series
    });
    chart.render();
});
//模块添加完后use才会执行
//KISSY.use('homepage');



