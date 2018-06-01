<style lang="less" scoped>
@import '../../../css/variable.less';
[data-v10][data-mobile] {
    .flow-track-wrap {
        .content-wrap {
            .px2rem(height, 167);
        }
    }
}

.flow-track-wrap {
    width: 100%;
    height: 100%;
    .content-wrap {
        .px2rem(height, 178);
        box-sizing: border-box;
        .px2rem(padding-top, 6);
        .px2rem(padding-left, 24);
        .px2rem(padding-right, 24);
        .header {
            .px2rem(height, 20);
            .px2rem(margin-bottom, 24);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title {
                .px2rem(font-size, 14);
                color: #1d1d1d;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-break: keep-all;
                word-wrap: nowrap;
                overflow: hidden;
            }
            .submit-time {
                white-space: nowrap;
                word-break: keep-all;
                word-wrap: nowrap;
                .px2rem(font-size, 12);
                .px2rem(margin-left, 4);
                color: #798893;
            }
        }
        .content {
            .px2rem(height, 100);
            font-size: 0;
            .flow-wrap {
                display: flex;
                justify-content: center;
                align-items: center;
                .px2rem(margin-bottom, 11);
                .bullet {
                    display: inline-block;
                    .px2rem(width, 6);
                    .px2rem(height, 6);
                    border-radius: 50%;
                    .px2rem(margin-top, -2.5);
                    flex-basis: auto;
                    flex-grow: 0;
                    flex-shrink: 0;
                }
                .line {
                    flex-grow: 1;
                    flex-shrink: 1;
                    display: inline-block;
                    .px2rem(height, 1);
                    text-align: center;
                }
                .left {
                    background: -webkit-linear-gradient(left, #fff, #fda32b);
                    .bullet {
                        background-color: #fda32b;
                    }
                }
                .logo {
                    .px2rem(flex-basis, 36);
                    position: relative;
                    z-index: 1;
                    display: inline-block;
                    .px2rem(width, 36);
                    .px2rem(height, 36);
                    border-radius: 50%;
                    overflow: hidden;
                    text-align: center;
                    background-color: #fff;
                }
                .error-icon {
                    display: inline-block;
                    .px2rem(width, 36);
                    .px2rem(height, 36);
                    background-image: url('../../../assets/cloudflow/error.png');
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: 100% auto;
                }
                .group-icon {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    color: #fff;
                    background-color: #3BBAFF;
                    .px2rem(font-size, 16);
                }
                .right {
                    background: -webkit-linear-gradient(left, #d2d4d6, #fff);
                    .bullet {
                        background-color: #d2d4d6;
                    }
                }
            }
            .desc-wrap {
                text-align: center;
                .msg {
                    .px2rem(font-size, 14);
                    color: #1d1d1d;
                }
                .sub-msg {
                    .px2rem(font-size, 12);
                    color: #768893;
                    transform: scale(.8);
                    transform-origin: center center;
                }
            }
        }
    }
    @media only screen and (-webkit-min-device-pixel-ratio: 2.0),
            only screen and (min--moz-device-pixel-ratio: 2.0),
            only screen and (-o-min-device-pixel-ratio: 2),
            only screen and (min-device-pixel-ratio: 2.0),
            only screen and (min-resolution: 2dppx) {
                .error-icon {
                    background-image: url('../../../assets/cloudflow/error@2x.png') !important;
                }
            }
}

[data-pc] {
    .resetDeskBtn {
        margin-bottom: 14px;
    }
}
[totalpage="1"],
[data-swiper-size="1"] {
    .resetDeskBtn {
        margin-bottom: 0;
    }
}
</style>
<template>
    <div class="flow-track-wrap">
        <tap class="content-wrap" @tap="gotoDetail(data)">
            <header class="header">
                <span class="title">{{ data.title }}</span>
                <span class="submit-time">{{ submitTime }}</span>
            </header>
            <div class="content">
                <div class="flow-wrap">
                    <div class="line left">
                        <i class="bullet"></i>
                    </div>
                    <template v-if="isErrorFlow">
                        <div class="logo">
                            <i class="error-icon"></i>
                        </div>
                    </template>
                    <template v-else-if="isGroup">
                        <div class="logo">
                            <i class="group-icon icon-shenpizu iconfont"></i>
                        </div>
                    </template>
                    <template v-else>
                        <img class="logo" :src="data.photo" />
                    </template>
                    <div class="line right">
                        <i class="bullet"></i>
                    </div>
                </div>
                <div class="desc-wrap">
                    <div class="msg">{{ desc }}</div>
                    <div class="sub-msg">{{ subMsg }}</div>
                </div>
            </div>
        </tap>
        <card-buttons class="resetDeskBtn">
            <card-button type="action" :action="actions.remained" :params="remaindParams" :disabled="isErrorFlow" :success-msg="LANG.runningFlow.rememberSuccess">{{ LANG.runningFlow.rememberBtnTxt}}</card-button>
        </card-buttons>
    </div>
</template>
<script>
import { formatDate, nativeValidate } from '@/utils'
import {CardButton, CardButtons} from 'card-components'
import Tap from 'components/tap'
import LANG from '@/lang/cards/cloudflow'

const track = LANG.track

export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        actions: {
            type: Object,
            required: true
        }
    },
    components: {
        CardButtons,
        CardButton,
        Tap
    },
    data: function () {
        return {
            LANG: track,
            lightAppId: '101091520'
        }
    },
    methods: {
        gotoDetail: function (flow) {
            const me = this
            if (flow.fingerPrint * 1 === 1) {
                nativeValidate({
                    type: 'touchID',
                    lightAppId: me.lightAppId,
                    prompt: `${this.LANG.fingerPrintTips}`,
                    callback: function () {
                        me.redirectToDetail(flow)
                    }
                })
            } else {
                me.redirectToDetail(flow)
            }
        },
        redirectToDetail: function (flow) {
            this.redirectTo({
                url: `../approval/${flow.formTemplateId}/${flow.formInstId}/${flow.id}/workshop`,
                params: `taskId=${flow.taskId}`,
                appId: 10104 // 审批的appId
            })
        }
    },
    computed: {
        isToday: function () {
            const today = new Date()
            const createTime = new Date(this.data.createTime)
            return today.getFullYear() === createTime.getFullYear() && today.getMonth() === createTime.getMonth() && today.getDate() === createTime.getDate()
        },
        isYesterday: function () {
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            const createTime = new Date(this.data.createTime)
            return yesterday.getFullYear() === createTime.getFullYear() && yesterday.getMonth() === createTime.getMonth() && yesterday.getDate() === createTime.getDate()
        },
        isErrorFlow: function () {
            return this.data.status.toUpperCase() === 'SUSPEND'
        },
        isGroup: function () {
            return !this.data.name
        },
        desc: function () {
            // 节点异常
            if (this.isErrorFlow) {
                return `${this.LANG.runningFlow.nodeExcep}`
            } else if (this.isGroup) { // 审批中
                return `${this.LANG.runningFlow.approving}`.replace('$$', `${this.data.activityName}`)
            }
            // 待审批
            return `${this.LANG.runningFlow.tobeApprove}`.replace('$$', `${this.data.name}`)
        },
        subMsg: function () {
            let subMsg = this.stayTime
            const errorEnum = {
                'GROUP_NOT_FOUND': `${this.LANG.runningFlow.approveNodeNotFound}`,
                'ACTIVITY_NOT_FOUND': `${this.LANG.runningFlow.approverNotFound}`
            }
            if (this.isErrorFlow) {
                if (this.data.suspendReason) {
                    subMsg = errorEnum[this.data.suspendReason] || `${this.LANG.runningFlow.unhandledError}`
                }
            }
            return subMsg
        },
        stayTime: function () {
            const activityTime = new Date(this.data.activityCreateTime)
            const today = new Date()
            const distance = today - activityTime
            const minMills = 1000 * 60
            const hourMills = minMills * 60
            const dayMills = hourMills * 24
            const days = Math.floor(distance / dayMills)
            const hours = Math.floor((distance % dayMills) / hourMills)
            const mins = Math.floor((distance % dayMills) % hourMills / minMills)
            let timeStr = `${this.LANG.runningFlow.spend} `
            if (days > 0) {
                timeStr += `${days}${this.LANG.runningFlow.days} `
            }
            if (hours > 0) {
                timeStr += `${hours}${this.LANG.runningFlow.hours} `
            }
            if (mins > 0) {
                timeStr += `${mins}${this.LANG.runningFlow.minutes} `
            }
            return timeStr
        },
        submitTime: function () {
            const createTime = new Date(this.data.createTime)
            if (this.isToday) {
                return `${this.LANG.runningFlow.today} ${formatDate(createTime, 'h:mm')}`
            } else if (this.isYesterday) {
                return `${this.LANG.runningFlow.yesterday}${formatDate(createTime, 'h:mm')}`
            }
            return formatDate(createTime, 'yyyy-MM-dd HH:mm')
        },
        remaindParams: function () {
            if (this.isErrorFlow) {
                return null
            }
            return {
                flowInstId: this.data.id
            }
        }
    }
}
</script>
