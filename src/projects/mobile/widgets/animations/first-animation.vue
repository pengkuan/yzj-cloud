<style lang="less" scoped>
    .first-animation-guang-yun {
        position: absolute;
        left: -4.2rem;
        top: -3.6rem;
        width: 7.5rem;
        height: 6.67rem;
        background: url(../../css/header/animation/guangyun.png) no-repeat;
        background-size: 7.5rem;
        opacity: 0;
        transform: scale(1.3);
        animation: gyAnimation1 8s linear;
    }
    @keyframes gyAnimation1 {
        0% {
            opacity: .2;
            transform: translate(0, 0) scale(1.3) rotate(0deg);
        }
        25% {
            opacity: .72;
            transform: translate(.17rem, .14rem) scale(1.56); // 2s
        }
        50% {
            opacity: 1;
            transform: translate(.53rem, .45rem) scale(2.15); // 4s
        }
        100% {
            opacity: 0;
            transform: translate(1.06rem, .89rem) scale(3) rotateZ(-20deg); //8s
        }
    }
</style>

<template>
    <div class="animation">
        <div class="first-animation-guang-yun"></div>
    </div>
</template>

<script>
    export default {
    }
</script>
