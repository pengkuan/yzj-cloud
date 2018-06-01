/**
 * Created by Administrator on 2017/5/26.
 */
import LANG from '@/lang/cards/boss'
module.exports = {
    grid: {
        left: 0,
        right: 0,
        top: '10%',
        bottom: 0,
        containLabel: true
    },
    xAxis: [
        {
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#A4A8AB'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dotted'
                }
            }
        }
    ],
    yAxis: [
        {
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#A4A8AB'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#A4A8AB'
                }
            },
            type: 'category',
            data: [
                LANG.TEXT.BOSS_LABAL32,
                LANG.TEXT.BOSS_LABAL33,
                LANG.TEXT.BOSS_LABAL31
            ],
            axisPointer: {
                show: false,
                lineStyle: {
                    type: 'dotted'
                },
                handle: {
                    show: false,
                    size: 30,
                    margin: 40,
                    // "icon": "image://http://192.168.22.144/connecterp-lapp/public/img/axis_handler.png",
                    shadowBlur: 0,
                    shadowColor: 'transparent'
                },
                value: LANG.TEXT.BOSS_LABAL32
            }
        }
    ],
    series: [
        {
            name: LANG.TEXT.BOSS_LABAL35,
            type: 'bar',
            data: [
                1436.943,
                2011.72,
                2299.108
            ],
            yAxisIndex: 0,
            barMaxWidth: '50%',
            label: {
                'normal': {
                    'show': false
                }
            }
        }
    ],
    color: [
        '#716eed',
        '#b76ecb',
        '#d1c3dc',
        '#f2d1d1'
    ]
}
