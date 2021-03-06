<style lang="less" scoped>
@import '../css/variable.less';
.swiper {
    position: relative;
    width: 100%;
    height: 100%;
    .swiper-wrap {
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
        transition: all 0ms ease;
        &>*{
            flex-shrink: 0;
            width: 100%;
        }
    }
    .swiper-pagination {
        position: absolute;
        left: 0;
        // .px2rem(bottom, 47);
        width: 100%;
        text-align: center;
        font-size: 0;
        line-height: 0;
        .bullet {
            display: inline-block;
            vertical-align: middle;
            .px2rem(width, 4);
            .px2rem(height, 4);
            border-radius: 50%;
            background-color: #E6E8EE;
            transition: all .5s ease;
            &.active {
                background-color: #3BBAFF;
            }
            &:not(last-child) {
                .px2rem(margin-right, 4);
            }
        }
    }
    .swiper-pagination-big {
        position: absolute;
        // .px2rem(bottom, -4);
        .px2rem(height, 4);
        // .px2rem(margin-top, -50);
        width: 100%;
        font-size: 0;
        line-height: 0;
        text-align: center;
        .wrap {
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            .px2rem(width, 60);
            .px2rem(height, 4);
            .px2rem(border-radius, 40);
            background-color: #e6e8ee;
            .bullet {
                flex: 1;
                &.active {
                    flex-grow: 0;
                    flex-shrink: 0;
                    .px2rem(flex-basis, 4);
                    .px2rem(width, 4);
                    .px2rem(height, 4);
                    border: none;
                    border-radius: 50%;
                    background-color: #3bbaff;
                }
            }
        }
    }
}

[data-v10] {
    .swiper {
        overflow: visible;
        .swiper-pagination {
            .px2rem(bottom, 0);
            .px2rem(height, 2);
            .bullet {
                .px2rem(width, 7);
                .px2rem(height, 2);
                border-radius: 1px;
                &.active {
                    background-color: #4B81F0;
                }
            }
        }
        .swiper-pagination-big {
            .px2rem(bottom, 0);
            .px2rem(height, 2);
            .wrap {
                .px2rem(width, 60);
                .px2rem(height, 2);
                .bullet {
                    &.active {
                        .px2rem(height, 2);
                        position: relative;
                        &::before{
                            content: ' ';
                            display: block;
                            width: 7px;
                            height: 100%;
                            position: absolute;
                            left: -1.5px;
                            top: 0;
                            border-radius: 1px;
                            background-color: #4B81F0;
                        }
                    }
                }
            }
        }
    }
}
</style>

<template>
    <div class="swiper" @touchstart.stop="_onTouchStart" @mousedown.stop="_onTouchStart" @wheel.stop="_onWheel">
        <div class="swiper-wrap" ref='swiperWrap' :style="{
                    'transform' : 'translate3d(' + translateX + 'px,' + translateY + 'px, 0)',
                    'transition-duration': transitionDuration + 'ms'
                }" @transitionend="_onTransitionEnd">
            <slot></slot>
        </div>
        <template v-if="(totalPage > 1) && paginationVisible">
            <div class="swiper-pagination" :style="paginationStyle" v-if="totalPage <= paginationMax">
                <span class="bullet" :class="{'active': index===currentPage}" v-for="index in totalPage" :key="index">
                </span>
            </div>
            <div class="swiper-pagination-big" :style="paginationStyle" v-else>
                <!--<div class="line"></div>-->
                <div class="wrap">
                    <span v-for="index in totalPage" class="bullet" :class="{'active': index===currentPage}" :key="index"></span>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
const VERTICAL = 'vertical'
const HORIZONTAL = 'horizontal'

export default {
    props: {
        direction: {
            type: String,
            default: HORIZONTAL,
            validator: (value) => [VERTICAL, HORIZONTAL].indexOf(value) > -1
        },
        mousewheelControl: {
            type: Boolean,
            default: true
        },
        performanceMode: {
            type: Boolean,
            default: false
        },
        paginationVisible: {
            type: Boolean,
            default: true
        },
        loop: {
            type: Boolean,
            default: false
        },
        speed: {
            type: Number,
            default: 500
        },
        totalPage: {
            type: Number,
            default: 1,
            required: true
        },
        loadedPage: {
            type: Number,
            required: true
        },
        paginationMax: {
            type: Number,
            default: Number.MAX_SAFE_INTEGER
        },
        autoplay: {
            type: Boolean,
            default: false
        },
        interval: {
            type: Number,
            default: 3000
        },
        paginationStyle: {
            type: String,
            default: ''
        }
    },
    data: function () {
        return {
            currentPage: 1,
            lastPage: 1,
            translateX: 0,
            translateY: 0,
            startTranslate: 0,
            delta: 0,
            dragging: false,
            startPos: null,
            relatedStartPos: null,
            transitioning: false,
            slideEls: [],
            translateOffset: 0,
            transitionDuration: 0,
            pageDistance: 0,
            raf: null,
            isFirstMove: false,
            isVerticalMoving: false
        }
    },
    watch: {
        totalPage (val1) {  // 出现页面总数小于当前页码时  页码减一
            if (val1 < this.currentPage) {
                this.currentPage -= 1
                this.setPage(this.currentPage, true)
            }
        }
    },
    mounted: function () {
        this._onTouchMove = this._onTouchMove.bind(this)
        this._onTouchEnd = this._onTouchEnd.bind(this)
        
        // 自动播放间隔，最小500毫秒
        let interval = Math.max(this.interval, 500)
        
        this.$nextTick(() => {
            this.initDatas()
            if (this.totalPage > 1) {
                this.setPage(this.currentPage, this.loop)
                // 自动轮播
                if (this.autoplay) {
                    setInterval(() => {
                        // 只要不是拖拽中，就自动播放
                        if (!this.dragging) {
                            this._autoPlay()
                        }
                    }, interval)
                }
            }
        })
    },
    methods: {
        // 自动轮播
        _autoPlay: function () {
            var page = this.currentPage
            if (page < this.loadedPage) {
                this.setPage(page + 1)
            } else {
                this.setPage(1)
            }
        },
        next: function () {
            var page = this.currentPage
            if (page < this.loadedPage || this.loop) {
                this.setPage(page + 1)
            } else {
                this._revert()
            }
        },
        prev: function () {
            var page = this.currentPage
            if (page > 1 || this.loop) {
                this.setPage(page - 1)
            } else {
                this._revert()
            }
        },
        setPage: function (page, noAnimation) {
            var self = this
            this.lastPage = this.currentPage
            if (page === 0) {
                this.currentPage = this.loadedPage
            } else if (page === this.loadedPage + 1) {
                this.currentPage = 1
            } else {
                this.currentPage = page
            }

            if (this.loop) {
                if (this.delta === 0) {
                    this._setTranslate(self._getTranslateOfPage(this.lastPage))
                }
                setTimeout(function () {
                    self._setTranslate(self._getTranslateOfPage(page))
                    if (noAnimation) {
                        return
                    }
                    self._onTransitionStart()
                }, 0)
            } else {
                this._setTranslate(this._getTranslateOfPage(page))
                if (noAnimation) {
                    return
                }
                this._onTransitionStart()
            }
        },
        isHorizontal: function () {
            return this.direction === HORIZONTAL
        },
        isVertical: function () {
            return this.direction === VERTICAL
        },
        _onTouchStart: function (e) {
            e.stopPropagation()
            this.isFirstMove = false
            this.isVerticalMoving = false
            if (this.totalPage < 2) {
                return
            }
            this.startPos = this._getTouchPos(e)
            this.relatedStartPos = this._getRelatedTouchPos(e)
            this.delta = 0
            this.startTranslate = this._getTranslateOfPage(this.currentPage)
            this.startTime = new Date().getTime()
            this.dragging = true
            this.transitionDuration = 0

            this.$el.addEventListener('touchmove', this._onTouchMove, false)
            this.$el.addEventListener('touchend', this._onTouchEnd, false)
            this.$el.addEventListener('mousemove', this._onTouchMove, false)
            this.$el.addEventListener('mouseup', this._onTouchEnd, false)
            this.raf = window.requestAnimationFrame(() => {
                this._updateTranslate()
            })
        },
        _updateTranslate: function () {
            this._setTranslate(this.startTranslate + this.delta)
            if (!this.dragging) {
                return
            }
            this.raf = window.requestAnimationFrame(() => {
                this._updateTranslate()
            })
        },
        _onTouchMove: function (e) {
            e.stopPropagation()
            let delta = this._getTouchPos(e) - this.startPos
            // 如果与swiper垂直的方向上滑动距离 > swiper 方向，不触发swiper
            if (!this.isFirstMove) {
                this.isFirstMove = true
                const relatedDelta = this._getRelatedTouchPos(e) - this.relatedStartPos
                // 垂直方向操作
                if (Math.abs(delta) <= Math.abs(relatedDelta)) {
                    this.isVerticalMoving = true
                }
            }
            if (this.isVerticalMoving) {
                this.transitioning = false
                this.transitionDuration = 500
                this.delta = 0
                return
            }
            this.delta = delta

            if (!this.performanceMode) {
                // this._setTranslate(this.startTranslate + this.delta)
                this.$emit('slider-move', this._getTranslate())
            }

            if (this.isVertical() || (this.isHorizontal() && Math.abs(this.delta) > 0)) {
                e.preventDefault()
            }
        },
        _onTouchEnd: function (e) {
            e.stopPropagation()
            this.dragging = false
            window.cancelAnimationFrame(this.raf)
            this.raf = null
            this.transitionDuration = this.speed
            const isQuickAction = new Date().getTime() - this.startTime < 1000
            if (this.delta < -100 || (isQuickAction && this.delta < -35)) {
                this.next()
                this.cardDataly('左滑')
            } else if (this.delta > 100 || (isQuickAction && this.delta > 35)) {
                this.prev()
                this.cardDataly('右滑')
            } else {
                this._revert()
            }

            this.$el.removeEventListener('touchmove', this._onTouchMove)
            this.$el.removeEventListener('touchend', this._onTouchEnd)
            this.$el.removeEventListener('mousemove', this._onTouchMove)
            this.$el.removeEventListener('mouseup', this._onTouchEnd)
        },
        _onWheel: function (e) {
            e.stopPropagation()
            if (this.mousewheelControl) {
                if (!this.transitioning) {
                    if (e.deltaY > 0) {
                        this.next()
                    } else {
                        this.prev()
                    }
                }
                if (this._isPageChanged()) {
                    e.preventDefault()
                }
            }
        },
        _revert: function () {
            this.setPage(this.currentPage)
        },
        _getTouchPos: function (e) {
            var key = this.isHorizontal() ? 'pageX' : 'pageY'
            return e.changedTouches ? e.changedTouches[0][key] : e[key]
        },
        _getRelatedTouchPos: function (e) {
            var key = this.isHorizontal() ? 'pageY' : 'pageX'
            return e.changedTouches ? e.changedTouches[0][key] : e[key]
        },
        _onTransitionStart: function () {
            this.transitioning = true
            this.transitionDuration = this.speed
            if (this._isPageChanged()) {
                this.$emit('slide-change-start', this.currentPage)
            } else {
                this.$emit('slide-revert-start', this.currentPage)
            }
        },
        _onTransitionEnd: function () {
            this.transitioning = false
            this.transitionDuration = 0
            this.delta = 0
            if (this._isPageChanged()) {
                this.$emit('slide-change-end', this.currentPage)
            } else {
                this.$emit('slide-revert-end', this.currentPage)
            }
        },
        _isPageChanged: function () {
            return this.lastPage !== this.currentPage
        },
        _setTranslate: function (value) {
            var translateName = this.isHorizontal() ? 'translateX' : 'translateY'
            this[translateName] = value
        },
        _getTranslate: function () {
            var translateName = this.isHorizontal() ? 'translateX' : 'translateY'
            return this[translateName]
        },
        _getTranslateOfPage: function (page) {
            if (page === 0) {
                return 0
            }
            return -(page - 1) * this.pageDistance + this.translateOffset
        },
        initDatas: function () {
            const propName = this.isHorizontal() ? 'clientWidth' : 'clientHeight'
            const swiperRootEl = this.$refs.swiperWrap
            this.pageDistance = swiperRootEl.firstElementChild[propName]
            if (this.totalPage < 2) {
                return
            }
            if (this.loop) {
                const duplicateFirstNode = swiperRootEl.firstElementChild.cloneNode(true)
                const duplicateLastNode = swiperRootEl.lastElementChild.cloneNode(true)
                swiperRootEl.insertBefore(duplicateLastNode, swiperRootEl.firstElementChild)
                swiperRootEl.appendChild(duplicateFirstNode)
                this.translateOffset = -this.pageDistance
            }
        }
    }
}
</script>
