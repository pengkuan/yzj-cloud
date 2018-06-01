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
                    <ul v-for="week, index in calendar"
                        :key="index">
                        <li v-for="(day, num) in week"
                            :key="day"
                            :class="[
                                {'other-days': day.type !== 1},
                                {'passed': day.time < today.time}
                            ]"
                            v-touch:tap="selectDay.bind({}, day)">

                            <span class="date-day" :class="[
                                {'today': day.time == today.time},
                                // 被选中的高亮状态
                                {'selected-day': day.time == ctrlStatus.selectedDay.time},

                                // 右上角是否有任务的状态标识
                                day._data.hasUndoneWork ? (day.time < today.time ? 'outdate' : 'arranged')
                                : (day._data.hasDoneWork ? 'done' : ''),

                                {move: day._data.isHoliday || day._data.isMakeUpWorkDay
                                    || day._data.hasUndoneWork || day._data.hasDoneWork}]">

                                {{day.day === 1 ? `${LANG.month[day.month-1]}` : day.day}}

                                <span class="date-stats" v-if="!day._data.hasUndoneWork && !day._data.hasDoneWork">
                                    <i class="date-festival" 
                                        v-if="day._data.isHoliday && day._data.holidayName && !isEn"> 
                                        {{day._data.holidayName}}
                                    </i>
                                    <i class="date-rest" 
                                        v-if="day._data.isHoliday && day._data.holidayName !== '休' && !isEn">{{LANG.dayoff}}</i>
                                    <i class="date-makeup" 
                                        v-if="day._data.isMakeUpWorkDay && !isEn"> 
                                        {{day._data.holidayName}} 
                                    </i>
                                </span>
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
                // 加载数据占位状态
                isLoading: false
            },
            festival: []
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
        calendar () {
            const arr = []
            try {
                // 对当前日历进行处理，
                // 分成5组，分组显示，以便折叠
                for (let i = 1; i <= 6; i++) {
                    let row = this.days.slice((i - 1) * 7, i * 7)
                    if (row.length) {
                        arr.push(row)
                    }
                }
                this.$emit('changemonth', arr)
            } catch (err) {
                // console.log(err)
            }
            return arr
        },
        isShowToday () {
            let cur = this.ctrlStatus.current
            let pre = this.ctrlStatus.present

            return cur.year !== pre.year || cur.month !== pre.month
        }
    },
    mounted () {
        this.getcurDays()
    },
    watch: {
        workmsg (newVal) {
            if (newVal) {
                this.getcurDays()
            }
        }
    },
    methods: {
        swipeLeft (e) {
            this.getDays(1)
        },
        swipeRight (e) {
            this.getDays(-1)
        },
        // 获取当前默认月份的日历
        getcurDays () {
            let date = new Date()
            let [year, month] = [date.getFullYear(), date.getMonth()]
            this.days = this.genDays(year, month, [])
            this.getHoliday(this.days[0].time, this.days[this.days.length - 1].time).then(data => {
                this.days = this.genDays(year, month, data.dayWorkList)
            })
            this.changeDay(this.ctrlStatus.selectedDay)
            this.ctrlStatus.present.year = this.ctrlStatus.current.year = year
            this.ctrlStatus.present.month = this.ctrlStatus.current.month = month
        },
        /**
         * @method 切换月份
         * @param {Number} type (0: 切换到当前的月份， 1：下一月， 2： 上一月)
        */
        getDays (type) {
            let present = this.ctrlStatus.present
            let current = this.ctrlStatus.current

            let prevYear = type === 0 ? current.year : present.year
            let prevMonth = type === 0 ? current.month : present.month

            let date = new Date(prevYear, prevMonth + type)
            let [year, month] = [date.getFullYear(), date.getMonth()]
            this.days = this.genDays(year, month, [])
            this.getHoliday(this.days[0].time, this.days[this.days.length - 1].time).then(data => {
                this.days = this.genDays(year, month, data.dayWorkList)
            })
            this.changeDay({date, time: date.getTime()})
            present.year = year
            present.month = month
        },

        /**
         * @method changeDay 切换所选日期的任务
         * @param {Object} day 所选天的对象
        */
        changeDay (day) {
            this.ctrlStatus.selectedDay = {
                date: day.date,
                time: day.time
            }
        },
        selectDay (day) {
            this.changeDay(day)
            this.$emit('calendar', day)
        },
        /**
         * @method genDays 生成展示的日历数组
         * @param {Number} year 年份
         * @param {Number} month 月份
         * @param {Array} workData 从后端获取的当月任务数据
        */
        genDays (year, month, workData) {
            const days = []
            // 获取每月第一天是星期几
            let weekDay = new Date(year, month, 1).getDay()
            if (weekDay === 0) {
                weekDay = 7
            }
            /**
             * 获取上月的最后几天
             * 0: 为上月最后一天，-1: 为上月倒数第二天，以此类推
            */
            let feedDay = (weekDay - 1) - 1
            let index = 0
            // 产生上一月的后几日，以弥补这月前几天
            while (feedDay >= 0) {
                days.push(this.genDayInfo(year, month, -feedDay, -1, workData[index]))
                feedDay--
                index++
            }
            // 产生当月的日期
            for (let i = 1; i <= new Date(year, month + 1, 0).getDate(); i++) {
                days.push(this.genDayInfo(year, month, i, 1, workData[index]))
                index++
            }
            let num = 35
            if (days.length > 35) {
                num = 42
            }
            // 产生下月的头几日，以补充日历的不足
            let daysOfNextMonth = num - days.length
            for (let j = 1; j <= daysOfNextMonth; j++) {
                days.push(this.genDayInfo(year, month + 1, j, 2, workData[index]))
                index++
            }
            return days
        },

        /**
         * @method 返回计算后的日期信息
         * @param {Number} year 年份
         * @param {Number} month 月份
         * @param {Number} num 计算日期的数值
         * @param {Number} type 类型: 1: 当月, -1: 次月,2: 下月
        */
        genDayInfo (year, month, num, type, _data) {
            let date = new Date(year, month, num)
            let day = date.getDate()
            let dayObj = {
                date,
                day,
                month: month + 1,
                type,
                time: date.getTime(),
                _data: _data || {}
            }
            return dayObj
        },
        getHoliday (startTime, endTime) {
            // this.ctrlStatus.isLoading = true
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
                    // this.ctrlStatus.isLoading = false
                    resolve(resp.data)
                })
            })
        }
    }
}
</script>
<style lang="less" scoped rel="stylesheet/less">
    .date-wrap{
        background: #fff;
        min-height:5.28rem;
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
            height: .88rem;
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
            height: .88rem;
            line-height: .88rem;
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
                bottom:.26rem;
            }
            ul{
                height: .88rem;
            }
            li{
                height: .88rem;
                line-height: .58rem;
            }
        }
        .date-body{
            min-height: 4.4rem;
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
            position: absolute;
            // font-weight: 600;
            /*top:50%;*/
            /*left:50%;*/
            /*transform: translate(-50%, -50%);*/
            top:0;
            left:0;
            height: .82rem;
            width: .82rem;
            line-height: .8rem;
            .work-mark{
                content:'';
                width: .06rem;
                height: .06rem;
                position: absolute;
                border-radius: 50%;
                bottom:.1rem;
                /*text-align: center;*/
                left:50%;
                margin-left: -.03rem;
                /*transform: translateX(-50%);*/
                /*-ms-transform:translateX(-50%);*/
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
        }

        .date-stats{
            line-height: .2rem;
            position: absolute;
            width:100%;
            left:0;
            bottom: .08rem;
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
            color:#F58145;
        }
        .today{
            color:#46C7FF;
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
