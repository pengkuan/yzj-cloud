<style lang="less" scoped>
    @import '../../../css/variable';

    .update-bubble-container{
        width: 107px;
        margin-left: auto;
        margin-right: auto;
    }
    .box{
        width: 107px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        background: linear-gradient(to bottom,  rgba(29,29,29,0.15) 0%,rgba(29,29,29,0.3) 100%);
        color: #FFF;
        opacity: 0.8;
        margin-left: auto;
        margin-right: auto;
        border-radius: 14px;
        box-shadow: 0 0 1px #FFFFFF;
        &::before{
            content: ' ';
            display: inline-block;
            width: 11px;
            height: 11px;
            background: url("../css/header/update-bubble.png") 50% 50% no-repeat;
            background-size: 100% 100%;
        }
    }
</style>
<template>
    <div class="update-bubble-container" v-show="count > 0">
        <click class="box" @click="emit">
            {{count + LANG.unreadStatusCount}}
        </click>
    </div>
</template>
<script>
import Click from 'components/click'
import LANG from '@/lang/index'

export default {
    components: {
        Click
    },
    props: ['count'],
    data () {
        return {
            LANG
        }
    },
    methods: {
        emit () {
            this.bus.$emit('clickUpdateBubble')
        }
    },
    beforeDestroy () {
        this.bus.$off('card-update-count')
    }
}
</script>
