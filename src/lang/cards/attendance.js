import langs from '../langs.js'

export default langs({
    'zh-CN': {
        morningBirdText: '早起鸟',
        beforeTenText: '小伙伴们, 已经开始了新一天的奋斗',
        abnormalTextBegin: '迟到、未签到共 ',
        abnormalTextEnd: ' 人',
        normalText: '全员签到正常',
        morningBirdNoneText: '今天没有人获得早起鸟称号',
        holidayText: '今天是休息日',
        overtimeTextBegin: '',
        overtimeTextEnd: ' 名员工仍在加班',
        buttonText: '查看统计详情',
        fullNormal: '全员正常'
    },
    'en-US': {
        morningBirdText: 'Early bird',
        beforeTenText: 'Abnormal statistics will be generated at 10:00',
        abnormalTextBegin: 'A total of ',
        abnormalTextEnd: ' persons were late and did not sign in',
        normalText: 'All staff sign in normal',
        morningBirdNoneText: 'Nobody won the early bird glory today',
        holidayText: 'Today is a day off',
        overtimeTextBegin: 'There are still ',
        overtimeTextEnd: ' employees working overtime',
        buttonText: 'View statistics details',
        fullNormal: 'Full normal'
    }
})
