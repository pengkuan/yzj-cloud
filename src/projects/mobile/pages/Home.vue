<style lang="less" scoped>
.wrap {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>

<template>
  <div class="wrap" id="index-wrap">
    <home-container :name="userInfo.name">
        <!-- 公告卡片 -->
        <notice-box></notice-box>

        <!-- 常用应用卡片 -->
        <myapp-card></myapp-card>

        <!-- 卡片列表 -->
        <cards @ready="ready"></cards>

        <!-- 设置页入口 -->
        <setting-button></setting-button>
    </home-container>
  </div>
</template>

<script>
import HomeContainer from 'mobile/widgets/home-container'
import Click from 'components/click'
import config from 'config'
import NoticeBox from 'mobile/widgets/notice-box'
import MyappCard from 'mobile/widgets/myapp-card'
import LANG from '@/lang/index'
import RetentionRateMixin from 'mixins/retention-rate'
import SettingButton from 'mobile/widgets/setting-button'
import Cards from 'mobile/widgets/card-list'

export default {
    name: 'app',
    mixins: [RetentionRateMixin],
    components: {
        HomeContainer,
        Click,
        NoticeBox,
        Cards,
        MyappCard,
        SettingButton
    },
    methods: {
        ready () {
            // 卡片列表加载成功后，延迟片刻再显示
            setTimeout(() => {
                dispatchHTMLEvent('pageIsReady')
            }, 50)
        }
    },
    created () {
        console.timeEnd('加载首页')
        console.time('加载card-list.vue')
    },
    mounted () {
        this.dataly({ event: '启动工作台' })
    }
}
</script>
