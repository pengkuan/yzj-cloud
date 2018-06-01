<template>
    <div class="date-wrap" v-touch:swipe.left="swipeLeft" v-touch:swipe.right="swipeRight">
        <div class="date-list">
            <div class="date-head">
                <ul>
                    <li> {{LANG.week[0]}} </li>
                    <li> {{LANG.week[1]}} </li>
                    <li> {{LANG.week[2]}} </li>
                    <li> {{LANG.week[3]}} </li>
                    <li> {{LANG.week[4]}} </li>
                    <li> {{LANG.week[5]}} </li>
                    <li> {{LANG.week[6]}} </li>
                </ul>
            </div>
            <div class="date-body">
                <div class="date-loading" v-if="ctrlStatus.isLoading">
                    <span class="date-loading-icon">
                        <img src="../../assets/task/logo.svg"/>
                    </span>
                    <span class="date-loading-text"> {{LANG.load}}...</span>
                </div>
                <div class="dete-calendar" v-if="!ctrlStatus.isLoading">
                    <ul v-for="(week, index) in calendar" :key="index">
                        <li v-for="(day, num) in week" :key="num" :class="[{'passed': day.time < today.time}]" v-touch:tap="selectDay.bind({}, day, index, num)">
                            <span v-if="day.time == ctrlStatus.selectedDay.time" class="date-day" :class="[

                                {'today': day.time == today.time},
                                // 被选中的高亮状态
                                {'selected-day-new': day.time == ctrlStatus.selectedDay.time}]"
                            >
                                <span class="choosed-month-day semibold">{{day.day}}</span>
                                <span class="choosed-month">{{day.month}}月</span>
                                <span class="work-new" v-if="day._data.createrPhotoUrl"><img :src="day._data.createrPhotoUrl" alt=""></span>
                            </span>
                            <span v-else class="date-day" :class="[
                                {'today': day.time == today.time},
                                // 右上角是否有任务的状态标识
                                {'undone': day._data.hasUndoneWork === true},
                                {move: day._data.isHoliday && (!day._data.hasUndoneWork && !day._data.hasDoneWork) ||
                                    day._data.isMakeUpWorkDay && (!day._data.hasUndoneWork && !day._data.hasDoneWork)}]">

                                <span class="semibold">{{day.day}}</span>

                                <span v-if="day._data.hasDoneWork && !day._data.hasUndoneWork" class="finished"></span>

                                <span class="date-stats" v-if="!day._data.hasUndoneWork && !day._data.hasDoneWork">
                                    <i class="date-festival date-makeup-rest" v-if="day._data.isHoliday && day._data.holidayName && !isEn">{{day._data.holidayName === '休' ? '假' : day._data.holidayName}}</i>
                                    <i class="date-makeup" v-if="day._data.isMakeUpWorkDay && !isEn">{{day._data.holidayName}}</i>
                                </span>
                                <span class="work-new" v-if="day._data.createrPhotoUrl"><img :src="day._data.createrPhotoUrl" alt=""></span>
                                <!-- <i class="date-month" v-if="day.day === 1">{{day.month}}月</i> -->
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import vueTouchEvents from './lib/vue-touch-events'
import LANG from '@/lang/cards/task'
Vue.use(vueTouchEvents)
export default {
    data () {
        let date = new Date()
        let today = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        let todayObj = {
            date: today,
            time: today.getTime()
        }
        return {
            LANG,
            days: null,
            today: todayObj,
            // 记录切换前上一天的索引
            preWeekIndex: null,
            preDayIndex: null,
            // 日历月份切换状态控制
            ctrlStatus: {
                // 当前默认的年月
                current: {
                    year: 0,
                    month: 0
                },
                // 当前切换的年月
                present: {
                    year: 0,
                    month: 0
                },
                // 被选择的天，以便获取那天的数据
                selectedDay: todayObj,
                // 折叠/打开 日历的状态控制
                toggle: {
                    curRow: undefined
                },
                isLoading: false
            },
            lastNew: undefined,
            festival: [],
            calendar: [],
            latestTouchstartTime: 0,
            latestTouchPos: {}
        }
    },
    props: {
        holiday: {
            type: Object,
            default: () => {
                return {
                    show: true,
                    url: ''
                }
            }
        },
        workmsg: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    computed: {
        isEn () {
            return info.language === 'en-US'
        },
        isShowToday () {
            let cur = this.ctrlStatus.current
            let pre = this.ctrlStatus.present

            return cur.year !== pre.year || cur.month !== pre.month
        }
    },
    mounted () {
        // this.getLocationData()
        // console.log('日历组件mounted')
        this.getCurCalendar(true)
    },
    watch: {
        workmsg (newVal) {
            // console.log('推送数据传递到日历组件，开始获取日历数据')
            if (newVal) {
                this.getCurCalendar(false)
            }
        }
    },

    methods: {
        swipeLeft (e) {
            // this.getDays(1)
        },

        swipeRight (e) {
            // this.getDays(-1)
        },
        // 获取当前月份的日历，isInit标识是否属于初始化
        getCurCalendar (isInit) {
            let date = new Date()
            let [year, month] = [date.getFullYear(), date.getMonth()]
            this.days = this.genDays(year, month)
            this.days = this.spliceCalendarDays(this.days)
            let timehelperDayList = window.localStorage.getItem('timehelper_dayList')
            if (timehelperDayList) {
                this.days = this.improveDays(this.days, JSON.parse(timehelperDayList))
                this.calendar = this.formatRenderCalendar(this.days)
            }
            this.getHoliday(this.days[0].time, this.days[this.days.length - 1].time).then(data => {
                this.days = this.improveDays(this.days, data.dayWorkList)
                this.calendar = this.formatRenderCalendar(this.days)
                // 缓存data.dayWorkList
                window.localStorage.setItem('timehelper_dayList', JSON.stringify(data.dayWorkList))
            })
            this.changeDay(this.ctrlStatus.selectedDay, isInit)
            this.ctrlStatus.present.year = this.ctrlStatus.current.year = year
            this.ctrlStatus.present.month = this.ctrlStatus.current.month = month
        },

        // 根据卡片需要展示的天数截取
        spliceCalendarDays (arr) {
            const tmpArr = []
            let index
            try {
                // 对当前日历进行处理，分成8组
                for (let i = 1; i <= 8; i++) {
                    let row = arr.slice((i - 1) * 7, i * 7)
                    if (row.find(item => item.time === this.today.time)) {
                        index = i - 1
                    }
                    tmpArr.push(row)
                }
                return tmpArr[index - 1].concat(tmpArr[index]).concat(tmpArr[index + 1])
            } catch (err) {}
        },

        // 完善日历数组信息
        improveDays (basicDayList, specDayList) {
            if (basicDayList.length && (basicDayList.length === specDayList.length)) {
                basicDayList.forEach((item, index) => {
                    item['_data'] = specDayList[index]
                })
            }
            return basicDayList
        },

        // 将日历数据格式化为渲染所需
        formatRenderCalendar (data) {
            let rowNum = data && data.length && data.length / 7
            let arr = []
            for (let i = 0; i < rowNum; i++) {
                arr.push(data.slice(i * 7, (i + 1) * 7))
            }
            return arr
        },

        /**
         * @method 切换月份
         * @param {Number} type (0: 切换到当前的月份， 1：下一月， 2： 上一月)
        */
        // getDays (type) {
        //     let present = this.ctrlStatus.present
        //     let current = this.ctrlStatus.current

        //     let prevYear = type === 0 ? current.year : present.year
        //     let prevMonth = type === 0 ? current.month : present.month

        //     let date = new Date(prevYear, prevMonth + type)
        //     let [year, month] = [date.getFullYear(), date.getMonth()]
        //     this.days = this.genDays(year, month)
        //     this.getHoliday(this.days[0].time, this.days[this.days.length - 1].time).then(data => {
        //         this.days = this.improveDays(this.days, data.dayWorkList)
        //     })
        //     this.changeDay({date, time: date.getTime()})
        //     // present.year = year
        //     // present.month = month
        // },

        /**
         * @method changeDay 切换日期
         * @param {Object} day 所选天的对象
        */
        changeDay (day, isInit, weekIndex, dayIndex) {
            this.ctrlStatus.selectedDay = day
            if (this.lastNew && isInit) {
                // console.log('开始更新上一天状态')
                this.updateNewStatus(this.lastNew.time)
                // 切换后立即消除上一天头像
                if (this.preWeekIndex) {
                    this.calendar[this.preWeekIndex][this.preDayIndex]._data.createrPhotoUrl = ''
                } else {
                    // 初始情况
                    this.calendar.forEach(week => {
                        week.forEach(day => {
                            (this.today.time === day.time) && (day._data.createrPhotoUrl = '')
                        })
                    })
                }
            }
            this.lastNew = day
            this.preWeekIndex = weekIndex
            this.preDayIndex = dayIndex
        },

        selectDay (day, weekIndex, dayIndex) {
            this.changeDay(day, true, weekIndex, dayIndex)
            this.$emit('calendar', day)
            this.$emit('setEmptyBg', day)
        },

        /**
         * @method genDays 生成展示的日历数组
         * @param {Number} year 年份
         * @param {Number} month 月份
         * @param {Array} workData 从后端获取的当月任务数据
        */
        genDays (year, month) {
            const days = []
            // 获取当前月份第一天,getDay返回周几（0-6）
            let weekDay = new Date(year, month, 1).getDay()
            if (weekDay === 0) {
                weekDay = 7
            }
            // 自本月1号向前补齐两周（包含当月1号所在周）
            let feedDay = (weekDay + 7 - 1) - 1
            // 产生上一月的后几日，以弥补这月前几天
            while (feedDay >= 0) {
                days.push(this.genDayInfo(year, month, -feedDay, -1))
                feedDay--
            }
            // 产生当月的日期，这里要注意的是根据day传入值的正负，同一month可以生成完全不同的两个月份日期
            for (let i = 1; i <= new Date(year, month + 1, 0).getDate(); i++) {
                days.push(this.genDayInfo(year, month, i, 1))
            }
            // 这里56代表8周（8行）以保证覆盖到'临界点'
            let num = 56
            let daysOfNextMonth = num - days.length
            for (let j = 1; j <= daysOfNextMonth; j++) {
                days.push(this.genDayInfo(year, month + 1, j, 2))
            }
            return days
        },

        // 更新切换日期前那天日程状态
        updateNewStatus (dayTime) {
            return new Promise((resolve, reject) => {
                this.request({
                    url: '/cloudwork/update/updateCooperationNew',
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

        /**
         * @method 返回计算后的日期信息
         * @param {Number} year 年份
         * @param {Number} month 月份
         * @param {Number} num 计算日期的数值
         * @param {Number} type 类型: 1: 当月, -1: 次月,2: 下月
        */
        genDayInfo (year, month, num, type) {
            let date = new Date(year, month, num)
            let day = date.getDate()
            let dayObj = {
                date,
                day,
                month: date.getMonth() + 1,
                type,
                time: date.getTime()
            }
            return dayObj
        },
        getHoliday (startTime, endTime) {
            // console.log('开始获取日历数据')
            return new Promise(resolve => {
                this.request({
                    url: this.holiday.url,
                    method: 'post',
                    serializer: 'json',
                    data: {
                        startTime,
                        endTime
                    }
                }, resp => {
                    resolve(resp.data)
                })
            })
        }
    }
}
</script>
<style lang="less" scoped rel="stylesheet/less">
    [data-v10] {
        .date-list .date-head{
            ul{
                height: .6rem;
            }
            li{
                height: .6rem;
                line-height: .3rem;
            }
        }
        .date-day .semibold{font-weight: 600}
    }
    
    .date-wrap{
        background: #fff;
        min-height: 3.52rem;
        padding:0 .24rem;
    }
    .date-list{
        ul{
            display: flex;
            display: -webkit-box;
            display: box;
            display: -ms-flexbox;
            flex-wrap: wrap;
            transition: all .4s;
            height: 1rem;
            opacity: 1;
            &.fold{
                height: 0;
                opacity: 0;
            }
        }
        li {
            -webkit-box-flex:0 0 14.285%;
            flex:0 0 14.285%;
            width:14.285%;
            text-align: center;
            height: 1rem;
            line-height: 1rem;
        }
        .date-head{
            font-size: .26rem;
            position: relative;
            &::after{
                content: '';
                position: absolute;
                width: 184%;
                transform:translateX(-23%) scale(.5);
                border-bottom:1px solid #E6E8EE;
                bottom:.2rem;
            }
            ul{
                height: .88rem;
            }
            li{
                height: .88rem;
                line-height: .58rem;
            }
        }
        .dete-calendar {
            li {
                span {
                    cursor: pointer;
                }
            }
        }
        .date-body{
            min-height: 3rem;
            position: relative;
            &::after{
                content: '';
                position: absolute;
                width: 184%;
                transform:translateX(-23%) scale(.5);
                border-bottom:1px solid #E6E8EE;
                bottom: -4px;
            }
            li{
                position: relative;
            }
        }
        .date-loading{
            position: absolute;
            left:50%;
            top:44%;
            transform: translate(-50%, -50%);
            .date-loading-icon,
            .date-loading-text{
                display: inline-block;
                vertical-align: middle;
                line-height: .4rem;
                color:#92a0a9;
            }
            .date-loading-icon{
                height: .4rem;
                width: .4rem;
                margin-right: .12rem;
            }
        }
        .other-days {
            color:#a4a8ab;
        }
        .passed{
            color:#a4a8ab;
            .date-rest,
            .date-makeup,
            .date-festival{
                color:#a4a8ab !important;
            }
        }
        .date-day{
            font-size:.30rem;
            font-weight:600;
            display:inline-block;
            height: .82rem;
            width: .82rem;
            line-height: .8rem;
            .work-new{
                position: absolute;
                width: .44rem;
                height: .44rem;
                line-height: .44rem;
                top:-.08rem;
                right:-.07rem;
                background: url(../../assets/task/avator.svg) no-repeat center center;
                border-radius: 50%;
                overflow: hidden;
                img {
                    border-radius: 50%;
                    max-width: 78%;
                    position: relative;
                    top:12%;
                    right:0;
                    // transform: translate(-50%, -50%);
                }
            }
            .work-mark{
                content:'';
                width: .06rem;
                height: .06rem;
                position: absolute;
                border-radius: 50%;
                bottom:.1rem;
                left:50%;
                margin-left: -.03rem;
            }
            &.arranged::after{
                .work-mark;
                background: #3CBAFF;
            }
            &.outdate::after{
                .work-mark;
                background:#E26735;
            }
            &.done::after{
                .work-mark;
                background:#C2CCD0;
            }
            &.undone::after{
                .work-mark;
                background:#C2CCD0;
            }
            .finished{
                position: absolute;
                bottom: 0.1rem;
                left: 40%;
                display: block;
                width: 3px;
                height:1px;
                background: #C2CCD0;
                line-height: 0;
                font-size:0;
                vertical-align: middle;
                -webkit-transform: rotate(45deg);
            }
            .finished::after{
                content:'/';
                display:block;
                width: 7px;
                height:1px;
                background: #C2CCD0;
                -webkit-transform: rotate(-90deg) translateY(-50%) translateX(50%);
            }
        }
        // 日期被选中的状态
        .selected-day{
            color:#fff !important;
            background:#3CBAFF !important;
            border-radius: 50%;
            .date-festival,
            .date-rest,
            .date-makeup{
                color:#fff !important;
            }
            .date-rest{
                display: none;
            }
            &.arranged::after{
                background: #fff;
            }
            &.outdate::after{
                background: #fff;
            }
            &.done::after{
                background: #fff;
            }
            .date-month{
                display: none;
            }
            &.move {
                line-height: .6rem;
                .date-stats{
                    bottom: .16rem;
                }
                &::after{
                    bottom:.22rem;
                }
            }
            &.undone::after{
                background:#ffffff;
            }
            .finished{
                background:#ffffff;
            }
            .finished::after{
                background:#ffffff;
            }
        }
        .selected-day-new{
            color:#fff !important;
            background:#4598F0 !important;
            border-radius: 50%;
            .choosed-month-day{
                position: relative;
                top:-.08rem;
            }
            .choosed-month{
                background:rgba(255,255,255,0.3);
                height: .28rem;
                line-height:.3rem;
                position: absolute;
                width:100%;
                left:0;
                bottom: .07rem;
                text-align:center;
                font-size: .18rem;
            }
        }

        .date-stats{
            line-height: .2rem;
            position: absolute;
            width:100%;
            left:0;
            // bottom: .08rem;
            bottom: 0;
            text-align:center;
        }
        .date-festival,
        .date-rest,
        .date-makeup{
            display: inline-block;
            font-size: .18rem;
            color:#46C7FF;
            line-height: .2rem;
            font-style: normal;
        }
        .date-makeup{
            color:#E26735;
        }
        .date-makeup-rest{
            color:#4598F0;
        }
        .date-makeup-work{
            color:#E26735;
        }
        .today{
            color:#4598F0;
            border-radius: 50%;
        }
        .date-month{
            position: absolute;
            top:-.04rem;
            left:0;
            font-size: .22rem;
            width:100%;
            line-height: .22rem;
            font-style: normal;
            text-align: center;
        }
    }
    .date-bottom{
        text-align: center;
        padding:.1rem;
        position: relative;
        z-index: 100;
        .icon-jiantou{
            transition:all .4s;
            font-size:.07rem;
            color:#9BA4AB;
            transform: rotate(180deg);
            &.fold{
                transform: rotate(0);
            }
        }
    }
</style>
