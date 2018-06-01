<style lang="less">
@import '../../css/variable';
[data-v10][data-mobile] {
    .track-flow-container {
        .card-content {
            .px2rem(min-height, 202);
            .px2rem(height, 202);
        }
    }
}
.track-flow-container {
    height: 100%;
    /*
    position: relative;
    .px2rem(height, 263);
    overflow: hidden;
    */
    .card-content {
        width: 100%;
        height: 100%;
        .px2rem(min-height, 221);
        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            flex-shrink: 0;
            &.disappear {
                width: 0;
                transition: width 500ms linear;
            }
        }
    }
}

[data-mobile][data-v9] {
    .track-flow-container{
        .swiper {
            overflow: visible;
            .swiper-pagination,
            .swiper-pagination-big {
                .px2rem(bottom, 47);
            }
        }
    }
}
</style>

<template>
    <div class="track-flow-container">
        <div class="card-content">
            <template v-if="datas.content && datas.content.length">
                <swiper ref="swiper" :pagination-style="info.isV10 ? 'bottom: 43px;' : ''"  :totalPage="datas.totalElements" :loadedPage="datas.content.length" :paginationMax="datas.pageSize" @slide-change-start="loadMore" indicatorPosition="outline">
                    <tap :class="['item', {'disappear': disappearIdx === index}]" v-for="(item, index) in datas.content" :key="item.id">
                        <component :is="getCompName(item)" :data="item" :actions="actions" @del="removeItem(index)"></component>
                    </tap>
                </swiper>
            </template>
            <template v-else>
                <template v-if="!isFirstLoad">
                    <new-flow></new-flow>
                </template>
                <template v-else>
                    <sample :data="fakeData"></sample>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import Track from './Track/index.js'
// import Swiper from 'components/swiper'
import Tap from 'components/tap'
import MixinCard from 'mixins/card'
import LANG from '@/lang/cards/cloudflow'

const track = LANG.track

const compEnum = {
    '_': 'new-flow',
    'RUNNING': 'normal-flow',
    'SUSPEND': 'normal-flow',
    'FINISH': 'statu-flow',
    'RETURNED': 'statu-flow',
    'TOSUBMIT': 'statu-flow',
    'DISAGREE': 'statu-flow'
}
/*
const fakeCreatTime = function () {
    const today = new Date()
    today.setHours(Math.max(1, today.getHours() - 1))
    return today.getTime()
}
*/
const defaultFakePhoto = function () {
    const dpr = window.devicePixelRatio
    if (dpr <= 2) {
        return require('../../assets/cloudflow/sample_photo@2x.png')
    } else if (dpr <= 2.25) {
        return require('../../assets/cloudflow/sample_photo@2.25x.png')
    } else {
        return require('../../assets/cloudflow/sample_photo@3x.png')
    }
}

export default {
    mixins: [MixinCard],
    props: {
        title: String,
        actions: {
            type: Object,
            default: function () {
                return {}
            }
        },
        card: {
            type: Object,
            required: true
        },
        data: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    components: {
        // Swiper,
        Tap,
        ...Track
    },
    data: function () {
        var today = new Date()
        today.setHours(9)
        today.setMinutes(0)
        today.setSeconds(0)
        today.setMilliseconds(0)
        return {
            LANG: track,
            disappearIdx: -1,
            fakeData: {
                activityCreateTime: new Date() - 1000 * 60 * 5,
                createTime: today.getTime(),
                creator: '58db693653b2a3592dbbdce5',
                feedbackTotal: 0,
                flowTemplateName: `${track.sample.flowTemplateName}`,
                flowTemplateType: 'solid',
                formCodeId: '9a0c154d23a9413e8d4123456add8eac',
                formInstId: '5925732566b1234b7fae3320',
                formPicUrl: 'sp-default',
                name: `${track.sample.userName}`,
                photo: defaultFakePhoto(),
                formTemplateId: '5123456789cada02f80f533f',
                id: '5925741f14cada1aa6d3adfa8',
                serialNo: 'CSWC-20170701-002',
                status: 'RUNNING',
                title: `${track.sample.title}`
            },
            isFirstLoad: false,
            datas: {}
        }
    },
    computed: {
        // 冷启动配置信息
        coldBootConfig: function () {
            if (this.showedColdBoot()) {
                return null
            }
            if (!this.datas.content || !this.datas.content.length) {
                return {
                    message: `${this.LANG.coldBoot.tips}`,
                    buttons: [{
                        text: `${this.LANG.coldBoot.btnTxt}`,
                        hanlder: () => {
                            this.isFirstLoad = false
                        }
                    }]
                }
            }
            return null
        },
        randCreatTime: function () {
            const today = new Date()
            today.setHours(Math.max(1, today.getHours() - 1))
            return today.getTime()
        },
        pageEnd: function () {
            return this.datas.pageSize * this.datas.pageNumber - 2
        }
    },
    watch: {
        data: function (newVal, oldVal) {
            this.initData(newVal)
            /*
            const swiper = this.$refs.swiper
            if (!swiper) {
                return
            }
            swiper.setPage(1)
            */
        }
    },
    methods: {
        initData (newVal) {
            this.datas = JSON.parse(JSON.stringify(newVal))
            this.isFirstLoad = !this.showedColdBoot()
            this.$nextTick(() => {
                this.initSwiperPage(newVal)
            })
        },
        getLastFlowInst: function () {
            const flowInst = sessionStorage.getItem('_t_inst')
            return flowInst || ''
        },
        setLastFlowInst: function (flowInstId) {
            sessionStorage.setItem('_t_inst', flowInstId)
        },
        initSwiperPage: function (newVal) {
            const lastFlowInstId = this.getLastFlowInst()
            const swiper = this.$refs.swiper
            if (!swiper) {
                return
            }
            let initialSwiperIdx = -1
            for (let i = 0, ln = newVal.content.length; i < ln; i++) {
                if (newVal.content[i].id + '' === lastFlowInstId) {
                    this.setLastFlowInst(newVal.content[i].id)
                    initialSwiperIdx = i + 1
                    break
                }
            }
            if (initialSwiperIdx === -1) {
                initialSwiperIdx = 1
            }
            // 如果上次加载的页面>加载临界, 则再加载1页
            if ((initialSwiperIdx <= newVal.content.length) && (initialSwiperIdx > this.pageEnd)) {
                this.loadMore(this.pageEnd)
            }
            this.$nextTick(() => {
                swiper.setPage(initialSwiperIdx, true)
            })
        },
        reloadData: function () {
            this.$emit('request', this.card)
        },
        getCompName: function (item) {
            const defaultComp = compEnum['_']
            return compEnum[item.status.toUpperCase()] || defaultComp
        },
        removeItem: function (index) {
            const isLast = index === this.datas.totalElements - 1
            if (!isLast) {
                this.disappearIdx = index
                setTimeout(() => {
                    this.datas.content.splice(index, 1)
                    this.datas.totalElements = this.datas.totalElements - 1
                    this.disappearIdx = -1
                }, 500)
            } else {
                this.datas.content.splice(index, 1)
                this.datas.totalElements = this.datas.totalElements - 1
                if (index > 0) {
                    const swiperIndex = index // swiper中元素是从1开始计数的，所以会比数组中的索引>1
                    this.$refs.swiper.setPage(swiperIndex)
                }
                // 最后一条数据删掉了，刷新卡片
                this.reloadData()
            }
        },
        loadMore: function (elementNumber) {
            const me = this
            const lastSwiperData = me.datas.content[elementNumber - 1]
            if (lastSwiperData) {
                me.setLastFlowInst(lastSwiperData.id)
            }
            if (this.datas.pageNumber === this.datas.totalPages) { // 分页加载到最后1页
                return
            }
            if (elementNumber !== this.pageEnd) { // 已经显示到加载元素的最后一个
                return
            }
            this.request({
                url: '/openapi/third/v1/workflow/api/v1/flow/myFlowListFromWidget',
                serializer: 'json',
                data: {
                    pageNumber: this.datas.pageNumber + 1,
                    pageSize: this.datas.pageSize,
                    milliseconds: this.datas.milliseconds
                }
            }, (result) => {
                if (result.success === true || result.success === 'true') {
                    me.datas = Object.assign({}, result.data, {
                        content: me.datas.content.concat(result.data.content)
                    })
                }
            })
        }
    },
    mounted: function () {
        if (this.data) {
            this.initData(this.data)
        }
        this._reloadData = this.reloadData.bind(this)
        // document.addEventListener('appear', this._reloadData)
        this.reloadData()
    }
}
</script>
