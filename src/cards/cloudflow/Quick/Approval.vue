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
    .content {
        .px2rem(height, 178);
        .px2rem(padding-left, 24);
        .px2rem(padding-right, 24);
        .header {
            font-style: normal;
            font-weight: 400;
            color: #1d1d1d;
            .px2rem(font-size, 14);
            .px2rem(line-height, 20);
            .px2rem(height, 20);
            .px2rem(margin-bottom, 12);
            max-width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: keep-all;
            overflow: hidden;
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
    <section class="flow-statu-wrap">
        <tap class="content" @tap="gotoDetail(data)">
            <h6 class="header">{{ data.title}}</h6>
            <ul class="fields-wrap">
                <li class="field" v-for="(value, key, index) in data.extendMap" :key="index">
                    <label class="label">{{ key }}：</label>
                    <span class="text">{{ value }}</span>
                </li>
            </ul>
        </tap>
        <card-buttons class="resetDeskBtn">
            <card-button v-show="!agreed" type="action" @tap="_confirmAgree">{{LANG.quickAgreeBtnTxt}}</card-button>
            <card-button v-show="agreed" :disabled="agreed">{{LANG.agreedBtnTxt}}</card-button>
        </card-buttons>
    </section>
</template>
<script>
import {CardButton, CardButtons} from 'card-components'
import Tap from 'components/tap'
import { isValidDate, formatDate, nativeValidate } from '@/utils'
import LANG from '@/lang/cards/cloudflow'

const quick = LANG.quick

export default {
    components: {
        CardButton,
        CardButtons,
        Tap
    },
    props: {
        card: Object,
        data: {
            type: Object,
            required: true
        },
        actions: {
            type: Object,
            required: true
        }
    },
    data: function () {
        return {
            agreed: false,
            LANG: quick,
            lightAppId: '101091520'
        }
    },
    methods: {
        _confirmAgree: function () {
            const me = this
            if (me.data.fingerPrint * 1 === 1) {
                nativeValidate({
                    type: 'touchID',
                    lightAppId: me.lightAppId,
                    prompt: `${this.LANG.fingerPrintTips}`,
                    callback: function () {
                        me.agreeConfirm()
                    }
                })
            } else {
                me.agreeConfirm()
            }
        },
        agreeConfirm: function () {
            const me = this
            this.request({
                url: '/openapi/third/v1/workflow/api/v1/flow/agreeMsgFromWidget',
                serializer: 'json',
                data: { taskId: me.data.taskId }
            }, (result) => {
                if (result.success === true || result.success === 'true') {
                    me.changeState()
                } else {
                    let errMsg = result.error
                    const errorCode = result.errorCode * 1
                    if (errorCode === 1101034) {
                        errMsg = `${this.LANG.hasRquiredTips}`
                    }
                    me.toast(errMsg)
                }
            })
        },
        formatDate: function (value) {
            const d = new Date(value)
            if (isValidDate(d)) {
                return formatDate(d, 'yyyy-MM-dd HH:mm:ss')
            }
            return value
        },
        changeState: function (result) {
            this.agreed = true
            this.$nextTick(() => {
                setTimeout(() => {
                    this.$emit('slide-next')
                }, 1000)
            })
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
                url: `../approval/${flow.formTemplateId}/${flow.formInstId}/${flow.flowInstId}/workshop`,
                params: `taskId=${flow.taskId}`,
                appId: 10104 // 审批的appId
            })
        }
    }
}
</script>
