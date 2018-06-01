import { params2object } from '@/utils/url'

// 把act.url和act.params拼起来
function toUrl (act) {
    if (typeof act === 'object') {
        let url = act.url
        // 把{a:1,b:2}转换为a=1&b=2
        if (typeof act.data === 'object') {
            act.data = Object.keys(act.data).map(key => {
                return key + '=' + act.data[key]
            }).join('&')
        }

        if (act.data === '') {
            return url
        }

        // 把a=1&b=2插入url中（问号后面）
        if (typeof act.data === 'string') {
            let data = act.data || ''
            if (url.match(/\?/)) {
                url = url.replace(/\?/, '?' + data + '&')
            } else if (url) {
                url = url + '?' + data
            } else {
                url = data
            }
        }
        return url
    }

    if (typeof act === 'string') {
        return act
    }

    return ''
}

function gotoLightApp (opt) {
    let xt = window.XuntongJSBridge

    xt && xt.call('gotoLightApp', {
        appId: opt.appId + '',
        appName: opt.appName || '',
        urlParam: opt.urlParam || ''
    })
}

export default function install (Vue) {
    let waiting = {}
    // 页面失去焦点时，认为跳转已经成，清除队列
    document.addEventListener('disappear', () => {
        waiting = {}
    })

    // 检查app权限
    Vue.prototype.checkAppAuth = function (appid) {
        let cloudhub = window.cloudhub
        return new Promise((resolve, reject) => {
            cloudhub.cloudoffice.checkAppAuth({ appId: appid }, e => {
                // alert(JSON.stringify({ appId: appid }))
                // alert(JSON.stringify(e))
                if (e.data && e.data.isAuth) {
                    resolve()
                } else {
                    reject(new Error())
                }
            })
        })
    }

    Vue.prototype.redirectTo = function (opt, onError, isWating) {
        // 防止重复点击，打开多个页面
        let id = JSON.stringify(opt)
        if (!isWating) {
            if (waiting[id]) {
                return
            } else {
                waiting[id] = true
                setTimeout(() => {
                    waiting[id] = false
                }, 2000)
            }
        }

        // 把act.url和act.data拼起来
        opt.url = toUrl(opt)

        opt = {
            appId: opt.appId || opt.appid || '',
            appName: opt.appName || '',
            urlParam: opt.appUrl || opt.urlParam || opt.url || '',
            checkAppAuth: opt.checkAppAuth
        }

        if (opt.appId && opt.checkAppAuth) {
            // 如果有appid，要检查用户是否有权限进入此app
            this.checkAppAuth(opt.appId).then(() => {
                gotoLightApp(opt)
                opt = null
            }).catch(() => {
                opt = null
                if (typeof onError === 'function') {
                    onError('管理员已经设置该应用使用权限范围。<br/>如需使用，请联系企业管理员进行开通。')
                }
            })
        } else {
            // 否则直接跳转
            gotoLightApp(opt)
            opt = null
        }
    }

    Vue.prototype.goApp = function (opt, onError) {
        // 防止重复点击，打开多个页面
        let id = JSON.stringify(opt)

        if (waiting[id]) {
            return
        } else {
            waiting[id] = true
            setTimeout(() => {
                waiting[id] = false
            }, 2000)
        }

        let xt = window.XuntongJSBridge
        let { appId, appName, appType, appUrl, pid } = opt
        opt = null
        if (appUrl) {
            appUrl = decodeURIComponent(appUrl)
        } else {
            appUrl = ''
        }

        // 扫一扫
        if (appUrl === 'xuntong:scanQRCode?needResult=0' && cloudhub.clientVersion >= 9.57) {
            appUrl = 'cloudhub://localFunction?name=recognizeQrcodeAndBizCard'
        }

        if (appUrl.match(/localFunction/)) { // localFunction
            let query = params2object(appUrl.split('?')[1] || '')
            let name = query.name
            delete query.name
            xt.call('localFunction', {
                name: name,
                param: query
            })
        } else if (appUrl.indexOf('xuntong:') === 0) { // xuntong:
            let params = appUrl.split(/xuntong:|\?/)
            xt.call(params[1], params2object(params[2]))
        } else {
            if (appType === 1) {
                // 本地应用
                let [, fn, qs] = appUrl.split(/cloudhub:\/\/|\?/)
                let params = params2object(qs)
                xt.call(fn, params)
            } else if (appType === 5) {
                // 公众号
                xt.call('chat', {
                    'openId': pid
                }, e => {
                    if (e.success === 'false' && e.error) {
                        this.toast(e.error)
                    }
                })
            } else {
                // 普通应用
                this.redirectTo({
                    appId,
                    appName,
                    appUrl
                }, onError, true)
            }
        }
    }
}
