<style lang="less" scoped>
    @import '../../../css/variable';
    .case-team{
        background: #fff;
        height:100%;
    }
    .case-banner{
        position: relative;
    }
    .case-content{
        position: absolute;
        left:50%;
        top:50%;
        transform:translate(-50%, -50%);
        color:#fff;
        text-align: center;
        h4{
            .px2rem(font-size, 24);
        }
        p{
            .px2rem(font-size, 18);
            .px2rem(padding-bottom, 30);
            word-break: keep-all;
        }
    }

    .case-client{
        display: flex;
        .item{
            flex-shrink:1;
            flex-grow: 1;
            flex-basis: 50%;
        }
        .item:nth-child(1){
            position: relative;

            b{
                border-left:1px solid #fff;
                .px2rem(height, 30);
                position: absolute;
                right:0;
                top:50%;
                transform: translateY(-50%);
            }
        }
        i, span{display: block;}
        i{
            .px2rem(width, 20);
            margin:0 auto 4px;
        }
        span{
            .px2rem(font-size, 14);
        }
        .icon-person{
            .px2rem(width, 22);
        }
    }

    .case-title{
        text-align: center;
        .px2rem(padding-top, 24);
        .px2rem(padding-bottom, 30);
    }
    .next-btn {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #3cbaff;
        text-align: center;
        &:active{
            opacity: .5;
        }
        a{
            .px2rem(font-size, 16);
            .px2rem(height, 44);
            .px2rem(line-height, 44);
            display: block;
            color:#fff;
            text-decoration: none;
        }
    }

    .create-team {
        padding-top: .36rem;
        p{
            color:#3cbaff;
            text-align: center;
            .px2rem(font-size, 14);
            .px2rem(padding-bottom, 12);
        }
        .create-btn{
            .px2rem(height, 44);
            .px2rem(line-height, 44);
            .px2rem(width, 268);
            .px2rem(font-size, 16);
            background:#3cbaff;
            .px2rem(border-radius, 100);
            color:#fff;
            display: block;
            margin:0 auto;
            text-align: center;
            &:active{
                opacity: .5;
            }
        }
    }
    .block{
        i, span{display: block; text-align: center;}
        span{
            color:#768893;
        }
    }
    .case-biglogo{
        display: flex;
        .px2rem(padding-bottom, 24);
        .block;
        li{
            flex-basis: 33.333%;
            flex-grow: 1;
            flex-shrink: 1;
        }
        i{
            .px2rem(width, 60);
            margin:0 auto;
            .px2rem(margin-top, 22);
        }
        .item-wrap{
            border:1px solid #eaeff3;
            border-radius: 50%;
            .px2rem(height, 90);
            .px2rem(width, 90);
            margin:0 auto;
        }
    }

    .case-logos{
        display: flex;
        padding:0 .24rem;
        li {
           flex-basis: 16.666%;
           flex-grow: 1;
           flex-shrink: 1;
           .px2rem(padding-bottom, 32);
        }
        .block;
        i{
            .px2rem(width, 40);
            margin:0 auto;
        }
        span{
            .px2rem(font-size, 10);
            .px2rem(padding-top, 8);
        }
    }

    .guide-next{
        .case-title{
            padding-top:.72rem;
            padding-bottom: .82rem;
        }
        .case-biglogo{
            padding-bottom: .56rem;
        }
    }
</style>

<template>
    <div class="case-team" :class="{'guide-next': isNext}">

        <div class="case-banner">
            <img :src="imgs.top_bg" alt="">
            <div class="case-content">
                <h4>{{LANG.idcReport}}</h4>
                <p>{{LANG.marketLeader}}</p>
                <div class="case-client">
                    <div class="item">
                        <i class="item-icon"><img :src="icons.company" alt=""></i>
                        <span>{{LANG.enterprises}}</span>
                        <b></b>
                    </div>
                    <div class="item">
                        <i class="item-icon icon-person"><img :src="icons.person" alt=""></i>
                        <span>{{LANG.users}}</span>
                    </div>
                </div>
            </div>
        </div>

        <h4 class="case-title">{{LANG.use}}</h4>

        <ul class="case-biglogo">
            <li v-for="item, index of logos" v-if="index < 3">
                <div class="item-wrap">
                    <i><img :src="item.img" alt=""></i>
                    <span>{{item.name}}</span>
                </div>
            </li>
        </ul>

        <ul class="case-logos">
            <li v-for="item, index of logos" v-if="index > 2">
                <i><img :src="item.img" alt=""></i>
                <span>{{item.name}}</span>
            </li>
        </ul>

        <div v-if="!isNext" class="create-team">
            <p>{{LANG.createTeam}}</p>
            <span @click="createShow" class="create-btn">{{LANG.create}}</span>
        </div>

        <div v-if="isNext" @click="hide()" class="next-btn">
            <a  href="javascript:;">{{LANG.next}}</a>
        </div>

    </div>
</template>

<script>
    import {logos, icons} from '@/assets/case/logos'
    import LANG from '@/lang/team'

    export default {
        data () {
            return {
                LANG,
                imgs: {
                    top_bg: require('@/assets/case/bg_1.jpg')
                },
                logos,
                icons,
                isNext: false
            }
        },
        created () {
            if (location.href.includes('case')) {
                console.log(1)
                this.isNext = true
            } else {
                this.isNext = false
            }
        },
        methods: {
            hide () {
                console.log('创建团队_品牌落地页下一步')
                XuntongJSBridge.call('closeWebView')
            },
            createShow () {
                console.log('个人空间_落地页创建团队')
                XuntongJSBridge.call('localFunction', {
                    name: 'createTeam',
                    param: {}
                }, result => {
                    XuntongJSBridge.call('closeWebView')
                })
            }
        },
        mounted () {
            dispatchHTMLEvent('pageIsReady')
        }
    }
</script>
