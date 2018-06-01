<style lang="less" scoped>
    @import '../css/variable';

    [data-v10] {
        .card-button{
            color: #768893;
            .px2rem(height, 35);
            .px2rem(line-height, 35);
        }
    }

    [data-v10][data-android] {
        .card-button{
            .px2rem(line-height, 39);
        }
    }
    
    .card-button{
        .card-button-fontsize();
        .px2rem(height, 40);
        .px2rem(line-height, 40);
        text-align: center;
        color: #1D1D1D;
        cursor: pointer;

        &.disabled{
            color: #A4A8AB;
        }
    }
</style>

<template>
    <click :touch-effect="true" :class="{'card-button': true, 'disabled': disabled}"
        :action="action"
        :type="type"
        :data="data || params"
        :successMsg="successMsg"
        :disabled="disabled"
        :stop="stop"
        active-style="none"
        @click="onTap"
        @redirect="onRedirect"
        @action="onAction" >
        <slot></slot>
    </click>
</template>

<script>
    import Click from '../components/click'

    export default {
        props: ['type', 'action', 'params', 'data', 'successMsg', 'disabled', 'stop'],
        components: {
            Click
        },
        methods: {
            onTap () {
                this.$emit('tap')
                this.$emit('click')
            },
            onRedirect () {
                this.$emit('redirect')
            },
            onAction (e) {
                this.$emit('action', e)
            }
        }
    }
</script>
