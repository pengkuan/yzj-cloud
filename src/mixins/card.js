import Vue from 'vue'
import CardComponents from '../card-components'

export default {
    components: {
        ...CardComponents
    },
    data () {
        return {
            info
        }
    },
    computed: {
        name () {
            return (this.card || {}).name || ''
        }
    },
    methods: {
        _emitContainerEvent (eventName, e) {
            this.bus.$emit(`card_${this.name}_container_${eventName}`, e)
        },
        // 重新请求卡片数据
        reloadData () {
            this.$emit('request', this.card)
        },
        // 卡片请求数据，自动带上cardId和cardHost
        request (opt, callback) {
            let card = this.card || {}

            opt.headers = Object.assign({
                'X-Requested-cardId': card.id || '',
                'X-Requested-cardHost': card.thhost || ''
            }, opt.headers)

            opt.card = card

            return Vue.prototype.request.call(this, opt, callback)
        },
        // 设置标题
        setTitle (title) {
            this._emitContainerEvent('setTitle', title)
        },
        // 设置卡片高度
        setHeight (height) {
            this._emitContainerEvent('setHeight', height)
        },
        // 设置为最小高度
        setMiniHeight () {
            this.setHeight(70)
        },
        // 设置为正常高度
        setNormalHeight () {
            this.setHeight('default')
        },
        // 清除红点
        clearNotify () {
            this._emitContainerEvent('clearNotify')
        },
        // 显示红点
        showNotify () {
            this._emitContainerEvent('showNotify')
        },
        // 显示遮罩
        showCover (opt) {
            this._emitContainerEvent('showCover', opt)
        },
        // 隐藏卡片（放回设置页中）
        hideCard () {
            if (!this.name) return
            this.$emit('removeCard', this.name)
        },
        // 判断是否显示过冷启动
        showedColdBoot () {
            if (!this.name) return
            return !!this.userStorage.getItem('showedColdBoot_' + this.name)
        },
        // 标记显示过冷启动
        markShowedColdBoot () {
            if (!this.name) return
            return !!this.userStorage.setItem('showedColdBoot_' + this.name, true)
        }
    },
    watch: {
        coldBootConfig (val) {
            let cfg = Object.assign({}, val, {
                hidden: () => {
                    this.markShowedColdBoot()
                }
            })
            this._emitContainerEvent('setColdBootConfig', cfg)
        }
    },
    mounted () {
        let cfg = Object.assign({}, this.coldBootConfig, {
            hidden: () => {
                this.markShowedColdBoot()
            }
        })
        this._emitContainerEvent('setColdBootConfig', cfg)
    }
}
