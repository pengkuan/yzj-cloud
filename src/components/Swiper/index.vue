<template>
    <div id="swiper-container">
        <div id="swiper-content" @touchmove="_fn">
            <div
                id="swiper-wrapper"
                :style="`transform: translate3d(${translateX}px, 0, 0)`"
                @touchstart.stop="_touchStart"
                @touchmove.stop="_touchMove"
                @touchend.stop="_touchEnd"
            >
                <slot></slot>
            </div>
        </div>

        <ul v-if="showIndicator" id="indicators">
            <li v-for="item in totalSize"
                class="indicator"
                :key="item"
                :class="item === currentPage && 'active' "
            ></li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Swiper extends Vue {
    currentPage: number = 1         // 当前页
    currentTranslateX: number = 0   // 当前滑动距离
    startPoint: number = 0          // 滑动动作起点
    delta: number = 0               // 增量：真实滑动距离
    translateX: number = 0          // 滑动距离
    totalSize: number = 1           // 总页数
    pageWidth: number = 0           // 单页宽度
    canAutoPlay: boolean = true     // 是否可以执行动画 - 控制动画
    canSlide: boolean = true        // 是否可以手动滑动
    timer: any = null               // 定时器

    @Prop({ type: Boolean, default: true }) loop: boolean
    @Prop({ type: Boolean, default: false }) autoplay: boolean
    @Prop({ type: Boolean, default: true }) showIndicator: boolean
    @Prop({ type: Number, default: 3000 }) interval: number
    @Prop({ type: Number, default: 500 }) duration: number

    get slideContainer (): HTMLElement | any {
        return this.$el.children[0].children[0]
    }

    _fn (e): void {
        e.preventDefault()
    }

    // 开始滑动 - 获取起点
    _touchStart (e: TouchEvent): void {
        if (this.canSlide) {
            if (this.autoplay) {
                this._stopAutoSlide()
            }
            this.startPoint = e.changedTouches[0].pageX
            this.currentTranslateX = this.translateX
        }
    }

    // 正在滑动 - 计算滑动距离
    _touchMove (e: TouchEvent): void {
        if (this.canSlide && this.startPoint !== 0) {
            if (this.autoplay) {
                this._stopAutoSlide()
            }
            this.delta = e.changedTouches[0].pageX - this.startPoint
            this.translateX = this.delta + this.currentTranslateX
        }
    }

    // 滑动结束 - 正式计算切换页面
    _touchEnd (): void {
        if (this.canSlide && this.startPoint !== 0) {
            if (this.autoplay) {
                this._stopAutoSlide()
            }
            let _translateX = this.translateX
            _translateX += this.delta > 0 ? this.pageWidth * 0.3 : this.pageWidth * -0.3
            this.currentPage = Math.round(_translateX / this.pageWidth) * -1
            if (!this.loop) {
                this.currentPage++
            }
            this._handleSlide('touch')
        }
    }

    // 处理滑动，换页
    _handleSlide (type?: string): void {
        this.canSlide = false
        this.slideContainer.style.transition = this.duration + 'ms'
        if (!this.loop) {
            this.translateX = (this.currentPage - 1) * -1 * this.pageWidth
        } else {
            this.translateX = this.currentPage * -1 * this.pageWidth
        }
        this.delta = 0
        this.startPoint = 0

        if (this.autoplay) {
            this._autoSlide()
        }

        // 最后一页替换至第一页
        if (this.currentPage - 1 >= this.totalSize) {
            if (!this.loop) {
                this.currentPage = this.totalSize
                if (this.autoplay && type !== 'touch') {
                    this.currentPage = 1
                }
                this.translateX = (this.currentPage - 1) * -1 * this.pageWidth
            } else {
                this.currentPage = 1
                setTimeout(() => {
                    this.slideContainer.style.transition = '0s'
                    this.translateX = this.currentPage * -1 * this.pageWidth
                }, this.duration)
            }
        }
        // 第一页替换至最后一页
        if (this.currentPage <= 0) {
            if (!this.loop) {
                this.currentPage = 1
                if (this.autoplay && type !== 'touch') {
                    this.currentPage = this.totalSize
                }
                this.translateX = (this.currentPage - 1) * -1 * this.pageWidth
            } else {
                this.currentPage = this.totalSize
                setTimeout(() => {
                    this.slideContainer.style.transition = '0s'
                    this.translateX = this.currentPage * -1 * this.pageWidth
                }, this.duration)
            }
        }
        this.$emit('slide-end', this.currentPage, this.totalSize)

        setTimeout(() => {
            this.canAutoPlay = true
            this.canSlide = true
        }, this.duration)
    }

    // 自动轮播
    _autoSlide (): void {
        this.timer = setTimeout(() => {
            if (this.canAutoPlay) {
                this.currentPage++
                if (!this.loop) {
                    this.currentPage = this.currentPage - 1 >= this.totalSize ? 1 : this.currentPage
                }
                this._handleSlide()
            } else {
                window.clearTimeout(this.timer)
            }
        }, this.interval)
    }

    // 暂停自动轮播
    _stopAutoSlide (): void {
        this.canAutoPlay = false
        window.clearTimeout(this.timer)
    }

    // 初始化
    _initSwiper (): void {
        const items = this.slideContainer.children
        this.totalSize = items.length
        this.pageWidth = this.slideContainer.clientWidth
        // 开启无限轮播
        if (this.loop && items.length) {
            const copyFirstSlider = items[0].cloneNode(true)
            const copyLastSlider = items[this.totalSize - 1].cloneNode(true)

            this.slideContainer.insertBefore(copyLastSlider, items[0])
            this.slideContainer.appendChild(copyFirstSlider)
            this.translateX = this.pageWidth * -1
        }
    }

    // 翻页 - 下一页
    next (): void {
        if (this.canSlide) {
            this.$emit('slide-start', this.currentPage)
            if (this.autoplay) {
                this._stopAutoSlide()
            }
            this.currentPage++
            this._handleSlide()
        }
    }

    // 翻页 - 上一页
    prev (): void {
        if (this.canSlide) {
            this.$emit('slide-start', this.currentPage)
            if (this.autoplay) {
                this._stopAutoSlide()
            }
            this.currentPage--
            this._handleSlide()
        }
    }

    // 翻页 - 滑到指定页
    slideTo (page: number): void {
        if (page > this.totalSize || page <= 0) {
            return
        }
        if (this.canSlide) {
            if (this.autoplay) {
                this._stopAutoSlide()
            }
            this.currentPage = page
            this._handleSlide()
        }
    }

    updated () {
        // 移除 slot 元素触发重置
        if (this.$children.length !== this.totalSize) {
            const slideContainerChildList = this.slideContainer.children
            const currentFirstChildCopy = slideContainerChildList[1].cloneNode(true)
            const currentLastChild = slideContainerChildList[slideContainerChildList.length - 1]
            this.slideContainer.removeChild(currentLastChild)
            this.slideContainer.appendChild(currentFirstChildCopy)
            this.totalSize = this.$children.length
            this.$emit('slide-size-change', this.$children.length)
        }
    }

    mounted () {
        // slot 渲染完成之后
        this.$nextTick(() => {
            this._initSwiper()
            if (this.autoplay) {
                this._autoSlide()
            }
        })
    }
}
</script>

<style lang="less">
#swiper-container {
    position: relative;
    width: 100%;
    height: 100%;

    #swiper-content {
        width: 100%;
        height: 100%;
        // overflow: hidden;
        #swiper-wrapper{
            position: relative;
            display: flex;
            height: 100%;
            > * {
                width: 100%;
                height: 100%;
                flex-shrink: 0;
            }
        }
    }

    #indicators {
        position: absolute;
        right: 0;
        bottom: -5px;
        left: 0;
        display: flex;
        justify-content: center;
        .indicator {
            display: inline-block;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            margin-right: 5px;
            background-color: #e6e8ee;
            &:last-child {
                margin-right: 0;
            }
            &.active {
                background-color: #3cbaff;
            }
        }
    }
}
</style>
