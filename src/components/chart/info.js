var option = {
    backgroundColor: "#FFFFFF",
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
}

export function getData() {
    // 在这里面写调动websocket获取一个echarts报表数据
    var data;


    data = option; // 用你获取到数据替换这句
    // 最终返回的数据就是一个完整的echarts options(类似于最上面的option)，我会直接把这个data --> echarts.setOption(data);
    return data;
}