<style lang="less" scoped>
@import '../../css/variable';
.card-ov {
    /*
    position: relative;
    .px2rem(height, 263);
    overflow: hidden;
    */
    .card-content {
        width: 100%;
        .px2rem(height, 221);
        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            flex-shrink: 0;
        }
    }
}
</style>

<template>
    <div class="card-ov">
        <div class="card-content">
            <template v-if="datas.content && datas.content.length">
                <swiper ref="swiper" :totalPage="datas.totalElements" :loadedPage="datas.content.length" :paginationMax="5" @slide-change-start="loadMore">
                    <tap class="item" v-for="(item, index) in datas.content" :key="item.flowInstId">
                        <approval :data="item || {}" :actions="actions" @slide-next="changeNext(index)"></approval>
                    </tap>
                </swiper>
            </template>
            <template v-else>
                <template v-if="!isFirstLoad">
                    <no-more></no-more>
                </template>
                <template v-else>
                    <sample :data="fakeData"></sample>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import Quick from './Quick/index.js'
import Swiper from 'components/swiper'
import MixinCard from 'mixins/card'
import Tap from 'components/tap'

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
        Swiper,
        Tap,
        ...Quick
    },
    data: function () {
        return {
            isFirstLoad: false,
            fakeData: {
                extendMap: {
                    流水号: 'YZJ-20170621-666',
                    报销名称: 'V9 发布会入场券',
                    报销金额: '666.00元',
                    所属部门: '云之家',
                    申请日期: '2017-06-20 09:00:00'
                },
                title: '云之家的快捷审批示例'
            },
            initTitle: '快捷审批',
            totalCounts: 0,
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
                    message: '若有待你审批的单据，可利用此卡片进行快捷审批',
                    buttons: [{
                        text: '我知道了',
                        hanlder: () => {
                            this.isFirstLoad = false
                        }
                    }]
                }
            }
            return null
        },
        pageEnd: function () {
            return this.datas.pageSize * this.datas.pageNumber - 2
        }
    },
    watch: {
        data: function (newVal, oldVal) {
            this.datas = JSON.parse(JSON.stringify(newVal))
            this.totalCounts = newVal.totalElements
            this.isFirstLoad = !this.showedColdBoot()
            this.updateTitle()
            this.$nextTick(() => {
                this.initSwiperPage(newVal)
            })
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
        getLastFlowInst: function () {
            const flowInst = sessionStorage.getItem('_q_inst')
            return flowInst || ''
        },
        setLastFlowInst: function (flowInstId) {
            sessionStorage.setItem('_q_inst', flowInstId)
        },
        initSwiperPage: function (newVal) {
            const lastFlowInstId = this.getLastFlowInst()
            const swiper = this.$refs.swiper
            if (!swiper) {
                return
            }
            let initialSwiperIdx = -1
            for (let i = 0, ln = newVal.content.length; i < ln; i++) {
                if (newVal.content[i].flowInstId + '' === lastFlowInstId) {
                    this.setLastFlowInst(newVal.content[i].flowInstId)
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
        changeNext: function (index) {
            const swiper = this.$refs.swiper
            this.totalCounts = this.totalCounts - 1
            if (index !== this.datas.totalElements - 1) {
                const nextIndex = index + 1
                const nextSwiperIndex = nextIndex + 1 // swiper中元素是从1开始计数的，所以会被数组中的索引>1
                swiper.setPage(nextSwiperIndex)
            }
            this.updateTitle()
        },
        updateTitle: function () {
            let title = this.initTitle
            if (this.totalCounts && this.totalCounts > 0) {
                title = title + `（${this.totalCounts}单待审批）`
            }
            this.setTitle(title)
        },

        loadMore: function (elementNumber) {
            const me = this
            const lastSwiperData = me.datas.content[elementNumber - 1]
            if (lastSwiperData) {
                me.setLastFlowInst(lastSwiperData.flowInstId)
            }
            if (this.datas.pageNumber === this.datas.totalPages) { // 最后一个分页已经加载完成
                return
            }
            if (elementNumber !== this.pageEnd) { // 没有到已经加载元素的最后一个
                return
            }
            this.request({
                url: '/openapi/third/v1/workflow/api/v1/flow/widgetTodoList',
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
        this._reloadData = this.reloadData.bind(this)
        // document.addEventListener('appear', this._reloadData)
    }
}
</script>
