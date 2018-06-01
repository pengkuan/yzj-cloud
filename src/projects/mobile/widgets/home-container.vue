<style lang="less" scoped>
    @import '../css/home-container';
    .update-bubble{
        position: relative;
        z-index: 99;
    }
</style>

<template>
    <div class="home-container">
        <!--雷达页面-->
        <radar
            v-if="radarAppear"
            :scrollTop="scrollTop"
            :activity="activity"
            :class="bgConfig[date.hour].bg"
            @closeRadar="showHomeByCloseRadar"
        ></radar>

        <div class="home-page" v-show="!radarAppear">
            <div :style="headerStyle" :class="['home-header', bgConfig[date.hour].bg, {'overlayBg': scrollTop > 0 && isIos}]">
                <!-- 头部动画簇 -->
                <component
                    v-if="!customBgData"
                    :is="bgConfig[date.hour].animation"
                ></component>
                <!-- 头部文案 -->
                <div class="greeting" :style="greetingStyle">
                    <p v-for="(data, index) in greeting.text" :key="index">{{data}}</p>
                </div>
                <!-- 更新提醒气泡 -->
                <update-bubble
                    v-if="notifyCount"
                    class="update-bubble"
                    :count="notifyCount"
                    :style="bubbleStyle"
                ></update-bubble>
            </div>

            <!-- 主体区域 -->
            <div
                ref="homeWrap"
                class="home-wrap"
                @scroll.passive="touchScroll"
                @touchstart.stop="touchStart"
                @touchend.stop="touchEnd"
                @touchcancel.stop="touchEnd"
            >
                <div class="home-main">
                    <div
                        ref="homeLayer"
                        class="home-layer"
                        :style="homeLayerStyle"
                        @transitionend="appearRadar"
                        @webkitTransitionEnd="appearRadar"
                    >
                        <div class="share-click-area" @click="clickHeader"></div>
                        <div class="middle-radius"></div>
                        <div class="home-slot">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FirstAnimation from './animations/first-animation'
import SecondAnimation from './animations/second-animation'
import ThirdAnimation from './animations/third-animation'
import FourAnimation from './animations/four-animation'
import Radar from './radar'
import UpdateBubble from 'mobile/widgets/update-bubble-v9'
import LANG from '@/lang/index'
import img2base64 from '@/utils/img2base64'
import config from 'config'

export default {
    props: ['name', 'hideRadar', 'pageAppear'],
    components: {
        sunshine: FirstAnimation,
        sun: SecondAnimation,
        cloud: ThirdAnimation,
        moon: FourAnimation,
        Radar,
        UpdateBubble
    },
    data () {
        return {
            customBgData: this.storage.getItem('customBgData'),
            customBgUrl: this.storage.getItem('customBgUrl'),
            bgConfig: [
                { bg: 'firstBg', animation: 'moon' }, // 0
                { bg: 'firstBg', animation: 'moon' },
                { bg: 'firstBg', animation: 'moon' },
                { bg: 'firstBg', animation: 'moon' },
                { bg: 'firstBg', animation: 'moon' },
                { bg: 'firstBg', animation: 'moon' }, // 5
                { bg: 'secondBg', animation: 'sunshine' },
                { bg: 'secondBg', animation: 'sunshine' },
                { bg: 'thirdBg', animation: 'sunshine' }, // 8
                { bg: 'thirdBg', animation: 'sunshine' },
                { bg: 'fourBg', animation: 'sun' }, // 10
                { bg: 'fourBg', animation: 'sun' },
                { bg: 'fiveBg', animation: 'sun' }, // 12
                { bg: 'fiveBg', animation: 'sun' },
                { bg: 'fiveBg', animation: 'cloud' },
                { bg: 'fiveBg', animation: 'cloud' }, // 15
                { bg: 'sixBg', animation: 'cloud' },
                { bg: 'sixBg', animation: 'cloud' }, // 17
                { bg: 'sevenBg', animation: 'cloud' },
                { bg: 'sevenBg', animation: 'cloud' },
                { bg: 'eightBg', animation: 'moon' }, // 20
                { bg: 'eightBg', animation: 'moon' },
                { bg: 'firstBg', animation: 'moon' },
                { bg: 'firstBg', animation: 'moon' } // 23
            ],
            date: { hour: 10, minute: 0 },

            // 分享插画相关配置
            greeting: {
                favCount: 1,
                id: '',
                text: [],
                startTime: '',
                endTime: '',
                favorite: false,
                // 分享插画地址
                bgUrl: ''},
            scrollFlag: true,
            scrollTop: 0,

            // main translateY 下拉动画
            translateVal: 0,

            // 雷达页面是否出现
            radarAppear: false,
            isIos: false,

            // 是否在活动期间 eg:七夕
            activity: {
                isActivity: false,
                activityCount: 0
            },

            notifyCount: 0
        }
    },
    methods: {
        initHeaderData () {
            let d = new Date()
            let hour = d.getHours()
            let minute = d.getMinutes()
            this.date = {hour, minute}
            let temp = `${hour <= 9 ? `0${hour}` : hour}${minute <= 9 ? `0${minute}` : minute}`
            
            if (temp >= this.greeting.startTime && temp < this.greeting.endTime) {
                // appear时，如果时间没有过上次文案时间范围，则不请求接口获取文案数据
                return
            }
            // 杀进程进来或者时间过上次文案时间范围，请求接口
            this.getGreeting()
        },
        getGreeting () {
            // 先取缓存数据
            let grettingCache = this.storage.getJSON('greetingData')
            if (grettingCache) {
                this.greeting = grettingCache
            }

            let refreshBgWhenNextDisppear = () => {
                this.once('disappear', () => {
                    this.customBgData = this.storage.getItem('customBgData')
                    this.customBgUrl = this.storage.getItem('customBgUrl')
                })
            }

            this.request({
                method: 'post',
                url: '/cloudwork/soulsoother/rand',
                headers: {'X-Requested-userId': this.userInfo.wbuserid}
            }).then(res => {
                let { success, data } = res
                if (success && data) {
                    let {content} = data
                    this.greeting = {
                        favCount: data.favCount,
                        id: content.id,
                        text: this.splitGreeting(content.content),
                        startTime: content.startTime,
                        endTime: content.endTime,
                        favorite: data.favorite,
                        bgUrl: data.bgUrl.replace(/.*\/\/[^\/]*\//, location.protocol + '//' + location.host + '/')
                    }

                    if (!data.bgImg) {
                        this.storage.setItem('customBgUrl', '')
                        this.storage.setItem('customBgData', '')
                        if (this.customBgData) {
                            refreshBgWhenNextDisppear()
                        }
                    } else if (data.bgImg !== this.customBgUrl) {
                        // 如果自定义背景发生了变化
                        // 延迟一段时间再存储背景图，避免启动时卡顿
                        setTimeout(() => {
                            let bgUrl = data.bgImg
                            if (['dev', 'devtest', 'kdtest', 'yzj'].includes(config.runenv)) {
                                bgUrl = bgUrl.replace(/\/\/[^\/]*\//, '//' + location.host + '/')
                            }
                            img2base64(bgUrl, {limit: 100}).then(val => {
                                if (!val) return
                                this.storage.setItem('customBgUrl', data.bgImg)
                                this.storage.setItem('customBgData', val)
                                refreshBgWhenNextDisppear()
                            }).catch(console.log)
                        }, 1000)
                    }

                    this.activity = {
                        isActivity: data.activity_2,
                        activityCount: data.activityCount
                    }
                    // 通知移动端去下载插画
                    cloudhub.cloudoffice.downloadPic({picUrl: this.greeting.bgUrl})
                    this.storage.setItem('greetingData', this.greeting)
                }
            }, res => {
            })
        },
        splitGreeting (text) {
            text = text.replace(/^(XX|xx)/, this.nickname)
            return text.split('\n')
        },
        transitionToRadar () {
            this.translateVal = window.screen.height - 173 * this.computeRatio
            this.changeNavBarStyle(2)
        },
        appearRadar () {
            if (this.translateVal > 0) {
                this.radarAppear = true
            }
        },
        // 反弹效果 针对android
        bounceAndroid (e) {
            let X = e.changedTouches[0].pageX - this.startX
            let Y = e.changedTouches[0].pageY - this.startY
            let temp = this.computeRatio * 10
            // 手指下滑
            if (this.scrollTop === 0 && Math.abs(Y) > Math.abs(X) && Y > 0) {
                if (this.translateVal === 0 && Y > temp && !this.hideRadar && this.startY < (200 * this.computeRatio)) {
                    this.$refs.homeLayer.style.transition = 'transform 0.5s linear'
                    this.$refs.homeLayer.style.webkitTransition = '-webkit-transform 0.5s linear'
                    this.transitionToRadar()
                }
            }
        },
        // 反弹效果 针对ios
        bounceIos (val, e) {
            let temp = this.computeRatio * (val)
            // 向下反弹
            if (this.scrollTop < 0 && this.scrollTop <= temp && !this.hideRadar) {
                this.translateVal = Math.abs(this.scrollTop)
                this.$refs.homeLayer.style.transition = 'transform 0.3s linear'
                this.$refs.homeLayer.style.webkitTransition = '-webkit-transform 0.3s linear'
                this.transitionToRadar()
            }
        },
        changeNavBarStyle (num) {
            cloudhub.ui.changeNavBarStyle({
                style: num
            })
        },
        controlNavBarStyle () {
            let changeBar = this.computeRatio * 130
            if (this.scrollTop >= changeBar && this.scrollFlag) {
                this.scrollFlag = !this.scrollFlag
                this.changeNavBarStyle(1)
            } else if (this.scrollTop < changeBar && !this.scrollFlag) {
                this.scrollFlag = !this.scrollFlag
                this.changeNavBarStyle(0)
            }
        },
        touchStart (e) {
            // 过渡到雷达动画期间，禁止页面滚动
            if (this.translateVal > 0) {
                e.preventDefault()
            }
            this.startX = e.touches[0].pageX
            this.startY = e.touches[0].pageY
        },
        touchScroll (e) {
            this.scrollTop = this.$refs.homeWrap.scrollTop
            this.controlNavBarStyle()
            if (this.isIos && this.scrollTop < 0) {
                this.bounceIos(-150, e)
            }
            // 发送滚动事件
            // 并且通过延迟来控制事件触发频率
            if (!this._scrolling) {
                this._scrolling = true
                setTimeout(() => {
                    this._scrolling = false
                    this.bus.$emit('homeWrapScroll', this.scrollTop)
                }, 500)
            }
        },
        touchEnd (e) {
            if (this.isIos) {
                this.bounceIos(-80, e)
            } else {
                this.bounceAndroid(e)
            }
        },
        // 点击雷达关闭按钮
        showHomeByCloseRadar () {
            this.radarAppear = false
            this.translateVal = 0
            this.changeNavBarStyle(0) // 显示顶部导航栏
        },
        clickHeader () {
            let version = cloudhub.clientVersion
            // 小于0.9.52不支持头部点击的文案分享
            if (version < 9.52) {
                return
            }
            // 默认插画
            let defaultImageUrl = location.href.replace(/index.html.*$/, `static/image/share/${this.bgConfig[this.date.hour].bg}.jpg`)
            let opt = {
                defaultImageUrl: defaultImageUrl,
                imageUrl: version > 9.53 ? this.greeting.bgUrl : defaultImageUrl,
                text: this.greeting.text
            }
            cloudhub.cloudoffice.shareText(opt)
            this.dataly({
                position: '头部文案',
                event: '头部文案点击'
            })
        },
        // 获取活动数量
        getActivityCount () {
            this.request({
                method: 'post',
                url: '/cloudwork/activity/count',
                data: {
                    giftType: this.activity.isActivity === true ? 2 : 0
                }
            }, res => {
                let {success, data} = res
                if (success) {
                    this.activity.activityCount = data.activityCount
                }
            })
        }
    },
    mounted () {
        // 确保页面刷新后头部栏是隐藏的
        this.$refs.homeWrap.scrollTop = 0
        this.changeNavBarStyle(0)

        // // 禁用反弹
        // window.XuntongJSBridge.call('setBounce', {
        //     enable: 0
        // })
        this.initHeaderData()
        this.isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        // 点击头部文案引导事件
        document.addEventListener('topGuideTapped', this.clickHeader)
        // 页面初始化通知移动端
        cloudhub.runtime.jsReady()

        // 及时刷新别人送的花
        this.bus.$on('upadateQixiActivityNum', e => {
            this.getActivityCount()
        })

        // 接受未读数量变化的通知
        this.bus.$on('unreadCountChange', n => {
            this.notifyCount = n
        })

        // 切tab的时候刷新头部
        qing.on('appear', () => {
            this.initHeaderData()
        })

        setTimeout(() => {
            this.getActivityCount()
        }, 100)
    },
    computed: {
        computeRatio () {
            return document.documentElement.clientWidth / 7.5 / 50
        },
        // 当姓名有两个字的时候只保留最后一个字，当姓名三个或三个以上则保留最后两个字。当姓名为英文，则都保留。
        nickname () {
            if (/[^\u4e00-\u9fa5]/.test(this.name)) { // 含有非中文
                if (/\d{11}/.test(this.name)) {
                    return LANG.friend
                } else {
                    return this.name
                }
            } else { // 全中文
                let len = this.name.length
                return this.name.substring(len - 2 > 0 ? len - 2 : len - 1, len)
            }
        },
        greetingStyle () {
            if (this.scrollTop > 0) {
                return 'opacity:' + ((100 - this.scrollTop >= 0 ? 100 - this.scrollTop : 0) / 100)
            }
            return ''
        },
        // transform 卡片过渡到雷达动画
        homeLayerStyle () {
            return {
                'transform': 'translateY(' + (this.translateVal) + 'px)',
                '-webkit-transform': 'translateY(' + (this.translateVal) + 'px)'
            }
        },
        bubbleStyle () {
            let min = -20
            let top = this.scrollTop + min
            let max = 70
            // iphoneX
            if (document.documentElement.clientHeight > 800) {
                max = 50
            }
            // 实现相对位移的效果
            top = top * 0.8
            // 限制范围
            top = Math.min(Math.max(top, min), max)

            return `top: ${-top}px`
        },
        headerStyle () {
            let s = []

            if (this.customBgData) {
                s.push(`background-image: url(${this.customBgData})`)
                s.push(`background-repeat: no-repeat`)
                s.push(`background-position: top`)
                s.push('background-size: 100% auto')
            }

            return s.join(';')
        }
    },
    beforeDestroy () {
        document.removeEventListener('topGuideTapped', this.clickHeader) // 点击头部文案引导事件
        this.bus.$off('upadateQixiActivityNum')
    }
}
</script>
