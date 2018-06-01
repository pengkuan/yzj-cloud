import LANG from '@/lang/intro.js'
import config from 'config'
let host = config.serverHost

export const myAppData = [
    {
        appName: LANG.appsTitle.cloudhubPhone,
        appType: 4,
        appId: 10257,
        appUrl: host + 'smartcall/lightApp/route?appid=10257',
        pid: '',
        logoUrl: 'http://do.yunzhijia.com/mcloud/download.action?filename=10257.png&type=1&t=1519787342000_5946'
    },
    {
        appName: LANG.appsTitle.attendance,
        appType: 4,
        appUrl: host + 'attendance-mobile/static/guidance/index.html',
        pid: '',
        logoUrl: 'http://do.yunzhijia.com/mcloud/download.action?filename=900001.png&type=1&t=1519812266000_6571'
    },
    {
        appName: LANG.appsTitle.myFile,
        appType: 1,
        appId: 900003,
        appUrl: 'cloudhub://gotoMyFile?tag=myFile',
        pid: '',
        logoUrl: 'http://do.yunzhijia.com/mcloud/download.action?filename=900003.png&type=1&t=1519787388000_3727'
    },
    {
        appName: LANG.appsTitle.voiceConference,
        appType: 4,
        appId: 101091433,
        appUrl: host + 'clout/views/voiceconference/conference-guide.jsp',
        pid: '',
        logoUrl: 'http://do.yunzhijia.com/mcloud/download.action?filename=101091433.png&type=1&t=1519787426000_7170'
    },
    {
        appName: LANG.appsTitle.workflow,
        appType: 4,
        appUrl: host + 'space/views/appintro/index.html',
        pid: '',
        logoUrl: 'http://do.yunzhijia.com/mcloud/download.action?filename=10104.png&type=1&t=1519867250000_5318'
    },
    {
        appName: LANG.appsTitle.workReport,
        appType: 4,
        appId: 101091429,
        appUrl: host + '/workreport-web/home/index.html',
        pid: '',
        logoUrl: 'http://do.yunzhijia.com/mcloud/download.action?filename=101091429.png&type=1&t=1519868752000_3992'
    }
]

// 个人空间卡片配置信息
export function cardsInfo () {
    let cards = {
        boss: [
            // {
            //     name: '常用应用',
            //     cls: 'myapp'
            // },
            {
                name: '报表秀秀',
                cls: 'baobiaoxiuxiu',
                linkUrl: '/operate/guidance/workreport/reportshow-guidance-v9.html?role=1'
            },
            {
                name: '时间助手',
                cls: 'gongzuoanpai',
                linkUrl: '/operate/guidance/workreport/workplan-guidance-v9.html?role=1'
            },
            {
                name: '工作汇报提交提醒',
                cls: 'gongzuohuibao',
                linkUrl: '/operate/guidance/workreport/workreport-guidance-v9-managers.html?role=1'
            },
            {
                name: '审批助手',
                cls: 'kuaijieshenpi',
                linkUrl: '/operate/guidance/workreport/dailylog-guidance-v9.html?role=1&type=1'
            },
            {
                name: '签到动态',
                cls: 'qiandaotongji',
                linkUrl: '/operate/guidance/workreport/attendance-guidance-v9-managers.html?role=1'
            // },
            // {
            //     name: '我的收藏',
            //     cls: 'wodeshoucang',
            //     linkUrl: '/zone/web/guide/index.html?role=1'
            }
        ],
        manager: [
            // {
            //     name: '常用应用',
            //     cls: 'myapp'
            // },
            {
                name: '报表秀秀',
                cls: 'baobiaoxiuxiu',
                linkUrl: '/operate/guidance/workreport/reportshow-guidance-v9.html?role=2'
            },
            {
                name: '时间助手',
                cls: 'gongzuoanpai',
                linkUrl: '/operate/guidance/workreport/workplan-guidance-v9.html?role=2'
            },
            {
                name: '工作汇报提交提醒',
                cls: 'gongzuohuibao',
                linkUrl: '/operate/guidance/workreport/workreport-guidance-v9-managers.html?role=2'
            },
            {
                name: '审批助手',
                cls: 'kuaijieshenpi',
                linkUrl: '/operate/guidance/workreport/dailylog-guidance-v9.html?role=2&type=1'
            },
            {
                name: '签到动态',
                cls: 'qiandaotongji',
                linkUrl: '/operate/guidance/workreport/attendance-guidance-v9-managers.html?role=2'
            },
            {
                name: '审批追踪',
                cls: 'shenpizhuizong',
                linkUrl: '/operate/guidance/workreport/dailylog-guidance-v9.html?role=2&type=2'
            // },
            // {
            //     name: '我的收藏',
            //     cls: 'wodeshoucang',
            //     linkUrl: '/zone/web/guide/index.html?role=2'
            }
        ],
        staff: [
            // {
            //     name: '常用应用',
            //     cls: 'myapp'
            // },
            {
                name: '时间助手',
                cls: 'gongzuoanpai',
                linkUrl: '/operate/guidance/workreport/workplan-guidance-v9.html?role=3'
            },
            {
                name: '审批追踪',
                cls: 'shenpizhuizong',
                linkUrl: '/operate/guidance/workreport/dailylog-guidance-v9.html?role=3&type=2'
            // },
            // {
            //     name: '我的收藏',
            //     cls: 'wodeshoucang',
            //     linkUrl: '/zone/web/guide/index.html?role=3'
            }
        ]
    }
    return cards
}
