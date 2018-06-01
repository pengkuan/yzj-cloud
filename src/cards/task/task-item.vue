<style lang="less" scoped>
    @import '../../css/variable';
    [data-v10] {
        .task-item-container{
            .px2rem(height, 43);
        }
    }
    .task-item-container{
        .px2rem(padding-left, 0);
        display: flex;
        flex-direction: row;
        .px2rem(font-size, 16);
        .px2rem(height, 50);
        &.top{
            background:url(../../assets/task/top.png) no-repeat;
        }
    }
    .done-work{
        .task-item-text,
        .task-item-endtime,
        .icon-danxuankuangxuanzhong,
        .task-item-actor{
            color:#B3B7B9 !important;
        }
        .task-item-actor{
            border-color: #B3B7B9;
        }
    }
    .task-item-icon{
        position: relative;
        .px2rem(font-size, 0);
        flex-grow: 0;
        flex-shrink: 0;
        .px2rem(flex-basis, 18);
        width: 0.36rem;
        height: 0.36rem;
        margin-right: 0.075rem;
        .task-item-icon-type{
            position: absolute;
            top: 0.02rem;
            width: 0.32rem;
            height: 0.32rem;
            background-size: cover;
        }
    }
    .meeting-icon {
        background: url(./lib/image/meeting.svg) no-repeat;
    }
    .work-icon {
        background: url(./lib/image/schedule.svg) no-repeat;
    }
    .recordWork-icon {
        background: url(./lib/image/event.svg) no-repeat;
    }
    .award-icon {
        background: url(./lib/image/award.svg) no-repeat;
    }
    .birthday-icon {
        background: url(./lib/image/birthday.svg) no-repeat;
    }
    .boss-icon {
        background: url(./lib/image/boss.svg) no-repeat;
    }
    .bigData-icon {
        background: url(./lib/image/big-data.svg) no-repeat;
    }
    .important-icon {
        display: inline-block;
        position:relative;
        top:.02rem;
        margin-right: .04rem;
        height: .24rem;
        width: .24rem;
        background: url('./lib/image/star.svg') no-repeat;
        background-size: cover;
    }
    .task-item-icon-new{
        display:flex;
        margin-right: 0.15rem;
    }
    .task-item-actor{
        .px2rem(font-size, 12);
        .px2rem(border-radius, 2);
        .px2rem(margin-right, 6);
        display: inline-block;
        border: 1px solid #1d1d1d;
        color:#1d1d1d;
        flex-grow:0;
        flex-shrink: 0;
        .px2rem(flex-basis, 36);
        text-align: center;
        box-sizing: border-box;
    }
    .remind-icon{
        .px2rem(width, 34);
        text-align:center;
        margin-right:.06rem;
        .work-new-tip {
            font-size: .24rem;
            color:#EA5E56;
            font-weight:600;
            line-height:.32rem;
        }
        .three-points {
            background: url(./lib/image/three-points.svg) .05rem .14rem no-repeat;
            display:block;
            margin:auto;
            width: 0.32rem;
            height: 0.32rem;
            background-size: .25rem;
        }
        .work-no-resp {
            border-radius: 2px;
            font-size:.18rem;
            display:inline-block;
            height: .26rem;
            width: .60rem;
            line-height: .26rem;
            color:#fff;
            background:#EA5E56;
            position:relative;
            top:-.06rem;
            .text{
                display:inline-block;
                transform: scale(0.9);
            }
        }
        .task-item-icon-type{
            display:block;
            margin:auto;
            width: 0.32rem;
            height: 0.32rem;
            background-size: cover;
        }
    }
    .task-item-text{
        flex-grow: 1;
        flex-shrink: 1;
        width:4.16rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        .px2rem(font-size, 14);
        color: #1D1D1D;
        .bolder {
            font-weight: bolder;
        }
    }
    .task-item-endtime{
        flex-grow: 0;
        flex-shrink: 0;
        text-align: center;
        .px2rem(line-height, 14);
        // .px2rem(margin-left, 0);
        color:#98A1A8;
        &.outdated{
            color:#eb3635;
        }
        &:active{
            opacity:.5;
        }
        span{
            .px2rem(font-size, 12);
        }
    }
    
    .work-unread-tip {
        position: absolute;
        top: 0.02rem;
        width: 0.5rem;
        border-radius: 0.04rem;
        background: #EA5950;
        &:after{
            content: "未读";
            padding-left: 0.05rem;
            color: #ffffff;
            font-size: 0.2rem;
        }
    }
</style>

<template>
    <tap @tap="edit" class="task-item-container item-background-active" :class="{'done-work': data.isDone}">
        <div class="remind-icon">
            <span class="three-points" v-if="data.channel === 'toMyWork'"></span>
            <span class="work-new-tip" v-else-if="data.readStatus === 0 && (data.channel === 'work' || data.channel === 'meeting')">New</span>
            <span class="work-no-resp" v-else-if="(data.acceptStatus === 0) && (data.channel === 'work' || data.channel === 'meeting')">
                <span class="text">未响应</span>
            </span>
            <span v-else class="task-item-icon-type" :class="(iconClassMap[data.channel] || 'work') + '-icon'"></span>
            <!-- <span v-else class="task-item-icon-type work-icon"></span> -->
        </div>
        <div class="task-item-text">
            <i class="important-icon" v-if="data.topState === 1"></i>
            <div style="display:inline; vertical-align: middle;" :class="{bolder: data.readStatus === 0}">{{data.content}}</div>
        </div>
        <div class="task-item-endtime" :class="isOutdate && isCrossDay ? 'outdated' : ''" v-if="deadline">
            <template v-if="isCrossDay">
                <span class="task-endDay" >{{deadline.day}}</span>
                <span class="task-endtime" >{{LANG.close}}</span>
            </template>
            <template v-else>
                <span class="task-endDay" >{{unCrossDayTime}}</span>
            </template>
        </div>
    </tap>
</template>

<script>
    import Tap from 'components/tap'
    import LANG from '@/lang/cards/task'
    export default {
        data () {
            const iconClassMap = {
                meeting: 'meeting',
                work: 'work',
                recordWork: 'recordWork',
                award: 'award',
                birthday: 'birthday',
                boss: 'boss',
                bigData: 'bigData'
            }
            return {
                LANG,
                isOutdate: false,
                iconClassMap
            }
        },
        props: {
            data: [Object],
            dayTime: [Number]
        },
        components: {
            Tap
        },
        computed: {
            deadline () {
                if (this.data.endDate) {
                    let [dayStr, timeStr] = ['', '']
                    let endDate = new Date(this.data.endDate.replace(/-/g, '/'))

                    let dateString = endDate.toDateString()
                    let tomorrow = Date.now() + 24 * 60 * 60 * 1000
                    let [month, day] = [endDate.getMonth() + 1, endDate.getDate()]
                    let [hours, minutes] = [endDate.getHours(), endDate.getMinutes()]

                    month = month >= 10 ? month : (`0${month}`)
                    day = day >= 10 ? day : (`0${day}`)
                    hours = hours >= 10 ? hours : (`0${hours}`)
                    minutes = minutes >= 10 ? minutes : (`0${minutes}`)

                    if (endDate.getTime() < new Date().getTime()) {
                        this.isOutdate = true
                    }
                    if (new Date().toDateString() === dateString) {
                        dayStr = LANG.today
                    } else {
                        dayStr = `${month}-${day}`
                    }
                    timeStr = `${hours}:${minutes}`
                    return {
                        day: dayStr,
                        time: timeStr
                    }
                } else {
                    return ''
                }
            },
            isCrossDay () {
                let startDate = new Date(this.data.startDate.replace(/-/g, '/'))
                let endDate = new Date(this.data.endDate.replace(/-/g, '/'))
                if (startDate.setHours(0, 0, 0, 0) === endDate.setHours(0, 0, 0, 0)) {
                    return
                }
                let channel = this.data.channel
                if (channel !== 'work' && channel !== 'meeting') {
                    return
                }
                return true
            },
            unCrossDayTime () {
                let _padStart2 = (val) => {
                    if (val < 10) {
                        return '0' + val
                    } else {
                        return val
                    }
                }
                if (this.data.startDate && this.data.endDate) {
                    let startHour = _padStart2(new Date(this.data.startDate.replace(/-/g, '/')).getHours())
                    let startMinute = _padStart2(new Date(this.data.startDate.replace(/-/g, '/')).getMinutes())
                    let endHour = _padStart2(new Date(this.data.endDate.replace(/-/g, '/')).getHours())
                    let endMinute = _padStart2(new Date(this.data.endDate.replace(/-/g, '/')).getMinutes())
                    const channel = this.data.channel
                    let showOneTimeMap = ['recordWork', 'birthday', 'boss', 'award', 'bigData', 'v10zhibo']
                    let showTwoTimeMap = ['meeting', 'work']
                    if (showOneTimeMap.some(item => item === channel)) {
                        return endHour + ':' + endMinute
                    } else if (showTwoTimeMap.some(item => item === channel)) {
                        return `${startHour}:${startMinute} - ${endHour}:${endMinute}`
                    } else {
                        return this.deadline.day
                    }
                }
            }
        },
        methods: {
            done () {
                if (!this.data.isDone) {
                    this.$emit('done', this.data)
                }
            },
            edit () {
                let self = this
                this.$emit('edit', this.data)
            },
            viewUnread () {
                if (this.isUnread()) {
                    this.$emit('viewUnread', this.data)
                }
            },
            isUnread () {
                if (this.data.readStatus === 0 && this.data.cooperationNew !== -1 && (this.data.type === 'meeting' || this.data.type === 'cooperationWork')) {
                    return true
                }
            }
        },
        created () {
        }
    }
</script>
