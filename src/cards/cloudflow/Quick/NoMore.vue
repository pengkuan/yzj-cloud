<style lang="less" scoped>
    @import '../../../css/variable.less';
    .blank-flow-cont {
        width: 100%;
        height: 100%;
        font-size: 0;
        line-height: 0;
        text-align: center;
        box-sizing: border-box;
        .px2rem(padding-bottom, 43);
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
            .px2rem(margin-top, 18);
            text-align: center;
            color: #768893;
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
</style>

<template>
    <section class="blank-flow-cont">
        <div>
            <i class="icon"></i>
            <p class="desc">{{LANG.nomore}}~</p>
        </div>
    </section>
</template>

<script>
import LANG from '@/lang/cards/cloudflow'

const quick = LANG.quick

export default {
    data () {
        return {
            LANG: quick
        }
    }
}
</script>

