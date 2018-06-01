<template>
    <ul class="avatars-list">
        <li v-for="(item,index) in usersNew" v-if="index<5">
            <img :src="avatarUrl(item)" onerror="this.src=''" />
        </li>
        <li id="num-info" v-if="totalUserCount>5">
            <span>{{peopleStr(totalUserCount)}}</span>
        </li>
    </ul>
</template>
<script>
import LANG from '@/lang/cards/boss'
export default {
    name: 'report-footer',
    computed: {
        usersNew () {
            return this.sortUsers()
        },
        totalUserCount () {
            return this.userCount ? this.userCount : this.usersNew.length
        }
    },
    data () {
        return {
            LANG
        }
    },
    methods: {
        peopleStr (num) {
            return this.LANG.MONTH.BOSS_LABAL1 === '1月' ? `等${num}人` : `${num} ${this.LANG.TEXT.BOSS_LABAL7}`
        },
        sortUsers () {
            let result = this.users.slice()
            result.sort((val1, val2) => {
                return val2.status - val1.status
            })
            result = this.removeSameUsers(result)  // 去重
            return result
        },
        removeSameUsers (users) {
            if (!users.length) {
                return
            }
            let tmp = {}
            let result = []
            for (let user of users) {
                if (!tmp[user.oid]) {
                    tmp[user.oid] = 1
                    result.push(user)
                }
            }
            return result
        },
        avatarUrl (item) {
            if (this.isCold) {
                return item.photoUrl
            } else {
                return item.photoUrl + '&spec=500'
            }
        }
    },
    props: {
        users: Array,
        isCold: Boolean,
        isAr: Boolean,
        userCount: Number
    }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import '../../css/variable';

.avatars-list {
    .px2rem(padding-left, 12);
    width:100%;
    .px2rem(height, 40);
    display: flex;
    flex-direction:row;
    justify-content: center;
    flex-wrap: nowrap;
}

.avatars-list li {
    display: block;
    .px2rem(margin-right, 6);
    .px2rem(width,40);
    .px2rem(height,40);
}

#num-info {
    width: auto;
    .px2rem(line-height, 40);

    vertical-align: top;
    color: #768893;
    .px2rem(font-size, 14);
    background: none!important;
}

.avatars-list li img {
    .px2rem(width,40);
    .px2rem(height,40);
    border-radius: 50%;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAmVBMVEUAAAD4+fr5+fz8/Pz8/P35+vz5+vz4+vz4+fz5+fz5+vv5+vz6+vv5+fv5+fz7+//n6O/29vr0+fv7+//////l5+75+vz5+vzm6O75+vvm6O75+vv4+vz5+fz4+vzn6O76+v36+vz5/Pzn6e7m6O7m6O7m6O3m6O7m6O7m6O7m6O7l5+74+fvl5+3o6vDs7fLv8fXy8/bz9PiGBGUjAAAALHRSTlMAHhgSI/nt5+DayZ2Phlo6WTIpDQX49vHp0sjGvK6SkGxgT/Dg1bWd3IeFbPMCpZsAAAMzSURBVGjevZmJcqMwDIaFuUICgZzN0ZzNsW2FCbz/w+1OpzPskfgXmOz3At9IsjS2TFLc9JBs1ste4PtBb7neJIfUpS5Rw0GP79AbDFU3hnESsYEoGdsa3H2fIf29TeKc7ZxFzLdOS4U38FmMP/BaKCYxNySeNHUMQ25MOGxWjFduxWuD0hwDbklwFCqmMVsQT0Xt3Wcr+go7vIgtieBhHoVsTTgyO9IX7oCX1BgHcIgthli8kDsifFgXFXFnROpBf/S5Q/r3+yXmTonvzhLumOOdmRhwxwT/TkvR3C0LrfNc6+Immsl/O4aMKfLf0CVDhn86JqFYUWtgOOGk2cmqdH6H4lYxV8IT5jHglj9G82M8qhmggucGTFkb1A7HB7nKWwbCfn2Mt2xGA4eBLX3jzlFB2kvm7rdkz2ZyI6Bf9t+SPgrESAGmMX0xhhUxw2bGX5IEZssqX8mXJII9YpWviH6hULNbSljh+YslGs5iPFIKkQSMlt6zI+kRuWwvAbiUsn3hASkdni85gFYU9glqxw0DCmvJhtYwEAi6UKxpicej7fFawjbJBcBGCZ4vCch/vsT/P5IAnmBIAdPVY+tQKlj45fObcQmaUXZbgc24YQzIFR4rCWM06HZAAkY9TNiNMQdK2SpfLCAll21CubEAF1wkQFU0C+iBKxEIRRbIoL7cATRoEXC5U9zWolmEqi/ckLaOqH46CNCtHJwYHkEwlpJljOFzzl7SNzxMseTGIvb1E1tCYagJfmLTVuRo1SVbsPYADpHFd8ACB2+idIVHSo0nC6N5MB5YqmEF1sTC9WCJbyslWA+iRedNA4NxGzkUrGxLYEDL1Ve8fC7yZugCL5/piCqBKSqwRieKQVdI0LUmNn9tFLkFhflrg1SEwpAHEynTd1OZW1Myh57p46zKO6B6GZGB9K0LyVtKRsYLe8diTADnh63jh0MQtbJzrBQJmO5sHLspycjeWpc8IzHOpZ3j4lATskWLU5VRQya7xtWYUHOc60xumF0daofazYSKnaL2uJ8rQWd8umSJ93E2Gc4fHnWCyq6ne4LTNVPUJe4oe7+szqfFbLY4nVeX92wkTtJPSdpGd42rZOMAAAAASUVORK5CYII=);
    background-size: cover;
}
</style>
