// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
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

import { elements } from './elements'
import directives from './directives'

Object.keys(elements).forEach(name => {
    Vue.use(elements[name])
})

Object.keys(directives).forEach(name => {
    Vue.directive(name, directives[name])
})

Vue.component('log-card', LogCard)

// 是否V10
Vue.prototype.isV10 = info.isV10

Vue.config.productionTip = false

window.appInit = function () {
    let cloudhub = window.cloudhub
    let _core = window._core

    cloudhub.userInfo = _core.userInfo

    Object.assign(Vue.prototype, _core)

    Vue.use(base)
    Vue.use(toast)
    Vue.use(bus)
    Vue.use(events)
    Vue.use(redirectTo)
    Vue.use(dataly)
    Vue.use(request, _core.userInfo)

    // 首页Tab红点
    Vue.prototype.showTabRedDot = (options: { num: number }) => {
        cloudhub.cloudoffice.showCardNotify(options)
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

    // 统计用户eid
    if (_core.userInfo.eid) {
        window._dataly.push(['_addPost', {
            eid: _core.userInfo.eid,
            companyName: _core.userInfo.companyName
        }])
    }
    window._dataly.push(['_addPost', {
        version: 'pc-' + config.version,
        buildVersion: info.buildDate.replace(/^.*\-|\D/ig, '')
    }])

    new Vue({
        render: h => h(App)
    }).$mount('#app')
}
