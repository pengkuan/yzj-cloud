<template>
    <div
        class="pop-wrapper"
        :class="direction"
        :style="`top: ${popTop}px; left: ${popLeft}px`"
        @click.stop
    >
        <div v-scroll-hover class="pop-container">
            <div class="pop-content">
                <div
                    v-for="category in apps"
                    class="category-wrapper"
                    :key="category.categoryName"
                >
                    <div class="category">{{ category.categoryName }}</div>

                    <div class="apps-wrapper">
                        <app-item
                            v-for="app in category.apps"
                            :name="app.name"
                            :logoUrl="app.icon"
                            :key="app.name"
                            @click="_handleClick(app.mcloudAppId)"
                        ></app-item>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { Home } from 'pc/types'
import AppItem from './item.vue'
import ScrollBar from 'smooth-scrollbar'
import OverScroll from 'smooth-scrollbar/plugins/overscroll'

@Component({
    components: {
        AppItem
    }
})
export default class PopApps extends Vue {
    @Prop({ type: Number, default: 0 }) popTop: number
    @Prop({ type: Number, default: 0 }) popLeft: number
    @Prop({ type: Array, default: {} }) apps: Array<Home.AllDeskAppCategory>
    @Prop({ type: String, default: 'left' }) direction: string
    @Emit('triggerApp') _handleClick (appId): void {}

    mounted () {
        const el = document.querySelector('.pop-container') as HTMLElement
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
.pop-wrapper {
    position: absolute;
    width: 350px;
    height: 500px;
    background-color: #fff;
    border-radius: 3px;
    filter: drop-shadow(0 11px 10px rgba(3, 19, 28, 0.15));
    z-index: 100;
    .pop-container {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        .pop-content {
            padding: 15px;
        }
    }
    &:after {
        content: '';
        width: 10px;
        height: 10px;
        background-color: #fff;
        transform: rotate(45deg);
        position: absolute;
        top: 33px;
        z-index: -1;
    }
    &.left {
        &:after {
            right: -5px;
        }
    }
    &.right {
        &:after {
            left: -5px;
        }
    }
    .category-wrapper {
        width: 320px;
    }
    .category {
        font-size: 12px;
        color: #768893;
        padding-bottom: 4px;
        border-bottom: 1px solid #F1F4F8;
    }
    .apps-wrapper {
        display: flex;
        flex-wrap: wrap;
        padding: 16px 0 10px;
        /deep/.app-item {
            margin-bottom: 15px;
            width: 80px;
        }
        /deep/.icon {
            width: 36px;
            height: 36px;
            &:hover {
                &::after {
                    width: 36px;
                    height: 36px;
                }
            }
            &:active {
                &::after {
                    width: 36px;
                    height: 36px;
                }
            }
        }
        /deep/.name {
            font-size: 12px;
        }
    }
    /deep/.scrollbar-track {
        background-color: transparent;
        transition-delay: 0s;
        .scrollbar-thumb {
            background-color: rgba(138 , 153, 170, .6)
        }
    }
}
</style>
