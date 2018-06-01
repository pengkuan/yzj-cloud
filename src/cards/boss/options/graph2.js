/**
 * Created by Administrator on 2017/5/26.
 */
import LANG from '@/lang/cards/boss'
const colors = ['#716eed', '#b76ecb', '#d1c3dc', '#f2d1d1']

export default [
    {
        colors: ['#716eed', '#f39a00', '#3bbaff', '#f2d1d1'],
        title: LANG.TEXT.BOSS_LABAL26,
        type: 'bar',
        xAxis: [
            {
                data: [LANG.MONTH.BOSS_LABAL1, LANG.MONTH.BOSS_LABAL2, LANG.MONTH.BOSS_LABAL3, LANG.MONTH.BOSS_LABAL4, LANG.MONTH.BOSS_LABAL5]
            }
        ],
        values: [
            {
                type: 'bar',
                data: [
                    {
                        name: LANG.TEXT.BOSS_LABAL27,
                        data: [1400000, 1400000, 1400000, 1400000, 1400000].map(d => d / 1000)
                    },
                    {
                        name: LANG.TEXT.BOSS_LABAL28,
                        data: [948050, 964500, 1002500, 1287600, 1545120].map(d => d / 1000)
                    }
                ]
            },
            {
                type: 'line',
                data: { name: LANG.TEXT.BOSS_LABAL29, data: [68, 69, 72, 92, 110] }
            }
        ]
    },
    {
        colors: ['#716eed', '#b76ecb', '#d1c3dc', '#f2d1d1'],
        title: LANG.TEXT.BOSS_LABAL30,
        type: 'horizontal-bar',
        xAxis: [
            {
                data: [LANG.TEXT.BOSS_LABAL32, LANG.TEXT.BOSS_LABAL33, LANG.TEXT.BOSS_LABAL31]
            }
        ],
        values: [
            {
                type: 'bar',
                data: [
                    { name: LANG.TEXT.BOSS_LABAL35, data: [1436943, 2011720, 2299108].map(d => d / 1000) }
                ]
            }
//                        {
//                            type: 'bar',
//                            data: [
//                                { name: '完成率(%)', data: [21, 29, 33] }
//                            ]
//                        }
        ]
    },
    {
        colors,
        type: 'pie',
        title: LANG.TEXT.BOSS_LABAL36,
        values: [
            {
                name: LANG.TEXT.BOSS_LABAL37,
                data: [
                    { value: 2299108, name: LANG.TEXT.BOSS_LABAL38 },
                    { value: 1436943, name: LANG.TEXT.BOSS_LABAL39 },
                    { value: 2011720, name: LANG.TEXT.BOSS_LABAL40 }
                ]
            }
        ]
    },
    {
        colors,
        type: 'pie',
        title: LANG.TEXT.BOSS_LABAL42,
        values: [
            {
                name: LANG.TEXT.BOSS_LABAL43,
                data: [
                    { value: 30, name: LANG.TEXT.BOSS_LABAL44 },
                    { value: 35, name: LANG.TEXT.BOSS_LABAL45 },
                    { value: 25, name: LANG.TEXT.BOSS_LABAL46 }
                ]
            }
        ]
    },
    {
        type: 'map',
        title: LANG.TEXT.BOSS_LABAL48
    }
]
