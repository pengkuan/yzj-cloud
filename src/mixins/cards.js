import {objectKeySort} from '../utils/index'
import config from 'config'

// 工作台版本
let version = Number(config.version) || 1.0

let formatCardListActions = function (list) {
    list.forEach(card => {
        // 把actions从Array转换为Object
        let actions = {}
        if (Array.isArray(card.actions)) {
            card.actions.forEach(act => {
                actions[act.name] = act
            })
            card.actions = actions
        }
    })
    return list
}

// 根据版本过滤卡片列表
let filterCardVersion = function (list) {
    if (Array.isArray(list)) {
        return list.filter(n => {
            let minVersion = Number(n.minCloudofficeVersion) || 1.0
            return version >= minVersion
        })
    } else {
        return []
    }
}

// 过滤同名卡片
let filterSameCard = list => {
    let map = {}
    let result = list.filter(card => {
        if (!card.name) return true
        let isNew = !map[card.name]
        map[card.name] = true
        return isNew
    })
    map = null
    return result
}

export default {
    data () {
        return {
            allCards: [],
            allCardsJSON: [],
            enabledCards: [],
            enabledCardsJSON: null,
            _cardsRetryCount: 3,
            _cardsRetryDelay: 1000,
            tickets: {},
            ticketsTime: null
        }
    },
    computed: {
        // 返回所有不在启用卡片列表中的卡片
        disabledCards () {
            let map = {}
            this.enabledCards.forEach(n => {
                map[n.id] = 1
            })
            return this.allCards.filter(n => {
                return !map[n.id]
            })
        },
        // 所有用户卡片
        cards () {
            return this.enabledCards
        }
    },
    methods: {
        // 获取服务端保存的全部卡片列表
        getLatestAllCardList () {
            return this.request({
                method: 'post',
                url: '/cloudwork/cardinfo/getCardAllList.json',
                logError: true
            }).then(e => {
                return formatCardListActions(filterCardVersion(filterSameCard(e.data)))
            })
        },
        // 获取服务端保存的用户卡片列表
        getLatestUserCardList () {
            let headers = {}
            let userinfo = this.userInfo

            if (config.runenv === 'local') {
                headers['X-Requested-wbOpenid'] = userinfo.openId
                headers['X-Requested-eid'] = userinfo.eid
            }

            return this.request({
                method: 'post',
                headers,
                url: '/cloudwork/cardinfo/getCardInfoListByOpenId.json',
                logError: true
            }).then(e => {
                return formatCardListActions(filterCardVersion(e.data)).map(objectKeySort)
            })
        },
        getAllCardList (callback) {
            let list = this.storage.getJSON('setting_all_cards') || null
            // 如果有缓存，立即传给回调函数
            if (list && list.length) {
                this.allCardsJSON = JSON.stringify(list)
                callback(list)
            }
            // 查询最新的数据
            this.getLatestAllCardList().then(data => {
                // 如果数据发生变化，再次回调
                if (JSON.stringify(data) !== this.enabledCardsJSON) {
                    this.storage.setItem('setting_all_cards', data)
                    this.allCardsJSON = JSON.stringify(list)
                    callback(data)
                }
            })
        },
        // 获取用户卡片列表缓存
        getUserCardListCache () {
            return new Promise((resolve, reject) => {
                let cache = this.storage.getJSON('setting_user_cards')

                if (Array.isArray(cache)) {
                    resolve(cache)
                } else {
                    resolve([])
                }
            })
        },
        // 检查数据是否跟缓存一致
        diffUserCardListCache (data) {
            return this.storage.getItem('setting_user_cards') === JSON.stringify(data)
        },
        // 写入缓存
        saveUserCardListCache (data) {
            this.storage.setItem('setting_user_cards', data)
        },
        // 获取用户卡片列表
        getUserCardList (callback, opt = {}) {
            let list = this.storage.getJSON('setting_user_cards') || []

            // 如果有缓存，立即传给回调函数
            if (list.length) {
                let hasChange = JSON.stringify(list) !== this.enabledCardsJSON
                this.enabledCardsJSON = JSON.stringify(list)
                callback(list, {
                    hasChange: hasChange
                })
            }

            // 获取远端数据
            // 如果获取失败，该函数将递归调用
            let fetchData = (retry) => {
                // 查询最新的数据
                this.getLatestUserCardList().then(data => {
                    // 判断数据是否发生变化
                    let dataString = JSON.stringify(data)
                    let hasChange = dataString !== this.enabledCardsJSON
                    // 如果数据没有发生变化，不做处理
                    if (!hasChange) return
                    // 如果数据发生变化，写入缓存，再次回调
                    this.storage.setItem('setting_user_cards', data)
                    this.enabledCardsJSON = dataString
                    callback(data, {
                        hasChange: hasChange
                    })
                }).catch(() => {
                    // 获取数据失败，等待一段时间后重新发起请求
                    // 重试的等待时间为上一次请求的等待时间的2倍，最大为1小时
                    if (typeof retry === 'number') {
                        setTimeout(() => {
                            fetchData(Math.min(retry * 2, 3600 * 1000))
                        }, retry)
                    }
                })
            }

            fetchData(opt.retry)
        },
        addCard (index) {
            let card = this.disabledCards[index]
            if (!card) return
            this.enabledCards.push(card)
            this.saveUserCardList()
        },
        removeCard (index) {
            this.enabledCards.splice(index, 1)
            this.saveUserCardList()
        },
        // 保存用户卡片列表数据
        saveUserCardList (list) {
            // 默认值
            list = list || this.enabledCards
            // ids
            let ids = list.map(n => {
                return n.id
            })
            if (!ids) {
                return Promise.reject(new Error('no ids'))
            }
            // 设置
            this.storage.setItem('setting_user_cards', list)
            this.storage.setItem('isCardListChanged', true)

            let headers = {}
            let userinfo = this.userInfo
            headers['X-Requested-wbOpenid'] = userinfo.openId

            // 埋点统计
            this.dataly({
                position: '卡片设置页',
                event: '修改卡片列表'
            })

            return this.request({
                method: 'post',
                url: '/cloudwork/cardinfo/orderCardIdsByOid.json',
                data: {
                    orderCardIds: ids.join(',')
                },
                headers
            })
        },
        // 隐藏卡片
        hideUserCard (name) {
            // 找到卡片在enabledCards中的位置
            let index = null
            this.enabledCards.forEach((n, i) => {
                if (n.name === name) {
                    index = i
                }
            })
            if (index === null) return
            // 从enabledCards中抠出
            let card = this.enabledCards.splice(index, 1)
            // 追加到disabledCards末尾
            this.disabledCards.push(card)
            // 保存
            this.saveUserCardList()
        },
        isCardListChanged () {
            let val = this.storage.getJSON('isCardListChanged')
            this.storage.setItem('isCardListChanged', false)
            return !!val
        }
    }
}
