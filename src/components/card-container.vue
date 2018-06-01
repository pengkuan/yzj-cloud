<style lang="less" scoped>
@import '../css/variable';

// V9样式
[data-v9] {
    .card {
        .px2rem(border-radius, 6);
        box-shadow: 0 2px 10px 0 rgba(31,107,161,0.19);
    }
    .card-container-collapse {
        .px2rem(padding-bottom, 16);
    }
}


// V10样式
[data-v10] {
    .card {
        .px2rem(margin-bottom, 8);

        .card-header {
            .px2rem(padding-left, 20);
            .px2rem(padding-right, 20);
            .px2rem(margin-top, 16);
            .px2rem(margin-bottom, 19);
            .px2rem(height, 22);
            .px2rem(line-height, 22);

            .card-icon {
                .px2rem(margin-right, 8);
            }
            .card-title {
                .px2rem(font-size, 18) !important;
                font-family:PingFangSC-Semibold;
                font-weight: bold;
                color:rgba(29,29,29,1);
            }
        }
        .card-container {
            .px2rem(padding-top, 0);
            .px2rem(padding-bottom, 0);
        }
    }
    .card-container-collapse {
        .px2rem(margin-bottom, 16);
    }

    .touch-cover {
        .px2rem(border-radius, 6);
        position: absolute;
        .px2rem(width, 100);
        .px2rem(height, 57);
        right: 0;
        top: 0;
        display: none;
        z-index: 9998;
        &.touch-cover-visible {
            display: block;
        }
        .label{
            .px2rem(width, 100);
            .px2rem(height, 46);
            .px2rem(line-height, 74);
            .px2rem(font-size, 14);
            font-family: PingFangSC-Regular;
            position: absolute;
            color: #FFF;
            background: #768893;
            text-align: center;
            right: 0;
            top: 0;
            transform: rotate(45deg) translate(18 / 50 * 1rem, -44 /50 * 1rem);
        }
    }
}

[data-v10][data-android] {
    .card {
        .card-header {
            .card-title {
                margin-top: 2px;
            }
        }
    }
}

.card {
    .px2rem(margin-bottom, 12);
    background: #FFF;
    position: relative;
    overflow: hidden;

    .card-header{
        .px2rem(padding-left, 12);
        .px2rem(padding-right, 12);
        .px2rem(height, 42);
        .px2rem(line-height, 42);
        display: flex;
        flex-direction: row;
        align-items: center;

        .card-icon {
            margin: 0;
            padding: 0;
            margin-right: 12px;
            width: 18px;
            height: 18px;
            border-radius: 2px;
            display: inline-block;
            overflow: visible;
            position: relative;
            .card-iconfont{
                width: 12px;
                height: 12px;
                line-height: 12px;
                overflow: visible;
                vertical-align: middle;
                text-align: center;
                font-size: 12px;
                margin-left: auto; 
                margin-right: auto; 
                display: inline-block;
                position: absolute;
                left: 3px;
                top: 3px;
            }
            .card-iconimg{
                border-radius: 2px;
            }
        }
        .has-notification .notification {
            width: 8px;
            height: 8px;
            content: ' ';
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(4px, -4px);
            background-color: #F55147;
            border-radius: 50%;
            box-shadow: 0 0 0 1px #FFF;
        }
        .card-title,
        .card-header-buttons{
            .card-title-fontsize();
            line-height: 20px;
            color: #768893;
        }
        .card-title{
            display: inline-block;
        }
        .card-header-buttons{
            flex: 1;
            text-align: right;
            .card-header-button{
                .px2rem(margin-left, 16);
                display: inline-block;
                position: relative;
                .btn-notify{
                    display: block;
                    position: absolute;
                    .px2rem(width, 6);
                    .px2rem(height, 6);
                    .px2rem(top, -4);
                    .px2rem(right, -8);
                    border-radius: 50%;
                    background-color: #e7594f;
                }
            }
        }
    }

    .card-container{
        position: relative;
        .card-fontsize();
    }
    .card-container-collapse{
        text-align: center;
    }
}
.align-center{
    text-align: center;
}
</style>

<template>
    <!-- 如果卡片没更新并且showType为2，直接不显示  -->
    <div class="card" v-show="!(card.cardExpired && showType == 0)">
        <div class="card-header" v-if="card.showHeader">
            <!-- 卡片标题 -->
            <template v-if="card.showTitle">
                <div
                    :class="['card-icon', notifyCls]" :style="iconStyle">
                    <span v-if="!isBase64Icon" :class="['card-iconfont', iconClass]"></span>
                    <img v-if="isBase64Icon" :src="icon" class="card-iconimg" />
                    <span class="notification"></span>
                </div>
                <span class="card-title">{{currentTitle}}</span>
            </template>

            <!--卡片右上角按钮-->
            <div class="card-header-buttons">

                <!-- 无数据时显示进入应用  -->
                <template v-if="card.cardExpired && showType == 1 && (card.redirectActionData || card.actions[card.redirectAction])">
                    <click class="card-header-button" @click="logCardButtonEvent('进入应用')" :action="card.redirectActionData || card.actions[card.redirectAction]">
                        {{LANG.card.gotoApp}}
                    </click>
                </template>
                <template v-else>
                    <click class="card-header-button" v-for="btn in buttons" v-if="btn.title"
                        :key="btn.title" :action="getBtnAction(btn)" @click="clickCardButton(btn)">
                        {{btnTitleLang(btn.title)}}
                        <div class="btn-notify" v-if="btnNotifys[btn.card + '-' + btn.title]"></div>
                    </click>
                </template>
            </div>

        </div>
        <!-- 卡片内容 -->
        <template v-if="card.cardExpired && showType == 1">
            <div class="card-container card-container-collapse">
                {{getCardEmptyText(card)}}
            </div>
        </template>
        <template v-else>
            <div class="card-container" :style="computedContainerStyle">
                <slot></slot>
            </div>
        </template>

        <click :class="{'touch-cover': true, 'touch-cover-visible': card.name !== 'task'}" 
            :touch-effect="false" v-if="isV10Intro">
            <div class="label">{{LANG.card.demo}}</div>
        </click>
    </div>
</template>

<script>
import Click from 'components/click'
import {px2rem} from '@/utils'
import LANG from '@/lang/index'

function getCardTitle (card) {
    if (card.name) {
        return LANG.card.title[card.name] || card.title
    } else {
        return card.title
    }
}

function getCardEmptyText (card) {
    if (info.language === 'zh-CN') {
        return card.emptyText || LANG.card.emptyText.default
    } else if (card.name) {
        return LANG.card.emptyText[card.name] || LANG.card.emptyText.default
    } else {
        return LANG.card.emptyText.default
    }
}

export default {
    props: [
        'title',
        'card',
        'containerStyle',
        'icon',
        'iconColor',
        'iconCls',
        'iconData',
        'iconBackgroundColor',
        'hasNotify',
        'height'
    ],
    components: {
        Click
    },
    data () {
        return {
            LANG,
            currentTitle: getCardTitle(this.card),
            currentHeight: this.card.height,
            modifiedTitle: false,
            btnNotifys: {},
            notifyCls: '',
            isV10Intro: info.isV10 && (info.page === 'intro')
        }
    },
    computed: {
        buttons () {
            let card = this.card
            let btns = card.buttons || []

            // 如果客户端版本大于9.57，常用应用右上角按钮改名为“全部”，并跳转到应用中心
            if (card.name === 'myapp' && info.clientVersion >= 9.57) {
                let gotoWorkTable = () => {
                    window.XuntongJSBridge.call('commonRoute', {
                        'uri': 'cloudhub://workTable?appId=10661'
                    })
                }
                let btn = {
                    card: card.name,
                    title: LANG.myapp.all,
                    handler: gotoWorkTable
                }
                return [btn]
            }

            return btns
        },
        iconClass () {
            let iconCls = this.iconCls || this.icon

            if (iconCls && (iconCls !== 'upload')) {
                return 'iconfont icon-' + iconCls
            } else {
                return ''
            }
        },
        iconStyle () {
            var s = []
            if (this.iconBackgroundColor) s.push('background-color:' + this.iconBackgroundColor)
            // 图标前景色默认白色
            s.push('color:' + (this.iconColor || '#FFF'))
            // base64图标
            if (this.iconCls === 'upload' && this.iconData) {
                s.push(`background-image: url(${this.iconData})`)
                s.push(`background-size: 100%`)
                s.push(`background-repeat: no-repeat`)
                s.push(`background-position: center center`)
            }
            return s.join(';')
        },
        isBase64Icon () {
            return /^data:/.test(this.icon)
        },
        // 计算卡片样式：高度
        computedContainerStyle () {
            let height = this.currentHeight + ''

            if (!height || height === '0' || isNaN(height)) {
                // 卡片高度默认218
                height = '218'
            }

            // V10的卡片容器增加了每条边20px的padding
            // if (info.isV10) {
            //     height = Number(height) + 32
            // }

            return `height:${px2rem(height)}rem;${this.containerStyle}`
        },
        showType () {
            return this.card.showType
        }
    },
    methods: {
        btnTitleLang (title) {
            return LANG.card.btnTitle[title] || title
        },
        getCardEmptyText (card) {
            return getCardEmptyText(card)
        },
        getBtnAction (btn) {
            let card = this.card
            let actions = card.actions || {}
            if (btn.action === card.dataSourceAction) {
                return null
            } else {
                return actions[btn.action] && Object.assign({appId: card.appId}, actions[btn.action])
            }
        },
        clickCardButton (btn) {
            let card = this.card
            
            if (btn.action === card.dataSourceAction) {
                this.$emit('request', card)
            } else if (typeof btn.handler === 'function') {
                btn.handler()
            } else {
                let act = this.getBtnAction(btn)
                if (act.type === 'app' && card.appId) {
                    this.goApp({
                        appId: card.appId
                    })
                }
            }
            this.logCardButtonEvent(btn.title)
        },
        logCardButtonEvent (event) {
            if (!this.card.title || !event) return
            this.dataly({
                position: this.card.title + '卡片',
                event: '点击' + event + '按钮'
            })
        },
        // 设置标题
        setTitle (title) {
            this.currentTitle = title
            this.modifiedTitle = true
        },
        setHeight (height) {
            if (height === 'default') {
                this.currentHeight = this.height
            } else if (typeof height === 'number') {
                this.currentHeight = height
            }
            let cardsContainer = document.querySelector('#cards-container')
            if (cardsContainer) {
                cardsContainer.style.height = ''
            }
        },
        // 清除新消息
        clearCardNotify () {
            if (this.hasNotify) {
                this.bus.$emit('clearCardNotify', {
                    name: this.card.name
                })
            }
        },
        watchContent (eventName, callback) {
            this.bus.$on(`card_${this.card.name}_container_${eventName}`, callback)
        },
        checkNotify () {
            if (this.hasNotify) {
                this.notifyCls = 'has-notification'
            } else {
                this.notifyCls = ''
            }
        }
    },
    created () {
        this.watchContent('setTitle', title => {
            this.setTitle(title)
        })
        this.watchContent('setHeight', height => {
            this.setHeight(height)
        })
        this.watchContent('clearNotify', e => {
            this.clearCardNotify()
        })
        this.btnNotifys = {
            // 'myapp-全部': this.globalStorage.getItem('guide_myapp_all_button_used') !== 'true'
        }
        this.checkNotify()
    },
    watch: {
        title (val) {
            if (val && !this.modifiedTitle) {
                this.currentTitle = val
            }
        },
        hasNotify (val) {
            // 红点消失延迟2秒
            if (!val) {
                setTimeout(() => {
                    this.checkNotify()
                }, 2000)
            } else {
                this.checkNotify()
            }
        },
        height (val) {
            this.setHeight(val)
        }
    }
}
</script>
