<style lang="less" scoped>
    .third-animation-guang-yun {
        position: absolute;
        left: -5.72rem;
        top: -5.14rem;
        width: 7.5rem;
        height: 6.67rem;
        background: url(../../css/header/animation/guangyun.png) no-repeat;
        background-size: 7.5rem;
        opacity: 0;
        animation: gyAnimation3 3s linear;
    }
    @keyframes gyAnimation3 {
        0% {
            opacity: .2;
            transform: translate(0, 0) scale(2);
        }
        100% {
            opacity: 0;
            transform: translate(2.25rem, 2.07rem) scale(2);
        }
    }
    .third-animation-first-cloud {
        position: absolute;
        left: -.44rem;
        top: 1.38rem;
        width: 5.62rem;
        height: 2.34rem;
        background: url(../../css/header/animation/first-yun.png) no-repeat;
        background-size: 5.62rem;
        opacity: 0;
        animation: firstCloudAnimation3 2.4s linear;
    }
    @keyframes firstCloudAnimation3 {
        0% {
            opacity: 0;
            transform: translate(0, 0) scale(.8);
        }
        100% {
            opacity: 1;
            transform: translate(-2.96rem, -3.25rem) scale(1.7); //8s
        }
    }
    .third-animation-second-cloud {
        position: absolute;
        left: 2.4rem;
        top: 1.58rem;
        width: 5.62rem;
        height: 2.34rem;
        background: url(../../css/header/animation/second-yun.png) no-repeat;
        background-size: 5.62rem;
        opacity: 0;
        transform: scale(.7);
        animation: secondCloudAnimation3 3s linear 1.2s;
    }
    @keyframes secondCloudAnimation3 {
        0% {
            opacity: 0;
            transform: translate(0, 0) scale(.5);
        }
        100% {
            opacity: .8;
            transform: translate(2.41rem, -3.71rem) scale(1.5);
        }
    }
    .third-animation-third-cloud {
        position: absolute;
        left: 1.3rem;
        top: 1.3rem;
        width: 5.62rem;
        height: 2.34rem;
        background: url(../../css/header/animation/third-yun.png) no-repeat;
        background-size: 5.62rem;
        opacity: 0;
        animation: thirdCloudAnimation3 3s linear 2.7s;
    }
    @keyframes thirdCloudAnimation3 {
        0% {
            opacity: 0;
            transform: translate(0, 0) scale(.5);
        }
        100% {
            opacity: 1;
            transform: translate(0, -4.15rem) scale(1.7);
        }
    }
    .third-animation-four-cloud {
        position: absolute;
        left: -.86rem;
        top: 1.66rem;
        width: 5.62rem;
        height: 2.34rem;
        background: url(../../css/header/animation/first-yun.png) no-repeat;
        background-size: 5.62rem;
        opacity: 0;
        animation: fourCloudAnimation3 4.5s linear 3.7s;
    }
    @keyframes fourCloudAnimation3 {
        0% {
            opacity: 0;
            transform: translate(0, 0) scale(.5);
        }
        100% {
            opacity: 1;
            transform: translate(-3.54rem, -5rem) scale(1.8);
        }
    }
    .third-animation-five-cloud {
        position: absolute;
        left: 1.92rem;
        top: 1.34rem;
        width: 5.62rem;
        height: 2.34rem;
        background: url(../../css/header/animation/five-yun.png) no-repeat;
        background-size: 5.62rem;
        opacity: 0;
        animation: fiveCloudAnimation3 3.8s linear 4.7s;
    }
    @keyframes fiveCloudAnimation3 {
        0% {
            opacity: 0;
            transform: translate(0, 0) scale(.5);
        }
        100% {
            opacity: 1;
            transform: translate(2.67rem, -4.22rem) scale(2);
        }
    }
</style>

<template>
    <div class="animation">
        <div class="third-animation-guang-yun"></div>
        <div class="third-animation-first-cloud"></div>
        <div class="third-animation-second-cloud"></div>
        <div class="third-animation-third-cloud"></div>
        <div class="third-animation-four-cloud"></div>
        <div class="third-animation-five-cloud"></div>
    </div>
</template>

<script>
    export default {
    }
</script>
