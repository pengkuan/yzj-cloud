<style lang="less" scoped>
    .second-animation-guang-yun {
        position: absolute;
        left: -4.12rem;
        top: -3.48rem;
        width: 7.5rem;
        height: 6.67rem;
        background: url(../../css/header/animation/guangyun.png) no-repeat;
        background-size: 7.5rem;
        opacity: 0;
        animation: gyAnimation2 6s linear;
    }
    @keyframes gyAnimation2 {
        0% {
            opacity: .27;
            transform: translate(0, 0) scale(1.3);
        }
        75% {
            opacity: 1;
            transform: translate(.79rem, .69rem) scale(2.36);
        }
        100% {
            opacity: 0;
            transform: translate(1.13rem, .98rem) scale(2.82);
        }
    }
    .second-animation-first-cloud {
        position: absolute;
        left: -.68rem;
        top: .56rem;
        width: 5.62rem;
        height: 2.34rem;
        background: url(../../css/header/animation/first-yun.png) no-repeat;
        background-size: 5.62rem;
        opacity: 0;
        animation: firstCloudAnimation2 7.5s linear;
    }
    @keyframes firstCloudAnimation2 {
        0% {
            opacity: .3;
            transform: translate(0, 0) scale(.4);
        }
        100% {
            opacity: .13;
            transform: translate(-3.12rem, .46rem) scale(.2);
        }
    }
    .second-animation-second-cloud {
        position: absolute;
        left: -.14rem;
        top: -.04rem;
        width: 5.62rem;
        height: 2.34rem;
        background: url(../../css/header/animation/second-yun.png) no-repeat;
        background-size: 5.62rem;
        opacity: 0;
        animation: secondCloudAnimation2 7.5s linear;
    }
    @keyframes secondCloudAnimation2 {
        0% {
            opacity: .71;
            transform: translate(0, 0) scale(.8);
        }
        100% {
            transform: translate(-5.93rem, -1.24rem) scale(1.48);
        }
    }
</style>

<template>
    <div class="animation">
        <div class="second-animation-guang-yun"></div>
        <div class="second-animation-first-cloud"></div>
        <div class="second-animation-second-cloud"></div>
    </div>
</template>

<script>
    export default {
    }
</script>
