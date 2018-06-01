<template>
    <div class="app-item">
        <div v-if="logoUrl" class="icon" @click.stop="_handleClick">
            <img v-lazy="logoUrl" :alt="name" >
        </div>

        <div
            v-else
            class="icon iconfont"
            :class="`icon-${icon}`"
            :style="{backgroundColor: iconBg}"
            @click.stop="_handleClick"
        ></div>

        <div class="name" v-text="name"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class AppItem extends Vue {
    @Prop({ type: String, default: '' }) name: string
    @Prop({ type: String, default: '' }) icon: string
    @Prop({ type: String, default: '' }) iconBg: string
    @Prop({ type: String, default: '' }) logoUrl: string
    @Emit('click') _handleClick (): void {}
}
</script>

<style lang="less" scoped>
.app-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
    .icon {
        width: 44px;
        height: 44px;
        border-radius: 5px;
        color: #fff;
        font-size: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        cursor: pointer;
        &.icon-more {
            color: #ACBEC7;
        }
        img {
            width: 100%;
        }
        &:hover {
            &::after {
                content: '';
                position: absolute;
                width: 44px;
                height: 44px;
                border-radius: 5px;
                background-color: rgba(255, 255, 255, .3);
            }
        }
        &:active {
            &::after {
                content: '';
                position: absolute;
                width: 44px;
                height: 44px;
                border-radius: 5px;
                background-color: rgba(0, 0, 0, .08);
            }
        }
    }
    .name {
        width: 70px;
        text-align: center;
        font-size: 14px;
        margin-top: 6px;
        color: #1D1D1D;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: default;
    }
}
</style>
