<style lang="less" scoped>
    @import '../../../css/variable';

    .setting-container{
        background-color: #F8F9FB;
        margin: 0;
        padding: 0;
        overflow: hidden;
        font-family: PingFangSC-Regular, Helvetica, sans-serif;

        h2{
            color: #768893;
            .px2rem(font-size, 12);
            .px2rem(padding, 0);
        }

        .setting-block-header{
            .px2rem(margin, 12);
            .setting-intro {
                .px2rem(margin-top, 18);
                display: flex;
                flex-direction: row;
                .setting-intro-text{
                    .px2rem(margin-left, 12);
                }
            }
        }
    }

    .cards-on-container,
    .cards-off-container{
        background-color: #FFF;
        overflow: hidden;
        h2{
            .px2rem(margin, 12)
        }
    }

    .cards-on-container,
    .cards-off-container{
        .card-on{
            .px2rem(height, 48);
            display: flex;
            flex-direction: row;
            align-items: center;
            position: relative;
            &::after{
                display: block;
                content: ' ';
                position: absolute;
                .px2rem(left, 42);
                bottom: 0;
                width: 200%;
                height: 1px;
                background: #EEF0F6;
                transform: scale(0.5);
                transform-origin: 0 0;
            }
            &:last-child{
                &::after{
                    display: none;
                }
            }
        }
    }
    .card-delete{
        .px2rem(margin-left, 12);
        .px2rem(width, 18);
        .px2rem(font-size, 18);
        color: #F55147;
        &[disabled] {
            color: #D4D9DD;
        }
    }
    .card-add{
        .px2rem(margin-left, 12);
        .px2rem(font-size, 18);
        color: #329DF1;
    }
    .card-icon{
        .px2rem(margin-left, 12);
        .px2rem(margin-top, 1);
        .px2rem(font-size, 12);
        width: 18px;
        height: 18px;
        border-radius: 2px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    .card-text{
        .px2rem(margin-left, 10);
        .px2rem(font-size, 16);
        .px2rem(letter-spacing, -0.39);
        flex: 1;
        font-family: PingFangSC-Regular;
        color: #1D1D1D;
    }
    .card-desc{
        color: #768893;
        font-size: 12px;
        margin-right: 12px;
    }

    .cards-off-container{
        .px2rem(margin-top, 12);
    }

    .buildDate {
        .px2rem(padding-bottom, 50);
        .px2rem(padding-top, 50);
        text-align: center;
        font-size: 7px;
        color: #DDD;
    }

    // .to-home{
    //     width:50px;
    //     height:50px;
    //     margin:10px auto 0 auto;
    //     border: 1px solid #EEE;
    //     color: #DDD;
    //     border-radius: 50%;
    //     position: fixed;
    //     right: 20px;
    //     bottom: 70px;
    //     font-size: 9px;
    //     text-align: center;
    //     line-height: 50px;
    // }

    [data-v10] {
        .setting-container{
            .cards-on-container,
            .cards-off-container{
                .px2rem(margin-top, 8);
            }
            h2{
                .px2rem(font-size, 16);
                .px2rem(padding-left, 4);
                color: #0F092A;
                font-family: PingFangSC-Semibold;
                font-weight: bold;
            }
            .card-delete,
            .card-add{
                width: 18px;
                height: 18px;
                font-size: 18px;
            }
            .card-icon{
                width: 24px;
                height: 24px;
                &:before{
                    font-size: 17px;
                }
            }
            .card-text{
                font-size: 17px;
            }
        }

    }
</style>

<template>
    <div class="setting-container" :style="'min-height: ' + clientHeight + 'px'">
        <div class="cards-on-container">
            <h2>{{LANG.addedCards}}</h2>
            <div>
                <click class="card-on"
                    active-style="background-color: #f1f4f5;"
                    v-for="(card, index) in enabledCards" :key="index" :data-id="card.id"
                    @click="card.title !== '常用应用' && removeCard(index)">
                    <div class="card-delete iconfont icon-shezhiyeshanchuqiapian" :disabled="card.title === '常用应用'"></div>
                    <div :class="['card-icon', 'iconfont icon-' + getCardIcon(card)]" :style="iconStyle(card)"></div>
                    <div class="card-text">
                        {{getCardTitle(card)}}
                        <div class="card-desc" v-if="lang === 'en-US'">{{desc(card)}}</div>
                    </div>
                    <div class="card-desc" v-if="lang !== 'en-US'">{{desc(card)}}</div>
                </click>
            </div>
        </div>
        <div class="cards-off-container">
            <h2>{{LANG.unaddedCards}}</h2>
            <div>
                <click class="card-on"
                    active-style="background-color: #f1f4f5;" 
                    v-for="(card, index) in disabledCards" :key="index" @click="addCard(index)">
                    <div class="card-add iconfont icon-shezhiyezengjiaqiapian"></div>
                    <div :class="['card-icon', 'iconfont icon-' + getCardIcon(card)]" :style="iconStyle(card)"></div>
                    <div class="card-text">
                        {{getCardTitle(card)}}
                        <div class="card-desc" v-if="lang === 'en-US'">{{desc(card)}}</div>
                    </div>
                    <div class="card-desc" v-if="lang !== 'en-US'">{{desc(card)}}</div>
                    
                </click>
            </div>
        </div>
        <click class="buildDate" @click="tapVersion">
            <span>{{buildDate}}</span>
        </click>

        <!-- <div class="to-home" v-if="isDevEnv" @click="toHome">返回</div> -->
    </div>
</template>

<script>
import Click from 'components/click'
import cardsMixins from 'mixins/cards'
import LANG from '@/lang/setting'
import LANGINDEX from '@/lang/index'

export default {
    name: 'app',
    mixins: [cardsMixins],
    components: {
        Click
    },
    data () {
        return {
            buildDate: info.buildDate,
            tapVersionCount: 0,
            LANG,
            lang: info.language,
            isMyCloudHub: !!this.storage.getItem('isMyCloudHub'),
            myCloudHubCards: ['task', 'boss', 'kdcloud', 'news', 'quick-flow', 'attendance']
            // ,
            // isDevEnv: location.hostname.indexOf('172.20') === 0
        }
    },
    computed: {
        clientHeight () {
            return document.documentElement.clientHeight
        }
    },
    methods: {
        getCardTitle (card) {
            if (card.name) {
                return LANGINDEX.card.title[card.name] || card.title
            } else {
                return card.title
            }
        },
        desc (card) {
            return card.showType === 0 ? LANG.showWhenHaveData : ''
        },
        tapVersion () {
            this.tapVersionCount += 1
            if (this.tapVersionCount === 5) {
                this.userStorage.setItem('devmode', true)
                this.toast('开发者模式已启用，请返回首页')
            }
        },
        iconStyle (item) {
            const s = []
            if (item.iconBackgroundColor) s.push('background-color:' + item.iconBackgroundColor)
            // 图标前景色默认白色
            s.push('color:' + (item.iconColor || '#FFF'))
            // base64图标
            if (item.iconCls === 'upload' && item.iconData) {
                s.push(`background-image: url(${item.iconData})`)
                s.push(`background-size: 100%`)
                s.push(`background-repeat: no-repeat`)
                s.push(`background-position: center center`)
            }
            return s.join(';')
        },
        getCardIcon (card) {
            let iconCls = card.iconCls || card.icon

            if (iconCls && (iconCls !== 'upload')) {
                return 'iconfont icon-' + iconCls
            } else {
                return ''
            }
        },
        toHome () {
            location.href = '#/'
        }
    },
    mounted () {
        if (info.isAndroid && info.isV10) {
            qing.call('setWebViewTitle', {title: '添加'})
        }

        dispatchHTMLEvent('pageIsReady')
        // 禁用反弹
        window.XuntongJSBridge.call('setBounce', { enable: 0 })
        // 取用户卡片
        this.getUserCardList(list => {
            this.enabledCards = []
            this.$nextTick(e => {
                let newList = []
                list.forEach(n => {
                    if (n.name === 'myapp') {
                        newList = [n].concat(newList)
                    } else {
                        newList.push(n)
                    }
                })
                this.enabledCards = newList.filter(n => n.name !== 'myapp')
                
                // 个人空间只显示指定的卡片
                if (this.isMyCloudHub) {
                    this.enabledCards = this.enabledCards.filter(n => this.myCloudHubCards.includes(n.name))
                }
            })
        })
        // 取全部卡片，通过修改allCards来影响disabledCards的数据
        this.getAllCardList(list => {
            this.allCards = []
            this.$nextTick(() => {
                this.allCards = list.filter(n => n.name !== 'myapp')
                
                // 个人空间只显示指定的卡片
                if (this.isMyCloudHub) {
                    this.allCards = this.allCards.filter(n => this.myCloudHubCards.includes(n.name))
                }
            })
        })
        // 埋点
        this.dataly({ event: '打开卡片添加页' })
    }
}
</script>
