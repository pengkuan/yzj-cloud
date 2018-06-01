<style lang="less" scoped>
    @import '../css/variable';
    .card-intro{
        width: 100%;
        .px2rem(height, 382);
        background: url(./images/boss.png) center center no-repeat;
        background-size: 100% auto;
    }
    [data-lang='en'] {
        .card-intro{
            background-image: url(./images/boss-en.png);
        }
    }
</style>
<template>
  <div class="card-intro" @click="gotoIntro"></div>
</template>
<script>
export default {
    created () {
        this.$emit('setHeight', 382)
    },
    methods: {
        gotoIntro () {
            // 因为介绍页目前只有中文版，所以非中文不跳转
            if (info.language && !info.language.match(/CN/i)) return

            let host = `${location.protocol}//${location.host}`
            window.XuntongJSBridge.call('gotoLightApp', {
                'appId': '',
                'appName': '',
                'urlParam': host + '/operate/guidance/workreport/reportshow-guidance-v9.html?role=2'
            })
        }
    }
}
</script>
