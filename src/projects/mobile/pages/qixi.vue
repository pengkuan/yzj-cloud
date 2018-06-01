<style lang="less" scoped>
    @import '../../../css/variable';

    #app {
        padding: 0;
        margin: 0;
    }
    .wrap {
        width: 100%;
        height: 100%;
        font-family: PingFangSC-Regular;
    }
    .top-bar{
        .px2rem(height, 20);
        background: #ea537f;
    }
    .head{
        height: 148px;
        background: #ea537f url(../../../assets/activity/detail-banner.png) 50% 50% no-repeat;
        background-size: 100%;
        .px2rem(font-size, 36);
        color: #FFF;
        .head-text{
            .px2rem(padding-top, 5);
            text-align: center;
        }
    }
    .head-zero{
        background: #ea537f url(../../../assets/activity/detail-zero-banner.png) 50% 50% no-repeat;
        background-size: 100%;
        line-height: 148px;
        text-align: center;
        .head-text{
            padding-top: 0;
        }
    }
    .list-wrap {
        .px2rem(padding-bottom, 74);
    }
    .desc{
        .px2rem(font-size, 12);
        color: #768893;
        letter-spacing: 0.12px;
        text-align: left;
        .px2rem(height, 30);
        .px2rem(line-height, 30);
        .px2rem(padding-left, 14);
        .px2rem(padding-right, 14);
    }

    .desc-zero{
        .px2rem(padding-top, 30);
        .px2rem(padding-bottom, 40);
        .px2rem(font-size, 16);
        .px2rem(line-height, 24);
        color: #768893;
        text-align: center;
    }

    .user-list {
        background: #FFF;
        .px2rem(padding-right, 12);
        .px2rem(padding-left, 12);
        overflow-x: hidden;
    }
    .user {
        display: flex;
        align-items: center;
        position: relative;
        .px2rem(height, 60);
        .user-face {
            .px2rem(width, 36);
            .px2rem(height, 36);
            border-radius: 50%;
            overflow: hidden;
            background-color: #F6F6F6;
        }
        .giver-info {
            display: flex;
            flex-direction: column;
            .px2rem(padding-left, 11);
            flex: 1;
            .user-name {
                .px2rem(font-size, 16);
                .px2rem(margin-bottom, 2);
                color: #1D1D1D;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .flower-time {
                .px2rem(font-size, 12);
                color: #768893;
            }
        }
        .resend-btn{
            .px2rem(min-width, 96);
            .px2rem(max-width, 200);
            .px2rem(min-height, 48);
            .px2rem(line-height, 48);
            .px2rem(font-size, 24);
            .px2rem(padding-left, 10);
            .px2rem(padding-right, 10);
            .px2rem(padding-top, 5);
            .px2rem(padding-bottom, 5);
            border: solid 1px #F95182;
            .px2rem(border-radius, 150);
            text-align: center;
            color: #F95182;
            transform: scale(.5);
            transform-origin: right center;
            &.disable-resend-btn {
                border: solid 1px #A4A8AB;
                color: #A4A8AB;
            }
        }
        &::before{
            content: '';
            display: block;
            background: #EEEFF5;
            width: 200%;
            height: 1px;
            position: absolute;
            .px2rem(bottom, 0);
            .px2rem(left, 48);
            transform: scale(0.5);
            transform-origin: 0 0;
        }
    }
    .send-btn-wrap {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        .px2rem(height, 60);
        background: rgba(255, 255, 255, .4);
    }
    .send-btn {
        .px2rem(width, 303);
        .px2rem(height, 44);
        .px2rem(line-height, 44);
        background-image: linear-gradient(139deg, #F95182 0%, #FC5E8C 36%, #FF6492 100%);
        border-radius: 100px;
        color: #fff;
        .px2rem(font-size, 16);
        text-align: center;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%, -50%);
    }
    .more{
        .px2rem(height, 44);
        .px2rem(line-height, 44);
        text-align: center;
        text-decoration: underline;
        color:#5e57cd;
    }
    .loading{
        .px2rem(height, 30);
        .px2rem(line-height, 30);
        text-align: center;
    }
</style>

<style lang="less">
@import '../../../css/variable';
.sendFlowerCls {
    .popup--card {
        background-color: #fff !important;
        .social-share {
            padding-top: 0 !important;
            p {
                .px2rem(margin-bottom, 44) !important;
            }
        }
    }
}
</style>


<template>
    <div class="wrap">
        <div class="top-bar"></div>
        <div :class="{ head: true, 'head-zero': !total }">
            <div class="head-text" v-if="!loading">
                <template v-if="total === 0">
                    {{LANG.flowerCount0}}
                </template>
                <template v-else-if="total === 1">
                    {{LANG.flowerCount1}}
                </template>
                <template v-else>
                    {{substitute(LANG.flowerCountN, {n:total})}}
                </template>
            </div>
        </div>
        <div v-if="total" class="list-wrap">
            <p class="desc">{{LANG.listDesc}}</p>
            <div class="user-list">
                <div class="user" v-for="(user, index) in list" :key="index">
                    <span class="user-face">
                        <img v-lazy="user.giverPhoto" />
                    </span>
                    <div class="giver-info">
                        <span class="user-name">{{user.giverName}}</span>
                        <span class="flower-time">{{user.time}}</span>
                    </div>
                    <tap :class="['resend-btn', {'disable-resend-btn': user.giftResendCount === 1}]" @tap="reSendFlower(user)" :disabled="user.giftResendCount === 1">
                        {{user.giftResendCount === 1 ? LANG.loopbacked : LANG.loopback}}
                    </tap>
                </div>
            </div>
            <div id="more"></div>
            <div class="loading" v-if="loading">{{LANG.loading}}</div>
        </div>
        <div v-if="!total">
            <div class="loading" v-if="loading">{{LANG.loading}}</div>
            <div class="desc-zero" v-if="!loading">
                <div>{{LANG.emptyDesc1}}</div>
                <div>{{LANG.emptyDesc2}}</div>
            </div>
            <!-- <tap class="demo" @tap="goIndex()" :touchEffect="false"></tap> -->
        </div>
        <div class="send-btn-wrap">
            <tap @tap="sendGiftPopUp()" class="send-btn">
                {{LANG.sendFlower}}
            </tap>
        </div>
        <canvas ref="canvasWrap" style="display:none"></canvas>
    </div>
</template>

<script>
import Vue from 'vue'
import tap from 'components/tap'
import '../lib/hidpi-canvas.js'
import activity from 'mixins/activity'
import 'mobile/widgets/popupBox'
import LANG from '@/lang/praise'
import {substitute} from '@/utils'
import bannerImg from '../../../assets/activity/send-flower.png'

var zeroize = function (s) {
    s = s + ''
    if (s.length === 1) s = '0' + s
    return s
}

export default {
    name: 'app',
    mixins: [activity],
    components: {
        tap
    },
    data () {
        return {
            LANG,
            total: 0,
            page: 0,
            size: 20,
            list: [],
            loading: false,
            base64Url: '',
            userType: [0, 1], // 匿名参数
            giftType: 0, // 送花活动
            wechatInfo: {
                title: `${this.userInfo.name} ${LANG.shareMsg1}`,
                description: LANG.shareMsg2,
                thumbData: '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',
                webpageUrl: `${location.protocol}\/\/${location.host}/market/midAutumn2017/sendGift.html?giftType=0&name=${encodeURIComponent(this.userInfo.name)}`
            }
        }
    },
    methods: {
        substitute,
        getList () {
            if (this.loading) {
                return
            }
            if (this.total && (this.list.length >= this.total)) {
                return
            }
            this.loading = true
            return this.request({
                method: 'post',
                url: '/cloudwork/activity/list',
                data: {
                    page: this.page + 1,
                    size: this.size,
                    giftType: this.giftType
                }
            }).then(e => {
                let list = e.data.list || []
                list.forEach(n => {
                    if (typeof n.createTime !== 'number') return
                    let dt = new Date(n.createTime)
                    n.time = zeroize(dt.getFullYear()) + '-' + zeroize(dt.getMonth() + 1) + '-' + zeroize(dt.getDate())
                })
                this.loading = false
                this.list = this.list.concat(list)
                this.page += 1
                this.total = e.data.activityCount || 0
                this.drawCanvas()
            }, (err) => {
                console.log('送花列表获取失败', err)
            })
        },
        sendGiftPopUp () {
            this.$popup(
                {
                    isShare: true,
                    isSharedToClose: true,
                    showChangE: false,
                    headBanner: bannerImg,
                    socialDescription: LANG.socialDescription,
                    className: 'default-mask sendFlowerCls',
                    isNotFirstPage: true,
                    showCardGradient: false,
                    wechatShare: () => this.sendGiftToWechat(this.wechatInfo),
                    workmateShare: () => this.sendGift(this.userType[0], this.giftType),
                    contactShare: () => this.sendGiftToMobile(this.giftType)
                }
            )
        },
        sendGift (userType, giftType) {
            this.sendGiftToWorkmate(userType, giftType).then((res) => {
                this.toastTipText(userType, res)
            })
        },
        sendGiftToMobile (giftType) {
            this.sendGiftToMobileContact(giftType).then((res) => {
                this.toastTipText(this.userType[0], res)
            })
        },
        toastTipText (type, persons) {
            let nameText = persons.length > 2
                ? `${persons[0].name} ${LANG.crowd} ${persons.length} ${LANG.people} `
                : (persons.length === 2 ? `${persons[0].name} ${LANG.and} ${persons[1].name} `
                : `${persons[0].name}`)
            let text = type === this.userType[1]
                ? `${nameText}${LANG.receivedanonymousFlower}🌹🌹🌹`
                : `${nameText}${LANG.receivedFlower}🌹🌹🌹`

            this.toast(text)
        },
        callShareBridge () {
            if (this.base64Url === '') {
                this.base64Url = this.getBase64Url(this.$refs.canvasWrap)
            }
            window.XuntongJSBridge.call('socialShare', {
                shareType: '2',
                shareWay: 'wechat,moments,weibo',
                shareContent: {'imageData': this.base64Url}
            }, (res) => {
                let {success} = res
                if (success) {
                    console.log('送花详情页分享成功')
                }
            })
        },
        reSendFlower (person) {
            this.reSendGiftRequest(person).then((res) => {
                let text = (res.userType === this.userType[1] ? `Ta` : `${res.giverName}`) + ' ' + LANG.receivedResendFlower
                this.toast(text)
                Vue.set(person, 'giftResendCount', 1)
            })
        },
        drawCanvas () { // canvas绘制图片
            // 绘制底图
            let bgImg = new Image()
            bgImg.onload = () => {
                this.$refs.canvasWrap.width = bgImg.width / 2
                this.$refs.canvasWrap.height = bgImg.height / 2
                let ctx = this.$refs.canvasWrap.getContext('2d')
                ctx.drawImage(bgImg, 0, 0, bgImg.width / 2 * window.pixelRatio, bgImg.height / 2 * window.pixelRatio)
                this.createCircle(ctx) // 画空心圆,边框为2px
                this.creatText(ctx) // 绘制文案
                // 绘制用户图像
                let picImg = new Image()
                let photoUrl = `${this.userInfo.photoUrl}&spec=180`
                // 图像必须与页面相同域名， 否则会失败
                photoUrl = photoUrl.replace(/.*\/\/[^\/]*\//, location.protocol + '//' + location.host + '/')
                picImg.src = photoUrl
                // picImg.src = `./static/image/default-photo.png`
                if (picImg.complete) {
                    this.createCircleClip(picImg, ctx)
                    this.base64Url = this.getBase64Url(this.$refs.canvasWrap)
                } else {
                    picImg.onload = () => {
                        this.createCircleClip(picImg, ctx)
                        this.base64Url = this.getBase64Url(this.$refs.canvasWrap)
                    }
                }
            }
            bgImg.src = './static/image/activity/flower-detail-bg.jpg'
        },
        createCircleClip (picImg, context) { // 圆形裁剪区
            context.beginPath()
            context.save()
            // 绘制一个圆
            context.arc(187, 89, 46, 0, 2 * Math.PI)
            context.clip()
            context.drawImage(picImg, 141 * window.pixelRatio, 43 * window.pixelRatio, 92 * window.pixelRatio, 92 * window.pixelRatio)
            context.restore()
        },
        createCircle (context) { // 画空心圆,边框为2px
            context.beginPath()
            context.strokeStyle = '#FFFFFF'
            context.lineWidth = 2
            context.arc(187, 89, 47, 0, 2 * Math.PI)
            context.closePath()
            context.stroke()
        },
        creatText (context) { // 绘制文案
            context.font = '18px 微软雅黑'
            context.fillStyle = '#FFFFFF'
            context.textAlign = 'center'
            context.fillText(`${LANG.charming} ${this.userInfo.name} ${LANG.receiveFlower}`, 187, 165)
            context.font = '40px 微软雅黑'
            var s
            switch (this.total) {
                case 0:
                    s = LANG.flowerCount0
                    break
                case 1:
                    s = LANG.flowerCount1
                    break
                default:
                    s = substitute(LANG.flowerCountN, {n: this.total})
                    break
            }
            context.fillText(s, 187, 217)
        },
        getBase64Url (canvas) {
            let base64
            try {
                base64 = canvas.toDataURL('image/jpeg')
            } catch (e) {
                base64 = ''
            }
            return base64.replace(/^data:image\/(png|jpeg);base64,/, '')
        }
    },
    mounted () {
        dispatchHTMLEvent('pageIsReady')
        document.title = LANG.title
        this.dataly({ event: '打开收花页' })
        this.getList()
        // 禁用反弹
        window.XuntongJSBridge.call('setBounce', {
            enable: 0
        })
        if (info.clientVersion >= 9.56) { // 小于0.9.56版本不支持分享
            window.XuntongJSBridge.call('createPop', {
                popTitle: LANG.share,
                popTitleCallBackId: 'popTitleCallBack'
            }, (res) => {
                let {success} = res
                if (success) {
                    this.callShareBridge()
                }
            })
        }
        let handler
        document.addEventListener('touchend', () => {
            clearTimeout(handler)
            handler = setTimeout(() => {
                let more = document.getElementById('more')
                let elemRect = more.getBoundingClientRect()
                let clientHeight = document.documentElement.clientHeight
                if (elemRect.top < clientHeight) {
                    this.getList()
                }
            }, 100)
        })
    }
}
</script>
