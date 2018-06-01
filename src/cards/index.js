import Vue from 'vue'

// const bus = Vue.prototype.bus
const isV10Intro = info.isV10 && (info.page === 'intro')

let map = {}
// 注册卡片
const register = (name, getComp) => {
    map[name] = true
    Vue.component('card_' + name, function (resolve, reject) {
        getComp((comp) => {
            setTimeout(() => {
                resolve(comp)
            }, 0)
        })
    })
}

// 签到统计
register('attendance', function (cb) {
    require.ensure([], function () {
        if (isV10Intro) return cb(require('../cards-intro/attendance'))
        cb(require('../cards/attendance'))
    })
})

// 报表秀秀 boss
register('boss', function (cb) {
    require.ensure([], function () {
        if (isV10Intro) return cb(require('../cards-intro/boss'))
        cb(require('../cards/boss'))
    })
})

// 报表秀秀 kdcloud
register('kdcloud', function (cb) {
    require.ensure([], function () {
        if (isV10Intro) return cb(require('../cards-intro/boss'))
        cb(require('../cards/boss'))
    })
})

// 快速审批 - 审批助手
register('quick-flow', function (cb) {
    require.ensure([], function () {
        if (isV10Intro) return cb(require('../cards-intro/quick-flow'))
        cb(require('../cards/cloudflow').QuickFlow)
    })
})

// 审批追踪
register('track-flow', function (cb) {
    require.ensure([], function () {
        if (isV10Intro) return cb(require('../cards-intro/track-flow'))
        cb(require('../cards/cloudflow').TrackFlow)
    })
})

// 常用应用
register('myapp', function (cb) {
    cb(require('../cards/myapp'))
})

// 时间助手
register('task', function (cb) {
    cb(require('../cards/task'))
})

// 工作汇报
register('workreport', function (cb) {
    require.ensure([], function () {
        if (isV10Intro) return cb(require('../cards-intro/workreport'))
        cb(require('../cards/workreport'))
    })
})

// 管理专区
register('admin-zone', function (cb) {
    require.ensure([], function () {
        cb(require('../cards/admin-zone'))
    })
})

// 新闻示例卡片
if (isV10Intro) {
    register('news', function (cb) {
        require.ensure([], function () {
            cb(require('../cards-intro/news'))
        })
    })
}

export default {}

export function includes (n) {
    return map[n] === true
}
