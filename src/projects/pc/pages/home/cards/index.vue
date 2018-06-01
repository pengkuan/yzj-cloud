<template>
    <div id="cards-area">
        <div
            v-for="(cardList, index) in withoutMyappCardList.colList"
            class="card-column"
            :key="index"
        >
            <card
                v-for="card in cardList"
                class="card"
                :key="card.id"
                :name="card.name"
                :title="card.title"
                :icon="card.iconCls"
                :iconBg="card.iconBackgroundColor"
                :iconData="card.iconData"
                :height="card.height"
                :card="card"
                :notice="noticeId === card.id"
                @cardDataReady="_cardDataReady"
                @noticeFinished="_noticeFinished"
            ></card>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { includes } from '@/cards'
import { Action, Getter, State } from 'vuex-class'
import { Home } from 'pc/types'
import { str2Object } from '@/utils'
import CardComponents from '@/card-components'
import cardMixins from '@/mixins/card'
import less from 'less'
import Card from './card.vue'

@Component({
    components: {
        Card
    }
})
export default class Cards extends Vue {
    @Getter withoutMyappCardList
    @Action getCardList
    @Action getCardNotice
    @Action getUpdateStateByKey
    @State noticeCardList

    cardReadyList: Array<any> = []      // 已经完成数据请求的卡片数组
    cardReadyIdList: Array<any> = []    // 已经完成数据请求的卡片数组
    isRecombination: boolean = false    // 卡片数组是否被重组完成
    noticeId: string = ''               // 被通知的卡片 id

    @Watch('withoutMyappCardList', { immediate: true })
    onCardListChange (val: any): void {
        this._registerCard(val.list)
    }

    @Watch('noticeCardList')
    onNoticeListChange (list: Array<any>): void {
        // 侧边栏显示红点
        this.showTabRedDot({ num: list.length })
    }

    /**
     * 卡片通知已完成获取数据
     */
    _noticeFinished () {
        this.noticeId = ''
    }

    /**
     * 卡片数据请求完成后重排
     * @param {Object} data 卡片完整数据（包含卡片配置，及数据）
     */
    _cardDataReady (data): void {
        const index = this.cardReadyIdList.indexOf(data.id)
        // 不存在插入，已存在则替换
        if (index < 0) {
            this.cardReadyList.push(data)
            this.cardReadyIdList.push(data.id)
        } else {
            this.cardReadyList[index] = data
        }
        // 只执行一次替换
        if (!this.isRecombination && this.cardReadyIdList.length === this.withoutMyappCardList.list.length) {
            this.isRecombination = true
            this.getUpdateStateByKey({
                stateName: 'cardList',
                newData: this.cardReadyList
            })
        }
    }

    /**
     * 替换特殊符号
     * @param {String} str 字符串
     */
    _replaceSymbol (str: string): string {
        return str.replace(/\^\^/gm, '\'')
            .replace(/☆/gm, '\'')
            .replace(/@@/gm, '"')
            .replace(/★/gm, '"')
            .replace(/%%/gm, '<')
            .replace(/◇/gm, '<')
    }

    /**
     * 动态注册第三方卡片（非内置卡片）
     * @param {Array<Home.CardDetail>} cardList 卡片列表
     */
    _registerCard (cardList: Array<Home.CardDetail>): void {
        const registered = {}
        cardList.forEach(card => {
            // 防止重复注册
            if (registered[card.id]) {
                return
            } else {
                registered[card.id] = true
            }

            let safeMixins = {}
            // 卡片混合（执行脚本）
            if (card.enableMixins && typeof card.mixins === 'string') {
                let safeStr = card.mixins.replace(/^mixins:/, '')
                safeStr = this._replaceSymbol(safeStr)
                safeMixins = str2Object(safeStr)
            }
            // 非内置卡片
            if (!includes(card.name)) {
                // 如果卡片没有name，用id代替
                card.name = card.name || card.id
                // 注册组件
                Vue.component('card_' + card.name, (resolve, reject) => {
                    // 模板安全过滤
                    let safeTemplate = card.template.replace(/(@|v-on:)\w+="[^"]*"/img, '') // 过滤事件绑定
                    safeTemplate = this._replaceSymbol(safeTemplate)
                    resolve({
                        mixins: [ safeMixins, cardMixins ],
                        template: safeTemplate,
                        components: { ...CardComponents },
                        props: {
                            title: String,
                            actions: [ Object, Array ],
                            data: [ Object, Array ],
                            card: Object,
                            loaded: true
                        },
                        mounted () {
                            // 给卡片容器加上scope标记
                            this.$el.parentElement.setAttribute('scope', card.name)
                        }
                    })
                })
                // 添加css
                if (card.style) {
                    less.render(`[scope="${card.name}"]{${card.style}}`, (e, output) => {
                        if (output && output.css) {
                            let tag = document.createElement('style')
                            tag.innerHTML = output.css
                            tag.setAttribute('card', card.name)
                            document.head.appendChild(tag)
                        }
                    })
                }
            }
        })
    }

    created () {
        this.getCardList()
        this.showTabRedDot({ num: 0 })
    }

    mounted () {
        // 监听卡片更新通知
        document.addEventListener('cardUpdate', (res: any) => {
            console.log(res.data)
            const data = res.data
            // 触发动态重排
            this.cardReadyList = []
            this.cardReadyIdList = []
            this.withoutMyappCardList.list.forEach(val => {
                this.cardReadyIdList.push(val.id)
                this.cardReadyList.push(val)
            })
            this.isRecombination = false
            // 红点提醒 - 通知卡片
            this.noticeId = data.id
        })
    }
}
</script>

<style lang="less" scoped>
#cards-area {
    display: flex;
    .card-column {
        width: 100%;
        margin-right: 20px;
        &:last-child {
            margin-right: 0;
        }
    }
    .card {
        transition: box-shadow .5s;
        animation: fadeIn .75s ease-in-out;
        &:hover {
            box-shadow: 0 8px 30px rgba(3, 19, 28, .2);
        }
    }
}
@keyframes fadeIn {
    from { opacity: 0 }
    to { opacity: 1 }
}
</style>
