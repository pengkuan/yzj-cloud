<template>
    <div class="admin-content">
        <click
            v-for="app in apps"
            class="item"
            :key="app"
            @click="_goto(app)">
            <img :src="require(`./style/${app}.png`)" alt="icon" />
            <div class="name">{{ Lang[app] }}</div>
        </click>
    </div>
</template>

<script>
import Click from 'components/click'
import Lang from '@/lang/cards/admin'
import config from 'config'

export default {
    name: 'AdminCard',
    components: { Click },
    props: {
        title: String,
        actions: Object,
        data: Object,
        card: Object
    },
    data () {
        return {
            Lang,
            apps: ['team', 'upgrade', 'functional', 'service'],
            personId: ''
        }
    },
    computed: {
        isShowCard () {
            return this.adminCardState !== 0
        }
    },
    methods: {
        // 获取数据
        async _load () {
            try {
                const res = await this.request({
                    url: '/cloudwork/cardinfo/adminCardState',
                    method: 'POST'
                })
                const data = res.data || {}
                this.adminCardState = data.adminCardState || 0
                this.personId = data.personId || ''
            } catch (err) {
                console.log(err)
            }
        },
        _goto (app) {
            let appName = ''
            switch (app) {
                case 'team': {
                    this.redirectTo({
                        appId: config.runenv === 'yzj' ? 10716 : 10715,
                        appName: '团队数据'
                    })
                    appName = '团队激活'
                    break
                }
                case 'upgrade': {
                    this.goApp({
                        appUrl: config.serverHost + 'vas/#/service/introduction'
                    })
                    appName = '升级特权'
                    break
                }
                case 'functional': {
                    appName = '功能宝典'
                    if (this.actions.functional) {
                        this.redirectTo(this.actions.functional)
                    } else {
                        this.goApp({
                            appUrl: config.serverHost + 'operate/newguys/useGuide.html?isAdmin=1'
                        })
                    }
                    break
                }
                case 'service': {
                    appName = '客户服务'
                    if (this.actions.service) {
                        this.redirectTo(this.actions.service)
                    } else {
                        window.XuntongJSBridge.call('chat', {
                            groupId: `XT-${this.personId}-XT-10000`
                        })
                    }
                    break
                }
            }
            this.dataly({
                position: '管理专区卡片',
                event: `点击${appName}`
            })
        }
    },
    mounted () {
        this._load()
        this.$emit('setHeight', info.isV10 ? 93 : 95)
    }
}
</script>

<style lang="less" scoped>
@import url('../../css/variable');

// V10样式
[data-v10] {
    .admin-content {
        .px2rem(padding-top, 0);

        .item {
            img {
                .px2rem(width, 42);
                .px2rem(height, 42);
            }
        }
    }
}

.admin-content {
    .px2rem(padding-left, 4);
    .px2rem(padding-right, 4);
    .px2rem(padding-top, 6);

    .item {
        width: 25%;
        display: inline-block;
        text-align: center;

        img {
            display: inline-block;
            vertical-align: middle;
            .px2rem(width, 43);
            .px2rem(height, 43);
        }

        .name {
            color: #1D1D1D;
            text-align: center;
            .px2rem(font-size, 12);
            .px2rem(margin-top, 6);
        }
    }
}
</style>
