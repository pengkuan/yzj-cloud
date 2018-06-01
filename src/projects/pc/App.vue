<template>
    <div id="app" :style="`height: ${height}px;`">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import store from './store'
import router from './router'

@Component({
    store,
    router
})
export default class App extends Vue {
    @State errorMsg
    @Action getPersonInfoByBridge

    height: number = window.innerHeight

    @Watch('errorMsg')
    onError (msg: string): void {
        if (qing) {
            qing.call('toast', {
                type: 'error',
                msg: msg
            })
        } else {
            this.$toast(msg)
        }
    }

    created () {
        this.getPersonInfoByBridge()

        window.addEventListener('resize', (): void => {
            this.height = window.innerHeight
        })
    }
}
</script>

<style lang="less">
@import url('~css/layout');
@import url('~styles/common');

html, body {
    background-color: #f4f6f8;
}
#app {
    overflow: hidden;
    &::-webkit-scrollbar,
    & > * ::-webkit-scrollbar {
        display: none;
    }
}
</style>
