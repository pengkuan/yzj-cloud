/**
 * Created by Administrator on 2017/5/25.
 */
var echarts = require('echarts/lib/echarts')
module.exports = {
    title: {
        text: '',
        subtext: ''
    },
    tooltip: {
        enterable: true,
        show: false
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        name: '',
        nameGap: 0,
        type: 'category',
        symbol: 'none',
        boundaryGap: false,
        data: ['', '1', '2', '3', '4'],
        axisTick: { show: false },
        axisLine: { lineStyle: { color: '#CCCCCC', width: 1 } }
    },
    yAxis: {
        name: '',
        margin: 10,
        type: 'value',
        axisLabel: {
            formatter: '{value} ',
            margin: 0,
            textStyle: {
                fontSize: 11
            }
        },
        axisPointer: {
            snap: true
        },
        interval: 400,
        splitNumber: 4,
        axisTick: { show: false },
        splitLine: {
            lineStyle: {
                type: 'dashed',
                color: '#eaeff3'
            }
        },
        axisLine: { lineStyle: { color: '#CCCCCC', width: 1 } },
        boundaryGap: false
    },
    grid: {
        left: 0,
        right: 10,
        top: '5%',
        bottom: '5%',
        containLabel: true
    },
    series: [
        {
            name: '',
            type: 'line',
            smooth: false,
            data: [0, '-', '-', '-', '-'],
            symbol: 'circle',
            symbolSize: [50, 50],
            itemStyle: { normal: { color: '#3cbaff', opacity: 0 } },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(192, 226, 249,.6)'  // 3cbaff
                    }, {
                        offset: 1,
                        color: 'rgba(192, 226, 249,.4)'
                    }], false)
                }
            }
        },
        {
            name: '',
            type: 'line',
            smooth: false,
            data: ['-', 560, 780, 1080, 1180],
            symbol: 'emptyCircle',
            symbolSize: [10, 10],
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(192, 226, 249,.8)'  // 3cbaff
                    }, {
                        offset: 1,
                        color: 'rgba(192, 226, 249,.4)'
                    }], false)
                }
            },
            itemStyle: { normal: { color: '#3cbaff' } }
        }
    ]
}
