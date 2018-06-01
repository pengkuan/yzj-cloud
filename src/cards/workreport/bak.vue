<style lang="less" scoped>
    @import '../../css/variable';

    .persons{
        .px2rem(margin-bottom, 42);
        text-align: center;

        .person{
            .px2rem(margin-left, 15);
            &:first-child{
                margin-left: 0;
            }
            display: inline-block;
            .person-face{
                .px2rem(width, 42);
                .px2rem(height, 42);
                background-color: #F6F6F6;
                border-radius: 50%;
                display: block;
                margin-left: auto;
                margin-right: auto;
                overflow: hidden;
            }
            .person-name{
                .px2rem(font-size, 12);
                .px2rem(margin-top, 6);
                .px2rem(width, 50);
                color: #1D1D1D;
                display: block;
                text-align: center;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space:nowrap
            }
        }

        .icon-gengduo{
            margin: 0;
            .px2rem(margin-left, 19);
            .px2rem(width, 42);
            .px2rem(height, 42);
            .px2rem(font-size, 40);
            display: inline-block;
            border-radius: 50%;
            vertical-align: top;
            color: #768893;
        }
    }
    .no-uncommit-icon{
        .px2rem(margin-bottom, 20);
        display: block;
        width: 40px;
        height: 40px;
        background: url(../../assets/done/done.png) 50% 50% no-repeat;
    }

    .text-uncommit{
        .px2rem(margin-top, 24);
        .px2rem(margin-bottom, 24);
        .px2rem(font-size, 16);
        color: #1D1D1D;
    }

    @media only screen and (-webkit-min-device-pixel-ratio: 2.0),
        only screen and (min--moz-device-pixel-ratio: 2.0), 
        only screen and (-o-min-device-pixel-ratio: 2),
        only screen and (min-device-pixel-ratio: 2.0), 
        only screen and (min-resolution: 2dppx){

        .no-uncommit-icon { 
            background: url(../../assets/done/done@2x.png) 50% 50% no-repeat;
            background-size: 100% auto;
        }
    }
</style>

<template>
    <div v-show="loaded">
        <!--没有权限-->
        <div v-if="!hasTeamPermission && !showClodBoot" class="card-content card-no-buttons flex-center">
            <div class="text-sorry">没有可以查看的团队</div>
        </div>

        <!--有权限-->
        <div v-if="hasTeamPermission && !showClodBoot">
            <tap class="flex-center card-content" :action="actions.team" :data="submitData">

                <!--所有人都提交了-->
                <div class="flex-center" v-if="!count">
                    <div class="no-uncommit-icon"></div>
                    <div>[{{typeString}}] 全员已提交，真棒！</div>
                </div>

                <!--未提交的人数-->
                <div class="text-uncommit" v-if="count">
                    [{{typeString}}] {{count}}人未提交
                </div>

                <!--未提交的人-->
                <div class="persons" v-if="count">
                    <div class="person" v-for="person in uncommitted">
                        <span class="person-face">
                            <img :src="person.face" />
                        </span>
                        <span class="person-name">{{person.name}}</span>
                    </div>
                    <div v-if="uncommitted.length < count" class="iconfont icon-gengduo"></div>
                </div>
            </tap>
            
            <!--操作按钮-->
            <card-buttons>
                <card-button :action="actions.team" :data="submitData">
                    {{buttonText.team}}
                </card-button>
                <card-button :action="actions.remind" :data="submitData" 
                    v-if="count" success-msg="提醒消息发送成功">
                    {{buttonText.remind}}
                </card-button>
            </card-buttons>
        </div>
        
        <!--冷启动-->
        <div v-if="showClodBoot">
            <div class="flex-center card-content">
                <tap class="persons">
                    <div class="person" v-for="person in coldUncommitted">
                        <span class="person-face">
                            <img :src="person.face" />
                        </span>
                        <span class="person-name">{{person.name}}</span>
                    </div>
                    <card-button 
                        v-if="coldUncommitted.length < count" class="iconfont icon-gengduo">
                    </card-button>
                </tap>
            </div>
            <card-buttons>
                <card-button>查看汇报</card-button>
                <card-button>一键提醒</card-button>
            </card-buttons>
        </div>
    </div>
</template>

<script>
    import Card from 'components/card'
    import {CardButton, CardButtons} from 'card-components'
    import Tap from 'components/tap'
    import MixinCard from 'mixins/card'

    export default {
        mixins: [MixinCard],
        props: {
            card: Object,
            title: String,
            actions: Object,
            data: Object,
            loaded: Boolean
        },
        components: {
            Card,
            CardButton,
            CardButtons,
            Tap
        },
        data () {
            return {
                total: 0,
                count: 0,
                type: '日报',
                uncommitted: [],
                // uncommitted: [{face: '', name: '陈巧玲'}, {face: '', name: '陈巧玲'}, {face: '', name: '陈巧玲'}, {face: '', name: '陈巧玲'}],
                submitDate: '',
                hasTeamPermission: null,
                teamAction: {
                    appId: 101091429,
                    appName: '工作汇报'
                },
                // 是否显示冷启动
                showClodBoot: false,
                // 冷启动数据
                coldUncommitted: [
                    { userName: '埃米', photo: 'static/image/user/1.png' },
                    { userName: '艾布纳', photo: 'static/image/user/2.png' },
                    { userName: '艾伦', photo: 'static/image/user/3.png' }
                ]
            }
        },
        computed: {
            submitData () {
                let data = this.data
                if (data) {
                    return {
                        templateId: data.templateId,
                        startTimeStamp: data.startTimeStamp,
                        endTimeStamp: data.endTimeStamp
                    }
                } else {
                    return {}
                }
            },
            // 冷启动配置信息
            coldBootConfig () {
                // 如果已经显示过冷启动，退出
                if (this.showedColdBoot() || !this.loaded || !this.data) return null
                
                if (this.data.hasTeamPermission === false) {
                    // 判断是否有权限
                    this.showClodBoot = true
                    return {
                        message: '成为负责人才能使用这张卡片哦',
                        buttons: [{
                            text: '隐藏卡片',
                            hanlder: () => {
                                this.showClodBoot = false
                                this.hideCard()
                            }
                        }]
                    }
                } else if (this.data.total === 0) {
                    // 判断是否有数据
                    this.showClodBoot = true
                    return {
                        message: '你的部门暂无人员，无法使用此卡片',
                        buttons: [{
                            text: '我知道了',
                            hanlder: () => {
                                this.showClodBoot = false
                            }
                        }]
                    }
                } else {
                    // 有数据有权限，标记冷启动为已显示过
                    this.markShowedColdBoot()
                    this.showClodBoot = false
                    return null
                }
            },
            typeString () {
                if (this.type === '日报') {
                    return this.submitDate + this.type
                } else {
                    return this.type
                }
            },
            buttonText () {
                let date = this.submitDate
                
                // 匹配：今日、本周、本月、当年
                if (/^[今本当]/.test(date)) {
                    return {
                        team: '查看汇报',
                        remind: '一键提醒'
                    }
                }

                // 匹配其它
                return {
                    team: '查看' + date + '汇报',
                    remind: '一键提醒' + date + '未交'
                }
            }
        },
        methods: {
            setData (data) {
                // 默认数据
                data = data || {
                    'total': 0,
                    'count': 0,
                    'type': '日报',
                    'uncommitted': [],
                    'hasTeamPermission': false,
                    'submitDate': ''
                }
                Object.assign(this, data)
            }
        },
        watch: {
            data (val) {
                let max = document.documentElement.clientWidth >= 375 ? 4 : 3
                if (val) {
                    this.setData({
                        total: val.total,
                        type: val.type,
                        count: val.uncommitUsers.length,
                        uncommitted: val.uncommitUsers.slice(0, max),
                        hasTeamPermission: val.hasTeamPermission,
                        submitDate: val.submitDate
                    })
                } else {
                    this.setData(null)
                }
            }
        }
    }
</script>
