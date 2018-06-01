 // 存放冷数据的js
import LANG from '@/lang/cards/boss'
const isEnglish = LANG.MONTH.BOSS_LABAL1 === 'January'
export const coldDataSuper = [
    {
        id: 'example1',
        name: LANG.TEXT.BOSS_LABAL14,
        desc: LANG.TEXT.BOSS_LABAL15,
        option: isEnglish ? 'static/image/boss/boss-demo-en.jpg' : 'static/image/boss/boss-demo.jpg',
        reportType: 1,
        imgPos: 'inner',
        dataResponsibleUser: [
            {
                photoUrl: 'static/image/report_user/01.png',
                isPraise: false
            },
            {
                photoUrl: 'static/image/report_user/02.png',
                isPraise: false
            },
            {
                photoUrl: 'static/image/report_user/03.png',
                isPraise: false
            },
            {
                photoUrl: 'static/image/report_user/04.png',
                isPraise: false
            },
            {
                photoUrl: 'static/image/report_user/05.png',
                isPraise: false
            },
            {
                photoUrl: 'static/image/report_user/06.png',
                isPraise: false
            }
        ]
    }
]
    
export const coldDataTmp = [
    {
        id: 'example3',
        name: LANG.TEXT.BOSS_LABAL14,
        desc: LANG.TEXT.BOSS_LABAL15,
        option: isEnglish ? 'static/image/boss/boss-demo-en.jpg' : 'static/image/boss/boss-demo.jpg',
        /* option: require('./graph0'), */
        reportType: 1,
        imgPos: 'inner',
        dataResponsibleUser: [
            {
                photoUrl: 'static/image/report_user/01.png',
                isPraise: false
            },
            {
                photoUrl: 'static/image/report_user/02.png',
                isPraise: false
            },
            {
                photoUrl: 'static/image/report_user/03.png',
                isPraise: false
            },
            {
                photoUrl: 'static/image/report_user/04.png',
                isPraise: false
            },
            {
                photoUrl: 'static/image/report_user/05.png',
                isPraise: false
            },
            {
                photoUrl: 'static/image/report_user/06.png',
                isPraise: false
            }
        ]
    },
    {
        id: 'example4',
        name: LANG.TEXT.BOSS_LABAL49,
        desc: '',
        option: isEnglish ? 'static/image/file_ext/reportshow-en.jpg' : 'static/image/file_ext/reportshow.jpg',
        reportType: 2
    }
]

export const coldDataAr = [
    {
        id: 'example1',
        name: LANG.TEXT.BOSS_LABAL16,
        desc: LANG.TEXT.BOSS_LABAL17,
        option: isEnglish ? 'static/image/boss/ar-demo-en.jpg' : 'static/image/boss/ar-demo.jpg',
        /* option: require('./graphAr'), */
        reportType: 1,
        imgPos: 'inner',
        dataResponsibleUser: [
            {
                photoUrl: 'static/image/report_user/ar/01.jpg',
                isPraise: false
            },
            {
                photoUrl: 'static/image/report_user/ar/02.jpg',
                isPraise: false
            },
            {
                photoUrl: 'static/image/report_user/ar/03.jpg',
                isPraise: false
            },
            {
                photoUrl: 'static/image/report_user/ar/04.png',
                isPraise: false
            },
            {
                photoUrl: 'static/image/report_user/ar/05.jpg',
                isPraise: false
            },
            {
                photoUrl: 'static/image/report_user/ar/06.jpg',
                isPraise: false
            }
        ]
    }
]
