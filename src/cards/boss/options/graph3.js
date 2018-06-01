/**
 * Created by Administrator on 2017/5/26.
 */
import LANG from '@/lang/cards/boss'
module.exports = {
    // tooltip: {},
    visualMap: {
        min: 0,
        max: 1500,
        left: 'left',
        top: 'bottom',
        text: ['High', 'Low'],
        seriesIndex: [1],
        inRange: {
            color: ['#f6e5e5', '#8886f2']
        },
        calculable: true,
        show: false
    },
    geo: {
        map: 'china',
        roam: false,
        label: {
            normal: {
                show: false,
                textStyle: {
                    color: 'rgba(0,0,0,0.4)'
                }
            }
        },
        itemStyle: {
            normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
                color: '#f7bf28'
                // areaColor: null,
                // shadowOffsetX: 0,
                // shadowOffsetY: 0,
                // shadowBlur: 20,
                // borderWidth: 0,
                // shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    },
    series: [
        {
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [
                {
                    name: LANG.ADDRESS.BOSS_LABAL1,
                    value: [
                        121.15,
                        31.89,
                        9
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL2,
                    value: [
                        109.781327,
                        39.608266,
                        12
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL3,
                    value: [
                        120.38,
                        37.35,
                        12
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL4,
                    value: [
                        122.207216,
                        29.985295,
                        12
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL5,
                    value: [
                        123.97,
                        47.33,
                        14
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL6,
                    value: [
                        120.13,
                        33.38,
                        15
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL7,
                    value: [
                        118.87,
                        42.28,
                        16
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL7,
                    value: [
                        120.33,
                        36.07,
                        18
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL9,
                    value: [
                        121.52,
                        36.89,
                        18
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL10,
                    value: [
                        102.188043,
                        38.520089,
                        19
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL11,
                    value: [
                        118.58,
                        24.93,
                        21
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL12,
                    value: [
                        121.05,
                        32.08,
                        23
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL13,
                    value: [
                        91.11,
                        29.97,
                        24
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL14,
                    value: [
                        112.02,
                        22.93,
                        24
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL15,
                    value: [
                        121.48,
                        31.22,
                        25
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL16,
                    value: [
                        101.718637,
                        26.582347,
                        25
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL17,
                    value: [
                        117.93,
                        40.97,
                        25
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL18,
                    value: [
                        115.375279,
                        22.786211,
                        26
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL19,
                    value: [
                        124.37,
                        40.13,
                        27
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL20,
                    value: [
                        121.979603,
                        39.627114,
                        30
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL21,
                    value: [
                        109.47,
                        36.6,
                        38
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL22,
                    value: [
                        108.72,
                        34.36,
                        43
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL23,
                    value: [
                        115.89,
                        28.68,
                        54
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL24,
                    value: [
                        109.4,
                        24.33,
                        54
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL25,
                    value: [
                        109.511909,
                        18.252847,
                        54
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL26,
                    value: [
                        105.39,
                        28.91,
                        57
                    ]
                },
                {
                    name: LANG.ADDRESS.BOSS_LABAL27,
                    value: [
                        84.77,
                        45.59,
                        72
                    ]
                }
            ],
            symbolSize: 5,
            //   symbol: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
            // symbolRotate: 35,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#F06C00'
                }
            }
        },
        {
            name: 'categoryA',
            type: 'map',
            geoIndex: 0,
            // tooltip: {show: false},
            data: [
                {
                    'name': LANG.ADDRESS.BOSS_LABAL28,
                    'value': 311
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL29,
                    'value': 936
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL15,
                    'value': 555
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL30,
                    'value': 445
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL31,
                    'value': 37
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL32,
                    'value': 595
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL33,
                    'value': 464
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL34,
                    'value': 575
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL35,
                    'value': 544
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL36,
                    'value': 700
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL37,
                    'value': 406
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL38,
                    'value': 715
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL39,
                    'value': 205
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL40,
                    'value': 50
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL41,
                    'value': 510
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL42,
                    'value': 248
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL43,
                    'value': 647
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL44,
                    'value': 964
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL45,
                    'value': 59
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL46,
                    'value': 136
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL47,
                    'value': 700
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL48,
                    'value': 689
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL49,
                    'value': 77
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL50,
                    'value': 921
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL51,
                    'value': 13
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL52,
                    'value': 460
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL53,
                    'value': 535
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL54,
                    'value': 984
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL55,
                    'value': 120
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL56,
                    'value': 404
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL57,
                    'value': 362
                },
                {
                    'name': LANG.ADDRESS.BOSS_LABAL58,
                    'value': 592
                }
            ]
        }
    ]
}
