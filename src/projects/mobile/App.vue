<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script lang="ts">
import 'iconfont'
import { Component, Vue } from 'vue-property-decorator'
import store from './store'
import router from './router'

@Component({
    store,
    router
})
export default class App extends Vue {
}
</script>

<style lang="less">
@import "../../css/base.css";
@import "../../css/layout.less";

#app {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
}
</style>
