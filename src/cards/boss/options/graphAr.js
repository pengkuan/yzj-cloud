/**
 * Created by Administrator on 2017/10/12.
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
            axisTick: { show: false },
            axisLine: {
                lineStyle: { color: '#A4A8AB' }
            },
            axisLabel: {
                textStyle: { color: '#A4A8AB' }
            },
            type: 'category',
            data: [ LANG.TEXT.BOSS_LABAL18, LANG.TEXT.BOSS_LABAL19, LANG.TEXT.BOSS_LABAL20, LANG.TEXT.BOSS_LABAL21, LANG.TEXT.BOSS_LABAL22, LANG.TEXT.BOSS_LABAL23 ],
            axisPointer: {
                show: false,
                lineStyle: { type: 'dotted' },
                handle: {
                    show: false,
                    size: 30,
                    margin: 40,
//                                    "icon":"image://http://192.168.22.144/connecterp-lapp/public/img/axis_handler.png",
                    shadowBlur: 0,
                    shadowColor: 'transparent'
                },
                value: LANG.TEXT.BOSS_LABAL18
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
                textStyle: {
                    color: '#C2CCD0'
                }
            },
            splitLine: {
                show: true,
                lineStyle: { type: 'dotted' }
            }
        },
        {
            type: 'value',
            axisTick: { show: false },
            axisLine: {
                show: false
            },
            axisLabel: {
                textStyle: { color: '#C2CCD0' }
            },
            splitLine: {
                show: false,
                lineStyle: {
                    type: 'dotted'
                }
            }
        }
    ],
    series: [
        {
            name: LANG.TEXT.BOSS_LABAL24,
            type: 'bar',
            data: [1, 1, 8, 10, 12, 10],
            yAxisIndex: 0,
            barMaxWidth: '25%',
            label: {
                normal: { show: false }
            }
        },
        {
            name: LANG.TEXT.BOSS_LABAL25,
            type: 'bar',
            data: [ 0, 0, 6, 10, 9, 5 ],
            yAxisIndex: 0,
            barMaxWidth: '25%',
            label: {
                normal: { show: false }
            }
        }
    ],
    // color: ['#716eed', '#f39a00', '#3bbaff', '#f2d1d1'],
    color: ['rgba(113,110,237,0.9)', 'rgba(59,186,255,0.9)', '#f39a00', '#f2d1d1'],
    barGap: '40%'
}
