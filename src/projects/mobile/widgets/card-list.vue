<style lang="less" scoped>
@import '../../../css/variable';

#cards-container{
    transition: height 1s;
    zoom: 1;
    &::after{
        display: block;
        content: ' ';
        clear: both;
        line-height: 0;
        visibility: hidden;
    }
}
.reload-cards{
    text-align: center;
    margin: 50px auto;
}
.split-line{
    position: relative;
    height: 24px;
    margin-bottom: 12px;
    overflow: visible;
    .line{
        background: #E5E7ED;
        width: 90%;
        height: 1px;
        position: absolute;
        top: 12px;
        left: 5%;
    }
    .text{
        width: 100%;
        height: 100%;
        position: absolute;
        line-height: 24px;
        text-align: center;
        span{
            display: inline-block;
            margin-left: auto;
            margin-right: auto;
            background: #f8f9fb;
            color: #768893;
            padding: 0 20px;
        }
    }
}
</style>

<template>
    <div id="cards-container">
        <div id="cards-wrap" @touchstart="scrollAbort = true">
            <tap v-if="cardsLoadFailure && !cardList.length"
                class="reload-cards" @tap="init()">
                {{LANG.error.reloadCards}}
            </tap>
            <template v-for="card in elements">
                <template v-if="card.isLine">
                    <div class="split-line" :key="card.id">
                        <div class="line"></div>
                        <div class="text">
                            <span>{{LANG.emptyText}}</span>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div :class="{unread: !!unreadCardMap[card.id]}"
                        :key="card.id"
                        :cardid="card.id">
                        <card :ref="card.id" :card="card" :has-notify="!!unreadCardMap[card.id]" @request="cardRefreshSelf"></card>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import cardsMixins from 'mixins/cards'
import cardMixins from 'mixins/card'
import {px2rem, urlInsertQuery, str2Object} from '@/utils'
import { getElementTop } from '@/utils/dom'
import {includes} from '../../../cards'
import less from 'less'
import Tap from 'components/tap'
import CardComponents from '../../../card-components'
import Card from 'components/card'
import {objectKeySort} from '../../../utils/index'
import LANG from '@/lang/index'

const cardDefaultConfigs = {
    'boss': {
        showType: 1,
        emptyText: '暂时没有新报表',
        redirectActionData: {
            type: 'redirect',
            appId: 10650,
            appName: '报表秀秀'
        }
    },
    'kdcloud': {
        showType: 1,
        emptyText: '暂时没有新报表',
        redirectActionData: {
            type: 'redirect',
            appId: 10688,
            appName: '销售快报'
        }
    }
}

function vueSet (obj, name, val) {
    if (obj.hasOwnProperty(name)) {
        obj[name] = val
    } else {
        Vue.set(obj, name, val)
    }
}

// 屏幕高度
let viewportHeight = document.documentElement.clientHeight

export default {
    name: 'app',
    mixins: [cardsMixins],
    components: {
        Tap,
        Card
    },
    computed: {
    },
    data () {
        return {
            LANG,
            activityLastTime: '',
            notifysTime: {},
            pageAppear: true,
            elements: [],
            // 是否有卡片列表缓存
            hasCardsCache: false,
            // 卡片缓存是否变化
            cardsUpdate: false,
            // 本地卡片列表数据
            localCards: [],
            cardList: [],
            // 是否使用了缓存
            useCache: false,
            // 卡片列表是否加载失败
            cardsLoadFailure: false,
            // 未读数量
            unreadCount: 0,
            // 中断滚动
            scrollAbort: false,
            // 未读的卡片
            unreadCardMap: {},
            // hold住卡片列表
            holdList: [],
            // 已渲染的卡片
            renderedCards: {},
            // 置顶卡片名称
            topCardName: 'task',
            // 强制更新的卡片
            forceUpdateCardNames: ['task']
        }
    },
    methods: {
        getElements () {
            let list = []
            let insertedLine = false
            let first

            this.cardList.forEach((card, index) => {
                if (card.removed) return
                if (card.name === 'myapp') return
                if (card.showType === 0 && card.cardExpired) return

                if (!first) {
                    first = card
                }

                // 第一张是未读的才显示分割线
                if (first.cardUnread && !insertedLine && !card.cardUnread) {
                    list.push({
                        isLine: true
                    })
                    insertedLine = true
                }
                list.push(card)
            })

            this.elements = list
        },
        // 注册卡片
        registerCardComponents (cards) {
            let registedCards = {}
            cards.forEach(n => {
                // 防止重复注册
                if (registedCards[n.id]) {
                    return
                } else {
                    registedCards[n.id] = true
                }

                let safeMixins = {}
                if (n.enableMixins && typeof n.mixins === 'string') {
                    const safeStr = n.mixins.replace(/^mixins:/, '')
                                            .replace(/\^\^/gm, '\'')
                                            .replace(/☆/gm, '\'')
                                            .replace(/@@/gm, '"')
                                            .replace(/★/gm, '"')
                                            .replace(/%%/gm, '<')
                                            .replace(/◇/gm, '<')
                    safeMixins = str2Object(safeStr)
                }
                // 如果不是内置卡片，动态注册组件
                if (!includes(n.name)) {
                    // 如果卡片没有name，用id代替
                    n.name = n.name || n.id
                    // 注册组件
                    Vue.component('card_' + n.name, (resolve, reject) => {
                        // 模板安全过滤
                        let safeTemplate = n.template
                            .replace(/\^\^/gm, '\'') // ^^代替单引号，还原
                            .replace(/☆/gm, '\'') // ^^代替单引号，还原
                            .replace(/@@/gm, '"') // @@代替双引号，还原
                            .replace(/★/gm, '"') // @@代替双引号，还原
                            .replace(/%%/gm, '<') // %%代替小于号，还原
                            .replace(/◇/gm, '<') // %%代替小于号，还原
                            .replace(/(@|v-on:)\w+="[^"]*"/img, '') // 过滤事件绑定
                            // .replace(/<a/img, '') // 过滤超链接
                            .replace(/script\s*>/, 'div>') // 过滤script标签（好像没什么必要）
                        resolve({
                            mixins: [cardMixins, safeMixins, {
                                data () {
                                    return {
                                        info: info
                                    }
                                }
                            }],
                            template: safeTemplate,
                            props: {
                                title: String,
                                actions: [Object, Array],
                                data: {
                                    type: [Object, Array]
                                },
                                card: Object,
                                loaded: true
                            },
                            mounted () {
                                // 给卡片容器加上scope标记
                                this.$el.parentElement.setAttribute('scope', n.name)
                                // 版本
                                if (info.isV10) {
                                    this.$el.setAttribute('data-v10', 'true')
                                } else if (info.isV9) {
                                    this.$el.setAttribute('data-v9', 'true')
                                }
                                // 平台
                                this.$el.setAttribute('data-mobile', 'true')
                                if (info.isAndroid) {
                                    this.$el.setAttribute('data-android', 'true')
                                } else if (info.isIos) {
                                    this.$el.setAttribute('data-ios', 'true')
                                }
                            }
                        })
                    })
                    // 添加css
                    if (n.style) {
                        less.render(`[scope="${n.name}"]{${n.style}}`, (e, output) => {
                            if (output && output.css) {
                                let tag = document.createElement('style')
                                tag.innerHTML = output.css
                                tag.setAttribute('card', n.name)
                                document.head.appendChild(tag)
                            }
                        })
                    }
                }
            })
        },
        onCardUpdate (e) {
            let {name, id, updatetime, ext} = e.data

            switch (name) {
                case 'YUNZHIJIA_ACTIVITY_notice':
                    this.bus.$emit('upadateYunzhijiaNotice')
                    break
                default:
                    if (name === 'myapp') {
                        this.bus.$emit('myappCardUpdate')
                    } else if (ext && ext.data) {
                        // 消息带数据，直接更新
                        this.updateCardData(name, ext.data)
                    } else if (name) {
                        let card = this.getCardByName(name)
                        if (card) {
                            this.refreshCardData(card)
                        } else {
                            console.log(`未找到name为${name}的卡片`)
                        }
                    } else if (id) {
                        let card = this.getCardById(id)
                        if (card) {
                            this.refreshCardData(card)
                        } else {
                            console.log(`未找到id为${id}的卡片`)
                        }
                    }
                    break
            }
        },
        // 取所有卡片消息
        watchCardsNotifys () {
            let fn = e => {
                this.onCardUpdate(e)
            }
            // 监听新消息
            document.removeEventListener('cardUpdate', fn)
            document.addEventListener('cardUpdate', fn)
        },
        // 更新卡片数据
        updateCardData (card, data) {
            if (typeof card === 'string') {
                card = this.getCardByName(card)
            }
            vueSet(card, 'data', data)
            vueSet(card, 'cardUpdateTime', data.cardUpdateTime)
            vueSet(card, 'cardExpired', data.cardExpired)
            vueSet(card, 'cardUnread', data.cardUnread)
            this.renderedCards[card.id] = true
        },
        // 根据卡片名称查找卡片
        getCardByName (name) {
            return this.localCards.filter(card => {
                return card.name === name
            })[0]
        },
        // 根据卡片id查找卡片
        getCardById (id) {
            return this.localCards.filter(card => {
                return card.id + '' === id
            })[0]
        },
        // 卡片自主刷新
        cardRefreshSelf (card, opt) {
            opt = opt || {}
            if (card) {
                this.requestCardDataRemote({
                    card,
                    params: opt.params,
                    forceUpdate: true
                })
            }
        },
        // 刷新卡片数据
        refreshCardData (card, opt) {
            opt = opt || {}
            if (card) {
                let delay = card.activeRefreshDelay || 0
                setTimeout(() => {
                    this.requestCardDataRemote({
                        card,
                        params: opt.params,
                        forceUpdate: this.forceUpdateCardNames.includes(card.name)
                    })
                }, delay)
            }
        },
        // 隐藏卡片（从用户自定义中隐藏该卡片）
        removeCard (name) {
            this.cards.forEach(n => {
                if (n.name === name) {
                    Vue.set(n, 'removed', true)
                }
            })
            this.hideUserCard(name)
        },
        // 计算卡片样式：高度
        computedCardHeight (card) {
            let style = ''
            let height = card.height + ''

            // 卡片高度默认218
            if (!height || height === '0' || isNaN(height)) {
                height = '218'
            }

            // px转rem
            style += 'height:' + px2rem(height) + 'rem;'

            return style
        },
        reload () {
            // 先固定容器高度，再对容器内的数据进行操作
            // 否则在android会出现闪烁的情况
            fixHeightUntil(document.querySelector('#cards-container'), done => {
                this.cards = []
                this.$nextTick(e => {
                    this.loadCards(done)
                })
            })
        },
        setCardDefaultConfig (cards) {
            cards.forEach(card => {
                let n = cardDefaultConfigs[card.name]
                if (!n) return

                Object.keys(n).forEach(key => {
                    if (typeof card[key] === 'undefined') {
                        card[key] = n[key]
                    }
                })
            })
            return cards
        },
        updateLocalCards (data) {
            if (!this.localCards || !this.localCards.length) {
                this.localCards = data
            } else {
                let list = data.map(n => {
                    let o = this.getCardById(n.id)
                    if (!o) return n
                    // 确保data不被覆盖
                    delete n.data
                    Object.assign(o, n)
                    return o
                })
                this.localCards = list
            }
        },
        // 读取卡片列表缓存
        readCardsCache (cb) {
            this.getUserCardListCache().then(data => {
                if (data && data.length) {
                    this.hasCardsCache = true
                    this.updateLocalCards(data)
                } else {
                    this.hasCardsCache = false
                }
                if (typeof cb === 'function') cb()
            }).catch(() => {
                this.hasCardsCache = false
                if (typeof cb === 'function') cb()
            })
        },
        // 读取卡片列表最新数据
        requestCardsData (opt = {}, cb) {
            // 如果添加删除卡片，直接从缓存读取
            let getCardList = opt.cardsSettingIsChanged ? this.getUserCardListCache : this.getLatestUserCardList

            getCardList().then(data => {
                // 排除常用应用卡片
                // 设置默认值
                // key排序
                data = data.filter(n => n.name !== 'myapp')
                data = this.setCardDefaultConfig(data)
                data = data.map(objectKeySort)

                if (!data || !data.length) {
                    this.setPageReady()
                }
                
                // V10个人空间
                if (info.isV10 && (info.page === 'intro')) {
                    let normalCards = ['task']
                    let introCards = ['boss', 'kdcloud', 'news', 'quick-flow', 'attendance']
                    let map = {}
                    data.forEach(card => {
                        card.cardExpired = false
                        card.cardUnread = false
                        card.showType = 2
                        if (normalCards.includes(card.name)) {
                            map[card.name] = card
                        } else if (introCards.includes(card.name)) {
                            card.dataSourceAction = ''
                            map[card.name] = card
                        }
                    })
                    data = []
                    normalCards.concat(introCards).forEach(name => {
                        if (map[name]) {
                            data.push(map[name])
                        }
                    })
                }

                if (opt.cardsSettingIsChanged) {
                    this.hasCardsCache = true
                    // 更新本地卡片列表
                    this.updateLocalCards(data)
                    // 如果有卡片
                    if (this.localCards.length) {
                        // 立即请求数据并重排
                        this.requestAllCardsData(() => {
                            this.checkHoldCardData()
                        })
                    } else {
                        // 否则立即重排
                        this.checkHoldCardData()
                    }
                    // 回调
                    if (typeof cb === 'function') cb()
                } else {
                    // 检查远程拿到的数据是否跟缓存一致
                    if (!this.diffUserCardListCache(data)) {
                        // 更新本地卡片列表
                        this.updateLocalCards(data)
                        // 写入缓存
                        this.saveUserCardListCache(data)
                        // 请求数据
                        if (this.hasCardsCache === false && this.useCache === true) {
                            this.requestAllCardsData()
                        }
                        // 回调
                        if (typeof cb === 'function') cb()
                    }
                }
                console.timeEnd('加载列表')
            }).catch(() => {
                // 如果请求失败且没有cache，显示重试界面
                if (this.hasCardsCache === false) {
                    this.cardsLoadFailure = true
                    this.setPageReady()
                }
                console.timeEnd('加载列表')
            })
        },
        setPageReady () {
            if (this.pageIsReady) {
                return
            } else {
                this.pageIsReady = true
            }
            // 通知
            this.$emit('ready')

            // 测速平台埋点：页面可见
            info.timePoints && (info.timePoints['firstPageVisible'] || (info.timePoints['firstPageVisible'] = Date.now()))
            this.speedReport()

            // 用dataly统计启动时间
            if (info.timePoints && info.timePoints.htmlStart) {
                let timespan = (Date.now() - info.timePoints.htmlStart) / 1000
                this.dataly({
                    event: '工作台加载完毕',
                    timespan: Math.floor(timespan + 0.5)
                })
            }
        },
        requestAllCardsData (cb, timeout, onlyRequestNoData) {
            if (!this.localCards.length) {
                this.setPageReady()
                return
            }

            // 注册动态卡片
            this.registerCardComponents(this.localCards)
            // 从缓存读取数据
            this.requestCardsDataFromCache()
            // 从远程读取每张卡片的数据
            this.localCards.forEach(card => {
                // 排除已加载过数据的卡片
                if (onlyRequestNoData && this.renderedCards[card.id]) {
                    return
                }
                this.requestCardDataRemote({
                    card: card
                })
            })

            // 在timeout时间之后，根据更新时间对卡片进行排序
            setTimeout(() => {
                this.setPageReady()
                console.timeEnd('加载数据')

                this.cardListRendered = true
                this.cardList = []
                this.$nextTick(() => {
                    this.cardList = this.sortCardsByUpdateTime()
                    this.getElements()
                    if (typeof cb === 'function') {
                        cb()
                    } else {
                        // 检查未读数量
                        this.countUnreadCard()
                        // ready
                        this.$emit('ready')
                    }
                })
            }, timeout || 300)
        },
        getCardDataFromCache (card) {
            let cache = this.storage.getJSON('card_cache_' + card.id)
            if (cache) {
                vueSet(card, 'data', cache.data)
                vueSet(card, 'cardUpdateTime', cache.cardUpdateTime || 0)
                vueSet(card, 'cardExpired', typeof cache.cardExpired === 'undefined' ? true : cache.cardExpired)
                vueSet(card, 'cardUnread', cache.cardUnread || false)
                this.renderedCards[card.id] = true
            } else {
                vueSet(card, 'cardUpdateTime', 0)
                vueSet(card, 'cardUnread', false)
                vueSet(card, 'cardExpired', true)
            }
        },
        // 从缓存读取所有卡片的数据
        requestCardsDataFromCache () {
            this.localCards.forEach(card => {
                this.getCardDataFromCache(card)
            })
        },
        // 卡片数据写入缓存
        saveCardDataToCache (card) {
            if (card.data) {
                this.storage.setItem('card_cache_' + card.id, {
                    data: card.data,
                    cardUpdateTime: card.cardUpdateTime || 0,
                    cardUnread: card.cardUnread || false,
                    cardExpired: card.cardExpired || false
                })
            }
        },
        // 从远程读取卡片的数据
        requestCardDataRemote (cfg) {
            let {
                card
            } = cfg

            card = this.getCardById(card.id)

            if (!card) {
                return
            }

            // 使用配置中的数据
            if (card.dataSource) {
                vueSet(card, 'data', card.dataSource)
                vueSet(card, 'cardUpdateTime', 0)
                vueSet(card, 'cardUnread', false)
                vueSet(card, 'cardExpired', false)
                vueSet(card, 'dataSource', null)
                this.renderedCards[card.id] = true
                return
            }

            // 管理员卡片置顶
            if (card.name === 'admin-zone') {
                card.cardUpdateTime = Number.MAX_VALUE
                card.cardExpired = false
            }

            // 检查是否有指定数据源
            let dataSourceAction = card.actions[card.dataSourceAction] || {}
            let url = dataSourceAction.url
            if (!url) {
                return
            }

            // 报表秀秀取数卡片接口更改
            if (card.name === 'boss' || card.name === 'kdcloud') {
                url = url.replace(/((openapi|cardapi)\/third\/v1\/)?api\/linkerp\/interaction\/getWorkBench/, 'connecterp-charts-nodejs/getDiagramList')
                url += (url.indexOf('?') !== -1) ? '&' : '?'
                url += `eid=${this.userInfo.eid}&wbuserid=${this.userInfo.wbuserid}&name=${this.userInfo.name}`
            }

            // 审批助手卡片使用新接口
            url = url.replace('getTodoListByParam', 'getFlowTodoListV2')

            let fetchData = url => {
                // get card's data
                if (card.name === 'boss' || card.name === 'kdcloud') {
                    dataSourceAction.params = Object.assign({'version': 1.03}, dataSourceAction.params)
                }
                var opts = {
                    method: dataSourceAction.method,
                    data: dataSourceAction.params,
                    url: url,
                    serializer: dataSourceAction.paramType,
                    headers: {
                        'X-Requested-cardId': card.id || '',
                        'X-Requested-cardHost': card.thhost || ''
                    },
                    allowCache: false,
                    card: card
                }

                let onfailure = (card) => {
                    let cache = this.storage.getJSON('card_cache_' + card.id)
                    if (!cache) {
                        vueSet(card, 'cardUpdateTime', 0)
                        vueSet(card, 'cardUnread', false)
                        vueSet(card, 'cardExpired', true)
                    }
                }

                this.request(opts).then(e => {
                    let { success, data, cardUpdateTime, cardUnread, cardExpired } = e
                    
                    // 兼容，cardUnread等字段在某些接口与data平级，在某些接口在data下级
                    if (typeof cardUpdateTime === 'undefined') {
                        cardUpdateTime = data.cardUpdateTime || 0
                        cardUnread = data.cardUnread || false
                        cardExpired = data.cardExpired || false
                    }
                    delete data.cardUpdateTime
                    delete data.cardUnread
                    delete data.cardExpired

                    // data不能是"NULL"之类
                    if (typeof data === 'string') {
                        success = false
                    }

                    // 快捷审批新接口数据格式从Array变成Object
                    if (card.name === 'quick-flow') {
                        if (!Array.isArray(data) && data.list) {
                            data = data.list
                        }
                    }

                    if (success) {
                        // 如果不在首页，且有未读，立即显示红点
                        if (cardUnread && !this.pageAppear) {
                            this.showTabRedDot()
                        }

                        // 对object的key进行排序
                        data = objectKeySort(data)

                        // hold住新拿到的数据（如果满足一下条件）
                        // 非强制更新 + 在当前页面 + 列表已经初始化完成 + 卡片也拿到过数据 + 且有未读消息 + 不是日程卡片
                        if (!cfg.forceUpdate && this.pageAppear && this.cardListRendered && this.renderedCards[card.id] && cardUnread) {
                            let cardData = Object.assign({}, card, {
                                data: data,
                                cardUpdateTime: cardUpdateTime,
                                cardExpired: cardExpired,
                                cardUnread: cardUnread
                            })

                            // 写入缓存
                            this.saveCardDataToCache(cardData)

                            // 加入hold住名单
                            this.holdList.push(card)

                            return
                        }

                        vueSet(card, 'data', data)
                        vueSet(card, 'cardUpdateTime', cardUpdateTime)
                        vueSet(card, 'cardExpired', cardExpired)
                        vueSet(card, 'cardUnread', cardUnread)

                        // 写入缓存
                        this.saveCardDataToCache(card)

                        // 后台更新
                        // 启动过程中不单独更新
                        if (this.pageAppear === false && this.cardListRendered === true) {
                            // 重新排序
                            this.sortCards()
                            // 重新统计，显示红点、气泡
                            this.countUnreadCard()
                        } else if (cfg.forceUpdate) {
                            // 重新排序
                            this.sortCards({
                                top: false
                            })
                            // 重新统计，显示红点、气泡
                            this.countUnreadCard()
                        }
                    } else {
                        onfailure(card)
                    }
                }).catch(e => {
                    onfailure(card)
                })
            }

            // 判断是否要带ticket
            fetchData(url)
        },
        // 根据更新时间重新排序
        sortCardsByUpdateTime () {
            let list = [].concat(this.localCards)

            list.sort((a, b) => {
                // 置顶卡片
                if (b.name === this.topCardName) return 1
                if (a.name === this.topCardName) return -1

                // 未读的一定比已读的在前面
                if (b.cardUnread && !a.cardUnread) return 1
                if (a.cardUnread && !b.cardUnread) return -1

                // 如果都未读，按时间排序
                if (a.cardUnread && b.cardUnread) {
                    return (b.cardUpdateTime || 0) - (a.cardUpdateTime || 0)
                }
                // 如果都已读，按下面逻辑判断

                // 有修改的排前面
                if (!b.cardExpired && a.cardExpired) return 1
                if (!a.cardExpired && b.cardExpired) return -1

                // 如果都有内容，按时间排
                if (!a.cardExpired && !b.cardExpired) {
                    return (b.cardUpdateTime || 0) - (a.cardUpdateTime || 0)
                }

                // 如果showType不一样，根据showType排
                if (a.showType !== b.showType) {
                    return (b.showType || 0) - (a.showType || 0)
                }

                return (b.cardUpdateTime || 0) - (a.cardUpdateTime || 0)
            })
            return list
        },
        // 计算未读卡片
        countUnreadCard () {
            let count = 0
            this.unreadCardMap = {}
            this.elements.forEach(n => {
                if (n.isLine) return
                if (n.name === 'myapp') return
                if (n.cardExpired !== true && n.cardUnread === true) {
                    count++
                    this.unreadCardMap[n.id] = true
                }
            })
            this.unreadCount = count
            this.bus.$emit('unreadCountChange', count)
            // 如果有未读，且当前不在主页，显示红点
            if (count > 0 && this.pageAppear === false) {
                this.showTabRedDot()
            }
        },
        scrollToFisrtUnreadAndroid (onFinish) {
            let div = document.querySelector('.unread')
            let to = getElementTop(div)
            cloudhub.ui.webViewScrollTo({
                scrollY: to * window.devicePixelRatio
            })
        },
        scrollToFisrtUnread (onFinish) {
            const batch = 6 // 每步走剩余距离的batch分之一
            const maxStep = 50 // 每步最多走maxStep像素
            const minStep = 1 // 每步最少走minStep像素
            let div = document.querySelector('.unread')
            if (!div) return
            // 终止信号
            this.scrollAbort = false

            let home = this.getHomeWrap()
            let divTop = getElementTop(div)
            let to
            if (info.isV10 && info.isIos) {
                to = divTop + info.IosHeaderHeight / 2
            } else {
                if (info.isV10 && info.isAndroid) {
                    divTop += info.bodyMarginTop - info.topHeight / 2
                }
                to = divTop - (viewportHeight - div.clientHeight) / 2
            }

            let loop = () => {
                let distance = to - home.scrollTop

                if (this.scrollAbort || (Math.abs(distance) < minStep)) {
                    // 滚动结束
                    if (typeof onFinish === 'function') {
                        onFinish()
                    }
                    // 取消animationFrame
                    cancelAnimationFrame(window.raf)
                    return
                }

                let step = distance / batch // 每次走总距离的batch分之一
                let unit = step / Math.abs(step) // 正负1
                if (Math.abs(step) > maxStep) step = maxStep * unit
                if (Math.abs(step) < minStep) step = minStep * unit
                home.scrollTop = home.scrollTop + step
                window.raf = window.requestAnimationFrame(loop)
            }
            loop()
        },
        getHomeWrap () {
            return document.querySelector('.home-wrap') || document.body
        },
        // 检查未读
        checkUnread (scrollTop) {
            if (!this.pageAppear) return

            let div = document.querySelector('.unread')

            if (!div) return
            let home = this.getHomeWrap()
            let divTop = getElementTop(div)
            let arrive

            // 判断规则，未读卡片的标题出现在屏幕的上半部分
            if (info.isV10 && qing.isIos) {
                let divScrollTop = divTop - home.scrollTop
                let topLine = -info.IosHeaderHeight
                let bottomLine = 0
                arrive = divTop > topLine && divScrollTop < bottomLine
            } else {
                let halfViewportHeight = viewportHeight / 2
                if (qing.isAndroid && info.isV10) {
                    divTop += info.bodyMarginTop
                }
                // arrive = (home.scrollTop + halfViewportHeight + info.topHeight) > divTop && (home.scrollTop + info.topHeight) < divTop
                arrive = (home.scrollTop + halfViewportHeight + info.topHeight) > divTop
            }

            // 如果卡片头部到达屏幕中间的位置
            if (arrive) {
                let card = this.getCardById(div.getAttribute('cardid'))
                vueSet(card, 'cardUnread', false)
                this.saveCardDataToCache(card)
                // 通知远端
                this.setCardReaded(card)
                // 重新统计
                this.countUnreadCard()
            }
        },
        // 设为已读
        setCardReaded (card) {
            if (['boss', 'kdcloud'].indexOf(card.name) > -1) {
                this.request({
                    url: '/api/linkerp/interaction/readReportWorkBench',
                    method: 'post',
                    serializer: 'json'
                }).then(data => {
                    // console.info(card.name, '已读', data)
                })
            } else if (card.name) {
            // } else if (['task', 'workreport', 'quick-flow', 'track-flow', 'news'].indexOf(card.name) > -1) {
                this.request({
                    url: '/cloudwork/cardRedDot/updateCardRedDot',
                    method: 'post',
                    data: {
                        cardName: card.name,
                        cardUnread: false
                    }
                }).then(data => {
                    // console.info(card.name, 'readed', data)
                })
            }
        },
        // 重新排序并回到顶部
        sortCards (cfg) {
            cfg = cfg || {}
            this.$nextTick(() => {
                let order = this.elements.map(n => n.id).join(', ')
                this.cardList = this.sortCardsByUpdateTime()
                this.getElements()
                let newOrder = this.elements.map(n => n.id).join(', ')
                // 如果cfg.top不为false， 默认回到顶部
                if (order !== newOrder && cfg.top !== false) {
                    this.$nextTick(this.scrollToTop)
                }
            })
        },
        scrollToTop () {
            let home = this.getHomeWrap()
            home.scrollTop = 0
        },
        // 检查并处理hold住的数据
        checkHoldCardData () {
            if (this.holdList.length > 0) {
                // 读取holdList中所有卡片的缓存数据
                this.holdList.forEach(card => {
                    this.getCardDataFromCache(card)
                })
                this.sortCards()
                // 清空
                this.holdList = []
                // 重新统计，显示红点、气泡
                this.countUnreadCard()
            } else {
                // 重新排序
                this.sortCards()
                // 重新统计，显示红点、气泡
                this.countUnreadCard()
            }
        },
        // 初始化
        init () {
            let loadData = () => {
                console.time('加载数据')
                // 埋点：卡片加载完成
                info.timePoints && (info.timePoints['loadCardsListEnd'] || (info.timePoints['loadCardsListEnd'] = Date.now()))
                this.requestAllCardsData()
            }

            // 获取列表缓存
            this.readCardsCache(() => {
                // 如果有缓存就等待200毫秒后显示
                // 如果没有缓存就等取到数据再显示
                if (this.hasCardsCache) {
                    this.requestCardsData()
                    setTimeout(() => {
                        this.useCache = true
                        console.timeEnd('加载列表')
                        loadData()
                    }, 200)
                } else {
                    this.requestCardsData({}, loadData)
                }
            })
        },
        speedReport () {
            if (this.hasReportSpeed) {
                return
            }
            this.hasReportSpeed = true
            if (new Date().getTime() - info.timePoints['htmlStart'] > 10000) return
            // 组件初始化前耗时、组件初始化到开始加载卡片列表数据耗时、加载卡片列表数据耗时、首屏渲染结束
            window.speedSdk && window.speedSdk.report([
                info.timePoints['rootCmpInit'] - info.timePoints['htmlStart'],
                info.timePoints['loadCardsListStart'] - info.timePoints['rootCmpInit'],
                info.timePoints['loadCardsListEnd'] - info.timePoints['loadCardsListStart'],
                info.timePoints['firstPageVisible'] - info.timePoints['htmlStart']
            ])
        }
    },
    created () {
        console.timeEnd('加载card-list.vue')
        console.time('加载列表')
        
        // 埋点：开始加载卡片
        info.timePoints && (info.timePoints['loadCardsListStart'] = Date.now())

        // 初始化
        this.init()

        // 监听卡片消息
        this.watchCardsNotifys()

        // 滚动到第一张未读卡片
        this.bus.$on('clickUpdateBubble', () => {
            this.scrollToFisrtUnread()
        })

        // // 监听滚动位置
        // if (info.isV10 && !qing.isIos) {
        //     // android && v10
        //     this.bus.$on('androidHomeWrapScroll', scrollTop => {
        //         setTimeout(() => {
        //             this.checkUnread(scrollTop)
        //         }, 500)
        //     })
        // } else {
        // ios || v9
        this.bus.$on('homeWrapScroll', () => {
            setTimeout(() => {
                this.checkUnread()
            }, 500)
        })
        // }

        document.addEventListener('touchstart', () => {
            this.pageAppear = true
        })

        // 失去焦点后
        document.addEventListener('disappear', () => {
            this.pageAppear = false
            this.checkHoldCardData()
        })

        // 设置为false
        this.isCardListChanged()

        document.addEventListener('appear', () => {
            this.pageAppear = true
            // 检查卡片列表设置
            setTimeout(e => {
                // 卡片列表变化
                if (this.isCardListChanged()) {
                    // 重新请求列表
                    this.requestCardsData({
                        cardsSettingIsChanged: true
                    })
                }
            }, 50)
        })

        // 重启后不丢失通知时间
        this.notifysTime = this.userStorage.getJSON('notifysTime') || {}
    }
}

// 固定对象高度直到..
function fixHeightUntil (container, progress) {
    if (!container) return
    container.style.height = container.clientHeight + 'px'
    progress(() => {
        setTimeout(() => {
            container.style.height = document.querySelector('#cards-wrap').clientHeight + 'px'
        }, 100)
    })
}
</script>
