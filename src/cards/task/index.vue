<style lang="less" scoped>
    @import '../../css/variable';
    [data-v10] {
        .card-content.task-items{
            height: 2.8rem;
            min-height: 2.8rem;
            padding: .14rem .22rem 0;
        }
        .card-confim-mask .create-type{
            .px2rem(margin-top, 212);
        }
    }
    .card-wrap{
        position: relative;
    }
    .card-content{
        &.task-items{
            position: relative;
            overflow: hidden;
            height: 3.18rem;
            min-height: 3.18rem;
            padding: .22rem .22rem 0;
        }
        &.scale{
            height: 1.22rem;
            min-height: 1.22rem;
        }
    }
    .card-confim-mask{
        position: absolute;
        width: 100%;
        height: 100%;
        left:0;
        top:0;
        z-index:10;
        background: rgba(255,255,255,0.9);
        h4{
            text-align: center;
            color: #768893;
            .px2rem(padding-top, 40);
            .px2rem(padding-bottom, 14);
            .px2rem(font-size, 16);
        }
        .card-confim-btns{
            position: absolute;
            bottom:0;
            display: flex;
            border-top:.5px solid #EEEFF5;
            .px2rem(height, 42);
            width:100%;
            align-items: center;

            span{
                flex-grow: 1;
                flex-shrink: 1;
                display: block;
                text-align: center;
                color:#1d1d1d;
                &:nth-child(1){
                    border-right:.5px solid #EEEFF5;
                }
                &:active{
                    opacity: .5;
                }
            }
        }
        .card-confirm-content{
            padding:0 .48rem .48rem;
            min-height: 1.6rem;
            max-height: 3.2rem;
            font-size: .28rem;
            color: #1d1d1d;
            position: relative;
            width: 100%;
            box-sizing: border-box;
        }
        .card-confirm-text{
            text-overflow: ellipsis;
            word-break: break-all;
            width: 6rem;
            &.v-center{
                position: absolute;
                top:50%;
                transform: translateY(-50%);
            }
        }
        .card-confirm-info{
            padding:0 .48rem;
            color:#889AA4;
            line-height: .68rem;
        }
        .create-type{
            .create-type-item{
                display: inline-block;
                position:relative;
                top:0;
            }
            text-align: center;
            color:#889AA4;
            .px2rem(font-size, 15);
            .px2rem(margin-top, 242);
            .px2rem(height, 86);
        }
        .cha-container{
            text-align:center;
            .cha{
                display: inline-block;
                .px2rem(width, 31);
                .px2rem(height, 31);
                .px2rem(margin-top, 40);
                background: url(./lib/image/cha.svg) no-repeat;
                .px2rem(background-size, 30);
                &:active{
                    opacity: .5;
                }
            }
        }
    }
    .task-item{
        .px2rem(padding-left, 12);
        .px2rem(padding-right, 12);
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .task-item:last-child{
        // .px2rem(padding-bottom, 15);
    }
    .task-more{
        .px2rem(padding, 10);
        border-top: 1px solid #DDD;
        text-align: center;
    }
    .no-task-icon{
        width: 48px;
        height: 55px;
        background: url(../../assets/task/task.png) 50% 50% no-repeat;
    }
    .empty-list{
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #889AA4;
        font-size: .28rem;
        line-height: .4rem;
        .empty-icon{
            display: inline-block;
            vertical-align: text-top;
            width: .6rem;
            height: .4rem;
            background:url(../../assets/task/smile.png) 50% 50% no-repeat;
            background-size: contain;
            &:active{
                opacity: .5;
            }
        }
        .show-underline{
            display:inline-block;
            border-bottom:1px solid #4598F0;
        }
    }
    .empty-list-new{
        text-align: center;
        color: #889AA4;
        .px2rem(font-size, 14);
        .px2rem(margin-top, 32);
        line-height: .4rem;
        position:relative;
        left: -0.2rem;
        .past-icon{
            .px2rem(margin-right, 8);
            .px2rem(height, 24);
            position:relative;
            top:.06rem;
        }
        .future-icon{
            .px2rem(height, 38);
            vertical-align:middle;
            position:relative;
            top:-.04rem;
        }
        .show-underline{
            display:inline-block;
            border-bottom:1px solid #4598F0;
            &:active{
                opacity: .5;
            }
        }

    }
    @media only screen and (-webkit-min-device-pixel-ratio: 2.0),
        only screen and (min--moz-device-pixel-ratio: 2.0),
        only screen and (-o-min-device-pixel-ratio: 2),
        only screen and (min-device-pixel-ratio: 2.0),
        only screen and (min-resolution: 2dppx){

        .no-task-icon {
            background: url(../../assets/task/task.png) 50% 50% no-repeat;
            background-size: 100% auto;
        }
    }
    .notask-msg{
        .px2rem(padding-top, 20);
        color: #82929c;
        display: block;
        text-align: center;
    }
    .card-buttons{
        position: relative;
    }
    [data-v9]{
        .card-buttons{
            margin-top:.1rem;
        }
    }
    .voice-button{
        .px2rem(width, 40);
        flex: none;
        .iconfont{
            .px2rem(font-size, 19);
            color: #768893;
        }
    }
    .redirect-button{
        // .px2rem(padding-right, 40);
        color:#889AA4;
    }
    .task-item-fadeout{
        animation: fadeout .3s forwards;
    }
    @keyframes fadeout{
        0% { opacity: 1;}
        100% { opacity: 0; height: 0;}
    }
    .create-icon{
        .px2rem(width, 54);
        .px2rem(height, 54);
        .px2rem(margin-bottom, 6);
        border-radius: 50%;
        color:#fff;
        position: relative;
        display: block;
        -webkit-box-flex: 1;
        flex:1;
        &:active{
            opacity: .5;
        }
    }
    .choose-create-type{
        text-align:center;
        .add-icon-container{
            display:inline-block;
        }
        .add-icon{
            display:inline-block;
            width:.88rem;
            height:.88rem;
            background:linear-gradient(139deg,rgba(69,180,255,1),rgba(62,137,252,1));
            border-radius:.44rem;
            &::after{
                content:'';
                display:block;
                margin-left:.25rem;
                margin-top:.25rem;
                width:.38rem;
                height:.38rem;
                background: url(./lib/image/add.svg) no-repeat center center;
                .px2rem(background-size, 19);
            }
        }
    }
    .create-schedule{
        .create-icon{
            background: #4598F0 url(./lib/image/create_schedule.png) no-repeat center center;
            box-shadow: 0px 2px 4px 0px rgba(69,152,240,0.42);
            .px2rem(background-size, 27);
        }
    }
    .create-event{
        .px2rem(margin-left, 47);
        .create-icon{
            background: #3FB7DF url(./lib/image/create_event.png) no-repeat center center;
            box-shadow: 0px 2px 4px 0px rgba(69,184,225,0.42);
            .px2rem(background-size, 27);
        }
    }
    .create-conference{
        .px2rem(margin-left, 47);
        .create-icon{
            background: #4570D3 url(./lib/image/create_conference.png) no-repeat center center;
            box-shadow: 0px 2px 4px 0px rgba(68,112,211,0.42);
            .px2rem(background-size, 26);
        }
    }

    [data-pc] {

    }
    .create-first-enter-active {
      animation: create-in .3s;
    }
    .create-first-leave-active {
      animation: create-in .3s reverse;
    }
    .create-second-enter-active {
      animation: create-in .5s;
    }
    .create-second-leave-active {
      animation: create-in .5s reverse;
    }
    .create-third-enter-active {
      animation: create-in .7s;
    .create-third-leave-active {
      animation: create-in .7s reverse;
    }
    @keyframes create-in {
      from {
        opacity:.7;
        top:.4rem;
      }
      to {
        opacity:1;
        top:0;
      }
    }
    }
    .create-bg-enter-active {
      animation: create-bg .1s;
    }
    .create-bg-leave-active {
      animation: create-bg .1s reverse;
    }
    @keyframes create-bg {
      from {
        opacity:0;
      }
      to {
        opacity:.9;
      }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

</style>

<template>
    <div class="card-wrap">
        <!--新建日程时选择日程类型弹窗-->
        <transition name="create-bg">
            <div class="card-confim-mask" v-if="isShowChoose">
                <div class="create-type">
                    <!-- 新建日程 -->
                    <transition name="create-first">
                        <tap v-if="showTypeItem" class="create-schedule create-type-item" @tap="enterCreate('schedule')">
                            <span class="create-icon"></span>{{LANG.schedule}}
                        </tap>
                    </transition>
                    <!-- 新建会议 -->
                    <transition name="create-second">
                        <tap v-if="showTypeItem" class="create-conference create-type-item" @tap="enterCreate('meeting')">
                            <span class="create-icon" ></span>{{LANG.meeting}}
                        </tap>
                    </transition>
                    <!-- 新建记事 -->
                    <transition name="create-third">
                        <tap v-if="showTypeItem" class="create-event create-type-item" @tap="enterCreate('event')">
                            <span class="create-icon"></span>{{LANG.event}}
                        </tap>
                    </transition>
                </div>
                <div class="cha-container"><span @click="closeChoose" class="cha"></span></div>
            </div>
        </transition>

        <!--日历-->
        <schedule
            @calendar="toCalendar"
            @changemonth="changemonth"
            @setEmptyBg="showEmptyBg = false"
            @setUpdateNewDayStatus="updateNewDay = false"
            :card="card"
            :holiday="{url: '/cloudwork/work/getWorkCalendarByRange.json'}"
            :updateNewDay="updateNewDay"
            v-if="isCalendar"
            :workmsg="data"></schedule>
        <div class="card-content flex-center no-task" v-if="isEmpty && !isCalendar">
            <span class="no-task-icon"></span>
            <div class="notask-msg">
                {{LANG.empty}}
            </div>
        </div>

        <!--当前日期下的日程列表-->
        <div class="card-content task-items" :class="[{scale: dateArr.length === 6}]">
            <task-item :class="{'task-item':true, 'task-item-fadeout': item.fadeout}"
                v-for="(item, index) in workShowList"
                v-if="index < 3 && !isEmpty"
                :key="item.id"
                :data="item"
                :dayTime="day.time"
                @done="done"
                @edit="edit"
                @viewUnread="viewUnread">
            </task-item>
            <div class="empty-list-new" v-if="isEmpty && showEmptyBg">
                <template v-if="day.time < todayTime">
                    <img class="past-icon" src='./lib/image/past.svg'>
                    <span>{{this.defaultTextList[0]}}</span>
                </template>
                <template v-else>
                    <img class="future-icon" src='./lib/image/future.svg'>
                    <span>{{this.defaultTextList[dayNo]}}</span>
                </template>
            </div>
            <!-- <div class="empty-list" v-if="isEmpty">
                <span><i class="empty-icon"></i>{{LANG.empty}}</span>
            </div> -->
        </div>
        <transition name="fade">
            <div class="choose-create-type" v-if="!isShowChoose">
                <tap class="add-icon-container" @tap="enterChoose">
                    <span class="add-icon"></span>
                </tap>
            </div>
        </transition>
    </div>
</template>

<script>
    import TaskItem from './task-item'
    import MixinCard from 'mixins/card'
    import Vue from 'vue'
    import LANG from '@/lang/cards/task'
    import Schedule from './datePicker'
    import Tap from 'components/tap'
    import { isValidDate, formatDate, nativeValidate } from '@/utils'
    export default {
        mixins: [MixinCard],
        props: {
            title: String,
            actions: Object,
            data: Object,
            card: Object
        },
        components: {
            TaskItem,
            Schedule,
            Tap
        },
        data () {
            // day.time dayTime
            let date = new Date()
            const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
            let dayTime = new Date(`${year}/${month}/${day}`).getTime()
            return {
                LANG,
                updateNewDay: false,
                workList: [],
                unDoneWorkList: [],
                stopChaClick: false,
                isEmpty: false,
                showEmptyBg: false,
                isCalendar: true,
                // 当前复选框选中的item
                checkingWork: {},
                workContent: '',
                isShowChoose: false,
                isShowConfirm: false,
                isShowUnreadConfirm: false,
                unreadItem: null,
                todayTime: dayTime,
                day: {
                    time: dayTime
                },
                showTypeItem: false,
                dateArr: [],
                defaultTextList: [
                // 第一个是用户点击过去时间的缺省文案
                    '过去的这一天，好像什么都没做',
                    '新的一天从日程管理开始',
                    '经常错过重要的事，时间助手试一试',
                    '时间往往不知不觉，我们习惯后知后觉',
                    '拖延是一个人的焦虑，焦虑是一群人的拖延',
                    '管理时间的前提，是管理自己',
                    '大部分成功人士，把一切事情都放进日程',
                    '一万小时能做什么？能让你每小时都值一万'
                ]
            }
        },

        computed: {
            dayNo () {
                return (new Date(this.day.time)).getDay() || 7
            },
            myworkAction () {
                return {
                    appid: this.actions.mywork.appid,
                    url: ''
                }
            },
            workTip () {
                let text = this.unDoneWorkList.length ? `${this.unDoneWorkList.length} ${LANG.uncomplete}` : LANG.enter
                return {
                    text
                }
            },
            workShowList () {
                let list = []
                if (this.workList.length <= 3) {
                    return this.workList
                } else {
                    list = this.workList.slice(0, 2)
                    this.unDoneWorkList.length ? list.push({
                        channel: 'toMyWork',
                        content: `${this.unDoneWorkList.length}条未完成`
                    }) : list.push({
                        channel: 'toMyWork',
                        content: '查看更多'
                    })
                }
                return list
            }
        },

        methods: {
            changemonth (arr) {
                this.dateArr = arr
            },
            enterMywork () {
                let act = this.actions.mywork
                this.redirectTo({
                    appid: act.appid,
                    data: {
                        timestamp: this.day.time
                    },
                    url: ''
                })
                if (!this.card.title || !event) return
                this.dataly({
                    position: this.card.title,
                    event: '点击进入时间助手按钮'
                })
            },
            enterChoose () {
                this.isShowChoose = true
                let self = this
                setTimeout(() => {
                    self.showTypeItem = true
                }, 30)
                setTimeout(() => {
                    self.stopChaClick = true
                }, 500) // 延时需大于300（避免穿透事件）
            },
            closeChoose () {
                if (this.stopChaClick) {
                    this.isShowChoose = false
                    this.showTypeItem = false
                    this.stopChaClick = false
                }
            },
            enterCreate (type) {
                let act = this.actions.mywork
                this.redirectTo({
                    appid: act.appid,
                    data: {
                        from: 'card',
                        type: type,
                        timestamp: this.day.time
                    },
                    url: ''
                })
                this.dataly({
                    position: this.card.title,
                    event: `点击新建${type}按钮`
                })
                this.closeChoose()
            },
            // 获取冷启动工作的状态
            getGuides (openid) {
                // let id = `${openid}-guided`
                let guideWorks = this.setGuideWorks(openid)
                this.request({
                    url: '/cloudwork/work/getOperDemoIds.json',
                    method: 'post',
                    serializer: 'json',
                    data: {
                        sourceType: '1'
                    }
                }, resp => {
                    let data = resp.data || []

                    guideWorks.ids.forEach(item => {
                        if (!data.includes(item)) {
                            if (this.workList && this.workList.length < 4 &&
                                this.workList.every(work => work.id !== item)) {
                                this.workList.push(guideWorks.works[item])
                            }
                        }
                    })

                    this.isEmpty = !this.workList.length
                })
            },
            limitStr (str, length) {
                let arr = str.split('')
                let len = arr.length
                let res = ''
                for (var b = 0, i = 0; i < len; i++) {
                    /[^\x00-\xFF]/.test(arr[i]) ? b += 2 : b++
                    if (b >= length) break
                }
                if (b >= length) {
                    res = str.substring(0, i) + '...'
                } else {
                    res = str
                }
                return res
            },
            countLength (str) {
                let arr = str.split('')
                for (var b = 0, i = 0; i < arr.length; i++) {
                    /[^\x00-\xFF]/.test(arr[i]) ? b += 2 : b++
                }
                return b
            },
            setGuideWorks (openid) {
                let ids = [`${openid}-a`, `${openid}-b`, `${openid}-c`]
                const guideWorks = {
                    ids,
                    works: {}
                }

                ids.forEach(item => {
                    guideWorks.works[item] = {
                        id: item,
                        workType: '0',
                        isGuide: true,
                        workSource: '1'
                    }
                })
                guideWorks.works[ids[0]].content = LANG.txtA
                guideWorks.works[ids[1]].content = LANG.txtB
                guideWorks.works[ids[2]].content = LANG.txtC
                return guideWorks
            },
            // 任务列表点击跳转map
            edit (task) {
                let _this = this
                let act = this.actions.mywork
                if (!act) return
                let _redirectTo = function (urlMap) {
                    _this.redirectTo({
                        appid: act.appid,
                        data: {
                            workid: task.id,
                            cowork: task.workSource,
                            workStatus: task.isDone ? 1 : 0,
                            workType: urlMap
                        },
                        url: ''
                    })
                }
                let _openNewWindow = function (url, appId) {
                    window.XuntongJSBridge.call('gotoLightApp', {
                        'appId': appId || '',
                        'appName': '',
                        'urlParam': url
                    })
                }
                let handler = {
                    'toMyWork': function () {
                        _this.redirectTo({
                            appid: act.appid,
                            data: {
                                timestamp: _this.day.time
                            },
                            url: ''
                        })
                    },
                    'meeting': function () {
                        task.isOld = true
                        task.isDone = !task.workStatus
                        _redirectTo('meeting')
                    },
                    'work': function () {
                        task.isOld = true
                        task.isDone = !task.workStatus
                        _redirectTo('work')
                    },
                    'recordWork': function () {
                        _redirectTo('event')
                    },
                    'bigData': function () {
                        if (task.url === 'ownKeyword') {
                            _this.redirectTo({
                                appid: act.appid,
                                data: {
                                    from: 'card',
                                    type: 'keyword',
                                    time: task.originStartDate
                                },
                                url: ''
                            })
                        } else {
                            _this.redirectTo({
                                appid: act.appid,
                                data: {
                                    from: 'card',
                                    type: 'staffanalyze',
                                    time: task.originStartDate
                                },
                                url: ''
                            })
                        }
                    },
                    'award': function () {
                        _openNewWindow(task.url)
                    },
                    'boss': function () {
                        task.isOld = true
                        task.isDone = !task.workStatus
                        _redirectTo('boss')
                    },
                    'birthday': function () {
                        let appObj = JSON.parse(task.url.replace(/'/g, '\"'))
                        _openNewWindow(decodeURIComponent(appObj.urlparam), appObj.appid)
                    },
                    // 5 月 30 号当天, v10 发布会直播日程
                    v10zhibo () {
                        _openNewWindow(task.url)
                    },

                    // v10 升级推送
                    v10update () {
                        _openNewWindow(task.url)
                    },

                    // v10 活动页面
                    touhaowanjia () {
                        _openNewWindow(task.url)
                    },

                    // 跳转到小云介绍页面
                    start2 () {
                        _openNewWindow(task.url)
                    },

                    // 提示用户创建团队
                    start3 () {
                        if (!this.$proms.isMobile) {
                            this.$tip.show({
                                message: '请在手机上查看'
                            })
                            return
                        }
                        if (this.$proms.isMobile) {
                            XuntongJSBridge.call('closePop')
                            XuntongJSBridge.call(
                                'localFunction',
                                {
                                    'name': 'createTeam',
                                    'param': {}
                                },
                                function (result) {
                                    console.log(result)
                                }
                            )
                        }
                    }
                }
                handler[task.channel] ? handler[task.channel]() : handler['work']()
                // (handler[task.channel] || handler['work'])()
            },
            // 查看未读日程
            viewUnread (item) {
                this.unreadItem = item
                this.isShowUnreadConfirm = true
            },

            // 查询选定日期的时间助手
            queryDayWorks (dayTime) {
                return new Promise((resolve, reject) => {
                    this.request({
                        url: '/cloudwork/newwork/dayWorks',
                        method: 'post',
                        serializer: 'json',
                        data: {
                            date: dayTime
                        }
                    }, resp => {
                        resolve(resp)
                    })
                })
            },
            showSpecDayWorkList (dayTime) {
                // console.log('开始获取当前日期日程')
                this.queryDayWorks(dayTime).then(resp => {
                    let tasks = resp.data.works
                    if (this.isV10) {
                        // v10 用户没有升级提示日程
                        tasks = tasks.filter(task => task.channel !== 'v10update')
                    } else {
                        // v10 以下用户没有头号玩家活动日程
                        tasks = tasks.filter(task => task.channel !== 'touhaowanjia')
                    }
                    let doneWorkList = []
                    let unDoneWorkList = []
                    let noStatusWorkList = []
                    // 转换新接口格式为老接口格式
                    tasks.forEach(item => {
                        item.originStartDate = item.startDate
                        item.endDate = formatDate(new Date(item.endDate), 'yyyy-MM-dd HH:mm:ss')
                        item.createDate = formatDate(new Date(item.createDate), 'yyyy-MM-dd HH:mm:ss')
                        item.doneTime = formatDate(new Date(item.doneTime), 'yyyy-MM-dd HH:mm:ss')
                        item.startDate = formatDate(new Date(item.startDate), 'yyyy-MM-dd HH:mm:ss')
                        item.workStatus === 1 ? doneWorkList.push(item) : (item.channel === 'meeting' || item.channel === 'work') ? unDoneWorkList.push(item) : noStatusWorkList.push(item)
                    })
                    doneWorkList.forEach(item => {
                        item.isDone = true
                    })

                    this.unDoneWorkList = this.sortList(unDoneWorkList)
                    this.workList = this.unDoneWorkList.concat(doneWorkList, noStatusWorkList)
                    // 缓存当天workList
                    if (this.todayTime === this.day.time) {
                        window.localStorage.setItem('timehelper_workList', JSON.stringify(this.workList))
                    }
                    // 接口请求完成后将showEmptyBg设为true
                    this.showEmptyBg = true
                    if (!this.workList.length) {
                        this.isEmpty = true
                    } else {
                        this.isEmpty = false
                    }
                })
            },

            // 对日程排序，排序索引顺序从左到右：1 是否为新日程 2是否未读 3 日期
            sortList (unDoneWorkList) {
                var sortTopIndex = 0
                var sortNewIndex
                var sortReadIndex
                var len = unDoneWorkList.length

                for (var k = 0; k < len; k++) {
                    let item = unDoneWorkList[k]
                    if (item.topState === 1) {
                        unDoneWorkList.splice(k, 1)
                        unDoneWorkList.splice(sortTopIndex, 0, item)
                        sortTopIndex++
                    }
                }
                sortNewIndex = sortTopIndex

                for (var i = sortNewIndex; i < len; i++) {
                    let item = unDoneWorkList[i]
                    if (item.cooperationNew === -1) {
                        unDoneWorkList.splice(i, 1)
                        unDoneWorkList.splice(sortNewIndex, 0, item)
                        sortNewIndex++
                    }
                }
                sortReadIndex = sortNewIndex

                for (var j = sortReadIndex; j < len; j++) {
                    let item = unDoneWorkList[j]
                    if (item.readStatus === 0) {
                        unDoneWorkList.splice(j, 1)
                        unDoneWorkList.splice(sortReadIndex, 0, item)
                        sortReadIndex++
                    }
                }
                return unDoneWorkList
            },
            toCalendar (day) {
                this.showSpecDayWorkList(day.time)
                this.day = day
            },
            // 标记完成
            done (item) {
                this.checkingWork = item
                this.workContent = this.limitStr(item.content, 110)
                this.isShowConfirm = true
            },
            setData () {
                let timer = setTimeout(() => {
                    this.getGuides(this.userInfo.openId)
                    clearTimeout(timer)
                }, 100)
            }
        },
        watch: {
            data (newVal) {
                // console.log('收到推送数据：' + JSON.stringify(newVal))
                if (newVal) {
                    this.showSpecDayWorkList(this.day.time)
                }
            }
        },
        created () {
            // console.log('卡片组件初始化')
            // v10用378（+头部57=435）
            this.$emit('setHeight', info.isV10 ? 378 : 410)
            this.showSpecDayWorkList(this.day.time, true)
            // 初始化时候读取worklist缓存
            let timehelperWorkList = window.localStorage.getItem('timehelper_workList')
            if (timehelperWorkList) {
                this.workList = JSON.parse(timehelperWorkList)
            }
            // 设置Interval,10分钟检测一次当前时间,0点后自动切换日历并更新数据
            setInterval(() => {
                let nowTime = new Date()
                const [hour, minutes] = [nowTime.getHours(), nowTime.getMinutes()]
                if (hour === 0 && minutes < 11) {
                    const [year, month, day] = [nowTime.getFullYear(), nowTime.getMonth() + 1, nowTime.getDate()]
                    let dayTime = new Date(`${year}/${month}/${day}`).getTime()
                    this.day.time = dayTime
                    this.showSpecDayWorkList(dayTime, true)
                    // 更新日历组件
                    this.isCalendar = false
                    setTimeout(() => {
                        console.log('测试更新+1')
                        this.isCalendar = true
                    }, 0)
                }
            }, 10 * 60 * 1000)
        }
    }
</script>
