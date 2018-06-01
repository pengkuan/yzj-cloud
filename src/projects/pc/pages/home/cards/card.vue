<template>
    <div
        v-show="showType !== 'hidden'"
        class="card-container"
        @mouseenter="_handleMouseEnter"
        @mouseleave="_handleMouseLeave"
        @click.capture="_clearNotify"
    >
        <card-head
            :title="title"
            :icon="icon"
            :iconBg="iconBg"
            :iconData="iconData"
            :operationName="operationName"
            :showDot="isShowDot"
            @operate="_gotoApp(card.appId)"
        ></card-head>

        <div class="card--content">
            <template v-if="showType === 'show'">
                <component
                    data-v10="true"
                    data-pc="true"
                    :data-mouse="mouseStatus"
                    :is="cardName"
                    :actions="reActions"
                    :card="reCard"
                    :data="cardData"
                    :title="title"
                    :loaded="true"
                    :style="{minHeight: cardHeight + 'px'}"
                    @request="_getData"
                    @setHeight="_setHeight"
                ></component>
            </template>

            <template v-if="showType === 'fold'">
                <div class="tips">卡片没有新数据</div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Home } from 'pc/types'
import { Action, State } from 'vuex-class'
import fetch from 'pc/tasks'
import CardHead from './cardHead.vue'

interface fetchOptions {
    url: string
    method: string
    header?: object
    data?: object
    [key: string]: any
}

@Component({
    components: {
        CardHead
    }
})
export default class CardContainer extends Vue {
    @Prop({ type: String, default: '' }) name: string
    @Prop({ type: String, default: '' }) title: string
    @Prop({ type: String, default: '' }) icon: string
    @Prop({ type: String, default: '' }) iconBg: string
    @Prop({ type: String, default: '' }) iconData: string
    @Prop({ type: [ String, Number ] }) height: string | number
    @Prop({ type: Object, default: {} }) card: Home.CardDetail
    @Prop({ type: Boolean, default: false }) notice: boolean

    @Action removeNoticeById
    @Action getCardNotice

    cardData: any = {}                          // 卡片数据
    showType: string = 'hidden'                 // 卡片显示状态
    isShowDot: boolean = false                  // 是否显示红点
    isClearNotifyRunning: boolean = false       // 是否清除红点的函数正在运行
    clearNotifyTimer: any                       // 清除红点的函数定时器
    mouseStatus: string = 'none'                // 卡片上的鼠标状态
    cardUnread: boolean = false                 // 卡片是否未读
    cardHeight: string | number = this.height   // 卡片高度

    @Watch('notice')
    onNotice (notice: boolean) {
        if (notice) {
            this._getData()
        }
    }
    @Watch('cardUnread')
    onCardUnreadChange (unRead: boolean) {
        if (!unRead) {
            this._clearNotify()
        } else {
            this.getCardNotice(this.card.id)
            this.isShowDot = true
        }
    }

    // 卡片名称
    get cardName (): string {
        return 'card_' + this.name
    }

    // 重组 actions 数据
    get reActions (): object {
        return this._arr2obj(this.card.actions)
    }

    // 重组 card 数据
    get reCard (): object {
        return {
            ...this.card,
            actions: this.reActions
        }
    }

    // 获取卡片数据的 action
    get dataSoureOptions (): fetchOptions {
        return this.reActions[this.card.dataSourceAction]
    }

    // 卡片头部右上角按钮功能
    get operationAction (): fetchOptions {
        const key = (this.card.buttons[0] || {} as any).action
        return this.reActions[key]
    }

    // 卡片头部右上角按钮文案
    get operationName (): string {
        if (this.showType === 'fold') {
            return '进入应用'
        } else {
            if (this.card.buttons) {
                return (this.card.buttons[0] || {} as any).title
            }
            return ''
        }
    }

    /**
     * 设置卡片高度
     * @param {Number} height 高度
     */
    _setHeight (height) {
        this.cardHeight = height
    }

    /**
     * 卡片展示状态
     * @param cardExpired {Boolean} 卡片是否有数据 false 代表有，true 代表没有
     */
    _getShowType (cardExpired: boolean): string {
        if (cardExpired === false ||
            (cardExpired && this.card.showType === 2)
        ) {
            return 'show'
        } else if (cardExpired && this.card.showType === 1) {
            return 'fold'
        } else {
            return 'hidden'
        }
    }

    /**
     * 数组转化为对象
     * @param arr {Array} 原数组
     */
    _arr2obj (arr: Array<object>): object {
        const obj: object = {}
        arr.forEach((val: any) => {
            obj[val.name] = val
        })
        return obj
    }

    /**
     * 卡片右上角按钮
     */
    _gotoApp (appId: string): void {
        if (this.showType === 'fold') {
            window.location.href = `cloudhub://lightapp?appid=${appId}`
        } else {
            if (this.operationAction.type === 'app') {
                this.redirectTo({
                    appId
                })
            } else if (this.operationAction.type === 'redirect') {
                this.redirectTo({
                    appId,
                    ...this.operationAction
                })
            } else {
                // 刷新功能
                if (this.operationAction.name === this.dataSoureOptions.name) {
                    this._getData()
                }
            }
        }
    }

    /**
     * 移除红点
     */
    _clearNotify (): void {
        if (this.isShowDot) {
            this.isShowDot = false
            this.cardUnread = false
            this.$emit('noticeFinished')
            this._setCardReaded()
            this._resetNotifyTimer()
            this.removeNoticeById(this.card.id)
        }
    }

    /**
     * 重置定时器
     */
    _resetNotifyTimer (): void {
        clearTimeout(this.clearNotifyTimer)
        this.clearNotifyTimer = null
        this.isClearNotifyRunning = false
    }

    /**
     * 鼠标移入卡片，4秒后移除红点
     */
    _handleMouseEnter (): void {
        this.mouseStatus = 'enter'
        if (this.isShowDot && !this.isClearNotifyRunning) {
            this.isClearNotifyRunning = true
            this.clearNotifyTimer = setTimeout(() => {
                this._clearNotify()
            }, 4000)
        }
    }

    /**
     * 鼠标移出，移除定时器
     */
    _handleMouseLeave (): void {
        this.mouseStatus = 'leave'
        if (this.isShowDot) {
            this._resetNotifyTimer()
        }
    }

    /**
     * 获取卡片数据
     */
    async _getData (): Promise<any> {
        this.$emit('noticeFinished')
        try {
            if (this.dataSoureOptions.url) {
                let ticket: string = ''
                // 获取 ticket
                if (this.card.needTicket && this.card.appId) {
                    ticket = await this._getTicket(this.card.appId) as string
                }
                // 组装接口地址
                let [url, params] = this.dataSoureOptions.url.split('?')

                url = `${url}?${params || ''}&ticket=${ticket || ''}&${this.dataSoureOptions.params || ''}`

                // 报表秀秀取数卡片接口更改
                if (this.card.name === 'boss' || this.card.name === 'kdcloud') {
                    url = url.replace(/((openapi|cardapi)\/third\/v1\/)?api\/linkerp\/interaction\/getWorkBench/, 'connecterp-charts-nodejs/getDiagramList')
                    url += (url.indexOf('?') !== -1) ? '&' : '?'
                    url += `eid=${this.userInfo.eid}&wbuserid=${this.userInfo.wbuserid}&name=${this.userInfo.name}`
                }

                // 审批助手卡片使用新接口
                url = url.replace('getTodoListByParam', 'getFlowTodoListV2')

                // 拉取数据
                const res = await fetch({
                    url: url,
                    method: this.dataSoureOptions.method,
                    headers: {
                        'X-Requested-cardId': this.card.id || '',
                        'X-Requested-cardHost': this.card.thhost || ''
                    }
                })
                let data: any   // 存储原数据
                if (!res.success) {
                    // console.log(res)
                    this.showType = this._getShowType(true)
                } else {
                    data = res.data
                    this.showType = this._getShowType((data || {}).cardExpired || false)
                    this.cardUnread = (data || {}).cardUnread
                    // 快捷审批新接口数据格式从Array变成Object
                    if (this.card.name === 'quick-flow') {
                        if (!Array.isArray(data) && data.list) {
                            data = data.list
                        }
                    }
                    this.cardData = data || {}
                }
                this.$emit('cardDataReady', {
                    ...this.card,
                    ...res.data,
                    showStatus: this.showType
                })
                // 保存缓存
                _core.storage.setItem(this.card.name, {
                    ...this.card,
                    ...res.data,
                    showStatus: this.showType
                })
            }
        } catch (err) {
            console.error(this.card.title, err)
            // 拉去缓存数据
            const oldData = _core.storage.getJSON(this.card.name || this.card.id) || {}
            this.showType = this._getShowType(oldData.cardExpired || false)
            this.cardUnread = oldData.cardUnread
            this.cardData = oldData
            this.$emit('cardDataReady', {
                ...this.card,
                ...this.cardData,
                showStatus: this._getShowType(false),
                ...oldData
            })
            throw err
        }
    }

    /**
     * 获取 ticket
     * @param appid {String} appid
     */
    async _getTicket (appid: string): Promise<any> {
        try {
            const res = await fetch({
                url: '/cloudwork/batchticket/tickets',
                method: 'POST',
                data: {
                    appids: appid
                }
            })
            return new Promise((resolve, reject) => {
                if (!res.success) {
                    reject(res)
                } else {
                    resolve(res.data[appid])
                }
            })
        } catch (err) {
            console.error(this.card.title, err)
            throw err
        }
    }

    /**
     * 将卡片设为已读
     */
    async _setCardReaded () {
        try {
            if (['boss', 'kdcloud'].indexOf(this.card.name) > -1) {
                await fetch({
                    url: '/api/linkerp/interaction/readReportWorkBench',
                    method: 'get'
                })
            } else if (this.card.name) {
                await fetch({
                    url: '/cloudwork/cardRedDot/updateCardRedDot',
                    method: 'post',
                    data: {
                        cardName: this.card.name,
                        cardUnread: false
                    }
                })
            }
        } catch (err) {
            console.error(this.card.title, err)
            throw err
        }
    }

    created () {
        this._getData()
    }
}
</script>

<style lang="less" scoped>
.card-container {
    width: 375px;
    display: inline-block;
    vertical-align: top;
    background-color: #fff;
    margin-bottom: 20px;
    overflow: hidden;
    border-radius: 4px;
    // border: 1px solid #D7DEE3;

    .card--content {
        font-size: 14px;
        padding-bottom: 16px;
        position: relative;
        box-sizing: content-box;
        .tips {
            text-align: center;
            font-size: 14px;
            height: 40px;
            line-height: 40px;
        }
    }
}
</style>
