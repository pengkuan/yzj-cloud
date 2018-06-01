<style>
.tap-container {
    cursor: pointer;
}
.tap-container.active.item-background-active{
    background-color: rgba(232,238,240,.5);
    opacity: 1;
}
</style>

<template>
    <div :class="['tap-container', 'active']" :disabled="disabled" 
        @touchstart="touchstart"
        @touchend="touchend"
        @touchmove="touchmove"
        @mousedown="touchstart"
        @mouseup="touchend"
        @mousemove="touchmove"
        @click="onClick" :style="active ? activeStyle : ''">
        <slot></slot>
    </div>
</template>

<script>
    import { params2object } from '@/utils/url'

    export default {
        props: {
            // 是否显示触摸反馈效果
            touchEffect: {
                type: Boolean,
                default: false
            },
            // 是否禁止事件冒泡
            stop: {
                type: Boolean,
                default: false
            },
            type: {
                type: String
            },
            action: {
                type: Object
            },
            data: {
                type: [Object, String]
            },
            successMsg: {
                type: String
            },
            disabled: {
                Boolean,
                default: false
            },
            canLongPress: {
                type: Boolean,
                default: false
            },
            activeStyle: {
                type: String,
                default: 'opacity: .5'
            }
        },
        data () {
            return {
                active: false,
                lastTime: 0,
                timeout: null
            }
        },
        methods: {
            touchstart (e) {
                this.active = true
                
                this.$emit('touchstart', e)
            },
            touchmove (e) {
                this.active = false
            },
            touchend (e) {
                this.active = false
            },
            // 按钮被按下时改变透明度
            onClick (e) {
                // 是否阻止冒泡
                if (this.stop) {
                    e.stopPropagation()
                }

                this.$emit('click', e)
                this.handlerAction()

                // 埋点
                this.cardDataly('点击')
            },
            // 处理action
            handlerAction () {
                if (!this.action) return
                switch (this.type || this.action.type) {
                    case 'redirect':
                        return this.doRedirect()
                    case 'action':
                        return this.doRequest()
                    case 'request':
                        return this.doRequest()
                }
            },
            // 跳转
            doRedirect () {
                let act = Object.assign({}, this.action)
                act.data = Object.assign({},
                    params2object(this.action.data || this.action.params),
                    params2object(this.data)
                )
                // 通知父组件发生了redirect事件
                this.$emit('redirect')
                this.redirectTo(act)
            },
            // 调用
            doRequest () {
                let act = this.action

                // 兼容卡片配置中原来的params和paramType
                let data = act.data || act.params
                let serializer = act.serializer || act.paramType

                let opt = Object.assign({}, act, {
                    // 参数序列化方式
                    serializer: serializer,
                    // data是action的data（原来叫params）
                    // this.data是tap的props中的data
                    // 因为data有可能是object也有可能是字符串如：?a=1&b=2，所以要用 params2object 处理一下
                    data: Object.assign({}, params2object(data), params2object(this.data)),
                    card: this.card
                })

                this.request(opt, e => {
                    // 通知父组件发生了action事件
                    this.$emit('action', e)
                    if (e.success) {
                        let msg = this.successMsg || e.message
                        if (msg) this.toast(msg)
                    } else if (e.error) {
                        this.toast(e.error)
                    }
                })
            }
        },
        mounted () {
            this.card = (this.getContainerCard() || {}).card
            
            if (this.card && this.card.actions) {
                this.actions = this.card.actions
            }
        }
    }
</script>
