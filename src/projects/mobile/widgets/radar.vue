<style lang="less" scoped>
@import '../../../css/variable';
.circle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(255, 255, 255, .1);
    border-radius: 50%;
    box-sizing: border-box;
}
.radar {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    color: #ffffff;
    z-index: 99;
    .flower{
        display: inline-block;
        position: absolute;
        .px2rem(right, 12);
        .px2rem(top, 10);
        z-index: 999;
    }
    .radar-top {
        position: relative;
        .px2rem(font-size, 17);
        text-align: center;
        .px2rem(margin-top, 32);
        .px2rem(margin-bottom, 33);
    }
    .radar-main {
        .px2rem(height, 471);
        position: relative;
        overflow: hidden;
        .circles {
            height: 100%;
            .inner-circle {
                &:extend(.circle);
                .px2rem(width, 177);
                .px2rem(height, 177);
            }
            .middle-circle {
                &:extend(.circle);
                .px2rem(width, 324);
                .px2rem(height, 324);
            }
            .outer-circle {
                &:extend(.circle);
                .px2rem(width, 471);
                .px2rem(height, 471);
            }
        }
        .img {
            .px2rem(width, 41);
            .px2rem(height, 41);
            border: 1px solid rgba(255 ,255, 255, .42);
            border-radius: 50%;
            animation: photoScale .5s;
            box-sizing: border-box;
        }
        .my-photo {
            position: absolute;
            left: 50%;
            top: 50%;
            font-size: 0;
            .px2rem(margin-left, -30);
            .px2rem(margin-top, -30);
            .px2rem(width, 60);
            .px2rem(height, 60);
        }
        .loading {
            .px2rem(width, 160);
            .px2rem(height, 102);
            position: absolute;
            left: 50%;
            bottom: 50%;
            background: url(../css/radar/radar-loading.png) center center no-repeat;
            background-size: 100% 100%;
            transform-origin: left bottom;
            animation: loadingAnimation 2s linear infinite;
        }
        .have-persons {
            .person-info {
                text-align: center;
                .px2rem(width, 41);
                position: absolute;
                .photo-wrap {
                    position: relative;
                    display: inline-block;
                    font-size: 0;
                    .px2rem(width, 41);
                    .px2rem(height, 41);
                    .praise-icon {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        .px2rem(width, 14);
                        .px2rem(height, 23);
                        background: url(../css/radar/big-flower.png) center center no-repeat;
                        background-size: 100% auto;
                        animation: bounceIn .3s .1s ease both;
                    }
                    .photo-overlay {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        background: rgba(12,33,63,0.80);
                    }
                }
                .name {
                    .px2rem(font-size, 10);
                }
                &:nth-child(1) {
                    .px2rem(left, 98);
                    .px2rem(top, 159);
                }
                &:nth-child(2) {
                    .px2rem(right, 105);
                    .px2rem(top, 74);
                }
                &:nth-child(3) {
                    .px2rem(right, 20);
                    .px2rem(top, 222);
                    img, .photo-wrap{
                        .px2rem(width, 30);
                        .px2rem(height, 30);
                    }
                    .praise-icon {
                        .px2rem(width, 10);
                        .px2rem(height, 17);
                        background: url(../css/radar/big-flower.png) center center no-repeat;
                        background-size: 100% auto;
                    }
                }
                &:nth-child(4) {
                    .px2rem(left, 39);
                    .px2rem(top, 265);
                }
                &:nth-child(5) {
                    .px2rem(left, 138);
                    .px2rem(top, 353);
                }
                &:nth-child(6) {
                    .px2rem(right, 48);
                    .px2rem(top, 358);
                    img, .photo-wrap {
                        .px2rem(width, 30);
                        .px2rem(height, 30);
                    }
                    .praise-icon {
                        .px2rem(width, 10);
                        .px2rem(height, 17);
                        background: url(../css/radar/big-flower.png) center center no-repeat;
                        background-size: 100% auto;
                    }
                }
                &:nth-child(7) {
                    .px2rem(left, 38);
                    .px2rem(top, 53);
                }
                &:nth-child(8) {
                    .px2rem(right, 48);
                    .px2rem(top, 12);
                    img, .photo-wrap {
                        .px2rem(width, 30);
                        .px2rem(height, 30);
                    }
                    .praise-icon {
                        .px2rem(width, 10);
                        .px2rem(height, 17);
                        background: url(../css/radar/big-flower.png) center center no-repeat;
                        background-size: 100% auto;
                    }
                }
                &:nth-child(9) {
                    .px2rem(left, 14);
                    .px2rem(top, 373);
                }
            }
        }
    }
    .radar-bottom {
        width: 100%;
        position: absolute;
        text-align: center;
        .px2rem(bottom, 75);
        display: inline-block;
        .px2rem(font-size, 36);
    }
    .praise-tip, .no-persons {
        position: absolute;
        left: 50%;
        opacity: 0;
        background: #0C213F;
        text-align: center;
        transform: translateX(-50%);
        transition: height .5s, opacity .3s, line-height .5s;
        box-sizing: content-box;
        .px2rem(top, 64);
        .px2rem(min-width, 222);
        .px2rem(line-height, 0);
        .px2rem(border-radius, 27);
        .px2rem(font-size, 12);
        .px2rem(padding, 10);
        &.tip-slide {
            opacity: 0.8;
            .px2rem(min-height, 32);
            .px2rem(line-height, 32);
        }
    }
    .no-persons {
        .px2rem(min-width, 232);
    }
}
@keyframes loadingAnimation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
@keyframes photoScale {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes bounceIn {
        0% {
        opacity: 0;
        transform: translate(-50%,-50%) scale(.3) rotate(0)
        }
    50% {
        opacity: 1;
        transform: translate(-50%,-50%) scale(1.05) rotate(30deg)
    }
    70% {
        transform: translate(-50%,-50%) scale(.9) rotate(-30deg)
    }
    100% {
        transform: translate(-50%,-50%) scale(1) rotate(0deg)
    }
}
</style>

<template>
    <div class="radar" :style="radarHeight" @touchmove.stop="forbidScroll" @scroll="forbidScroll">
        <div class="radar-top">{{LANG.radar.title}}</div>
        <div class="radar-main">
            <div class="circles">
                <div class="inner-circle"></div>
                <div class="middle-circle"></div>
                <div class="outer-circle"></div>
            </div>
            <div :class="{'loading': isLoading}"></div>
            <img class="my-photo img" v-lazy="loadMyPhotoUrl()" />
            <div class="have-persons" v-if="!isLoading && persons.length > 0">
                <div class="person-info" v-for="(person, index) in persons" :key="index">
                    <div class="photo-wrap">
                        <tap @tap="sendFlower(person)" :touch-effect="false">
                            <img v-lazy="getPhotoUrl(person.photoId)" class="img" />
                        </tap>
                        <div v-if="person.bePraise" class="photo-overlay"></div>
                        <span v-if="person.bePraise" class="praise-icon"></span>
                    </div>
                    <p class="name">{{person.userName}}</p>
                </div>
            </div>
        </div>
        <div class="radar-bottom iconfont icon-guanbianniu" @click="close"></div>
        <div class="praise-tip" :class="{'tip-slide': !hidePraiseTip}">
            {{praiseUserName}}{{LANG.radar.received}}🌹🌹🌹
        </div>
        <div :class="['no-persons',{'tip-slide': !isLoading && persons.length == 0}]">
            {{LANG.radar.noPersonTip}}
        </div>
    </div>
</template>

<script>
import tap from 'components/tap'
import config from 'config'
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import LANG from '@/lang/praise'

Vue.use(VueLazyload, {
    error: './static/image/default-photo.png',
    loading: './static/image/default-photo.png',
    try: 3 // default 1
})

export default {
    name: 'radar',
    props: {
        scrollTop: Number,
        activity: Object
    },
    components: {
        tap
    },
    data () {
        return {
            LANG,
            isLoading: true,
            persons: [],
            hidePraiseTip: true,
            tipTime: null,
            praiseUserName: '',
            radarHeight: '',
            host: ''
        }
    },
    methods: {
        getPhotoUrl (photoId) {
            return `${this.host}/space/c/photo/load?id=${photoId}&spec=180`
        },
        loadMyPhotoUrl () {
            return `${this.userInfo.photoUrl}&spec=180`
        },
        getPersonsData () {
            this.request({
                method: 'get',
                url: '/openapi/third/v1/colleagueService/yzj/imMetionMostMember?limit=9&offset=7'
            }, res => {
                if (res.success) {
                    this.persons = res.data.slice(0, 9)
                    setTimeout(() => {
                        this.isLoading = false
                    }, 2000)
                }
            })
            .catch(err => {
                const msg = JSON.parse(err)
                this.toast(msg.response.error)
            })
        },
        sendFlower (person) { // 换的新接口
            if (person.bePraise) {
                return
            }
            this.dataly({
                position: '趣事雷达',
                event: '点击头像送花'
            })
            this.request({
                method: 'post',
                url: '/cloudwork/activity/flowers',
                data: {
                    oids: person.userId,
                    userType: 0
                }
            }, res => {
                if (res.success) {
                    this.persons = this.persons.map((item) => {
                        if (item.userId === person.userId) {
                            item.bePraise = true
                        }
                        return item
                    })
                    this.praiseUserName = person.userName
                    this.hideTip()
                } else {
                    this.dataly({
                        error: '点击头像送花失败'
                    })
                }
            }).catch(() => {
                this.dataly({
                    error: '点击头像送花失败'
                })
            })
        },
        hideTip () {
            this.hidePraiseTip = false
            if (this.tipTime) {
                clearTimeout(this.tipTime)
            }
            this.tipTime = setTimeout(() => {
                this.hidePraiseTip = true
            }, 3000)
        },
        close (e) {
            e.target.style.opacity = '0.5'
            this.$emit('closeRadar')
        },
        forbidScroll (e) {
            e.preventDefault()
        }
    },
    mounted () {
        this.dataly({
            position: '趣事雷达',
            event: '打开趣事雷达'
        })
        this.getPersonsData()
        this.host = '//' + location.host
        if (config.runenv === 'local') { // 测试用
            this.host = '//192.168.22.144'
        }
        this.radarHeight = {height: window.screen.height + 'px'}
    }
}
</script>
