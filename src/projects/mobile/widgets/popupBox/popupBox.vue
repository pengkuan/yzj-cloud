/*
 * @Author: Jovey Zheng
 * @Date: 2017-09-16 12:01:59
 * @Last Modified by: Jovey Zheng
 * @Last Modified time: 2017-10-30 11:39:05
 */
<style lang="less" scoped>
@import url('../../../../css/variable');

.popup__container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    z-index: 1000;
    .popup--card {
        width: 5.32rem;
        height: 7.4rem;
        border-radius: .12rem;
        position: relative;
        color: #d78049;
        /*&.normal-bg{
            background:url('../../../assets/mooncake/maskbg.jpg');
            background-size: contain;
        }
        &.gift-bg{
            background:url('../../../assets/mooncake/gift-bg.jpg');
            background-size: contain;
        }*/
        .head__banner {
            position: absolute;
            width: 100%;
            .px2rem(min-height, 169);
            background-size: 100% 100% !important;
            border-radius:.12rem .12rem 0 0;
            overflow: hidden;
        }
        .chang_e {
            position: absolute;
            left: 52%;
            transform: translate3d(-50%, 0, 0);
            top: -2.25rem;
            z-index: 1002;
            img {
                width: 7.5rem;
                max-width: none;
            }
        }
        .tome {
            position: absolute;
            left: 50%;
            transform: translate3d(-50%, 0, 0);
            bottom: .7rem;
            img {
                width: 7.5rem;
                max-width: none;
            }
            .content {
                .px2rem(font-size, 16);
                width: fit-content;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0);
                z-index: 1001;
            }
        }
        .button__area {
            height: inherit;
            width: inherit;
            position: relative;
            overflow: hidden;
            border-radius: .12rem;
            .card-btn {
                position: absolute;
                right: 0;
                bottom: -3px;
                left: 0;
                text-align: center;
                background-color: #fff;
                border-radius: 0 0 .12rem .12rem;
                .tap-container {
                    padding: .23rem 0;
                    .px2rem(font-size, 16);
                    color:#397f91;
                    &.achieve{
                        background: #f05475;
                        color:#fff;
                    }
                }
            }
            .social-share {
                position: absolute;
                right: 0;
                bottom: 0;
                left: 0;
                padding: .2rem .4rem .2rem;
                background-color: #fff;
                border-radius: 0 0 .12rem .12rem;
                color: #2f2f2f;
                will-change: transform;
                transition: transform .3s linear;
                p {
                    .px2rem(margin-bottom, 12);
                }
            }
        }
        .popup--btn {
            color: #fff;
            margin-top: .6rem;
            display: flex;
            justify-content: center;
            .btn-blue{
                img{
                    border-radius: 50%;
                    background:rgba(14, 46, 70, .36);
                }
            }
            .close-btn {
                width: .72rem;
                height: .72rem;
                line-height: .72rem;
                text-align: center;
                background-color: transparent;
                border: 1px solid #fff;
                border-radius: 50%;
            }
        }
    }
}
.hidden {
    display: none;
}
.social-share-disable {
    transform: translate3d(0, 101%, 0);
}
.social-share-enable {
    transform: translate3d(0, 0, 0);
}
.default-mask {
    background-color: rgba(0, 0, 0, .5);
}
.default-mask-short {
    background-color: rgba(0, 0, 0, .5);
    .popup--card {
        margin-bottom: 70px;
    }
}
.gradient-mask {
    background: linear-gradient(rgba(14, 46, 70, .33), rgba(14, 46, 70, .4), rgba(33, 91, 125, .2), transparent);
}
.bg-gradient {
    background: linear-gradient(120deg, #5365bf 5%, #825cd7, #8633d8);
}
.card-shadow {
    box-shadow: 0 2px 10px 0 rgba(14, 46, 71, 0.36);
}
</style>

<template>
    <div :class="`popup__container ${className}`"
         @touchmove.stop="forbidScroll"
         @scroll="forbidScroll">
        <div :class="`popup--card ${showCardShadow ? 'card-shadow' : ''}
            ${isFestival ? isAchieve ? 'gift-bg' : 'normal-bg' : ''}`">
            <!-- 顶部 banner -->
            <div v-if="headBanner"
                class="head__banner"
                :style="`background: url(${headBanner})`" />
            <!-- 卡片下方按钮区域 -->
            <div class="button__area">
                <div :class="`social-share ${shareClass}`">
                    <p v-html="socialDescription" />
                    <social-share-group :list="[]"
                                        :isSharedToClose="isSharedToClose"
                                        @wechatShare="wechatShare"
                                        @workmateShare="workmateShare"
                                        @contactShare="contactShare" />
                </div>
                <div class="card-btn" v-if="!showShare">
                    <tap @tap="getGift" v-if="isAchieve" class="achieve">
                        <div>立即领取</div>
                    </tap>
                    <tap @tap="send" v-else>
                        <div v-html="btnText" />
                    </tap>
                </div>
            </div>

            <!-- 卡片外部关闭按钮区域 -->
            <div class="popup--btn" v-if="showClose">
                <tap v-if="!closeBtnText" @tap="destroy" :class="{'btn-blue': !isNotFirstPage}">
                    <img src="../../../../assets/mooncake/close-line.svg" alt="close" />
                </tap>
                <div v-else
                     class="close-btn"
                     @click="destroy"
                     v-html="closeBtnText"/>
            </div>
        </div>
    </div>
</template>

<script>
import Tap from 'components/tap'
import SocialShareGroup from './socialShareGroup'

export default {
    name: 'PopupBox',
    components: {
        Tap,
        SocialShareGroup
    },
    props: {
        // 自定义类名
        className: {
            type: String,
            default: ''
        },
        // 顶部 banner 图
        headBanner: {
            type: String,
            default: ''
        },
        // 显示卡片背景阴影
        showCardShadow: {
            type: Boolean,
            default: true
        },
        // 显示卡片背景渐变
        showCardGradient: {
            type: Boolean,
            default: true
        },
        // 是否显示关闭按钮
        showClose: {
            type: Boolean,
            default: true
        },
        // 内容文本
        contentText: {
            type: String,
            default: '送祝福月饼，喂胖Ta的嫦娥~'
        },
        // 按钮文本
        btnText: {
            type: String,
            default: '去送祝福'
        },
        // 关闭按钮文本
        closeBtnText: {
            type: String,
            default: ''
        },
        // 是否收到99个礼物
        isAchieve: {
            type: Boolean,
            default: false
        },
        // 是否分享
        isShare: {
            type: Boolean,
            default: false
        },
        // 分享头部文案
        socialDescription: {
            type: String,
            default: '送祝福给Ta'
        },
        // 微信好友分享按钮
        wechatShare: {
            type: Function,
            default: () => { console.log('wechatShare') }
        },
        // 云之家同事分享按钮
        workmateShare: {
            type: Function,
            default: () => { console.log('workmateShare') }
        },
        // 手机联系人分享按钮
        contactShare: {
            type: Function,
            default: () => { console.log('contactShare') }
        },
        // 是否点击分享之后弹窗消失
        isSharedToClose: {
            type: Boolean,
            default: false
        },
        isNotFirstPage: {
            type: Boolean,
            default: false
        },
        isFestival: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            showShare: this.isShare,            // 是否分享
            shareClass: this.isShare
                        ? 'social-share-enable'
                        : 'social-share-disable'  // 分享区域样式
        }
    },
    methods: {
        // 主动关闭窗口，移除元素
        destroy () {
            if (this.isAchieve) {
                localStorage.setItem('isNoteAchieve', 1)
            }
            document.body.removeChild(this.$el)
        },

        // 去领取专享礼包
        getGift () {
            localStorage.setItem('isNoteAchieve', 1)
            window.XuntongJSBridge.call('gotoLightApp', {
                'appId': '10733',
                'appName': '双旦活动',
                'urlParam': 'apm_from=cloudoffice'
            })
        },
        // 发送按钮点击事件
        send () {
            this.showShare = true
            this.shareClass = 'social-share-enable'
        },
        /**
         * 禁止背景滚动
         * @param {Object} e 元素 event 对象
         */
        forbidScroll (e) {
            e.preventDefault()
        }
    }
}
</script>
