define([
    "jquery",
    "highcharts"
    ],function($,highcharts){
    $('#chart-canvas').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: '店铺趋势图'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories:categories
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.series.name +'</b><br>'+this.x +': '+ this.y;
            }
        },
        series:series
    });
});