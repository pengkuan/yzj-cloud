<style lang="less" scoped>
@import '../../css/variable';
.myapp-container{
    height: 100%;
    width: 100%;
    .px2rem(padding-bottom, 28);
    .px2rem(padding-left, 4);
    .px2rem(padding-right, 4);
}
.apps-wrap{
    width: 25%;
    .px2rem(height, 89);
    float: left;
    text-align: center;
    &:last-child{
        clear: right;
    }
    &.lessthree-apps-wrap {
        .px2rem(width, 85);
    }
    box-sizing: border-box;
    padding:0 .16rem;
}
.flex{
    display: flex;
    flex-direction: row;
}
.flex-item{
    flex: 1;
}
.apps-wrap.sortable-chosen{
    .apps{
        transform: scale(1.14)
    }
}
.apps{
    .px2rem(font-size, 12);
    background-color: #FFF;
    .app-icon{
        .px2rem(width, 42);
        .px2rem(height, 42);
        .px2rem(margin-top, 12);
        .px2rem(margin-bottom, 6);
        .px2rem(border-radius, 4);
        overflow: hidden;
    }
    .app-name{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        width: 100%;
        &.less8-apps-container{
            .px2rem(padding-bottom, 28);
        }
        &.lessthree-apps-container {
            width: auto;
        }
        .swiper {
            .swiper-pagination{
                bottom: 0;
            }
        }
    }
}
.apps-container{
    // .px2rem(max-width, 334);
    width: 100%;
    &.lessthree-apps-container {
        width: auto;
    }
    .swiper {
        .swiper-pagination{
            bottom: 0;
        }
    }
}
.swiper-item{
    flex-basis: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    overflow: hidden;
}
</style>

<template>
    <div v-show="loaded" class="myapp-container flex-center">
        <div :class="{'apps-container': true, 'lessthree-apps-container': list.length < 4, 'less8-apps-container': list.length <= 8}">
            <swiper v-if="pageNum > 0" :totalPage="pageNum" :loadedPage="pageNum" ref="swiper_apps">
                <div class="swiper-item">
                    <div v-for="(item, index) in list.slice(0, 8)" :key="index" :data-id="item.appName"
                    :class="{ 'apps-wrap': true, 'lessthree-apps-wrap': list.length < 4}">
                        <click class="apps flex-center" @click="gotoApp(item, index)">
                            <div class="app-icon">
                                <img v-lazy="{
                                    src: item.logo,
                                    error: lazyUrl,
                                    loading: lazyUrl}"/>
                            </div>
                            <div class="app-name">{{item.appName}}</div>
                        </click>
                    </div>
                </div>

                <div class="swiper-item" v-if="list.length > 8">
                    <div v-for="(item, index) in list.slice(8)" :key="index" :data-id="item.appName"
                    :class="{ 'apps-wrap': true }">
                        <click class="apps flex-center"  @click="gotoApp(item, 8 + index)">
                            <div class="app-icon">
                                <img v-lazy="{
                                    src: item.logo,
                                    error: lazyUrl,
                                    loading: lazyUrl}"/>
                            </div>
                            <div class="app-name">{{item.appName}}</div>
                        </click>
                    </div>
                </div>
            </swiper>
        </div>
    </div>
</template>

<script>
import Click from 'components/click'
import MixinCard from 'mixins/card'
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import LANG from '@/lang/cards/myapp'
import img2base64 from '@/utils/img2base64'

const ALLOW_LOGO_CACHE = true
const LOGO_CACHE_KEY = 'myapp_icon_base64_set'
const LOGO_CACHE_LIMIT = 30 * 1024

Vue.use(VueLazyload, {
    error: './static/image/app-default-icon@2x.png',
    loading: './static/image/app-default-icon@2x.png',
    try: 3 // default 1
})

export default {
    mixins: [MixinCard],
    props: {
        data: [Object, Array],
        loaded: Boolean
    },
    data () {
        return {
            LANG,
            lazyUrl: './static/image/app-default-icon@2x.png',
            logoCache: {},
            logoQuery: {},
            refreshTime: new Date().getTime()
        }
    },
    components: {
        Click
    },
    computed: {
        list () {
            // 防止服务器端返回超过8条数据
            let list = (this.data || []).slice(0, 16)

            list.forEach(n => {
                // 特殊处理
                // 解决 k3/wise 在常用应用卡片中打不开的问题
                if (n.appId === 101091413 && !/^http.+$/i.test(n.appUrl)) {
                    n.appUrl = ''
                }

                // base64
                if (ALLOW_LOGO_CACHE) {
                    n.logo = this.url2base64(n.logoUrl)
                } else {
                    n.logo = n.logoUrl
                }
            })

            if (ALLOW_LOGO_CACHE) {
                this.queryBase64()
            }

            return list
        },
        pageNum () {
            return Math.ceil(this.list.length / 8)
        }
    },
    methods: {
        // 根据url取base64
        url2base64 (url) {
            let cache = this.logoCache[url]

            if (cache) {
                return cache
            }

            // 如果没有缓存，记录下来，待会儿发请求去查询
            this.logoQuery[url] = ''

            return url
        },
        // 查询base64
        queryBase64 () {
            let keys = []
            let query = this.logoQuery
            let cache = this.logoCache

            // 拼参数
            Object.keys(query).forEach(key => {
                keys.push(key)
                delete query[key]
            })

            if (!keys || !keys.length) return

            keys.forEach(key => {
                img2base64(key, {bgColor: '#FFFFFF'}).then(val => {
                    if (!val) return
                    // 缓存单张图片的体积上限
                    if (val.length > LOGO_CACHE_LIMIT) {
                        console.log(`图标太大（${parseInt(val.length / 1024)}KB）无法缓存：${key}`)
                        return
                    }

                    cache[key] = val
                    // 写入缓存，供下次使用
                    this.globalStorage.setItem(LOGO_CACHE_KEY, cache)
                })
            })
        },
        countAppClick (app) {
            // 查询base64
            this.request({
                method: 'post',
                serializer: 'json',
                url: '/openaccess/lightapp/addTrack',
                data: {
                    id: app.appType === 5 ? app.pid : app.appId,
                    appType: app.appType
                }
            })// .then(console.info).catch(console.info)
        },
        gotoApp: function (app, index) {
            // 每次跳转时，如果距离上次刷新已有120分钟，则刷新
            let minitue = 1000 * 60
            let passtime = new Date().getTime() - this.refreshTime
            if (passtime > 120 * minitue) {
                this.refreshTime = new Date().getTime()
                this.reloadData()
            }

            // 埋点统计常用应用点击次数
            this.countAppClick(app)

            this.dataly({
                position: '常用应用卡片',
                event: '跳转',
                goto: app.appName || '',
                detail: `index=${index + 1};`
            })

            // ================
            this.goApp(app)
        }
    },
    created () {
        this.logoCache = this.globalStorage.getJSON(LOGO_CACHE_KEY) || {}
    }
}
</script>
