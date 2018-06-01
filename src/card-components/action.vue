<template>
    <div @click="onClick">
        <slot></slot>
    </div>
</template>

<script>
    import { params2object, urlAddParams } from '@/utils/url'

    export default {
        props: {
            name: {
                type: String,
                default: ''
            },
            params: {
                type: String,
                default: ''
            },
            appId: {
                type: [Number, String],
                default: ''
            },
            appName: {
                type: String,
                default: ''
            },
            url: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                card: null
            }
        },
        mounted () {
            this.card = (this.getContainerCard() || {}).card
            if (this.card && this.card.actions) {
                this.actions = this.card.actions
            }
        },
        methods: {
            onClick () {
                let action = this.actions[this.name]
                if (action) {
                    switch (this.type || action.type) {
                        case 'redirect':
                            return this.doRedirect(action)
                        case 'action':
                            return this.doRequest(action)
                        case 'request':
                            return this.doRequest(action)
                    }
                } else {
                    if (this.url) {
                        return this.doRedirect({
                            urlParam: this.url
                        })
                    } else if (this.appId) {
                        return this.doRedirect({})
                    }
                }
            },
            // 跳转
            doRedirect (action) {
                if (action.url && action.url.match(/^xuntong:/)) {
                    this.goApp({
                        appUrl: urlAddParams(action.url, this.params)
                    })
                } else {
                    let act = Object.assign({}, action)

                    if (this.appId) {
                        act.appId = this.appId
                    }
                    if (this.appName) {
                        act.appName = this.appName
                    }
                    act.data = Object.assign({},
                        params2object(action.params),
                        params2object(this.params)
                    )
                    this.redirectTo(act)
                }
            },
            // 调用
            doRequest (action) {
                // 兼容卡片配置中原来的params和paramType
                let data = action.params
                let serializer = action.serializer || action.paramType

                let opt = Object.assign({}, action, {
                    // 参数序列化方式
                    serializer: serializer,
                    // data是action的data（原来叫params）
                    // this.data是tap的props中的data
                    // 因为data有可能是object也有可能是字符串如：?a=1&b=2，所以要用 params2object 处理一下
                    data: Object.assign({}, params2object(data), params2object(this.params)),
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
        }
    }
</script>
