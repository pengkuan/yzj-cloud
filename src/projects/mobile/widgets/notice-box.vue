<style lang="less" scoped>
@import '../../../css/variable';

// V9样式
[data-v9] {
    .container {
        box-shadow: 0 2px 10px 0 rgba(31, 107, 161, 0.19);
        border-radius: 6px;
    }

    .admin-notice {
        .px2rem(margin-top, 28) !important;
    }
}

// V10样式
[data-v10] {
    .container {
        .px2rem(margin-bottom, 8);
        .px2rem(height, 150);
        padding-top: 0;
        padding-bottom: 0;

        .values-header {
            .px2rem(margin-top, 18);
            .px2rem(height, 20);
            .px2rem(margin-right, 20);
            .px2rem(margin-bottom, 10);
        }
        .values-content {
            .px2rem(padding-left, 20);
            .px2rem(padding-right, 20);
            .notice-text{
                line-height: 1.5em;
            }
        }

        .admin-notice {
            .px2rem(margin-top, 35) !important;
        }
    }
    .notice-type-breakdown {
        .notice-icon {
            .px2rem(margin-left, 0);
        }
    }
}


.container {
  background: #ffffff;
  overflow: hidden;
  .px2rem(margin-bottom, 12);
  .content {
    overflow: hidden;
    .px2rem(height, 137);
    display: flex;
    flex-direction: column;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
  .values-header {
    .px2rem(height, 38);
    .px2rem(margin-right, 12);
    display: flex;
    align-items: center;
    position: relative;
    .values-card-title {
      flex: 2;
      display: flex;
      .px2rem(height, 18);
      .px2rem(line-height, 18);
      .px2rem(font-size, 16);
      .px2rem(margin-left, 12);
      .px2rem(padding-top, 2);
      color: #768893;
    }
    .btn-container {
      display: inline-block;
      color: #768893;
      .px2rem(margin-bottom, -2);
    }
  }
  .values-content {
    .px2rem(height, 80);
    .px2rem(padding-left, 18);
    .px2rem(padding-right, 18);
    background-size: 100% 100%;
    .values-item {
      width: 100%;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
    }
  }
  .has-header{
    .values-content.notice-type-normal{
        flex: 1;
        .px2rem(margin-top, -38);
        .btn-know{
            .px2rem(margin-top, 16);
        }
    }
  }
  .values-content.notice-type-notice {
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    .px2rem(margin-top, 20);
    .content-left{
        // .px2rem(margin-top, 12);
        flex: 1;
        overflow: hidden;
        .btn-know{
            .px2rem(width, 59);
            .px2rem(height, 24);
            .px2rem(line-height, 24);
            margin-top: 6px !important;
            display: inline-block;
            background: #63BAF9;
            color: #FFF;
            text-align: center;
            border-radius: 12px;
        }
    }
    .content-right{
        // .px2rem(margin-top, 12);
        .px2rem(width, 80);
        text-align: right;
        .btn-know{
            .px2rem(width, 59);
            .px2rem(height, 24);
            .px2rem(line-height, 24);
            display: inline-block;
            background: #63BAF9;
            color: #FFF;
            text-align: center;
            border-radius: 12px;
        }
    }
  }
}
.notice-type-breakdown{
    .px2rem(margin-top, -5);
    .notice-icon{
        .px2rem(width, 63);
        .px2rem(height, 55);
        .px2rem(margin-right, 12);
        .px2rem(margin-left, -7);
        .px2rem(margin-top, 9);
        background-image: url("../../../assets/notice/trouble@2x.png");
        background-size: 100% 100%;
        float: left;
    }
    .notice-text {
        position: relative;
        white-space: normal;
    }
}
.notice-title{
    .px2rem(font-size, 16);
    color: #1D1D1D;
}
.notice-text{
    .px2rem(font-size, 14);
    .px2rem(margin-top, 4);
    color: #768893;
    white-space: nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
</style>

<template>
  <div class="container" v-if="data">
    <div :class="{'content': true, 'has-header': !!data.showHideButton}" 
        :style="'background-image: url(' + data.bgUrl + ');'"
        :data-type="data.type">
        <template v-if="data.type === 'normal'">
            <div class="values-header" v-if="data.showHideButton">
                <div class="values-card-title"></div>
                <click class="btn-container" @click="close()">
                    <span class="header-btn" :style="{'color': data.hideButtonColor}">隐藏</span>
                </click>
            </div>
            <div class="values-content notice-type-notice notice-type-normal">
                <div class="content-left">
                    <div class="notice-title" :style="{'color': data.titleColor}">{{data.title}}</div>
                    <div class="notice-text" :style="{'color': data.textColor}" v-html="textFormat(data.text)"></div>
                    <div v-if="data.buttonText && (data.buttonPosition === 'bottom')">
                        <click class="btn-know" @click="redirect(data.buttonUrl, data.appId, data.appName)"
                            :style="{'background-color': data.buttonBgColor, 'color': data.buttonColor}">
                            {{data.buttonText}}
                        </click>
                    </div>
                </div>
                <div class="content-right" v-if="data.buttonText && (data.buttonPosition !== 'bottom')">
                    <click class="btn-know" @click="redirect(data.buttonUrl, data.appId, data.appName)"
                        :style="{'background-color': data.buttonBgColor, 'color': data.buttonColor}">
                        {{data.buttonText}}
                    </click>
                </div>
            </div>
        </template>
        <template v-else-if="data.type === 'breakdown'">
            <div class="values-header">
                <div class="values-card-title"></div>
                <click class="btn-container" @click="close()">
                    <span class="header-btn">关闭</span>
                </click>
            </div>
            <click class="values-content notice-type-breakdown" @click="goBreakdownDetail(data.title, data.id)">
                <div class="notice-icon"></div>
                <div class="notice-title">{{data.title}}</div>
                <div class="notice-text">{{textSlice(data.text)}}</div>
            </click>
        </template>
        <template v-else>
            <div class="values-content notice-type-notice admin-notice">
                <div class="content-left">
                    <div class="notice-title">{{data.title}}</div>
                    <div class="notice-text" v-html="textFormat(data.text)"></div>
                </div>
                <div class="content-right">
                    <click class="btn-know" @click="close()">知道了</click>
                </div>
            </div>
        </template>
    </div>
  </div>
</template>

<script>
import Click from 'components/click'
const key = 'closedNotices'

export default {
    components: {
        Click
    },
    data () {
        return {
            data: null,
            closedNotices: this.globalStorage.getJSON(key) || {}
        }
    },
    watch: {
        data (val) {
            if (!val) {
                this.$emit('hide')
            }
        }
    },
    methods: {
        checkNotice () {
            this.request({
                method: 'post',
                url: '/cloudwork/platformNotice/findCurNewNotice'
            }, res => {
                let { success, data } = res
                
                if (!success || !data) return

                let obj
                let isEnable = n => {
                    return n.show && !this.closedNotices[n.id] && (n.expire > new Date().getTime())
                }

                if (isEnable(data.breakdown)) {
                    obj = data.breakdown
                } else if (isEnable(data.notice)) {
                    obj = data.notice
                } else if (isEnable(data.normal)) {
                    obj = data.normal
                } else if (isEnable(data.changelog)) {
                    obj = data.changelog
                }

                if (!obj) return

                let {
                    show,
                    expire,
                    id
                } = obj
                if (show && !this.closedNotices[id] && (expire > new Date().getTime())) {
                    // 每分钟检查过期时间
                    clearInterval(this.timer)
                    this.timer = setInterval(() => {
                        if (expire <= new Date().getTime()) {
                            this.data = null
                            clearInterval(this.timer)
                        }
                    }, 1000 * 60)

                    this.data = Object.assign({}, obj)
                } else {
                    this.data = null
                }
            })
        },
        close () {
            if (!this.data || !this.data.id) return
            this.closedNotices[this.data.id] = 1
            this.globalStorage.setItem(key, this.closedNotices)
            this.data = null
        },
        redirect (url, appId, appName) {
            // 如果没有url和appId，认为是关闭按钮
            if (!url) {
                this.close()
                return
            }

            this.redirectTo({
                url,
                appId,
                appName
            })
        },
        goBreakdownDetail (title, id) {
            window.XuntongJSBridge.call('gotoLightApp', {
                'appId': '101091520',
                'appName': title || '故障公告',
                'urlParam': '#/breakdown/' + id
            })
        },
        textFormat (text) {
            // 根据换行符拼接段落
            // 最多只显示2行
            // 每行最多显示20个字符
            return text.split('\n').slice(0, 2).map(n => {
                return '<div class="notice-section">' + n.substr(0, 20) + '</div>'
            }).join('')
        },
        textSlice (str) {
            return str.slice(0, 25) + '...'
        }
    },
    mounted () {
        // 国际版暂不支持故障卡片
        if (info.language === 'en-US') {
            return
        }
        
        this.bus.$on('upadateYunzhijiaNotice', e => {
            this.checkNotice()
        })
        setTimeout(() => {
            this.checkNotice()
        }, 100)
    }
}
</script>
