<style lang="less">
@import '../../css/variable';
[data-v10][data-mobile] {
    .quick-flow-container {
        .card-content {
            .px2rem(min-height, 202);
            .px2rem(height, 202);
        }
    }
}

.quick-flow-container {
    /*
    position: relative;
    .px2rem(height, 263);
    overflow: hidden;
    */
    .card-content {
        width: 100%;
        .px2rem(min-height, 221);
        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            flex-shrink: 0;
        }
    }
    .empty-message{
        color: #768893; text-align: center; height: 70px; line-height: 50px;
    }
}

[data-mobile][data-v9] {
    .quick-flow-container{
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
    <div class="quick-flow-container">
        <template v-if="datas && datas.length">
            <div class="card-content">
                <swiper ref="swiper" :pagination-style="info.isV10 ? 'bottom: 43px;' : ''" :totalPage="datas.length" :loadedPage="datas.length" :paginationMax="5" @slide-change-start="updateId" indicatorPosition="outline">
                    <tap class="item" v-for="(item, index) in datas" :key="item.todosourceid">
                        <!--<approval :data="item || {}" :actions="actions" @slide-next="changeNext(index)"></approval>-->
                        <component :is="getCompName(item)" :data="getCompData(item)" :actions="actions" @slide-next="changeNext(index)"></component>
                    </tap>
                </swiper>
            </div>
        </template>
        <template v-else>
            <template v-if="!isFirstLoad">
                <div class="empty-message">
                    当前没有待审批的审批单哦~
                </div>
            </template>
            <template v-else>
                <div class="card-content">
                    <sample :data="fakeData"></sample>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
import Quick from './Quick/index.js'
// import Swiper from 'components/swiper'
import MixinCard from 'mixins/card'
import Tap from 'components/tap'
import LANG from '@/lang/cards/cloudflow'

const quick = LANG.quick

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
            type: Array,
            default: function () {
                return {}
            }
        },
        loaded: {
            type: Boolean,
            default: false
        }
    },
    components: {
        // Swiper,
        Tap,
        ...Quick
    },
    data: function () {
        const extendMap = {}
        extendMap[`${quick.sample.serialNoLbl}`] = 'YZJ-20170621-666'
        extendMap[`${quick.sample.nameLbl}`] = `${quick.sample.costName}`
        extendMap[`${quick.sample.amountLbl}`] = `${quick.sample.money}`
        extendMap[`${quick.sample.departLbl}`] = `${quick.sample.departName}`
        extendMap[`${quick.sample.dateLbl}`] = '2017-06-20 09:00:00'
        return {
            LANG: quick,
            isFirstLoad: false,
            fakeData: {
                extendMap: extendMap,
                title: `${quick.sample.title}`
            },
            // initTitle: '快捷审批',
            initTitle: `${quick.title}`,
            totalCounts: 0,
            datas: []
        }
    },
    computed: {
        // 冷启动配置信息
        coldBootConfig: function () {
            if (this.showedColdBoot()) {
                this.isFirstLoad = false
                return null
            }
            this.isFirstLoad = true
            if (!this.datas || !this.datas.length) {
                return {
                    message: `${this.LANG.coldBoot.tips}`,
                    buttons: [{
                        text: `${this.LANG.coldBoot.btnTxt}`,
                        hanlder: () => {
                            this.isFirstLoad = false
                            this.resetHeight()
                        }
                    }]
                }
            }
            return null
        }
    },
    watch: {
        data: {
            handler: function (newVal, oldVal) {
                this.initData(newVal)
                this.$forceUpdate()
            },
            deep: true
        },
        loaded (val) {
            if (this.loaded) {
                this.resetHeight()
            }
        }
    },
    methods: {
        initData (newVal) {
            // 不知道什么原因， Array类型的数组会变成Object
            if (typeof newVal === 'object') {
                newVal = Object.keys(newVal).map(n => newVal[n])
            }
            this.datas = JSON.parse(JSON.stringify(newVal))
            this.totalCounts = newVal && newVal.length
            this.isFirstLoad = !this.showedColdBoot()
            this.$nextTick(() => {
                this.initSwiperPage(newVal)
            })
            this.resetHeight()
        },
        // 当前待办是否为云之家的审批轻应用
        isApproval: function (item) {
            const yzjApprovalReg = /(192\.168\.22\.144|192\.168\.1\.49|yunzhijia\.com|kdweibo\.cn)\/cloudflow(-mobile)?\//g
            return (item.appid * 1 === 10104) && yzjApprovalReg.test(item.url)
        },
        // 获取组件数据。 云之家审批和其他待办的数据格式不同
        getCompData: function (item) {
            return this.isApproval(item) ? item.data || {} : item
        },
        // 获取不同的待办记录对应的展示组件
        getCompName: function (item) {
            return this.isApproval(item) ? 'approval' : 'assist'
        },
        // 获取存储的待办id
        getLastTodoId: function () {
            const todoId = sessionStorage.getItem('_todo_id')
            return todoId || ''
        },
        // 设置待办id
        setLastTodoId: function (todoId) {
            sessionStorage.setItem('_todo_id', todoId)
        },
        // 获取上次访问的页面，如果有就显示，否则显示第一页
        initSwiperPage: function (newVal) {
            const lastTodoId = this.getLastTodoId()
            const swiper = this.$refs.swiper
            if (!swiper) {
                return
            }
            let initialSwiperIdx = -1
            for (let i = 0, ln = newVal.length; i < ln; i++) {
                if (newVal[i].todosourceid + '' === lastTodoId) {
                    initialSwiperIdx = i + 1
                    break
                }
            }
            if (initialSwiperIdx === -1) {
                initialSwiperIdx = 1
            }
            this.$nextTick(() => {
                swiper.setPage(initialSwiperIdx, true)
            })
        },
        // 重新加载数据
        reloadData: function () {
            this.$emit('request', this.card)
        },
        changeNext: function (index) {
            const swiper = this.$refs.swiper
            this.totalCounts = this.totalCounts - 1
            if (index !== this.datas.length - 1) {
                const nextIndex = index + 1
                const nextSwiperIndex = nextIndex + 1 // swiper中元素是从1开始计数的，所以会被数组中的索引>1
                swiper.setPage(nextSwiperIndex)
            }
            // this.updateTitle()
        },
        updateTitle: function () {
            let title = this.initTitle
            if (this.totalCounts && this.totalCounts > 0) {
                title = title + `${this.LANG.subTitle}`.replace('$$', `${this.totalCounts}`)
            }
            this.setTitle(title)
        },
        updateId: function (elementNumber) {
            const me = this
            const lastSwiperData = me.datas[elementNumber - 1]
            if (lastSwiperData) {
                me.setLastTodoId(lastSwiperData.todosourceid)
            }
        },
        // 暂时作废
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
        },
        resetHeight () {
            if ((this.datas && this.datas.length) || this.isFirstLoad) {
                this.setNormalHeight()
            } else {
                this.setMiniHeight()
            }
        }
    },
    mounted: function () {
        this.initData(this.data)
        this._reloadData = this.reloadData.bind(this)
        // document.addEventListener('appear', this._reloadData)
        if (this.loaded) {
            this.resetHeight()
        }
    }
}
</script>
