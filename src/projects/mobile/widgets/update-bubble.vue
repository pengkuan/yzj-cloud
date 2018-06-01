<style lang="less" scoped>
    @import '../../../css/variable';

    .update-bubble-container{
        .px2rem(margin-top, -8); // 抵消父容器的padding-top: 8px
        width: 107px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
    }
    .box{
        width: 107px;
        height: 28px;
        line-height: 28px;
        padding: 0;
        vertical-align: middle;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        color: #FFF;
        background:rgba(16,36,76, 0.5);
        box-shadow: 0px 2px 7px 0px rgba(18,60,90, 0.5);
        border-radius: 14px ;
        &.active{
            opacity: 0.5;
        }
        &::before{
            content: ' ';
            display: inline-block;
            width: 11px;
            height: 11px;
            background: url("../css/header/update-bubble.png") 50% 50% no-repeat;
            background-size: 100% 100%;
        }
    }

    // 安卓的文字不居中，需要调整一下
    [data-android][data-v10] {
        .box{
            line-height: 32px;
        }
    }
</style>
<template>
    <div class="update-bubble-container">
        <div v-show="!hidden" :class="{box: true, active: active}" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" :style="boxStyle">
             {{count + LANG.unreadStatusCount}} 
             <!-- scrollTop: {{scrollTop}}  -->
        </div>
    </div>
</template>
<script>
import Click from 'components/click'
import LANG from '@/lang/index'

export default {
    components: {
        Click
    },
    props: ['count', 'scrollTop', 'scrolling'],
    data () {
        return {
            LANG,
            containerHeight: 8,
            paddingTop: 4,
            active: false
        }
    },
    computed: {
        hidden: qing.isIos ? function () {
            return this.scrolling && (this.scrollTop > info.IosHeaderHeight + 4)
        } : function () {
            return false
        },
        boxStyle: qing.isIos ? function () {
            if (this.scrollTop < info.IosHeaderHeight) {
                return `position: absolute; top: ${this.paddingTop}px;`
            } else {
                return `position: absolute; top: ${this.paddingTop + this.scrollTop - info.IosHeaderHeight}px;`
            }
        } : function () {
            let topLine = info.bodyMarginTop - info.topHeight
            if (this.scrollTop <= topLine) {
                return `position: absolute; top: ${this.paddingTop}px;`
            } else {
                return `position: absolute; top: ${this.paddingTop + this.scrollTop - topLine}px;`
            }
        }
    },
    methods: {
        touchstart () {
            this.$emit('roll')
            this.active = true
        },
        touchmove () {
            this.active = false
        },
        touchend () {
            this.active = false
        }
    },
    mounted () {
        this.$el.style.height = this.containerHeight + 'px'
    },
    beforeDestroy () {
        this.bus.$off('card-update-count')
    }
}
</script>
