<style lang="less">
    @import '../../../css/variable';

    #app {
        padding: 0;
        margin: 0;
    }
    .wrap {
        width: 100%;
        height: 100%;
    }

    // V10样式
    [data-v10] {
        .intro-page {
            .card {
                &.myapp {
                    .card-header {
                        .card-title {
                            .px2rem(font-size, 18) !important;
                        }
                    }
                }
            }
        }
    }

    .intro-page {
        .card {
            margin-top: 0.24rem;
            border-radius: 0.12rem;
            box-shadow: 0 2px 10px 0 rgba(31, 107, 161, 0.19);
            position: relative;
            overflow: hidden;
            height: 5.2rem;
            &.myapp {
                background-color: #fff;
                margin-top: 0;
                .card-header {
                    .px2rem(padding-left, 12);
                    .px2rem(padding-right, 12);
                    .px2rem(height, 42);
                    .px2rem(line-height, 42);
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    .card-icon {
                        margin: 0;
                        padding: 0;
                        .px2rem(font-size, 12);
                        .px2rem(margin-right, 12);
                        .px2rem(width, 18);
                        .px2rem(height, 18);
                        .px2rem(border-radius, 2);
                        display: inline-block;
                        display: inline-flex;
                        justify-content: center;
                        align-items: center;
                        overflow: visible;
                        position: relative;
                        background-color: rgb(60, 186, 255);
                        color: rgb(255, 255, 255);

                        .card-iconfont{
                            .px2rem(font-size, 12);
                            .px2rem(border-radius, 2);
                        }
                    }
                    .card-title {
                        .card-title-fontsize();
                        .px2rem(line-height, 20);
                        color: #768893;
                    }
                    .card-title {
                        display: inline-block;
                    }
                }
                /deep/.myapp-container {
                    height: auto;
                }
            }
            &.baobiaoxiuxiu {
                background: url(../../../assets/intro/baobiaoxiuxiu.png) no-repeat center center;
                background-size: 100% 100%;
                height: 435px;
            }
            &.gongzuoanpai {
                background: url(../../../assets/intro/gongzuoanpai.png) no-repeat center center;
                background-size: 100% 100%;
                height: 435px;
            }
            &.gongzuoanpai_boss {
                background: url(../../../assets/intro/gongzuoanpai_boss.png) no-repeat center center;
                background-size: 100% auto;
            }
            &.gongzuohuibao {
                background: url(../../../assets/intro/gongzuohuibao.png) no-repeat center center;
                background-size: 100% auto;
            }
            &.kuaijieshenpi {
                background: url(../../../assets/intro/kuaijieshenpi.png) no-repeat center center;
                background-size: 100% auto;
            }
            &.qiandaotongji {
                background: url(../../../assets/intro/qiandaotongji.png) no-repeat center center;
                background-size: 100% auto;
            }
            &.shenpizhuizong {
                background: url(../../../assets/intro/shenpizhuizong.png) no-repeat center center;
                background-size: 100% auto;
            }
            &.wodeshoucang {
                background: url(../../../assets/intro/wodeshoucang.png) no-repeat center center;
                background-size: 100% auto;
            }
        }
        .active {
            opacity: 1 !important;
        }
    }
    
    [data-lang='en'] {
        .intro-page .card {
            &.baobiaoxiuxiu {
                background-image: url(../../../assets/intro/baobiaoxiuxiu-en.png);
            }
            &.gongzuoanpai {
                background-image: url(../../../assets/intro/gongzuoanpai-en.png);
            }
            &.gongzuohuibao {
                background-image: url(../../../assets/intro/gongzuohuibao-en.png);
            }
            &.kuaijieshenpi {
                background-image: url(../../../assets/intro/kuaijieshenpi-en.png);
            }
            &.qiandaotongji {
                background-image: url(../../../assets/intro/qiandaotongji-en.png);
            }
            &.shenpizhuizong {
                background-image: url(../../../assets/intro/shenpizhuizong-en.png);
            }
        }
    }
</style>

<template>
  <div class="wrap intro-page">
    <home-container :name="LANG.friend" :hide-radar="true" :page-appear="pageAppear" page="intro">
        <!-- 公告卡片 -->
        <notice-box></notice-box>

        <div class="card myapp">
            <div class="card-header">
                <div class="card-icon">
                    <span class="card-iconfont iconfont icon-changyongyingyong"></span>
                </div>
                <span class="card-title">{{LANG.myappCardTitle}}</span>
            </div>
            <my-app
                :data="myAppData"
                :loaded="true"
            ></my-app>
        </div>

        <tap v-for="(card, index) in enabledCards" :key="index" @tap="gotoCardDetail(card)" :class="['active']">
            <div :class="['card', card.cls]">
            </div>
        </tap>
    </home-container>
  </div>
</template>

<script>
import HomeContainer from 'mobile/widgets/home-container'
import Tap from 'components/tap'
import MyApp from '@/cards/myapp'
import { cardsInfo, myAppData } from '../lib/introConfig'
import NoticeBox from 'mobile/widgets/notice-box'
import LANG from '@/lang/intro'

export default {
    name: 'app',
    components: {
        HomeContainer,
        Tap,
        NoticeBox,
        MyApp
    },
    data () {
        return {
            LANG,
            myAppData,
            greetings: [],
            enabledCards: [],
            pageAppear: true,
            role: 'staff'
        }
    },
    methods: {
        // 取页面卡片配置数据
        loadCards () {
            cloudhub.cloudoffice.getRoleType((res) => { // 获取角色信息
                if (res.success && res.data) {
                    let role = res.data.role
                    if (role === 1) {
                        this.role = 'boss'
                    } else if (role === 2) {
                        this.role = 'manager'
                    } else if (role === 3) {
                        this.role = 'staff'
                    }
                    this.enabledCards = cardsInfo()[this.role]
                }
            })
        },
        gotoCardDetail (card) {
            let host = `${location.protocol}//${location.host}`
            if (!card.linkUrl) return
            // 因为介绍页目前只有中文版，所以非中文不跳转
            if (info.language && !info.language.match(/CN/i)) return
            // host = 'http://192.168.22.144'
            console.log(`个人空间_${this.role}_${card.name}`)
            window.XuntongJSBridge.call('gotoLightApp', {
                'appId': '',
                'appName': '',
                'urlParam': host + '' + card.linkUrl
            })
        },
        homePageAppear () {
            this.pageAppear = true
        },
        homePageDisappear () {
            this.pageAppear = false
        },
        gotoGuide () {
            this.redirectTo({
                'appId': '101091520',
                'appName': '我的云之家',
                'urlParam': '#/guide'
            })
        }
    },
    mounted () {
        dispatchHTMLEvent('pageIsReady')
        this.loadCards()
        document.addEventListener('appear', this.homePageAppear)
        document.addEventListener('disappear', this.homePageDisappear)
    },
    beforeDestroy () {
        document.removeEventListener('appear', this.homePageAppear)
        document.removeEventListener('disappear', this.homePageDisappear)
    }
}
</script>
