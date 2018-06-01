<style lang="less" rel="stylesheet/less">
@import "../../css/variable";

.boss-card-container{
    .card-content {
    .px2rem(height, 370);
    background: url(../../assets/boss/boss.png) 50% 50% no-repeat;
    }

    .report-section {
    /*.px2rem(height, 350); 这种写死*/
    position: relative;
    }

    @media only screen and (-webkit-min-device-pixel-ratio: 2),
    only screen and (min--moz-device-pixel-ratio: 2),
    only screen and (-o-min-device-pixel-ratio: 2),
    only screen and (min-device-pixel-ratio: 2),
    only screen and (min-resolution: 2dppx) {
    .card-content {
        background: url(../../assets/boss/boss@2x.png) 50% 50% no-repeat;
        background-size: 100% auto;
    }
    }

    .report-card {
    position: relative;
    }

    .report-swiper {
    overflow: hidden;
    }

    .report-index {
    position: absolute;
    .px2rem(bottom, 43);
    width: 100%;
    .px2rem(height, 40);
    .px2rem(line-height, 40);
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    text-align: center;
    span {
        display: inline-block;
        width: 10px;
        height: 100%;
        em {
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #e6e8ee;
        &.active {
            background-color: #3bbaff;
        }
        }
    }
    }

    .report-empty {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    .px2rem(font-size, 14);
    .px2rem(line-height, 20);
    text-align: center;
    img {
        & {
        -webkit-animation: change 1s linear infinite;
        animation: change 1s linear infinite;
        }
        @keyframes change {
        0% {
            -webkit-transform: rotate(0deg);
        }
        50% {
            -webkit-transform: rotate(180deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
        }
        @-webkit-keyframes change {
        0% {
            -webkit-transform: rotate(0deg);
        }
        50% {
            -webkit-transform: rotate(180deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
        }
    }
    p {
        .px2rem(margin-top, 18);
        color: #768893;
    }
    }

    .report-label-container {
    .px2rem(border-top-right-radius, 6);
    position: absolute;
    .px2rem(top, -42);
    right: 0;
    .px2rem(width, 100);
    .px2rem(height, 100);
    overflow: hidden;
    transform: rotate(0deg);
    z-index: 99;
    .report-label {
        .px2rem(width, 100);
        .px2rem(height, 46);
        .px2rem(line-height, 74);
        .px2rem(font-size, 14);
        font-family: PingFangSC-Regular;
        color: #fff;
        background: #768893;
        text-align: center;
        transform: rotate(45deg) translate(18 / 50 * 1rem, -44 /50 * 1rem);
    }
    }

    .report-allbtn {
    position: absolute;
    .px2rem(top, -42);
    .px2rem(right, 12);
    z-index: 50;
    .px2rem(height, 42);
    .px2rem(line-height, 42);
    color: #768893;
    &.set-right {
        .px2rem(right, 45);
    }
    }
}

[data-mobile][data-v9] {
    .boss-card-container{
        .swiper {
            .swiper-pagination,
            .swiper-pagination-big {
                .px2rem(bottom, 47);
            }
        }
    }
}
[data-pc] {
    .report-swiper {
        overflow: visible;
    }
}
</style>

<template>
    <div class="boss-card-container" style="position: relative" :style="`position: ${isDesktop && 'static'};`">
        <div class="report-card" :style="`position: ${isDesktop && 'static'};`">
            <!--现在已经是由服务端判断是否有数据，不需要我们这边做文案现实，我们只需要关心是否是冷启动-->
            <!--数据等待状态-->
            <!--<template v-if="isFirstLoadShowExample &&  !data">
                <div class="report-section">
                    <div class="report-empty">
                        <img src="static/image/report_user/loading.png">
                        <p>{{LANG.TEXT.BOSS_LABAL10}}...</p>
                    </div>
                </div>
            </template> -->
            <!-- 显示一次示例之后， 不再显示示例， 显示没有数据的文案 -->
            <!-- <template v-if="!isFirstLoadShowExample">
                <div class="empty-message"
                     style="text-align: center; color: #768893;height: 70px;line-height: 50px;">
                    {{LANG.TEXT.BOSS_LABAL11}}
                </div>
            </template>-->

            <!--正常请求数据-->
            <template v-if="!isCold">
                <report-avatars v-show="isShow"
                                :vote="actions&&actions.voteUp?actions.voteUp.url:''"
                                :appId="actions&&actions.voteUp?actions.voteUp.appid:''"
                                :isCold="false">
                </report-avatars>
                <div class="report-section" :style="`${cardHeight} position: ${isDesktop && 'static'};`">
                    <swiper :pagination-style="paginationStyle" :totalPage="dataList.list.length"
                            :loadedPage="dataList.list.length"
                            :paginationVisible="true"
                            :paginationMax="paginationMax"
                            indicatorPosition="outline"
                            class="report-swiper"
                            @slide-change-end="onSwitchTo"
                            @slide-revert-end="onSwitchTo"
                            v-if="dataList.count&&dataList.count>0">
                        <report-item v-for="(item, i) in dataList.list"
                                     :detail="actions.getDetail.url"
                                     :appId="actions.getDetail.appid"
                                     :len="dataList.list.length"
                                     :comment="actions.getComment.url"
                                     :vote="actions.voteUp"
                                     :item="item"
                                     :key="item.id+i"
                                     :isSuper="false"
                                     :isBossNew="bossnew || false"
                                     :isNewHeight="isNewHeight">

                        </report-item>
                    </swiper>
                </div>
                <tap @tap="goToAll">
                    <div class="report-allbtn" :style="{top: isDesktop && '-1rem', right: isDesktop && '0.44rem'}">{{LANG.TEXT.BOSS_LABAL12}}</div>
                </tap>
            </template>

            <!--冷启动示例-->
            <template v-if="isCold  && !isSuper && !isAr">
                <report-avatars v-show="isShow"
                                :isCold="true"></report-avatars>
                <div class="report-section" :style="`${cardHeight} position: ${isDesktop && 'static'};`">
                    <swiper :pagination-style="paginationStyle" :totalPage="dataTmp.length"
                            :loadedPage="dataTmp.length"
                            :paginationVisible="true"
                            indicatorPosition="outline"
                            class="report-swiper"
                            @slide-change-end="onSwitchTo"
                            @slide-revert-end="onSwitchTo">
                        <report-item v-for="(item, i) in dataTmp"
                                     :isCold="true"
                                     :appId="actions.getDetail.appid"
                                     :isSuper="false"
                                     :item="item"
                                     :key="item.id+i"
                                     :isBossNew="card.bossnew || false"
                                     :isNewHeight="isNewHeight"></report-item>
                    </swiper>
                </div>
                <tap @tap="goToAll"
                     v-show="firstPage && dataTmp && dataTmp[0] && dataTmp[0].reportType === 10">
                    <div class="report-label-container" :style="{top: isDesktop && '-1rem', right: isDesktop && '0.44rem'}">
                        <div class="report-label">{{LANG.TEXT.BOSS_LABAL13}}</div>
                    </div>
                </tap>
                <tap @tap="goToAll">
                    <div class="report-allbtn"
                         :style="{top: isDesktop && '-1rem', right: isDesktop && '0.44rem'}"
                         :class="{'set-right':computFirstPage}">{{LANG.TEXT.BOSS_LABAL12}}</div>
                </tap>
            </template>

            <!--超级工作圈-->
            <template v-if="isCold && isSuper">
                <report-avatars v-show="isShow"
                                :isCold="true"></report-avatars>
                <div class="report-section" :style="`${cardHeight} position: ${isDesktop && 'static'};`">
                    <swiper :pagination-style="paginationStyle" :totalPage="1"
                            :loadedPage="1"
                            :paginationVisible="false"
                            :showIndicator="false"
                            indicatorPosition="inline"
                            class="report-swiper"
                            @slide-change-end="onSwitchTo">
                        <report-item v-for="(item, i) in dataSuper"
                                     :isCold="true"
                                     :isSuper="true"
                                     :item="item"
                                     :key="item.id+i"
                                     :isBossNew="card.bossnew || false"
                                     :isNewHeight="isNewHeight"></report-item>
                    </swiper>
                </div>
            </template>

            <template v-if="isCold && isAr">
                <report-avatars v-show="isShow"
                                :isCold="true"
                                :isAr="true"></report-avatars>
                <div class="report-section" :style="`${cardHeight} position: ${isDesktop && 'static'};`">
                    <swiper :pagination-style="paginationStyle" :totalPage="1"
                            :loadedPage="1"
                            :paginationVisible="false"
                            :showIndicator="false"
                            indicatorPosition="inline"
                            class="report-swiper"
                            @slide-change-end="onSwitchTo">
                        <report-item v-for="(item, i) in dataAr"
                                     :isCold="true"
                                     :isAr="true"
                                     :item="item"
                                     :key="item.id+i"
                                     :appId="actions.getDetail.appid"
                                     :isNewHeight="isNewHeight"></report-item>
                    </swiper>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import Card from 'components/card'
// import Swiper from 'components/swiper'
import Tap from 'components/tap'
import ReportItem from './report-item'
import ReportAvatars from '../boss/report-avatars'
import MixinCard from 'mixins/card'
import Bus from '../boss/Bus'
import {coldDataSuper, coldDataTmp, coldDataAr} from './options/cold-data'
import LANG from '@/lang/cards/boss'
export default {
    mixins: [MixinCard],
    props: {
        title: String,
        actions: Object,
        data: [Object, Array],
        card: Object
    },
    data () {
        return {
            LANG,
            isShow: false,
            index: 0,
            isCold: false,
            isSuper: false,
            isAr: false,
            paginationMax: 5,
            bossnew: true,
            dataSuper: coldDataSuper,
            dataTmp: coldDataTmp,
            dataAr: coldDataAr,
            dataList: this.data || [],
            firstPage: false,
            reloadTime: 0
        }
    },
    components: {
        Card,
        // Swiper,
        ReportItem,
        ReportAvatars,
        Tap
    },
    watch: {
        watchUpdateTime () {
            // 用于报表秀秀推送新报表到手机
            if (this.data) {
                const newData = JSON.parse(JSON.stringify(this.data))
                this.dataList = newData
            }
        }
    },
    computed: {
        paginationStyle () {
            return info.isV10 ? 'bottom: 43px;' : ''
        },
        isDesktop () {
            return qing.isDesktop
        },
        /**  isFirstLoadShowExample () {
            if (this.isCold) { // 是示例
                const showExampleTipFlag = window.localStorage.getItem('showExampleTipFlag') || ''
                if (showExampleTipFlag) { // 已经存在 显示文字文案
                    this.setMiniHeight()
                    return false
                } else {
                    window.localStorage.setItem('showExampleTipFlag', true)
                    return true
                }
            } else {
                return true
            }
        }, */
        computFirstPage () {
            return this.firstPage && this.dataTmp[0].reportType === 10
        },
        watchUpdateTime () {
            return this.card.cardUpdateTime
        },
        cardHeight () {
            if (this.isDesktop) {
                return `min-height: ${this.card.height / 50}rem;`
            }
            return `height: ${this.card.height / 50}rem;`
        },
        isNewHeight () {
            if (this.card.height === 410) {
                // 卡片高度调整过渡代码
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        onSwitchTo (to) {
            if (to === 1) {
                this.firstPage = false
            } else {
                this.firstPage = true
            }
            if ((this.index + 1) > (this.dataList.count || 2)) {
                this.index -= 1
                return
            }
            this.index = to - 1
            // 优化报表秀秀卡片加载
            if (!this.bossnew) {
                return
            }
            if (this.dataList.list[this.index] && !(this.dataList.list[this.index].diagram || {}).diagramData && this.dataList.list[this.index].isError !== 'empty') {
                // 快速滑动需要加载当前
                this.throttle(() => {
                    this.getItemInfoAgain(this.index)
                }, 300)()
            }
            if (this.dataList.list[to] && !(this.dataList.list[to].diagram || {}).diagramData) {
                // 慢速滑动提前加载下一个
                this.throttle(() => {
                    this.getItemInfoAgain(to)
                }, 300)()
            }
        },
        throttle (callback, delay) {
            let timer
            return function () {
                if (timer) {
                    clearTimeout(timer)
                }
                timer = setTimeout(function () {
                    callback()
                }, delay)
            }
        },
        getItemInfoAgain (index) {
            let temp = {}
            this.getItemInfo(this.dataList.list[index]).then((ret) => {
                if (ret.data === null || ret.data.isError) {
                    temp = Object.assign(this.dataList.list[index], { isError: ret.data.isError || 'empty' })
                } else {
                    // 触发isError的更新操作
                    ret.data.isError = ''
                    temp = Object.assign(this.dataList.list[index], ret.data)
                }
                this.$set(this.dataList.list, index, temp)
            }).catch((e) => {
                temp = Object.assign(this.dataList.list[index], { isError: 'empty' })
                this.$set(this.dataList.list, index, temp)
            })
        },
        getItemInfo (item) {
            let opt = {
                url: `/connecterp-charts-nodejs/getDiagramById?appId=${this.appId}&id=${item.id}&eid=${this.userInfo.eid}&wbuserid=${this.userInfo.wbuserid}&name=${this.userInfo.name}`,
                method: 'post',
                serializer: 'json',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
            return this.request(opt)
        },
        goToAll () {
            const host = info.origin
            const appId = this.actions.voteUp.appid
            this.redirectTo({
                // url: `${host}/api/linkerp/redirect?type=lapp&appId=${appId}&redirectUrl=/connecterp-lapp/report/timeline`,
                url: `${host}/connecterp-lapp/report/timeline?type=lapp&appId=${appId}`,
                appId: appId
            })
        },
        handleAppear () {
            if (this.dataList.list[this.index] && !(this.dataList.list[this.index].diagram || {}).diagramData) {
                // 快速滑动需要加载当前
                this.throttle(() => {
                    this.getItemInfoAgain(this.index)
                }, 300)()
            }
        },
        handleDisAppear () {
            // 切走之后请求数据
            let cd = 1000 * 60 * 5 // 切tab发请求最小间隔5分钟
            let now = new Date().getTime()
            if (now - this.reloadTime < cd) return
            this.reloadTime = now
            this.reloadData()
        },
        bindEvent () {
            // 在没有网络的情况下，图标没有加载出来，
            // 用户切换云之家页签回来后再去请求一次
            document.addEventListener('appear', this.handleAppear)

            // 切走之后请求数据
            document.addEventListener('disappear', this.handleDisAppear)
        },
        unbindEvent () {
            document.removeEventListener('appear', this.handleAppear)
            document.removeEventListener('appear', this.handleDisAppear)
        }
    },
    mounted () {
        if (!this.data || (this.data.list.length === 0 && this.data.count === 0)) {
            // this.data 不存在说明可能后台服务跪了，展示示例数据
            // 没有数据的时候走冷启动
            this.isCold = true
        }
        this.isSuper = (window.cloudhub.userInfo.eid === '2722048' || window.cloudhub.userInfo.eid === '11050607')   // 特殊冷启动示例:超级工作圈
        this.isAr = window.cloudhub.userInfo.eid === '11155681'  // 特殊冷启动数据： Ar展示

        const that = this
        if (this.data && this.data.count === 0 && this.data.list && this.data.list[0] && this.data.list[0].reportType === 10) {
            this.dataTmp.unshift({ id: 'staffreport', name: '', desc: '', option: '', reportType: 10 })
        }
        Bus.$on('event-close', () => {
            that.isShow = false
        })
        Bus.$on('event-avatars', () => {
            that.isShow = true
        })

        setTimeout(() => {
            try {
                if (!that.data) {
                    that.data = {
                        count: 0,
                        list: []
                    }
                    that.isCold = true
                }
            } catch (e) { }
        }, 15000)

        this.bindEvent()
    },
    created () {
        if (info.isV10) {
            this.$emit('setHeight', 366)
        }
    },
    beforeDestroy () {
        this.unbindEvent()
    }
}
</script>
