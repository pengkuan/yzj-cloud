<style lang="less" scoped>
@import '../../../css/variable';

.v10-container {
    .px2rem(padding-top, 8);
    .px2rem(min-height, 400);
    padding-bottom: 30px;
}

.card-list {
    background: rgba(248, 249, 251, 1);
}

.update-bubble {
    position: relative;
    z-index: 99;
}

.create-team {
    width: 100%;
    bottom: 0;
    padding-bottom: 32px;
    .create-team-button {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        background:linear-gradient(139.4deg,rgba(59,186,255,1),rgba(62,176,248,1),rgba(50,156,241,1));
        text-align: center;
        color: #FFF;
        border-radius: 20px;
    }
}
</style>

<template>
    <div class="v10-container">
        <!-- 公告卡片 -->
        <notice-box></notice-box>

        <!-- 卡片列表 -->
        <card-list @ready="ready" ref="cardList" class="card-list"></card-list>

        <!-- 设置页入口 -->
        <setting-button></setting-button>

        <div class="create-team">
            <click class="create-team-button" @click="createTeam">{{LANG.freeUse}}</click>
        </div>
    </div>
</template>

<script>
import NoticeBox from 'mobile/widgets/notice-box'
import CardList from 'mobile/widgets/card-list'
import SettingButton from 'mobile/widgets/setting-button'
import Click from 'components/click'
import LANG from '@/lang/index'

export default {
    name: 'v10',
    components: {
        NoticeBox,
        CardList,
        SettingButton,
        Click
    },
    data () {
        return {
            LANG
        }
    },
    methods: {
        ready () {
            // 卡片列表加载成功后，延迟片刻再显示
            setTimeout(() => {
                dispatchHTMLEvent('pageIsReady')
            }, 50)
        },
        createTeam () {
            qing.call('localFunction', {
                'name': 'createTeam',
                'param': {},
                'sourceType': ''
            })
        }
    },
    created () {
        if (info.isAndroid && info.isV10) {
            qing.call('setWebViewTitle', { title: '我的云之家' })
        }

        this.storage.setItem('isMyCloudHub', true)
    }
}
</script>
