<style lang="less">
    @import '../../../css/variable';

    .notice-wrap{
        .px2rem(padding-top, 42);
        font-family: "PingFangSC-Regular";
    }

    .notice-icon-breakdown{
        .px2rem(width, 117);
        .px2rem(height, 102);
        .px2rem(margin-bottom, 42);
        margin-left: auto;
        margin-right: auto;
        background-image: url("../../../assets/notice/trouble-detail@2x.png");
        background-size: 100% 100%;
    }

    .notice-text{
        .px2rem(margin-left, 19);
        .px2rem(margin-right, 19);
        .px2rem(font-size, 16);
        .px2rem(margin-bottom, 27);
    }
    .notice-section{
        line-height: 1.5em;
        min-height: 1.5em;
        padding-bottom: 1em;
    }
    .telphone{
        color: #51c2ff;
        text-decoration: none;
    }
    .notice-signature,
    .notice-date{
        .px2rem(margin-left, 19);
        .px2rem(margin-right, 19);
        .px2rem(font-size, 16);
        text-align: right;
        line-height: 1.8em;
    }
</style>

<template>
  <div class="notice-wrap">
      <template>
        <div :class="'notice-icon-' + type"></div>
        <div class="notice-text" v-html="text"></div>
        <div v-if="signature" class="notice-signature">{{signature}}</div>
        <div v-if="date" class="notice-date">{{date}}</div>
      </template>
  </div>
</template>

<script>
export default {
    data () {
        return {
            text: null,
            type: '',
            signature: '',
            date: ''
        }
    },
    methods: {
        loadNotice () {
            this.request({
                url: '/cloudwork/platformNotice/queryById',
                method: 'POST',
                data: {
                    type: this.$route.meta.type,
                    id: this.$route.params.id
                }
            }).then(res => {
                if (res.success && res.data) {
                    this.text = this.textFormat(res.data.text)
                    this.type = res.data.type || ''
                    this.date = res.data.date || ''
                    this.signature = res.data.signature || ''
                }
            })
        },
        textFormat (text) {
            text = text.replace(/[\d\-]{11,12}/, n => {
                return `<a href="tel:${n}" class="telphone">${n}</a>`
            })
            return text.split('\n').map(n => {
                return '<div class="notice-section">' + n + '</div>'
            }).join('')
        }
    },
    mounted () {
        if (info.isAndroid && info.isV10) {
            qing.call('setWebViewTitle', {title: '公告'})
        }
        dispatchHTMLEvent('pageIsReady')
        this.loadNotice()
    }
}
</script>
