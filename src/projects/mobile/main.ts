// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import config from 'config'
// import Raven from 'raven-js'
import {
    base,
    request,
    toast,
    redirectTo,
    bus,
    events,
    dataly
} from '../../plugins'
// import track from '@/utils/track'
// import ENV from 'config'
import LogCard from 'components/log-card.vue'

Vue.component('log-card', LogCard)

// 是否V10
Vue.prototype.isV10 = info.isV10

Vue.config.productionTip = false

window.appInit = function () {
    let cloudhub = window.cloudhub
    let _core = window._core
    let user = cloudhub.userInfo = _core.userInfo
    Object.assign(Vue.prototype, _core)
    Vue.use(base)
    Vue.use(toast)
    Vue.use(bus)
    Vue.use(events)
    Vue.use(redirectTo)
    Vue.use(dataly)
    Vue.use(request, user)

    // 首页Tab红点
    Vue.prototype.showTabRedDot = () => {
        cloudhub.cloudoffice.showCardNotify()
    }
    Vue.prototype.clearTabRedDot = () => {
        cloudhub.cloudoffice.clearCardNotify()
    }

    // 记录错误日志
    Vue.prototype.logError = (config.runenv === 'yzj') ? (error) => {
        if (typeof error === 'object') {
            error = JSON.stringify(error)
        }
        // Raven.captureException(new Error(error))
    } : (error) => {
        console.info('logError', error)
    }

    // 检查版本变化
    let ls = window.localStorage
    if (ls) {
        let saveVersion = Number(ls.getItem('cloudoffice-version') || '0')
        let currVersion = config.version
        if (currVersion !== saveVersion) {
            ls.setItem('cloudoffice-version', currVersion + '')
            Vue.prototype.cloudofficeVersionChange = {
                from: saveVersion,
                to: currVersion
            }
            Vue.prototype.dataly({
                event: '工作台版本更新'
            })
        } else {
            Vue.prototype.cloudofficeVersionChange = false
        }
    } else {
        Vue.prototype.dataly({
            error: '客户端不支持localStorage'
        })
    }

    // 统计用户eid
    if (user.eid) {
        window._dataly.push(['_addPost', {
            eid: user.eid,
            companyName: user.companyName
        }])
    }
    window._dataly.push(['_addPost', {
        v10: info.isV10,
        version: (info.isV10 ? 'v10' : 'v9') + '-' + config.version,
        buildVersion: info.buildDate.replace(/^.*\-|\D/ig, '')
    }])

    // vue组件起始测速点
    info.timePoints && (info.timePoints['rootCmpInit'] = Date.now())

    console.timeEnd('执行appInit')
    console.time('加载首页')
    new Vue(App).$mount('#app')
}
