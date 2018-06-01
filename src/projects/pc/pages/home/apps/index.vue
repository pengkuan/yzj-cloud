<template>
    <div id="apps-area">
        <app-item
            v-for="app in commonDeskApp"
            class="margin-right-md"
            :name="app.name"
            :logoUrl="app.icon"
            :key="app.appName"
            @click="_goto(app.mcloudAppId)"
        ></app-item>

        <app-item
            name="更多"
            iconBg="#D7DEE3"
            icon="more"
            @click.stop="_pop"
        ></app-item>

        <pop-apps
            v-show="isPopShow"
            :popTop="popTop"
            :popLeft="popLeft"
            :direction="popDirection"
            :apps="allDeskApp.apps"
            @triggerApp="_goto"
        ></pop-apps>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Action, State, Getter } from 'vuex-class'
import AppItem from './item.vue'
import PopApps from './popApps.vue'

@Component({
    components: {
        AppItem,
        PopApps
    }
})
export default class Apps extends Vue {
    @State allDeskApp
    @Getter commonDeskApp
    @Action getAllDeskApp

    isPopShow: boolean = false
    popTop: number = 0
    popLeft: number = 0
    popDirection: string = 'left'

    @Watch('isPopShow')
    onPopShowChange (show: boolean): void {
        if (show) {
            document.addEventListener('click', this._handlePopHdie)
        } else {
            document.removeEventListener('click', this._handlePopHdie)
        }
    }

    /**
     * 隐藏弹层
     */
    _handlePopHdie (): void {
        this.isPopShow = false
    }

    /**
     * 唤起弹层
     * @param e {MouseEvent}
     */
    _pop (e: MouseEvent): void {
        if (this.isPopShow) {
            this.isPopShow = false
            return
        }
        const winWidth = window.innerWidth
        const tar = e.target as HTMLElement
        this.popTop = tar.offsetTop - 15
        if (winWidth - tar.offsetLeft >= 415) {
            this.popLeft = tar.offsetLeft - 365 + 425
            this.popDirection = 'right'
        } else {
            this.popLeft = tar.offsetLeft - 365
            this.popDirection = 'left'
        }
        this.isPopShow = true
    }

    /**
     * 跳转应用
     * @param appId {String} 应用 id
     */
    _goto (appId: string): void {
        if (this.isPopShow) {
            this._handlePopHdie()
        }
        window.location.href = `cloudhub://lightapp?appid=${appId}`
    }

    created () {
        this.getAllDeskApp()
    }
}
</script>

<style lang="less" scoped>
#apps-area {
    display: flex;

    .margin-right-md {
        margin-right: 20px
    }
}
</style>
