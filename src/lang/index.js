import langs from './langs.js'

export default langs({
    'zh-CN': {
        settings: {
            button: '添加',
            title: '添加需要通知的卡片'
        },
        loading: '加载中',
        error: {
            reloadCards: '卡片加载失败，点击重试'
        },
        card: {
            emptyText: {
                default: '暂时没有新动态'
            },
            gotoApp: '进入应用',
            demo: '示例',
            ok: '确定',
            title: {},
            btnTitle: {}
        },
        myapp: {
            all: '全部'
        },
        emptyText: '新动态全部看完了',
        friend: '朋友',
        shareContacts: {
            tel: '手机联系人',
            cloudhub: '云之家同事',
            wechat: '微信好友'
        },
        unreadStatusCount: '条新动态',
        freeUse: '免费使用云之家团队版'
    },
    'en-US': {
        settings: {
            button: 'Add',
            title: 'Add cards'
        },
        loading: 'Loading',
        error: {
            reloadCards: 'Reload'
        },
        card: {
            emptyText: {
                default: 'No Upcoming'
            },
            gotoApp: 'More',
            demo: 'demo',
            ok: 'OK',
            title: {
                'attendance': 'Punch in Statistics',
                'boss': 'Data Talk',
                'kdcloud': 'Data Talk',
                'quick-flow': 'Workflow Assistant',
                'track-flow': 'Workflow Tracking',
                'myapp': 'My Favourites',
                'task': 'Schedule',
                'workreport': 'Work Report',
                'news': 'News'
            },
            btnTitle: {
                '新建': 'Create',
                '新建日程': 'Create',
                '全部': 'All',
                '更多': 'More',
                '更多动态': 'More',
                '进入应用': 'More'
            }
        },
        myapp: {
            all: 'All'
        },
        emptyText: 'You have finished the news feed',
        friend: 'Friend',
        shareContacts: {
            tel: 'Mobile phone contact',
            cloudhub: 'Cloud Hub colleague',
            wechat: 'WeChat friend'
        },
        unreadStatusCount: ' status',
        freeUse: 'Use standard edition for free'
    }
})
