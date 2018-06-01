<style lang="less" scoped>
@import '../../../css/variable.less';
[data-v10][data-mobile] {
    .flow-statu-wrap {
        .content {
            .px2rem(height, 167);
        }
    }
}

.flow-statu-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    font-size: 0;
    line-height: 0;
    opacity: 1;
    &.removing {
        opacity: 0;
        transition: all 1.5s linear;
    }
    .content {
        position: relative;
        z-index: 0;
        .px2rem(height, 178);
        .px2rem(padding-left, 24);
        .px2rem(padding-right, 24);
        box-sizing: border-box;
        .header {
            font-style: normal;
            font-weight: 400;
            color: #1d1d1d;
            .px2rem(height, 20);
            .px2rem(margin-bottom, 12);
            .px2rem(padding-right, 70);
            &.to-be-submit {
                .px2rem(padding-right, 145);
                span:last-child {
                    display: inline-block;
                    .px2rem(font-size, 14);
                    .px2rem(line-height, 20);
                    .px2rem(width, 75);
                    color: #ff9f27;
                    .px2rem(margin-right, -75)
                }
            }
            span:first-child {
                display: inline-block;
                .px2rem(font-size, 14);
                .px2rem(line-height, 20);
                max-width: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-break: keep-all;
                overflow: hidden;
            }
        }
        .fields-wrap {
            list-style: none;
            padding: 0;
            margin: 0;
            .field {
                padding: 0;
                margin: 0;
                max-width: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-break: keep-all;
                overflow: hidden;
                .label {
                    .px2rem(font-size, 14);
                    .px2rem(line-height, 20);
                    color: #768893;
                    vertical-align: middle;
                }
                .text {
                    .px2rem(font-size, 14);
                    .px2rem(line-height, 20);
                    color: #030303;
                    vertical-align: middle;
                }
            }
        }
        &.removing {
            transform-origin: center center;
            animation: rotating 1.8s linear;
        }
        @keyframes rotating {
            0% {
                transform: translate(0, 0) scale(1) rotate(0);
            }
            20% {
                transform: translate(10%, -15%) scale(.75) rotate(90deg);
            }
            40% {
                transform: translate(20%, -30%) scale(.5) rotate(180deg);
            }
            60% {
                transform: translate(30%, -45%) scale(.25) rotate(270deg);
            }
            100% {
                transform: translate(50%, -75%) scale(0) rotate(450deg);
            }
        }
    }
    .stamp {
        position: absolute;
        .px2rem(right, 12);
        .px2rem(top, -30);
        .px2rem(width, 70);
        .px2rem(height, 70);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% auto;
        &.backed {
            background-image: url('../../../assets/cloudflow/stamp-backed.png');
        }
        &.passed {
            background-image: url('../../../assets/cloudflow/stamp-passed.png');

        }
        &.disagree {
            background-image: url('../../../assets/cloudflow/stamp-disagree.svg');

        }
    }
}

@media only screen and (-webkit-min-device-pixel-ratio: 2.0),
only screen and (min--moz-device-pixel-ratio: 2.0),
only screen and (-o-min-device-pixel-ratio: 2),
only screen and (min-device-pixel-ratio: 2.0),
only screen and (min-resolution: 2dppx) {
    .stamp {
        &.backed {
            background-image: url('../../../assets/cloudflow/stamp-backed@2x.png') !important;
        }
        &.passed {
            background-image: url('../../../assets/cloudflow/stamp-passed@2x.png') !important;
        }
        &.disagree {
            background-image: url('../../../assets/cloudflow/stamp-disagree.svg') !important;
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
    <section :class="['flow-statu-wrap', {'removing': removeAnimation}]" >
        <tap class="content" @tap="gotoDetail(data)">
            <h6 class="header" :class="{'to-be-submit': toBeSubmit}">
                <span>{{ data.title }}</span>
                <template v-if="toBeSubmit">
                    <span>{{ LANG.stopedFlow.tobeSubmit }}</span>
                </template>
            </h6>
            <ul class="fields-wrap">
                <li class="field" v-for="(value, key, index) in data.extendsMap" :key="index">
                    <label class="label">{{ key }}：</label>
                    <span class="text">{{ value }}</span>
                </li>
            </ul>
            <template v-if="isFlowEnd">
                <i :class="['stamp', isPassed? 'passed': 'backed']"></i>
            </template>
            <template v-if="isDisagree">
                <i :class="['stamp', isPassed? 'passed': 'disagree']"></i>
            </template>
        </tap>
        <card-buttons class="resetDeskBtn">
            <!--<card-button type="action" :action="actions.knowIt" :params="removeParams" @action="removeItem">我知道了</card-button>-->
            <template v-if="isPassed || isDisagree">
                <card-button type="action" :action="actions.knowIt" :params="removeParams" @action="removeItem">{{ LANG.stopedFlow.iknowBtnTxt }}</card-button>
            </template>
            <template v-else>
                <card-button @tap="gotoDetail(data)">{{ LANG.stopedFlow.gotoDetailBtnTxt }}</card-button>
            </template>
        </card-buttons>
    </section>
</template>
<script>
import {CardButton, CardButtons} from 'card-components'
import Tap from 'components/tap'
import { nativeValidate } from '@/utils'
import LANG from '@/lang/cards/cloudflow'

const track = LANG.track

export default {
    components: {
        CardButton,
        CardButtons,
        Tap
    },
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
    computed: {
        removeParams: function () {
            return {
                flowInstId: this.data.id
            }
        },
        isPassed: function () {
            return this.data.status.toUpperCase() === 'FINISH'
        },
        toBeSubmit: function () {
            const flowStatus = this.data.status.toUpperCase()
            return flowStatus === 'TOSUBMIT'
        },
        isFlowEnd: function () {
            const flowStatus = this.data.status.toUpperCase()
            return flowStatus === 'FINISH' || flowStatus === 'RETURNED'
        },
        isDisagree: function () {
            const flowStatus = this.data.status.toUpperCase()
            return flowStatus === 'DISAGREE'
        }
    },
    methods: {
        waitFunc: function (mills) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, mills)
            })
        },
        removeItem: function (result) {
            if (result.success === 'true' || result.success === true) {
                const me = this
                me.removeAnimation = true
                setTimeout(() => {
                    me.$emit('del')
                }, 1500)
            }
        },
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
    data: function () {
        return {
            LANG: track,
            removeAnimation: false,
            lightAppId: '101091520'
        }
    }
}
</script>
