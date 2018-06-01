<template>
    <div v-if="loaded">
        <div class="card-content main">
            <div v-if="workday" class="workday">
                <div
                    v-if="morningBird"
                    class="morning-bird"
                >
                    <tap
                        :action="actions.showNormal"
                        class="morning-bird-area"
                    >
                        <div class="title">{{ LANG.morningBirdText }}</div>
                        <div class="content">
                            <div
                                v-for="m in morningBirdList"
                                :key="m.userId"
                                class="item"
                            >
                                <img
                                    :src="m.photo"
                                    alt="avatar"
                                    class="avatar"
                                >
                                <div class="username">{{ m.userName }}</div>
                            </div>
                        </div>
                    </tap>
                    <div v-if="beforeTen" class="before-ten">{{ LANG.beforeTenText }}</div>
                    <tap
                        v-else-if="abnormal"
                        :action="abnormalAction"
                        class="abnormal"
                    >
                        {{ LANG.abnormalTextBegin }}{{ abnormalCount }}{{ LANG.abnormalTextEnd }}
                    </tap>
                    <tap v-else class="all-sign" :action="actions.showNormal">{{ LANG.normalText }}</tap>
                </div>
                <div
                    v-else
                    class="no-morning-bird"
                >
                    <tap
                        v-if="abnormal"
                        :action="abnormalAction"
                        class="abnormal"
                    >
                        {{ LANG.abnormalTextBegin }}{{ abnormalCount }}{{ LANG.abnormalTextEnd }}
                    </tap>
                    <tap v-else class="all-sign" :action="actions.showNormal">
                        <img class="all-sign-logo" src="../../assets/cards/attendance/all-sign.png" alt="all-sign">
                        <p class="all-sign-text">{{LANG.fullNormal}}</p>
                    </tap>
                    <div class="text">{{ LANG.morningBirdNoneText }}</div>
                </div>
            </div>
            <div v-else class="holiday">
                <div v-if="overtime" class="overtime">
                    <div class="title">{{ LANG.holidayText }}</div>
                    <tap class="content" :action="actions.showRest">
                        <div
                            class="avatar-area"
                            v-for="o in overtimeList"
                            :key="o.userId"
                        >
                            <img
                                :src="avatarUrl(o.userId)"
                                alt="avatar"
                                class="avatar"
                            >
                        </div>
                        <div class="description">
                            {{ LANG.overtimeTextBegin }}{{ holidayUsersCount }}{{ LANG.overtimeTextEnd }}
                        </div>
                    </tap>
                </div>
                <div v-else class="no-overtime">
                    <div class="rest">
                        <img src="../../assets/cards/attendance/no-data@x2.png" alt="rest-logo" class="rest-logo">
                    </div>
                    <div class="text">{{ LANG.holidayText }}</div>
                </div>
            </div>
        </div>
        <card-buttons>
            <card-button :action="actions.showNormal">
                {{ LANG.buttonText }}
            </card-button>
        </card-buttons>
    </div>
</template>

<script>
    import Tap from 'components/tap'
    import MixinCard from 'mixins/card'
    import env from '../../config'
    import LANG from '@/lang/cards/attendance'

    let origin = info.origin
    if (env.environment === 'development') {
        origin = 'http://192.168.22.144'
    }

    export default {
        components: {
            Tap
        },

        mixins: [MixinCard],

        props: {
            title: String,
            actions: Object,
            data: Object,
            card: Object,
            loaded: Boolean
        },

        data () {
            return {
                LANG,
                cardData: this.data,
                timer: 0,
                beforeTen: true
            }
        },

        watch: {
            data: {
                handler (newData) {
                    this.cardData = Object.assign({}, newData)
                },
                deep: true
            }
        },

        computed: {
            workday () {
                return !(this.cardData.holiday)
            },

            morningBirdList () {
                return this.cardData.topThree
            },

            holidayUsersCount () {
                return this.cardData.holidayUsersCount || 0
            },

            overtimeList () {
                let a = []
                if (this.cardData.holidayUsers) {
                    a = this.cardData.holidayUsers.slice(0, 4)
                }
                return a
            },

            // beforeTen () {
            //     const h = this._currentHour()
            //     const b = (h < 10)
            //     return b
            // },

            abnormal () {
                const { cardData } = this
                const b = (
                    cardData.LATE > 0 ||
                    // data.EARLYLEAVE > 0 ||
                    cardData.ABSENCE > 0
                )
                return b
            },

            abnormalAction () {
                let action = this.actions.showAbsent
                if (Number(this.cardData.ABSENCE) <= 0) {
                    action = this.actions.showLate
                }
                return action
            },

            abnormalCount () {
                const { cardData } = this
                const n = Number(cardData.LATE) + Number(cardData.ABSENCE)
                return n
            },

            morningBird () {
                let b = false
                if (this.morningBirdList) {
                    b = (this.morningBirdList.length > 0)
                }
                return b
            },

            overtime () {
                const b = (this.holidayUsersCount > 0)
                return b
            }
        },

        created () {
            this.fetchDataAtTen()
            // 从统计报表切换回来时, 会重新拉去数据; 但是会导致首次启动工作台发两个请求
            this.reloadData()
        },

        mounted () {
            // 因为 iOS 在应用休眠的时候计时器会停止工作, 所以需要添加一个自定义的 appear 事件
            // 在工作台获得焦点的时候先直接拉一次数据, 再加上检查时间的函数
            document.addEventListener('appear', () => {
                this.reloadData()
                this.fetchDataAtTen()
            })
        },

        methods: {
            _currentHour () {
                const d = new Date()
                const h = d.getHours()
                return h
            },

            // 每隔 10 分钟检查系统时间是否超过 10:00, 如果是的话, 就拉一次数据
            fetchDataAtTen () {
                const hour = 10
                const intervalMinute = 10
                const interval = intervalMinute * 60 * 1000
                // 如果用户打开云之家 app 时已经超过了 10 点, 则不再主动拉数据
                if (this._currentHour() >= hour) {
                    this.beforeTen = false
                    return
                }
                // 每次启动定时器之前, 清除上一次的定时器
                // 这种情况只会发生在 10 点以前用户一直切换 app 到前台
                clearInterval(this.timer)
                this.timer = setInterval(() => {
                    const h = this._currentHour()
                    if (h >= hour) {
                        this.reloadData()
                        this.beforeTen = false
                        clearInterval(this.timer)
                    } else {
                        this.beforeTen = true
                    }
                }, interval)
            },

            avatarUrl (userId) {
                const s = `${origin}/space/c/photo/load?userId=${userId}`
                return s
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../css/variable';

    // v10
    [data-v10] {
        .main {
            .px2rem(min-height, 167);
        }
        .workday {
            .no-morning-bird {
                .all-sign {
                    .px2rem(padding-top, 10);
                    .px2rem(padding-bottom, 20);
                }
            }
        }
    }

    .main {
        position: relative;
        .px2rem(min-height, 180);
    }
    .workday {
        text-align: center;
        margin: 0 auto;
        .px2rem(width, 280);
        .morning-bird {
            .px2rem(padding-top, 5);
            .morning-bird-area {
                position: relative;
                &::after{
                    content: '';
                    display: block;
                    background: #E6E8EE;
                    .px2rem(width, 180);
                    height: 1px;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: scaleY(0.5) translateX(-50%);
                }
                .title {
                    color: #1D1D1D;
                    .px2rem(font-size, 14);
                    .px2rem(line-height, 20);
                }
                .content {
                    display: flex;
                    justify-content: space-around;
                    .px2rem(padding-top, 12);
                    .item {
                        position: relative;
                        .px2rem(width, 70);
                        .px2rem(margin-left, 12);
                        .px2rem(margin-right, 12);
                        &::after {
                            position: absolute;
                            background: #fff;
                            border-radius: 50%;
                            font-weight: bold;
                            .px2rem(width, 17);
                            .px2rem(height, 17);
                            .px2rem(font-size, 10);
                            .px2rem(line-height, 17);
                            .px2rem(bottom, 44);
                            left: 50%;
                            transform: translate(-50%, 50%);
                        }
                        .avatar {
                            border-radius: 50%;
                            .px2rem(width, 40);
                            .px2rem(height, 40);
                        }
                        &:nth-child(1) {
                            &::after {
                                content: '1';
                                color: #FFB500;
                                border: 1px solid #FFD47D;
                                box-shadow: 0 1px 3px 0 rgba(255, 201, 41, 0.5);
                            }
                            & > .avatar {
                                border: 1px solid rgba(255, 199, 80, 0.6);
                            }
                        }
                        &:nth-child(2) {
                            &::after {
                                content: '2';
                                color: #3CBAFF;
                                border: 1px solid #3CBAFF;
                                box-shadow: 0 1px 3px 0 rgba(122, 211, 255, 0.5);
                            }
                            & > .avatar {
                                border: 1px solid rgba(106, 187, 255, 0.6);
                            }
                        }
                        &:nth-child(3) {
                            &::after {
                                content: '3';
                                color: #FC972A;
                                border: 1px solid #FFAB89;
                                box-shadow: 0 1px 3px 0 rgba(255, 171, 134, 0.5);
                            }
                            & > .avatar {
                                border: 1px solid rgba(252, 138, 90, 0.6);
                            }
                        }
                        .username {
                            color: #768893;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            .px2rem(font-size, 12);
                            .px2rem(line-height, 17);
                            .px2rem(padding-top, 10);
                            .px2rem(padding-bottom, 12);
                        }
                    }
                }
            }
            .abnormal,
            .before-ten,
            .all-sign {
                color: #A4A8AB;
                .px2rem(font-size, 12);
                .px2rem(line-height, 20);
                .px2rem(padding-top, 18);
            }
            .abnormal,
            .all-sign {
                color: #1D1D1D;
                .px2rem(font-size, 14);
            }
        }
        .no-morning-bird {
            .abnormal {
                color: #1D1D1D;
                // &::after{
                //     content: '';
                //     display: block;
                //     background: #E6E8EE;
                //     .px2rem(width, 180);
                //     height: 1px;
                //     position: absolute;
                //     bottom: 0;
                //     left: 50%;
                //     transform: scaleY(0.5) translateX(-50%);
                // }
                .px2rem(padding-top, 50);
                .px2rem(padding-bottom, 36);
                .px2rem(font-size, 18);
                .px2rem(line-height, 25);
            }
            .all-sign {
                // &::after{
                //     content: '';
                //     display: block;
                //     background: #E6E8EE;
                //     .px2rem(width, 180);
                //     height: 1px;
                //     position: absolute;
                //     bottom: 0;
                //     left: 50%;
                //     transform: scaleY(0.5) translateX(-50%);
                // }
                .px2rem(padding-top, 17);
                .px2rem(padding-bottom, 25);
                .all-sign-logo {
                    display: block;
                    margin: 0 auto;
                    .px2rem(width, 79);
                }
                .all-sign-text {
                    .px2rem(margin-top, 14);
                    .px2rem(font-size, 14);
                    color: #768893;
                }
            }
            .text {
                color: #A4A8AB;
                .px2rem(font-size, 12);
                .px2rem(line-height, 20);
            }
        }
    }

    .holiday {
        text-align: center;
        .overtime {
            .px2rem(padding-top, 50);
            .title {
                color: #1D1D1D;
                .px2rem(font-size, 18);
                .px2rem(line-height, 25);
            }
            .content {
                display: flex;
                justify-content: center;
                align-items: center;
                .px2rem(padding-top, 47);
                .avatar-area {
                    .avatar {
                        border-radius: 50%;
                        .px2rem(width, 24);
                        .px2rem(height, 24);
                        .px2rem(margin-left, 3);
                        .px2rem(margin-right, 3);
                    }
                }
                .description {
                    color: #768893;
                    .px2rem(margin-left, 9);
                    .px2rem(font-size, 12);
                    .px2rem(line-height, 18);
                }
            }
        }
        .no-overtime {
            .rest {
                .px2rem(padding-top, 37);
                .rest-logo {
                    display: block;
                    .px2rem(width, 52);
                    .px2rem(height, 52);
                    margin: 0 auto;
                }
            }
            .text {
                color: #768893;
                .px2rem(padding-top, 19);
                .px2rem(font-size, 14);
                .px2rem(line-height, 20);
            }
        }
    }
</style>
