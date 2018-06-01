<template>
    <div id="home-container">
        <greetings class="drag" :customStyle="limitStyle"></greetings>

        <div
            v-scroll-hover
            ref="main"
            id="content-main"
            :style="`height: ${height}px;`"
        >
            <div id="content-wrapper" :style="limitStyle">
                <apps class="margin-tb-mx"></apps>
                <cards></cards>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Greetings from './greetings.vue'
import Apps from './apps/index.vue'
import Cards from './cards/index.vue'
import ScrollBar from 'smooth-scrollbar'
import OverScroll from 'smooth-scrollbar/plugins/overscroll'
import VueLazyload from 'vue-lazyload'
import 'iconfont'
import 'styles/more/iconfont.css'

Vue.use(VueLazyload, {
    error: './static/image/app-default-icon@2x.png',
    loading: './static/image/app-default-icon@2x.png',
    try: 3 // default 1
})

@Component({
    components: {
        Greetings,
        Apps,
        Cards
    }
})
export default class Home extends Vue {
    height: number = window.innerHeight - 90
    limitStyle: string = ''

    created () {
        window.addEventListener('resize', (): void => {
            // const mainEl = this.$refs.main as HTMLElement
            this.height = window.innerHeight - 90
            // if (window.innerWidth >= 970) {
            //     this.limitStyle = 'margin-left: 80px'
            // } else {
            //     this.limitStyle = ''
            // }
        })
    }

    mounted () {
        const el = this.$refs.main as HTMLElement
        ScrollBar.use(OverScroll)
        ScrollBar.init(el, {
            plugins: {
                overscroll: {
                    damping: 1
                }
            }
        })
    }
}
</script>

<style lang="less" scoped>
#home-container {
    width: 100%;

    #content-main {
        #content-wrapper {
            width: 810px;
            margin: 0 auto;
            padding: 0 20px 20px;
        }
    }

    .margin-tb-mx {
        margin: 25px 0;
    }

    /deep/.scrollbar-track {
        background-color: transparent;
        transition-delay: 0s;
        .scrollbar-thumb {
            background-color: rgba(138 , 153, 170, .6)
        }
    }
}

.drag {
    margin: 0 20px;
    -webkit-app-region: drag;
    -webkit-user-select: none;
    user-select: none;
}
</style>
