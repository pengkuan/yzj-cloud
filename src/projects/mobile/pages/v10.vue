<style lang="less" scoped>
    @import '../../../css/variable';

    .v10-container{
        .px2rem(padding-top, 8);
        .px2rem(min-height, 400);
    }

    .card-list{
        background: rgba(248,249,251,1);
    }
    
    .update-bubble{
        position: relative;
        z-index: 99;
    }
</style>

<template>
    <div class="v10-container" @touchmove="touchMove" @touchend="touchEnd">
        <!-- 更新提醒气泡 -->
        <update-bubble
            v-if="notifyCount"
            class="update-bubble"
            :count="notifyCount"
            :scrolling="scrolling"
            :scroll-top="scrollTop"
            @roll="roll2unread"
        ></update-bubble>
        
        <!-- 公告卡片 -->
        <notice-box></notice-box>

        <!-- 卡片列表 -->
        <card-list @ready="ready" ref="cardList" class="card-list"></card-list>

        <!-- 设置页入口 -->
        <setting-button></setting-button>
    </div>
</template>

<script>
import UpdateBubble from 'mobile/widgets/update-bubble'
import NoticeBox from 'mobile/widgets/notice-box'
import CardList from 'mobile/widgets/card-list'
import SettingButton from 'mobile/widgets/setting-button'
import { getElementTop } from '@/utils/dom'

// 屏幕高度
let viewportHeight = document.documentElement.clientHeight

export default {
    name: 'v10',
    components: {
        UpdateBubble,
        NoticeBox,
        CardList,
        SettingButton
    },
    data () {
        return {
            notifyCount: 0,
            scrollTop: 0,
            scrolling: false,
            // update-bubble
            scrollAbort: false
        }
    },
    computed: {
    },
    methods: {
        touchMove () {
            this.scrolling = true
            setTimeout(() => {
                this.scrolling = false
            }, 1000)
        },
        touchEnd () {
            this.scrolling = false
        },
        roll2unread () {
            this.$refs.cardList.scrollToFisrtUnread()
        },
        ready () {
            // 卡片列表加载成功后，延迟片刻再显示
            setTimeout(() => {
                dispatchHTMLEvent('pageIsReady')
            }, 50)
        }
    },
    created () {
        console.timeEnd('加载首页')
        console.time('加载card-list.vue')
    },
    mounted () {
        if (info.isAndroid && info.isV10) {
            qing.call('setWebViewTitle', {title: '我的云之家'})
        }

        // 接受未读数量变化的通知
        this.bus.$on('unreadCountChange', n => {
            this.notifyCount = n
        })
        
        document.body.scrollTop = 0
        this.scrollTop = document.body.scrollTop

        // if (qing.isIos) {
        window.addEventListener('scroll', e => {
            this.scrollTop = document.body.scrollTop
            
            // 发送滚动事件
            // 并且通过延迟来控制事件触发频率
            if (!this._scrolling) {
                this._scrolling = true
                setTimeout(() => {
                    this._scrolling = false
                    this.bus.$emit('homeWrapScroll')
                }, 500)
            }
        })
        // } else {
        //     document.addEventListener('webViewScrollChange', e => {
        //         let {data: {scrollY, webViewHeight}} = e
        //         if (!qing.androidRatio) {
        //             qing.androidRatio = document.documentElement.clientHeight / webViewHeight
        //         }
        //         this.scrollTop = scrollY / window.devicePixelRatio | 0
                
        //         // 发送滚动事件
        //         // 并且通过延迟来控制事件触发频率
        //         if (!this._scrolling) {
        //             this._scrolling = true
        //             setTimeout(() => {
        //                 this._scrolling = false
        //                 this.bus.$emit('androidHomeWrapScroll', this.scrollTop)
        //             }, 500)
        //         }
        //     })
        // }
    },
    beforeDestory () {
        window.removeEventListener('scroll')
        document.removeEventListener('webViewScrollChange')
    }
}
</script>
