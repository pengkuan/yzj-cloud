<template>
    <div class="toast__container">
        <div class="content animated fadeIn">
            <img v-if="showIcon" :src="icon" alt="">
            <span :class="{mt: icon !== ''}" v-html="text" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

type FN = () => void

interface argsObject {
    timeout?: number,
    fn?: FN,
    args?: Array<any>,
    scope?: object,
}

@Component
export default class YToast extends Vue {
    @Prop({ type: String, default: '' }) icon: string
    @Prop({ type: String, default: '' }) text: string
    @Prop({ type: Number, default: 2200 }) duration: number
    @Prop({ type: Boolean, default: false }) showIcon: boolean
    @Prop({ type: Function, default: () => null }) onClose: () => any

    /**
     * 关闭其他窗口
     */
    closeOther (): void {
        const el = document.querySelector('.toast__container')
        if (el) {
            el.parentElement.removeChild(el)
        }
    }

    /**
     * 移除组件
     */
    destroy (): void {
        if (this.$el && this.$el.parentElement) {
            this.$el.parentElement.removeChild(this.$el)
        }
        this.$emit('close')
        this.onClose()
    }

    /**
     * 异步控制
     * @param {Number}      timeout 时间（毫秒）
     * @param {Function}    fn      执行函数
     * @param {Array}       args    执行函数的参数
     * @param {Any}         scope   执行函数的作用域
     */
    syncApply ({ timeout = 0, fn, args = [], scope = this }: argsObject): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    resolve(fn.apply(scope, args))
                }, timeout)
            } catch (err) {
                reject(err)
            }
        })
    }

    created () {
        this.closeOther()
    }

    async mounted () {
        try {
            // 执行淡出动画
            await this.syncApply({
                timeout: this.duration,
                fn: this.$el.children[0].classList.add,
                args: ['fadeOut'],
                scope: this.$el.children[0].classList
            })
            // 移除元素
            await this.syncApply({
                timeout: 500,
                fn: this.destroy
            })
        } catch (err) {
            throw err
        }
    }
}
</script>

<style lang="less" scoped>
.toast__container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        overflow: hidden;
        color: #fff;
        background-color: rgba(18, 24, 45, .8);
        min-width: 100px;
        max-width: 200px;
        border-radius: 5px;
        font-size: 12px;
        padding: 10px;
        img {
            width: 40px;
        }
        span {
            word-wrap: break-word;
            max-width: 160px;
            &.mt {
                margin-top: 10px;
            }
        }
    }
}

.animated {
    animation-duration: .5s;
    animation-fill-mode: both;
}

.fadeIn {
    animation-name: fadeIn;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.fadeOut {
    animation-name: fadeOut;
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>
