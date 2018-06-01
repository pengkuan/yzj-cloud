<template>
    <div class="report-item">
        <header class="report-head"
                :class="item.reportType==2?'report-head-mar':''">
            <template v-if="isCold">
                <p>
                    <span class="report-head-name">{{item.name}}</span>
                </p>
                <p>{{item.desc}}</p>
            </template>
            <template v-else>
                <p>
                    <tap @tap="goDetail"
                         style="display:inline-block">
                        <span v-if="item.read === false"
                              class="new-sign">
                            <img src="./imgs/new2.svg" />
                        </span>
                        <span class="report-head-name">{{item.reportMsgName}}</span>
                    </tap>
                    <span v-if="!isActivityReport"
                          class="report-head-time">{{item.createTime | translateTime}}</span>
                </p>
                <p>
                    <tap @tap="goDetail">
                        {{item.diagram && item.diagram.diagramData ? item.diagram.diagramData.introduction:(item.remark || '')}}
                    </tap>
                </p>
            </template>
        </header>
        <tap class="report-tap" :class="{'desktop_report-tap': isDesktop}" @tap="goDetail()">
            <div class="report-graph" ref="graph" :class="item.reportType === 2?'report-img':''">
                <!--表格数据,表格不能居中，需要flex-start-->
                <div v-if="hasdiagram && (computIsTable === 'table' || computIsTable === 'financeTable')" style="align-self:flex-start;width:100%">
                    <cash-flow-statement :diagram='item && item.diagram' ref="cashflowstatement" :reportType="computIsTable"></cash-flow-statement>
                </div>
                <!-- 员工总结 -->
                <div v-if="item.reportType === 10"
                     class="report-staff"
                     :style="{backgroundImage:getStaffReportImg, 'height':isActivityReport?'100%':''}">
                </div>
                <!-- 老板总结 -->
                <div v-if="item.reportType === 11"
                     class="report-boss">
                </div>
                <div v-if="isEmpty"
                     class="empty-box">
                    <p>
                        <i class="icon empty"></i>
                    </p>
                    <p class="empty-text">
                        {{LANG.TEXT.BOSS_LABAL1}}
                    </p>
                </div>
                <!-- 优化报表秀秀的卡片加载 -->
                <div v-if="(item.reportType === 1 || item.reportType === 3) && isBossNew && loadPic"
                     class="empty-box">
                    <p>
                        <i class="icon empty"></i>
                    </p>
                    <p class="empty-text">
                        {{LANG.TEXT.BOSS_LABAL52}}
                    </p>
                </div>
                <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center" v-show="showCharPic">
                    <img src="#" ref="echarPic" width="100%" :height="echarPicStyle()"/>
                </div>
                <!-- 指标图 -->
                <report-amount v-if="showIndex"
                               :title="title"
                               :amount="amount"
                               :unit="unit"
                               :item="item"></report-amount>
            </div>
        </tap>
        <!--相关用户头像-->
        <tap @tap="goDetail" class="respone-user"
             v-if="isCold&&item.reportType==1 && !isActivityReport">
            <report-footer :users="item.dataResponsibleUser||[]"
                           :isCold="isCold"
                           :isAr="isAr"
                           :userCount="userCount"></report-footer>
        </tap>
        <tap @tap="goDetail" class="respone-user"
             v-if="!isCold && !isActivityReport && (hasdiagram || (item.imageReportVo && item.imageReportVo.fileId))">
            <report-footer :users="item.dataResponsibleUser||[]"
                           :isCold="isCold"
                           :userCount="userCount"></report-footer>
        </tap>
        <!--操作按钮-->
        <card-buttons class="report-buttons"
                      :class="[(isSuper||len<2)?'super-top':'', {desktop: isDesktop}]"
                      :key="item.id">
            <card-button v-if="!isActivityReport">
                <tap @tap="showAvatars(item.dataResponsibleUser,item.id)">{{LANG.TEXT.BOSS_LABAL2}}</tap>
            </card-button>
            <card-button v-if="!isActivityReport">
                <tap @tap="goComment">
                    {{LANG.TEXT.BOSS_LABAL3}}
                </tap>
                <!-- <tap @tap="goChart">
                    讨论
                </tap> -->
            </card-button>

            <card-button v-else>
                <tap @tap="goDetail">{{LANG.TEXT.BOSS_LABAL4}}</tap>
            </card-button>
        </card-buttons>
    </div>
</template>
<script>
import Bus from '../boss/Bus'
import {CardButton, CardButtons} from 'card-components'
import ReportFooter from '../boss/report-footer.vue'
import Tap from 'components/tap'
import ReportAmount from '../boss/report-amount'
import CashFlowStatement from '../boss/cash-flow-statement'
import { getOS } from './util'
import { newIcon, staffReportImg } from './img-base64'
import LANG from '@/lang/cards/boss'

let chartUtil = null
export default {
    data () {
        return {
            LANG,
            isEmpty: false,
            showIndex: false,
            title: '',
            amount: 0,
            unit: '',
            newIcon,
            staffReportImg: '',
            showCharPic: false,
            hasdiagram: false, // 对item的熟悉操作不能触发计算熟悉，改成data中
            loadPic: true, // 因为加载不出来走 Echar渲染，所以不用showCharPic做控制
            computIsTable: ''
        }
    },
    components: {
        ReportFooter,
        Tap,
        CardButtons,
        CardButton,
        ReportAmount,
        CashFlowStatement
    },
    props: {
        item: Object,
        require: true,
        detail: String,
        comment: String,
        isCold: Boolean,
        isSuper: Boolean,
        isAr: Boolean,
        len: Number,
        appId: String,
        isBossNew: {
            type: Boolean,
            default: false
        },
        isNewHeight: {
            type: Boolean,
            default: false
        }
    },
    filters: {
        translateTime (value) {
            let time = new Date(value)
            function formatNum (value) {
                return (value > 9) ? value : ('0' + value)
            }
            let year = ((time.getFullYear() === new Date().getFullYear())) ? '' : (time.getFullYear() + '-')
            let month = formatNum(time.getMonth() + 1)
            let day = formatNum(time.getDate())
            let hour = formatNum(time.getHours())
            let minute = formatNum(time.getMinutes())
            return year + month + '-' + day + ' ' + hour + ':' + minute
        }
    },
    computed: {
        isDesktop () {
            return qing.isDesktop
        },
        userCount () {
            return this.item.dataResponsibleUserCount || 0
        },
        computTableData () {
            if (this.item.diagram && this.item.diagram.diagramData && this.item.diagram.diagramData.yAxis && this.item.diagram.diagramData.yAxis.length && this.item.diagram.diagramData.yAxis[0] && this.item.diagram.diagramData.yAxis[0].data && this.item.diagram.diagramData.yAxis[0].data.length) {
                return true
            } else {
                return false
            }
        },
        isActivityReport () {
            return this.item.reportType === 10 || this.item.reportType === 11
        },
        getStaffReportImg () {
            return 'url(' + staffReportImg + ')' + ' '
        }
    },
    methods: {
        echarPicStyle () {
            // 兼容不同屏幕框度问题
            if (this.cold) {
                return 'auto'
            } else if (this.item.reportType === 2) {
                return 'auto'
            } else if (this.hasdiagram && this.item.diagram.diagramPattern.type === 'pie') {
                return 'auto'
            } else if (this.isNewHeight) {
                return 'auto'
            } else {
                return '100%'
            }
        },
        showAvatars (users, reportId) {
            Bus.$emit('event-avatars', { users: users, reportId: reportId, userCount: this.userCount })
        },
        onWindowResize () {
            this._chart && this._chart.resize()
        },
        goDetail () {
            Bus.$emit('event-clear')
            // 标记为已读
            if (!this.item.read) {
                this.item.read = true
            }
            let url = ''
            // if (this.isCold) {
            //     if (this.item.reportType === 1) {
            //         url = info.origin + '/api/linkerp/redirect?type=lapp&appId=' + this.appId + '&redirectUrl=/connecterp-lapp/report/detail/' + (this.isSuper ? 'demosuper' : (this.isAr ? 'demoar' : 'demo'))
            //     } else {
            //         url = info.origin + '/api/linkerp/redirect?type=lapp&appId=' + this.appId + '&redirectUrl=/connecterp-lapp/report/about'
            //     }
            // } else {
            //     url = info.origin + '/api/linkerp/redirect?type=lapp&appId=' + this.appId + '&redirectUrl=/connecterp-lapp/report/detail/' + this.item.id
            // }
            if (this.isCold) {
                if (this.item.reportType === 1) {
                    url = info.origin +
                        '/connecterp-lapp/report/detail/' +
                        (this.isSuper ? 'demosuper' : (this.isAr ? 'demoar' : 'demo')) +
                        '?type=lapp&appId=' +
                        this.appId
                } else if (this.item.reportType === 10 || this.item.reportType === 11) {
                    url = info.origin +
                        '/connecterp-activity' +
                        '?from=card&type=lapp&appId=10735'
                } else {
                    url = info.origin +
                        '/connecterp-lapp/report/about' +
                        '?type=lapp&appId=' +
                        this.appId
                }
            } else {
                if (this.isActivityReport) {
                    url = info.origin +
                        '/connecterp-activity' +
                        '?from=card&appId=10735'
                } else {
                    url = info.origin +
                        '/connecterp-lapp/report/detail/' +
                        this.item.id +
                        '?type=lapp&appId=' +
                        this.appId
                }
            }
            if (this.isActivityReport) {
                this.redirectTo({
                    url,
                    appId: 10735
                })
            } else {
                this.redirectTo({
                    url,
                    appId: this.appId
                })
            }
        },
        goComment () {
            Bus.$emit('event-clear')
            let url = ''
            let host = info.origin
            let reportId = this.item.id
            // if (this.isCold) {
            //     url = `${host}/api/linkerp/redirect?type=lapp&appId=${this.appId}&redirectUrl=/connecterp-lapp/report/detail/` + (this.isSuper ? 'demosuper' : (this.isAr ? 'demoar' : 'demo')) + `?to=comment`
            // } else {
            //     url = `${host}/api/linkerp/redirect?type=lapp&appId=${this.appId}&redirectUrl=/connecterp-lapp/report/detail/${reportId}?to=comment`
            // }
            if (this.isCold) {
                url = `${host}/connecterp-lapp/report/detail/` +
                    (this.isSuper ? 'demosuper' : (this.isAr ? 'demoar' : 'demo')) +
                    `?to=comment` +
                    '&type=lapp&appId=' +
                    this.appId
            } else {
                url = `${host}/connecterp-lapp/report/detail/${reportId}?to=comment` +
                    '&type=lapp&appId=' +
                    this.appId
            }
            this.redirectTo({
                url,
                appId: this.appId
            })
        },
        goChart () {
            const responsibleUser = this.item.dataResponsibleUser
            if (!responsibleUser || responsibleUser.length < 3) {
                this.toast(this.LANG.TEXT.BOSS_LABAL5)
                return
            }
            const reportId = this.item.id
            this.createReportResponsibleUserGroup(reportId).then((result) => {
                const groupId = result && result.data && result.data.groupId ? result.data.groupId : ''
                if (groupId) {
                    setTimeout(() => {
                        window.XuntongJSBridge.call('chat', {
                            groupId
                        })
                    }, getOS() === 'ios' ? 1000 : 0)
                } else {
                    this.toast(this.LANG.TEXT.BOSS_LABAL6)
                }
            }, err => {
                const msg = err && err.error ? err.error : ''
                this.toast(msg || this.LANG.TEXT.BOSS_LABAL6)
            })
        },
        createReportResponsibleUserGroup (reportId) {
            let opt = {
                url: '/api/linkerp/interaction/createReportResponsibleUserGroup',
                method: 'POST',
                data: {
                    appId: this.appId,
                    reportMsgId: reportId
                },
                serializer: 'json',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
            return this.request(opt)
        },
        async renderChart () {
            const that = this
            if (this.isCold) {
                /* if (this.item.reportType === 1) {
                    if (!chartUtil) {
                        chartUtil = require('@crm/connecterp-charts')
                    }
                    this._chart = chartUtil.createExample(this.$refs.graph, this.item.option)
                    document.addEventListener('disappear', () => {
                        that._chart.dispose()
                    })
                    document.addEventListener('appear', () => {
                        that._chart = chartUtil.createExample(that.$refs.graph, that.item.option)
                    })
                } else if (this.item.reportType === 10) {
                    // this.$refs.graph.style.backgroundImage = 'url(' + staffReportImg + ')'
                } else {
                    this.$refs.graph.style.backgroundImage = 'url(' + this.item.option + ')'
                } */
                // this.$refs.graph.style.backgroundImage = 'url(' + this.item.option + ')'
                this.$refs.echarPic.src = this.item.option
                this.showCharPic = true
                this.loadPic = false
                return
            }
            // 1--由erp推送报表, 2--用户上传的图片报表, 3--用户填写的简易报表, 4--第三方系统数据, 5--移动端制作推送报表
            if ((this.item.reportType !== 2) && this.computIsTable !== 'table' && this.computIsTable !== 'financeTable') {
                // 加了图表类型 computIsTable 是表格类型，不能走此处
                // 报表秀秀优化
                if (this.isBossNew) {
                    if (this.item.isError) {
                        this.loadPic = false
                        this.isEmpty = true
                        return
                    }
                    if (!this.hasdiagram) {
                        // 后面8个item.diagram是空对象
                        return
                    }
                    if (this.item.diagram.imgUrl) {
                        this.$refs.echarPic.src = this.item.diagram.imgUrl
                        /* this.$refs.echarPic.style.background = `url(${this.item.diagram.imgUrl}) no-repeat center center`
                        this.$refs.echarPic.style.backgroundSize = 'contain' */

                        this.showCharPic = true
                        this.loadPic = false
                        this.isEmpty = false
                        return
                    }
                }
                this.loadPic = false
                // Echar渲染
                if (this.item.isError === 'large') {
                    this.isEmpty = true
                    return
                }
                if (!chartUtil) {
                    chartUtil = require('@crm/connecterp-charts')
                }
                try {
                    this._chart = await chartUtil.createChart(this.$refs.graph, this.item.diagram, {
                        onSelect: () => { }
                    })
                    document.addEventListener('disappear', () => {
                        that._chart.dispose()
                    })
                    document.addEventListener('appear', async () => {
                        that._chart = await chartUtil.createChart(this.$refs.graph, this.item.diagram, {
                            onSelect: () => { }
                        })
                    })
                } catch (e) {
                    try {
                        if (this.item.diagram.diagramPattern && (this.item.diagram.diagramPattern.type === 'indicatrix')) {
                            // 指标图
                            this.showIndex = true
                            this.title = this.item.diagram.diagramPattern.name || ''
                            this.amount = this.item.diagram.diagramData.yAxis[0].data[0] || 0
                            const tmp = this.item.diagram.diagramPattern.globalPattern.replace(/'/g, '"')
                            this.unit = (tmp && JSON.parse(tmp).unit) || ''
                        } else if (this.item.diagram.diagramPattern && (this.item.diagram.diagramPattern.type === 'financeTable') && this.computTableData) {
                            this.isEmpty = false
                        } else {
                            this.isEmpty = true
                        }
                    } catch (e) {
                        this.isEmpty = true
                    }
                }
            } else {
                // report-type=2 是从手机上传图片类型
                // this.$refs.graph.style.backgroundImage = 'url(' + (this.item.imageReportVo ? this.item.imageReportVo.fileId : '') + ')'
                if (this.computIsTable !== 'table' && this.computIsTable !== 'financeTable') {
                    // 因为表格不能把空图片显示出来
                    const imageVo = this.item.imageReportVo
                    if (imageVo) {
                        this.$refs.echarPic.src = /^https?:\/\//.test(imageVo.fileId) ? imageVo.fileId : info.origin + imageVo.fileId
                    } else {
                        this.$refs.echarPic.src = ''
                    }
                    this.showCharPic = true
                }
                this.loadPic = false
                this.isEmpty = false
            }
        }
    },
    created () {
        if (this.item.diagram && this.item.diagram.diagramData) {
            // 刚开始前面两个是有数据的,因为对item的熟悉更改，不会触发computed的计算，所以只能用data来判断
            this.hasdiagram = true
            this.loadPic = false
        }
        if (this.item && this.item.diagram && this.item.diagram.diagramPattern && this.item.diagram.diagramPattern.type) {
            this.computIsTable = this.item.diagram.diagramPattern.type
        }
    },
    mounted () {
        this.renderChart()
    },
    beforeDestroy () {
        this._chart && this._chart.dispose()
        window.removeEventListener('resize', this.onWindowResize)
    },
    watch: {
        'item.diagram' (newVal) {
            if (!newVal.diagramData) {
                return
            }
            this.hasdiagram = true
            this.loadPic = false
            if (this.item && this.item.diagram && this.item.diagram.diagramPattern && this.item.diagram.diagramPattern.type) {
                this.computIsTable = this.item.diagram.diagramPattern.type
            }
            this.renderChart()
        },
        'item.isError' (newVal) {
            if (newVal === 'empty' || newVal === 'large') {
                this.loadPic = false
                if (this.item.imageReportVo && this.item.imageReportVo.fileId) {
                    // 图片类型，如果网络出现异常，图片已经加载好，不能设置isEmpty = true
                    return
                }
                this.isEmpty = true
            } else {
                this.isEmpty = false
            }
        }
    }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../css/variable";

.report-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-shrink: 0;

  .report-head,
  .report-tap,
  .avatars-list {
    width: 100%;
    .px2rem(padding-left, 12);
    .px2rem(padding-right, 12);
  }
  .respone-user {
    width:100%;
    .px2rem(padding-left, 12);
    .px2rem(padding-right, 12);
    .px2rem(margin-bottom, 20);
    .px2rem(margin-top, 10);
  }
  .new-sign {
    img {
      width: 28px;
      height: 12px;
      // 用px2rem或者rem，图标圆角显示有问题
      //   .px2rem(width, 28);
      //   .px2rem(height, 12);
      vertical-align: -0.03rem;
    }
  }
}

.report-buttons {
    width: 100%;
    position: relative;
    bottom: 0;
}

.report-tap {
  overflow:hidden;
  position: relative;
  display: flex;
  flex:1;
}

.tap-container.active {
  opacity: 1;
}

.report-graph {
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  flex:1;/*沾满整个父元素空间，不能用width或height，ios10的部分手机会当成block布局，导致指标图位置异常*/
  align-items: center;
  .report-staff {
    height: 80%;
    background-repeat: no-repeat;
    background-size: cover;
  }
}

.graph-mask {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  bottom: 0;
  width: 100%;
}

.report-head-time {
  float: right;
}

.report-head p:last-of-type {
  .px2rem(font-size, 14);
  color: #768893;
}

.report-img {
  background-repeat: no-repeat;
  background-size: 100% auto;
}

.report-head-mar {
  margin-bottom: 5px;
}

.super-top {
  margin-top: 0 !important;
}

.empty-box {
  text-align: center;
  width: 100%;
  position: absolute;
  left:0;
  top:30%;
  .empty-text {
    margin-top: 0.2rem;
    color: #a4a8ab;
  }
  .empty {
    display: inline-block;
    width: 0.96rem;
    height: 1.1rem;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAA3BAMAAAC4KdQMAAAALVBMVEWUwdiTwNn////j8vqQvtba5+/p9fz0+v3w+P35/P7j8frp8PTb6fDL4/DV5e3IgrovAAAAAnRSTlPsSYtYiOwAAABgSURBVDjLYxBwwQoYGXiNsYILDM5rQrGAVyYMzq+VsIA9QIkgbBKqoxI4JTTS4KAJp8TgcS4VJTTL4WASioQawudJOHUMHn+MJobBL3Eam8Q+oMS6UCzglAnOMhFnKQoATjPwQy3i2gsAAAAASUVORK5CYII=);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100% auto;
  }
}

.desktop {
    margin-bottom: 12px;
}
[totalpage="1"],
[data-swiper-size="1"] {
    .desktop {
        margin-bottom: 0;
    }
}
.desktop_report-tap {
    max-height: 4.42rem;
}
</style>
