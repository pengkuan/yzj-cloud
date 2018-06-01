<style lang="less" scoped>
    @import '../../../css/variable.less';
    .new-flow-cont {
        width: 100%;
        height: 100%;
        .content {
            .px2rem(height, 178);
            font-size: 0;
            line-height: 0;
            text-align: center;
            &::before {
                content: '';
                width: 1px;
                height: 100%;
                display: inline-block;
                margin-left: -1px;
                vertical-align: middle;
            }
            > div {
                display: inline-block;
                vertical-align: middle;
            }
            .icon {
                display: inline-block;
                .px2rem(width, 48);
                .px2rem(height, 55);
                background-image: url('../../../assets/cloudflow/blank.png');
                background-position: center center;
                background-repeat: no-repeat;
                background-size: 100% auto;
            }
            .desc {
                .px2rem(font-size, 14);
                .px2rem(line-height, 20);
                .px2rem(margin-top, 20.5);
                text-align: center;
                color: #768893;
            }
        }
    }
    @media only screen and (-webkit-min-device-pixel-ratio: 2.0),
        only screen and (min--moz-device-pixel-ratio: 2.0),
        only screen and (-o-min-device-pixel-ratio: 2),
        only screen and (min-device-pixel-ratio: 2.0),
        only screen and (min-resolution: 2dppx){
            .icon {
                background-image: url('../../../assets/cloudflow/blank@2x.png') !important;
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
    <div class="new-flow-cont">
        <section class="content">
            <div>
                <i class="icon"></i>
                <p class="desc">{{ LANG.toNew.tips }}</p>
            </div>
        </section>
        <card-buttons class="resetDeskBtn">
            <card-button type="redirect" :action="detailParams">{{ LANG.toNew.btnTxt }}</card-button>
        </card-buttons>
    </div>
</template>
<script>
import {CardButton, CardButtons} from 'card-components'
import LANG from '@/lang/cards/cloudflow'

export default {
    components: {
        'card-button': CardButton,
        'card-buttons': CardButtons
    },
    computed: {
        detailParams: function () {
            return {
                url: '/',
                appId: 10104 // 审批的appId
            }
        }
    },
    data () {
        return {
            LANG: LANG.track
        }
    }
}
</script>
