<style lang="less" scoped>
    @import '../../css/variable';

    [data-v10][data-mobile] {
        .card-content {
            .px2rem(min-height, 167);
        }
        .persons{
            .px2rem(margin-bottom, 30);
        }
    }

    .text-latest{
        .px2rem(font-size, 16);
        .px2rem(margin-top, 20);
        .px2rem(margin-bottom, 25);
        font-family: PingFangSC-Regular;
        color: #1D1D1D;
        letter-spacing: 0.05px;
        text-align: center;
    }

    .persons{
        .px2rem(margin-bottom, 42);
        text-align: center;

        .user{
            .px2rem(margin-left, 15);
            &:first-child{
                margin-left: 0;
            }
            display: inline-block;
            .user-face{
                .px2rem(width, 42);
                .px2rem(height, 42);
                background-color: #F6F6F6;
                border-radius: 50%;
                display: block;
                margin-left: auto;
                margin-right: auto;
                overflow: hidden;
            }
            .user-name{
                .px2rem(font-size, 12);
                .px2rem(margin-top, 10);
                .px2rem(width, 50);
                color: #1D1D1D;
                display: block;
                text-align: center;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space:nowrap
            }
        }
    }

    .no-submit-icon{
        background: url(./images/no-submit@1x.png) 50% 50% no-repeat;
        width: 50px;
        height: 46px;
        margin-bottom: 29px;
    }

    @media only screen and (-webkit-min-device-pixel-ratio: 2.0),
        only screen and (min--moz-device-pixel-ratio: 2.0),
        only screen and (-o-min-device-pixel-ratio: 2),
        only screen and (min-device-pixel-ratio: 2.0),
        only screen and (min-resolution: 2dppx){

        .no-submit-icon {
            background: url(./images/no-submit@2x.png) 50% 50% no-repeat;
            background-size: 100% auto;
        }
    }

    .all-read-icon{
        background: url(./images/all-read@1x.png) 50% 50% no-repeat;
        width: 50px;
        height: 50px;
        margin-bottom: 29px;
    }

    @media only screen and (-webkit-min-device-pixel-ratio: 2.0),
        only screen and (min--moz-device-pixel-ratio: 2.0),
        only screen and (-o-min-device-pixel-ratio: 2),
        only screen and (min-device-pixel-ratio: 2.0),
        only screen and (min-resolution: 2dppx){

        .all-read-icon {
            background: url(./images/all-read@2x.png) 50% 50% no-repeat;
            background-size: 100% auto;
        }
    }
    [data-pc] {
        .card-content {
            height: 167px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>

<template>
    <div v-show="loaded">

        <!--近7日已全部查看完毕-->
        <div v-if="type === 'readAll'" class="text-center card-content card-mini">
            <!-- <div class="all-read-icon"></div> -->
            <div class="text-sorry">{{LANG.readAll}}</div>
        </div>

        <!--近7日暂无人提交-->
        <div v-if="type === 'noSubmit'" class="text-center card-content card-mini">
            <!-- <div class="no-submit-icon"></div> -->
            <div class="text-sorry">{{LANG.noSubmit}}</div>
        </div>

        <!--正常显示-->
        <div v-if="type === 'normal'" class="flex-center card-content">
            <div class="text-latest">{{LANG.LatestAuthor}}</div>
            <div class="persons">
                <click class="user" v-for="user in users" :key="user.userId" type="redirect" @click="startWatchAppear" :action="{
                    url: state.detailUrl + user.workreportId,
                    appid: state.appId || ''
                }">
                    <span class="user-face">
                        <img :src="user.photoUrl" />
                    </span>
                    <span class="user-name">{{user.userName}}</span>
                </click>
            </div>
        </div>

        <!--操作按钮-->
        <card-buttons>
            <card-button type="redirect" @tap="startWatchAppear" :action="{
                url: state.redirectUrl,
                appid: state.appId || ''
            }">
                {{LANG.Into}}
            </card-button>
        </card-buttons>
    </div>
</template>

<script>
    import {CardButton, CardButtons} from 'card-components'
    import Tap from 'components/tap'
    import Click from 'components/click'
    import MixinCard from 'mixins/card'
    import LANG from '@/lang/cards/workreport'

    export default {
        mixins: [MixinCard],
        props: {
            card: Object,
            title: String,
            actions: Object,
            data: Object,
            loaded: {
                type: Boolean,
                default: false
            }
        },
        components: {
            CardButton,
            CardButtons,
            Tap,
            Click
        },
        data () {
            return {
                LANG,
                // 是否冷启动
                isCold: false,
                // 冷启动数据
                coldData: {
                    hasTeamPermission: true,
                    isNoSubmit: false,
                    isReadAll: false,
                    reportUsers: [
                        { userName: LANG.Alyssa, photoUrl: 'static/image/user/4.png' },
                        { userName: LANG.Angela, photoUrl: 'static/image/user/5.png' },
                        { userName: LANG.Anne, photoUrl: 'static/image/user/6.png' },
                        { userName: LANG.Oston, photoUrl: 'static/image/user/7.png' },
                        { userName: LANG.Kate, photoUrl: 'static/image/user/8.png' }
                    ]
                }
            }
        },
        computed: {
            state () {
                let data = this.data || {}

                if (this.isCold) data = this.coldData

                return data
            },
            // 用户
            users () {
                let users = this.state.reportUsers || []
                // 如果屏幕宽度小于375显示4条，否则5条
                let count = document.documentElement.clientWidth >= 375 ? 5 : 4
                return users.slice(0, count)
            },
            type () {
                // 没有最近提交
                if (this.state.isNoSubmit) return 'noSubmit'
                // 没有未读(无数据时也认为是没有未读)
                if (this.state.isReadAll || !this.users.length) return 'readAll'
                return 'normal'
            },
            // 冷启动配置信息
            coldBootConfig () {
                // 加载中
                if (!this.loaded) return null

                // 无权限，直接显示冷启动
                if (this.state.hasTeamPermission === false) {
                    this.isCold = true
                    return {
                        message: LANG.BecomeManager,
                        buttons: [{
                            text: LANG.Hide,
                            hanlder: () => {
                                this.isCold = false
                                this.hideCard()
                            }
                        }]
                    }
                }

                this.isCold = false
                return null
            }
        },
        methods: {
            // 重新激活以后刷新卡片
            refreshAfterAppear () {
                // 移除事件
                document.removeEventListener('appear', this.refreshAfterAppear)
                // 刷新卡片
                this.reloadData()
            },
            // 监听激活事件
            startWatchAppear () {
                document.addEventListener('appear', this.refreshAfterAppear)
            },
            resetHeight () {
                if (this.type !== 'normal') {
                    this.setMiniHeight()
                } else {
                    this.setNormalHeight()
                }
            }
        },
        watch: {
            data (val) {
                this.resetHeight()
            },
            loaded (val) {
                if (this.loaded) {
                    this.resetHeight()
                }
            }
        },
        mounted () {
            if (this.loaded) {
                this.resetHeight()
            }
        }
    }
</script>
