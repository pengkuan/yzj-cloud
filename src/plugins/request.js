import ENV from '../config'
import { params2object } from '@/utils/url'
import { urlInsertQuery } from '@/utils'

const version = ENV.version

export default function install (Vue, userinfo) {
    // 用户信息
    userinfo = {
        gender: userinfo.gender,
        openid: userinfo.openId,
        wbnetworkid: userinfo.wbnetworkid,
        eid: userinfo.eid,
        company: userinfo.companyName,
        name: userinfo.name,
        wbuserid: userinfo.wbuserid
    }
    const keys = Object.keys(userinfo)
    let ticketsCache = {}

    function getTickets (appids, requestFn) {
        return new Promise((resolve, reject) => {
            let isArray = Array.isArray(appids)
            let now = new Date().getTime()

            // 把参数格式化成不重复的数组
            if (!isArray) {
                appids = [appids]
            }

            // 只请求没有ticket或者ticket已失效的
            appids = Array.from(new Set(appids)).map(n => n + '')
    
            let localTickets = []
            let requestAppids = []

            appids.forEach(appid => {
                let cache = ticketsCache[appid]
                if (cache && cache.value && cache.expired > now) {
                    localTickets.push(cache.value)
                } else {
                    requestAppids.push(appid)
                }
            })

            // 如果所有appid都有有效缓存，直接返回
            if (appids.length === localTickets.length) {
                resolve(localTickets)
                return
            }
            
            // 标记状态
            requestAppids.forEach(appid => {
                ticketsCache[appid] = {
                    status: 'loading',
                    value: '',
                    expired: 0
                }
            })

            // 根据入参类型返回不同类型的结果
            let formatResult = function (data, ids) {
                if (isArray) {
                    return data
                } else {
                    return data[ids[0]]
                }
            }

            requestFn({
                method: 'post',
                url: '/cloudwork/batchticket/tickets',
                data: {
                    appids: requestAppids.join(',')
                }
            }).then(e => {
                let {success, data} = e
                if (success && data) {
                    // 60秒后过期
                    let expired = new Date().getTime() + 60 * 1000
                    let now = new Date().getTime()
                    Object.keys(data).forEach(appid => {
                        ticketsCache[appid] = {
                            status: 'ready',
                            value: data[appid],
                            expired: expired
                        }
                    })
                    
                    let tickets = appids.map(appid => {
                        let cache = ticketsCache[appid]
                        if (cache && cache.value && cache.expired > now) {
                            return cache.value
                        } else {
                            return ''
                        }
                    })

                    resolve(tickets)
                } else {
                    // 获取失败了，要从缓存中移除
                    requestAppids.forEach(appid => {
                        let ticket = ticketsCache[appid]
                        if (ticket && ticket.status === 'loading') {
                            delete ticketsCache[appid]
                        }
                    })
                    reject(new Error('get tickets failed'))
                }
            })
        })
    }

    function request (opt, callback) {
        opt = opt || {}
        opt.headers = opt.headers || {}

        // 工作台版本
        opt.headers['Cloudoffice-Version'] = version

        // headers字段值必须是字符串型
        Object.keys(opt.headers).forEach(key => {
            let val = opt.headers[key]
            if (typeof val !== 'string') {
                opt.headers[key] = val + ''
            }
        })

        // 如果url不是绝对地址，视为 ENV.host 下
        if (opt.url.indexOf('//') === -1 && !qing.isDesktop) {
            opt.url = ENV.host + '/' + opt.url.replace(/^\//, '')
        }

        // serializer 默认为 form
        if (opt.serializer !== 'json') {
            opt.serializer = 'form'
        }

        // data必须是object
        if (typeof opt.data === 'string') {
            opt.data = params2object(opt.data)
        }

        // url中的参数应该移到data中
        if (opt.url.indexOf('?') > -1) {
            let [url, data] = opt.url.split('?')
            opt.url = url
            opt.data = Object.assign({}, params2object(data), opt.data)
        }

        // 默认不使用缓存
        if (opt.allowCache !== true) {
            opt.allowCache = false
        }

        // 用户信息替换
        utils.requestFormat(opt)

        return new Promise((resolve, reject) => {
            cloudhub.cloudoffice.request(opt, e => {
                // 返回结果的默认值
                e = e || { success: false }

                // 客户端返回的success有可能是字符串，在这里处理一下
                if (typeof e.success === 'string') {
                    e.success = e.success === 'true'
                }

                // promise方式
                if (e.success) {
                    resolve(e)
                } else {
                    let error = JSON.stringify({
                        request: opt,
                        response: e
                    })
                    reject(error)
                    // 异常上报
                    if (opt.logError) {
                        Vue.prototype.logError.call(null, error)
                    }
                }

                // 回调函数方式
                if (typeof callback === 'function') {
                    callback(e, opt)
                }

                opt = null
            })
        })
    }

    // 延时批量获取ticket
    let waiter = function (id, callback) {
        // appid 加入队列
        if (!waiter.appids.includes(id)) {
            waiter.appids.push(id)
        }

        // 回调函数加入队列
        (waiter.callbacks[id] = waiter.callbacks[id] || []).push(callback)

        // 重设计时器
        clearTimeout(waiter.timer)
        waiter.timer = setTimeout(() => {
            // 转移
            let appids = waiter.appids
            let waitings = waiter.callbacks
            // 清空队列
            waiter.appids = []
            waiter.callbacks = {}
            // 开始获取tickets
            getTickets(appids, request).then(tickets => {
                appids.forEach((id, index) => {
                    let ticket = tickets[index]
                    let callbacks = waitings[id] || []
                    callbacks.forEach(cb => cb(ticket, id))
                })
            })
        }, waiter.delay)
    }
    waiter.appids = []
    waiter.callbacks = {}
    waiter.delay = 50

    const utils = {
        // 用户信息替换
        requestFormat: function (opt) {
            var replace = str => {
                str = str + ''
                keys.forEach(key => {
                    str = str.replace(new RegExp('{{' + key + '}}', 'gm'), userinfo[key])
                })
                return str
            }
            var replaceObject = (obj, deep) => {
                if (!deep) deep = 1
                // 防止无限循环
                if (deep > 10) return
                Object.keys(obj).forEach(name => {
                    let val = obj[name]
                    if (typeof val === 'string') {
                        obj[name] = replace(obj[name])
                    } else if (Array.isArray(val)) {
                        if (opt.serializer === 'form') {
                            obj[name] = val.join(',')
                        }
                    } else if (typeof val === 'object') {
                        replaceObject(val, deep + 1)
                    }
                })
            }

            ['headers', 'data'].forEach(key => {
                let prop = opt[key]
                if (typeof prop === 'string') {
                    prop = replace(prop)
                } else if (typeof prop === 'object') {
                    replaceObject(prop)
                }
                opt[key] = prop
            })

            return opt
        },
        // 卡片请求数据，自动带上cardId和cardHost
        cardRequest (card, opt, callback) {
            opt.headers = Object.assign({
                'X-Requested-cardId': card.id || '',
                'X-Requested-cardHost': card.thhost || ''
            }, opt.headers)

            return this.request(opt, callback)
        },
        // 发送请求
        request: function (opt, callback) {
            let card = opt.card || {}
            let appId = opt.appId || card.appId
            let needTicket = opt.needTicket || card.needTicket
            
            // 判断是否要带ticket
            if (needTicket && appId) {
                return new Promise((resolve, reject) => {
                    waiter(appId, ticket => {
                        opt.url = urlInsertQuery(opt.url, 'ticket', ticket)
                        opt.url = urlInsertQuery(opt.url, 'appid', appId)
                        request(opt, callback).then(resolve).catch(reject)
                    })
                })
            } else {
                return request(opt, callback)
            }
        }
    }
    Vue.prototype.request = utils.request
    Vue.prototype.cardRequest = utils.cardRequest
    Vue.prototype.requestFormat = utils.requestFormat
}
