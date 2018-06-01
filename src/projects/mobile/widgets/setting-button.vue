<style lang="less" scoped>
@import '../../../css/variable';

.setting-panel{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 64px;
    padding-bottom: 32px;
}

.icon-setting{
    .px2rem(width, 64);
    .px2rem(height, 64);
    .px2rem(line-height, 64);
    .px2rem(font-size, 24);
    .px2rem(padding-top, 1);
    .px2rem(padding-left, 1);
    border-radius: 50%;
    background: #FFF;
    text-align: center;
    color: #768893;
    box-shadow: 0 0 5px #E8ECEF;
    background: #FFF url(../../../assets/index/setting@2x.png) 50% 50% no-repeat;
    background-size: 50% 50%;
}

.icon-setting-active{
    background: #fbfcfd url(../../../assets/index/setting@2x.png) 50% 50% no-repeat;
    background-size: 50% 50%;
}

.setting-text{
    .px2rem(margin-top, 16);
    .px2rem(font-size, 12);
    .px2rem(letter-spacing, -0.29);
    color: #030303;
}
.buildDate {
    text-align: center;
    font-size: 7px;
    color: #DDD;
    height: 30px;
    line-height: 30px;
}
.reload, .reset{
    width:50px;
    height:50px;
    margin:10px auto 0 auto;
    border: 1px solid #EEE;
    color: #DDD;
    border-radius: 50%;
    position: fixed;
    right: 20px;
    bottom: 130px;
    font-size: 9px;
    text-align: center;
    line-height: 50px;
}
.reset{
    bottom: 70px;
}
</style>

<template>
    <div>
        <div class="setting-panel">
            <click :class="{'icon-setting': true, 'icon-setting-active': active}" @touchstart="touchStart" @click="goSetting"></click>
            <div class="setting-text">{{ settingText }}</div>
        </div>
<!--         
        <div v-if="isNotProdEnv && buildDate" class="buildDate">{{buildDate}}</div> -->

        <div class="reload" v-if="devmode || isLocalDev" @click="reloadPage">刷新</div>
        <div class="reset" v-if="devmode || isLocalDev" @click="pageReset">重置</div>
    </div>
</template>

<script>
import LANG from '@/lang/index'
import Click from 'components/click'

export default {
    name: 'setting-button',
    components: {
        Click
    },
    data () {
        return {
            pushPage: null,
            buildDate: info.buildDate,
            pageAppear: true,
            cardsLoaded: true,
            devmode: false,
            active: false
        }
    },
    computed: {
        settingText () {
            return LANG.settings.button
        },
        isLocalDev () {
            return location.hostname.match(/^172/)
        },
        // 非正式环境
        isNotProdEnv () {
            // 匹配本机、dev、devtest、kdtest
            return location.hostname.match(/^localhost|172|dev|devtest|192|dotest|kdtest/)
        }
    },
    methods: {
        touchStart () {
            this.active = true

            setTimeout(() => {
                this.active = false
            }, 200)
        },
        reloadPage () {
            // url末尾有/客户端会拦截失败
            location.href = location.href.split('#')[0]
        },
        // 是否为开发模式
        checkDevMode () {
            this.devmode = this.userStorage.getJSON('devmode') || false
        },
        // 重置
        pageReset () {
            this.storage.clear()
            this.userStorage.clear()
            this.globalStorage.clear()
            this.reloadPage()
        },
        // 跳转到自定义页面
        goSetting () {
            this.pushPage = '#/setting'

            this.dataly({
                event: '点击添加卡片入口'
            })
            
            let url = '#/setting'

            // 调试环境
            if (location.hostname.indexOf('172.20') === 0) {
                url = location.href.split('#')[0] + '#/setting'
                // android 跳转有问题
                if (info.isAndroid) {
                    location.href = '#/setting'
                    return
                }
            }

            if (info.page === 'intro') {
                url = location.href.split('#')[0] + '#/setting'
            }
            
            window.XuntongJSBridge.call('gotoLightApp', {
                'appId': '101091520',
                'appName': LANG.settings.button,
                'urlParam': url
            })

            // 主动检查工作台版本
            if (cloudhub.cloudoffice.checkWorkbenchUpdate) {
                cloudhub.cloudoffice.checkWorkbenchUpdate()
            }
        },
        cardsReady () {
            this.cardsLoaded = true
        }
    },
    mounted () {
        this.checkDevMode()
        this.dataly({ event: '启动工作台' })

        // 首页重新获得焦点
        document.addEventListener('appear', () => {
            this.checkDevMode()

            this.pageAppear = true

            this.dataly({ event: '回到工作台' })
            // 清除红点
            this.clearTabRedDot()

            setTimeout(() => {
                this.pushPage = ''
            }, 10)
        })
        document.addEventListener('disappear', () => {
            this.pageAppear = false
        })
        // 切换角色时清空缓存
        document.addEventListener('roleChange', () => {
            this.globalStorage.clear()
        })
    }
}
</script>
