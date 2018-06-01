<template>
    <div id="greetings-area" :class="{'single-line': !greetingText.isDouble}">
        <div class="text" v-html="greetingText.text" :style="customStyle"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component
export default class Greetings extends Vue {
    @Getter greetingText
    @Action getGreetings
    @Prop({ type: String, default: '' }) customStyle: string

    created () {
        this.getGreetings()
    }
}
</script>

<style lang="less" scoped>
#greetings-area {
    height: 90px;
    padding: 20px 0;
    // margin: 0 20px;
    border-bottom: 1px solid #D7DEE3;
    display: flex;
    align-items: center;
    &.single-line {
        .text {
            font-size: 24px;
            line-height: 33px;
        }
    }
    .text {
        color: #1D1D1D;
        font-size: 18px;
        font-weight: bold;
        line-height: 25px;
        width: 770px;
        margin: 0 auto;
        animation: fadeIn .75s ease-in-out;
    }
}
@keyframes fadeIn {
    from { opacity: 0 }
    to { opacity: 1 }
}
</style>
