<style lang="less" scoped>
    .first-animation-moon {
        position: absolute;
        left: -3.78rem;
        top: -3.5rem;
        width: 8.45rem;
        height: 8.37rem;
        background: url(../../css/header/animation/moon.png) no-repeat;
        background-size: 8.45rem;
        opacity: 0;
        animation: moonAnimation 23s linear;
    }
    @keyframes moonAnimation {
        0% {
            opacity: 1;
            transform: translate(0, 0);
        }
        39% {
            opacity: 1;
            transform: translate(-.19rem, -.36rem); // 9s
        }
        48% {
            opacity: .96;
            transform: translate(-.28rem, -.52rem); // 11s
        }
        100% {
            opacity: 0;
            transform: translate(-.61rem, -1.15rem); //23s
        }
    }
    .first-animation-fog {
        position: absolute;
        left: 2.36rem;
        top: 2.9rem;
        width: 4.7rem;
        height: 6.18rem;
        background: url(../../css/header/animation/fog.png) no-repeat;
        background-size: 4.7rem;
        opacity: 0;
        animation: fogAnimation 20s linear;
    }
    @keyframes fogAnimation {
        0% {
            opacity: .17;
            transform: translate(0, 0) scale(2);
        }
        100% {
            opacity: 0;
            transform: translate(-8.74rem, .06rem) scale(3);
        }
    }
    .first-night-cloud {
        position: absolute;
        left: -2.62rem;
        top: .74rem;
        width: 5.62rem;
        height: 2.34rem;
        background: url(../../css/header/animation/second-yun.png) no-repeat;
        background-size: 5.62rem;
        opacity: 0;
        animation: firstNightAnimation 19s linear;
    }
    @keyframes firstNightAnimation {
        0% {
            opacity: .33;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: .47;
            transform: translate(-2.1rem, .13rem) scale(.7);
        }
    }
    .second-night-cloud {
        position: absolute;
        left: -1.8rem;
        top: -.1rem;
        width: 5.62rem;
        height: 2.34rem;
        background: url(../../css/header/animation/five-yun.png) no-repeat;
        background-size: 5.62rem;
        opacity: 0;
        animation: secondNightAnimation 18s linear;
    }
    @keyframes secondNightAnimation {
        0% {
            opacity: .53;
            transform: translate(0, 0);
        }
        100% {
            opacity: 0;
            transform: translate(1.25rem, -.02rem);
        }
    }
</style>

<template>
    <div class="animation">
        <div class="second-night-cloud"></div>
        <div class="first-animation-moon"></div>
        <div class="first-night-cloud"></div>
        <div class="first-animation-fog"></div>
    </div>
</template>

<script>
    export default {
    }
</script>
