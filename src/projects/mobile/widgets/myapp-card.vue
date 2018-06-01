<style lang="less" scoped>
.loading-message,
.empty-message{
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
    color: #768893;
    padding-top: 85px;
}
</style>

<template>
    <card-container
        :card="card"
        :title="card.title"
        :height="card.height || 218"
        :icon="card.icon"
        :icon-color="card.iconColor"
        :icon-background-color="card.iconBackgroundColor"
        :icon-cls="card.iconCls"
        :icon-data="card.iconData"
        :container-style="'position:relative;'">
        <template v-if="Array.isArray(card.data)">
            <myapp
                :data="card.data"
                :loaded="card.loaded === true">
            </myapp>
        </template>
        <template v-else-if="loading">
            <div class="loading-message">
                {{LANG.loading}}
            </div>
        </template>
        <template v-else>
            <tap class="empty-message" @tap="getCardDataRemote">
                {{LANG.error.reloadCards}}
            </tap>
        </template>
    </card-container>
</template>

<script>
import Vue from 'vue'
import cardsMixins from 'mixins/cards'
import Tap from 'components/tap'
import CardContainer from 'components/card-container'
import config from 'config'
import Myapp from '@/cards/myapp'
import LANG from '@/lang/index'

let retryCount = 3 // 失败自动重试3次
let serverHost = config.serverHost
let cardConfig = {
    'template': 'template',
    'thhost': 'http://www.yunzhijia.com',
    'dataCacheHours': 9999,
    'needTicket': false,
    'showHeader': true,
    'icon': 'changyongyingyong',
    'title': '常用应用',
    'minCloudofficeVersion': 1,
    'dataSourceAction': 'getData',
    'showTitle': true,
    'iconBackgroundColor': '#3CBAFF',
    'appId': '10661',
    'name': 'myapp',
    'iconColor': '#FFF',
    'showType': 0,
    'iconCls': 'changyongyingyong',
    'actions': {
        getData: {
            'method': 'post',
            'name': 'getData',
            'serializer': '',
            'params': 'oid={{openid}}&eid={{eid}}',
            'type': 'action',
            'url': serverHost + 'cardapi/third/v1/appservice/comApp/getComAppList'
        }
    },
    'height': 218
}

function vueSet (obj, name, val) {
    if (obj.hasOwnProperty(name)) {
        obj[name] = val
    } else {
        Vue.set(obj, name, val)
    }
}

export default {
    name: 'app',
    mixins: [cardsMixins],
    components: {
        CardContainer,
        Tap,
        Myapp
    },
    data () {
        return {
            LANG,
            card: cardConfig,
            loading: false
        }
    },
    methods: {
        getCardCache () {
            return this.storage.getJSON('myapp_card_cache')
        },
        saveCardCache (val) {
            this.storage.setItem('myapp_card_cache', val)
        },
        // 取卡片的数据
        getCardData () {
            let card = this.card

            // 尝试读取缓存
            let cache = this.getCardCache()
            if (Array.isArray(cache)) {
                // 命中
                vueSet(card, 'loaded', true)
                vueSet(card, 'data', cache)
            }

            // 然后读取远程数据
            this.getCardDataRemote()
        },
        getCardDataRemote () {
            let card = this.card

            // dataSourceAction url
            let dataSourceAction = card.actions[card.dataSourceAction] || {}
            let url = dataSourceAction.url

            if (!url) {
                vueSet(card, 'loaded', true)
                return
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
                card: card.name,
                logError: true
            }

            this.loading = true

            this.request(opts).then(e => {
                this.loading = false
                let { success, data } = e
                if (success && Array.isArray(data)) {
                    vueSet(card, 'loaded', true)
                    vueSet(card, 'data', data)
                    this.saveCardCache(data)
                } else {
                    this.dataly({
                        error: '常用应用请求失败'
                    })
                    this.checkAndRetry()
                }
            }).catch(e => {
                this.loading = false
                vueSet(card, 'loaded', true)
                this.dataly({
                    error: '常用应用请求失败'
                })
                this.checkAndRetry()
            })
        },
        // 检查是否请求到了数据，如果没有则自动重试
        checkAndRetry () {
            // 检查有没有数据
            if (!this.card.data || !this.card.data.length) {
                // 检查重试次数是否用完
                if (retryCount > 0) {
                    retryCount--
                    this.getCardDataRemote()
                }
            }
        }
    },
    mounted () {
        this.getCardData()
        // 监听消息推送
        this.bus.$on('myappCardUpdate', () => {
            this.getCardDataRemote()
        })
        // 2秒后再次检查
        setTimeout(() => {
            this.checkAndRetry()
        }, 2000)

        // 3秒后还没有数据，上报
        setTimeout(() => {
            if (!this.card.data || !this.card.data.length) {
                this.dataly({
                    error: '常用应用卡片空白',
                    oid: this.userInfo.openId
                })
            }
        }, 3000)
    },
    beforeDestroy () {
        this.bus.$off('myappCardUpdate')
    }
}
</script>
