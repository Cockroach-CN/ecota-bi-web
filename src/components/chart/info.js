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

export function getData(callback) {
    // 在这里面写调动websocket获取一个echarts报表数据
    var data;
    var ws = new WebSocket("ws://121.40.165.18:8088");
    ws.onopen = function () {
        ws.send("-------------hello...");
    };

    ws.onmessage = function (enevt) {
        console.log("---------message" + enevt.data);
        callback(option);
    }
}