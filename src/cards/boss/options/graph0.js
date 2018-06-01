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
            axisTick: { show: false },
            axisLine: {
                lineStyle: { color: '#A4A8AB' }
            },
            axisLabel: {
                textStyle: { color: '#A4A8AB' }
            },
            type: 'category',
            data: [ LANG.MONTH.BOSS_LABAL1, LANG.MONTH.BOSS_LABAL2, LANG.MONTH.BOSS_LABAL3, LANG.MONTH.BOSS_LABAL4, LANG.MONTH.BOSS_LABAL5 ],
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
                value: LANG.MONTH.BOSS_LABAL1
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
            name: LANG.TEXT.BOSS_LABAL27,
            type: 'bar',
            data: [1400, 1400, 1400, 1400, 1400],
            yAxisIndex: 0,
            barMaxWidth: '25%',
            label: {
                normal: { show: false }
            }
        },
        {
            name: LANG.TEXT.BOSS_LABAL28,
            type: 'bar',
            data: [ 948.05, 964.5, 1002.5, 1287.6, 1545.12 ],
            yAxisIndex: 0,
            barMaxWidth: '25%',
            label: {
                normal: { show: false }
            }
        },
        {
            name: LANG.TEXT.BOSS_LABAL29,
            type: 'line',
            data: [ 68, 69, 72, 92, 110 ],
            yAxisIndex: 1,
            barMaxWidth: '10%',
            label: {
                normal: {
                    show: false
                }
            }
        }
    ],
    // color: ['#716eed', '#f39a00', '#3bbaff', '#f2d1d1'],
    color: ['rgba(113,110,237,0.9)', 'rgba(59,186,255,0.9)', '#f39a00', '#f2d1d1'],
    barGap: '40%'
}
