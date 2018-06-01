<template>
    <div class="card--head">
        <!-- 图标 -->
        <div v-if="iconData" class="icon">
            <img :src="iconData" alt="icon">
        </div>
        <div
            v-else
            class="icon iconfont"
            :class="`icon-${icon}`" :style="{ backgroundColor: iconBg }"
        ></div>
        <!-- 标题 -->
        <div class="title" v-text="title"></div>
        <!-- 红点 -->
        <div class="notice--dot" v-if="showDot"></div>
        <!-- 右上角 -->
        <div
            v-if="operationName"
            v-text="operationName"
            class="operation"
            @click="_handleClick"
        ></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class CardHead extends Vue {
    @Prop({ type: String, default: '' }) icon: string
    @Prop({ type: String, default: '' }) iconBg: string
    @Prop({ type: String, default: '' }) iconData: string
    @Prop({ type: String, default: '' }) title: string
    @Prop({ type: String, default: '' }) operationName: string
    @Prop({ type: Boolean, default: false }) showDot: boolean
    @Emit('operate') _handleClick (): void {}
}
</script>

<style lang="less" scoped>
.card--head {
    display: flex;
    align-items: center;
    position: relative;
    user-select: none;
    cursor: default;
    padding: 16px 20px;
    .icon {
        width: 18px;
        height: 18px;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 12px;
        overflow: hidden;
        margin-bottom: 1px;
        img {
            width: 100%;
        }
    }
    .title {
        // color: #0F092A;
        color: #1d1d1d;
        font-size: 18px;
        line-height: 25px;
        // font-weight: bold;
        margin-left: 7px;
        margin-right: 9px;
    }
    .notice--dot {
        width: 8px;
        height: 8px;
        background-color: #EA5950;
        border-radius: 50%;
    }
    .operation {
        font-size: 14px;
        color: #889AA4;
        line-height: 20px;
        position: absolute;
        right: 20px;
        cursor: pointer;
    }
}
</style>
