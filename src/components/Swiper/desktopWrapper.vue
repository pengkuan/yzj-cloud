<template>
    <div class="swiper-desktop_wrapper" :data-swiper-size="totalSize">
        <swiper
            ref="swiper"
            :loop="loop"
            :autoplay="autoplay"
            :showIndicator="false"
            :interval="interval"
            :duration="duration"
            @slide-end="_slideEnd"
            @slide-start="_slideStart"
            @slide-size-change="_slideSizeChange"
        >
            <slot></slot>
        </swiper>

        <div
            v-if="isShowIndicators"
            class="indicator_button button_prev"
            :class="indicatorPosition"
            @click="_prevPage"
        ></div>
        <div
            v-if="isShowIndicators"
            class="indicator_button button_next"
            :class="indicatorPosition"
            @click="_nextPage"
        ></div>

        <ul
            v-if="showIndicator && isShowIndicators && isIndicatorsDots"
            class="indicators"
            :class="[ indicatorPosition,  indicatorTheme ]"
        >
            <li v-for="item in totalSize"
                class="indicator"
                :key="item"
                :class="item === currentPage && 'active' "
                @click="setPage(item)"
            ></li>
        </ul>

        <div
            v-if="showIndicator && isShowIndicators && !isIndicatorsDots"
            class="indicators line"
            :class="[ indicatorPosition,  indicatorTheme ]"
        >
            <div class="wrap">
                <span
                    v-for="item in totalSize"
                    class="bullet"
                    :class="item === currentPage && 'active' "
                    :key="item"
                ></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Swiper from './index.vue'

@Component({
    components: { Swiper }
})
export default class DesktopWrapper extends Vue {
    @Prop({ type: Boolean, default: true }) loop: boolean
    @Prop({ type: Boolean, default: false }) autoplay: boolean
    @Prop({ type: Number, default: 3000 }) interval: number
    @Prop({ type: Number, default: 500 }) duration: number
    @Prop({ type: Boolean, default: true }) showIndicator: boolean
    @Prop({ type: String, default: 'inline' }) indicatorPosition: string
    @Prop({ type: String, default: 'theme-default' }) indicatorTheme: string

    currentPage: number = 0
    totalSize: number = 0

    get isShowIndicators () {
        return this.totalSize >= 2
    }

    get isIndicatorsDots () {
        return this.totalSize <= 5
    }

    _nextPage (): void {
        (this.$refs.swiper as Swiper).next()
    }

    _prevPage (): void {
        (this.$refs.swiper as Swiper).prev()
    }

    _slideEnd (currentPage: number, totalSize: number): void {
        this.currentPage = currentPage
        this.totalSize = totalSize
        this.$emit('slide-change-end', currentPage)
    }

    _slideStart (currentPage: number): void {
        this.$emit('slide-change-start', currentPage)
    }

    _slideSizeChange (totalSize: number): void {
        this.totalSize = totalSize
    }

    setPage (page: number): void {
        (this.$refs.swiper as Swiper).slideTo(page)
    }

    mounted () {
        // slot 渲染完成之后
        this.$nextTick(() => {
            this.currentPage = (this.$refs.swiper as Swiper).currentPage
            this.totalSize = (this.$refs.swiper as Swiper).totalSize
        })
    }
}
</script>

<style lang="less" scoped>
.swiper-desktop_wrapper {

    .indicator_button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #F1F4F8;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: background-color .5s;
        &:before {
            content: '';
            width: 10px;
            height: 10px;
            border-right: 1px solid #768893;
            border-top: 1px solid #768893;
            transform-origin: 5px 5px 0;
        }
        &:hover {
            background-color: #D7DEE3;
        }
        &:active {
            background-color: #c9cfd4;
        }
        &.inline {
            bottom: 13px;
        }
        &.outline {
            bottom: 26px;
        }
    }
    .button_prev {
        left: 15px;
        &:before {
            transform: rotate(-135deg);
            margin-right: -5px;
        }
    }
    .button_next {
        right: 15px;
        &:before {
            transform: rotate(45deg);
            margin-right: 5px;
        }
    }

    .indicators {
        display: flex;
        justify-content: center;
        position: absolute;
        right: 0;
        left: 0;
        .indicator {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 5px;
            cursor: pointer;
            &:last-child {
                margin-right: 0;
            }
        }
        &.inline {
            bottom: 65px;
        }
        &.outline {
            bottom: 8px;
        }
        &.theme-inverse {
            .indicator {
                background-color: rgba(255, 255, 255, .7);
                &.active {
                    background-color: #fff;
                }
            }
        }
        &.theme-default {
            .indicator {
                background-color: #e6e8ee;
                &.active {
                    background-color: #4B81F0;
                }
            }
        }
        &.line {
            height: 8px;
        }
        .wrap {
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            width: 68px;
            height: 8px;
            border-radius: 40px;
            background-color: #e6e8ee;
            .bullet {
                flex: 1;
                &.active {
                    flex-grow: 0;
                    flex-shrink: 0;
                    flex-basis: 8px;
                    width: 8px;
                    height: 8px;
                    border: none;
                    border-radius: 50%;
                    background-color: #4B81F0;
                }
            }
        }
    }
}

[data-mouse='none'] {
    .indicator_button {
        opacity: 0;
    }
}
[data-mouse='enter'] {
    .indicator_button {
        animation: fadeIn .5s ease-in-out forwards;
    }
}
[data-mouse='leave'] {
    .indicator_button {
        animation: fadeOut .5s ease-in-out forwards;
    }
}

@keyframes fadeIn {
    from { opacity: 0 }
    to { opacity: 1 }
}
@keyframes fadeOut {
    from { opacity: 1 }
    to { opacity: 0 }
}
</style>
