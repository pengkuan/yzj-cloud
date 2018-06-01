<template>
    <div class="report-avatars">
        <!--<div class="report-avatars-section">-->
        <p class="report-avatars-title">
            {{LANG.TEXT.BOSS_LABAL8}}
            <div>{{testStr}}</div>
        </p>
        <div class="report-avatars-body">
            <ul class="report-avatars-list">
                <template v-if="!isCold">
                    <li v-for="item,index in userList"
                        :key="item.oid">
                        <!--<img src="http://static.yunzhijia.com/space/c/photo/load?id=56a08858e4b06742f496db85">-->
                        <!--<tap @tap="toZan(item.oid,item.name,item.owner,item.bePraise)">-->
                        <tap @tap="toZan(index,item)"
                             class="tap-wrap">
                            <div class="img-box">
                                <img :src="item.photoUrl | betterImg"
                                     onerror="this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAmVBMVEUAAAD4+fr5+fz8/Pz8/P35+vz5+vz4+vz4+fz5+fz5+vv5+vz6+vv5+fv5+fz7+//n6O/29vr0+fv7+//////l5+75+vz5+vzm6O75+vvm6O75+vv4+vz5+fz4+vzn6O76+v36+vz5/Pzn6e7m6O7m6O7m6O3m6O7m6O7m6O7m6O7l5+74+fvl5+3o6vDs7fLv8fXy8/bz9PiGBGUjAAAALHRSTlMAHhgSI/nt5+DayZ2Phlo6WTIpDQX49vHp0sjGvK6SkGxgT/Dg1bWd3IeFbPMCpZsAAAMzSURBVGjevZmJcqMwDIaFuUICgZzN0ZzNsW2FCbz/w+1OpzPskfgXmOz3At9IsjS2TFLc9JBs1ste4PtBb7neJIfUpS5Rw0GP79AbDFU3hnESsYEoGdsa3H2fIf29TeKc7ZxFzLdOS4U38FmMP/BaKCYxNySeNHUMQ25MOGxWjFduxWuD0hwDbklwFCqmMVsQT0Xt3Wcr+go7vIgtieBhHoVsTTgyO9IX7oCX1BgHcIgthli8kDsifFgXFXFnROpBf/S5Q/r3+yXmTonvzhLumOOdmRhwxwT/TkvR3C0LrfNc6+Immsl/O4aMKfLf0CVDhn86JqFYUWtgOOGk2cmqdH6H4lYxV8IT5jHglj9G82M8qhmggucGTFkb1A7HB7nKWwbCfn2Mt2xGA4eBLX3jzlFB2kvm7rdkz2ZyI6Bf9t+SPgrESAGmMX0xhhUxw2bGX5IEZssqX8mXJII9YpWviH6hULNbSljh+YslGs5iPFIKkQSMlt6zI+kRuWwvAbiUsn3hASkdni85gFYU9glqxw0DCmvJhtYwEAi6UKxpicej7fFawjbJBcBGCZ4vCch/vsT/P5IAnmBIAdPVY+tQKlj45fObcQmaUXZbgc24YQzIFR4rCWM06HZAAkY9TNiNMQdK2SpfLCAll21CubEAF1wkQFU0C+iBKxEIRRbIoL7cATRoEXC5U9zWolmEqi/ckLaOqH46CNCtHJwYHkEwlpJljOFzzl7SNzxMseTGIvb1E1tCYagJfmLTVuRo1SVbsPYADpHFd8ACB2+idIVHSo0nC6N5MB5YqmEF1sTC9WCJbyslWA+iRedNA4NxGzkUrGxLYEDL1Ve8fC7yZugCL5/piCqBKSqwRieKQVdI0LUmNn9tFLkFhflrg1SEwpAHEynTd1OZW1Myh57p46zKO6B6GZGB9K0LyVtKRsYLe8diTADnh63jh0MQtbJzrBQJmO5sHLspycjeWpc8IzHOpZ3j4lATskWLU5VRQya7xtWYUHOc60xumF0daofazYSKnaL2uJ8rQWd8umSJ93E2Gc4fHnWCyq6ne4LTNVPUJe4oe7+szqfFbLY4nVeX92wkTtJPSdpGd42rZOMAAAAASUVORK5CYII=';">
                                <div class="linear-gradient"
                                     v-if="item.praiseNum !== 0"></div>
                            </div>
                            <span class="heart"
                                  :class="{animating: item.bePraise && isShowAnimationIndex.indexOf(index) !== -1 }"></span>

                            <transition name="fade">
                                <span class="like-num"
                                      v-if="item.praiseNum !== 0 && isShowAnimationIndex.indexOf(index) === -1"
                                      :class="{active:item.bePraise}">
                                    <i class="iconfont icon-dianzan1"></i>
                                    <em>{{item.praiseNum||0}}</em>
                                </span>
                            </transition>

                            <!-- <div class="linear-gradient"
                                 v-if="item.praiseNum !== 0"></div> -->
                        </tap>
                        <!--<span v-if="item.bePraise">-->
                        <!--<i class="iconfont active" :class="item.isNow?'animation':''">&#xe687;</i>-->
                        <!--</span>-->
                    </li>
                </template>
                <template v-if="isCold && !isAr">
                    <!-- 示例 -->
                    <li v-for="item,index in userTmp">
                        <!--<img src="http://static.yunzhijia.com/space/c/photo/load?id=56a08858e4b06742f496db85">-->
                        <tap @tap="toZan(index,item)"
                             class="tap-wrap">
                            <div class="img-box">
                                <img :src="item.photoUrl"
                                     onerror="this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAmVBMVEUAAAD4+fr5+fz8/Pz8/P35+vz5+vz4+vz4+fz5+fz5+vv5+vz6+vv5+fv5+fz7+//n6O/29vr0+fv7+//////l5+75+vz5+vzm6O75+vvm6O75+vv4+vz5+fz4+vzn6O76+v36+vz5/Pzn6e7m6O7m6O7m6O3m6O7m6O7m6O7m6O7l5+74+fvl5+3o6vDs7fLv8fXy8/bz9PiGBGUjAAAALHRSTlMAHhgSI/nt5+DayZ2Phlo6WTIpDQX49vHp0sjGvK6SkGxgT/Dg1bWd3IeFbPMCpZsAAAMzSURBVGjevZmJcqMwDIaFuUICgZzN0ZzNsW2FCbz/w+1OpzPskfgXmOz3At9IsjS2TFLc9JBs1ste4PtBb7neJIfUpS5Rw0GP79AbDFU3hnESsYEoGdsa3H2fIf29TeKc7ZxFzLdOS4U38FmMP/BaKCYxNySeNHUMQ25MOGxWjFduxWuD0hwDbklwFCqmMVsQT0Xt3Wcr+go7vIgtieBhHoVsTTgyO9IX7oCX1BgHcIgthli8kDsifFgXFXFnROpBf/S5Q/r3+yXmTonvzhLumOOdmRhwxwT/TkvR3C0LrfNc6+Immsl/O4aMKfLf0CVDhn86JqFYUWtgOOGk2cmqdH6H4lYxV8IT5jHglj9G82M8qhmggucGTFkb1A7HB7nKWwbCfn2Mt2xGA4eBLX3jzlFB2kvm7rdkz2ZyI6Bf9t+SPgrESAGmMX0xhhUxw2bGX5IEZssqX8mXJII9YpWviH6hULNbSljh+YslGs5iPFIKkQSMlt6zI+kRuWwvAbiUsn3hASkdni85gFYU9glqxw0DCmvJhtYwEAi6UKxpicej7fFawjbJBcBGCZ4vCch/vsT/P5IAnmBIAdPVY+tQKlj45fObcQmaUXZbgc24YQzIFR4rCWM06HZAAkY9TNiNMQdK2SpfLCAll21CubEAF1wkQFU0C+iBKxEIRRbIoL7cATRoEXC5U9zWolmEqi/ckLaOqH46CNCtHJwYHkEwlpJljOFzzl7SNzxMseTGIvb1E1tCYagJfmLTVuRo1SVbsPYADpHFd8ACB2+idIVHSo0nC6N5MB5YqmEF1sTC9WCJbyslWA+iRedNA4NxGzkUrGxLYEDL1Ve8fC7yZugCL5/piCqBKSqwRieKQVdI0LUmNn9tFLkFhflrg1SEwpAHEynTd1OZW1Myh57p46zKO6B6GZGB9K0LyVtKRsYLe8diTADnh63jh0MQtbJzrBQJmO5sHLspycjeWpc8IzHOpZ3j4lATskWLU5VRQya7xtWYUHOc60xumF0daofazYSKnaL2uJ8rQWd8umSJ93E2Gc4fHnWCyq6ne4LTNVPUJe4oe7+szqfFbLY4nVeX92wkTtJPSdpGd42rZOMAAAAASUVORK5CYII=';">
                                <div class="linear-gradient"
                                     v-if="item.praiseNum !== 0"></div>
                            </div>
                            <span class="heart"
                                  :class="{animating: item.bePraise && isShowAnimationIndex.indexOf(index) !== -1}"></span>

                            <transition name="fade">
                                <span class="like-num"
                                      v-if="item.praiseNum !== 0 && isShowAnimationIndex.indexOf(index) === -1"
                                      :class="{active:item.bePraise}">
                                    <i class="iconfont icon-dianzan1"></i>
                                    <em>{{item.praiseNum||0}}</em>
                                </span>
                            </transition>

                            <!-- <div class="linear-gradient"
                                 v-if="item.praiseNum !== 0"></div> -->
                        </tap>
                    </li>
                </template>
                <template v-if="isCold && isAr">
                    <li v-for="item,index in userAr">
                        <!--<img src="http://static.yunzhijia.com/space/c/photo/load?id=56a08858e4b06742f496db85">-->
                        <tap @tap="toZan(index,item)"
                             class="tap-wrap">
                            <div class="img-box">
                                <img :src="item.photoUrl"
                                     onerror="this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAmVBMVEUAAAD4+fr5+fz8/Pz8/P35+vz5+vz4+vz4+fz5+fz5+vv5+vz6+vv5+fv5+fz7+//n6O/29vr0+fv7+//////l5+75+vz5+vzm6O75+vvm6O75+vv4+vz5+fz4+vzn6O76+v36+vz5/Pzn6e7m6O7m6O7m6O3m6O7m6O7m6O7m6O7l5+74+fvl5+3o6vDs7fLv8fXy8/bz9PiGBGUjAAAALHRSTlMAHhgSI/nt5+DayZ2Phlo6WTIpDQX49vHp0sjGvK6SkGxgT/Dg1bWd3IeFbPMCpZsAAAMzSURBVGjevZmJcqMwDIaFuUICgZzN0ZzNsW2FCbz/w+1OpzPskfgXmOz3At9IsjS2TFLc9JBs1ste4PtBb7neJIfUpS5Rw0GP79AbDFU3hnESsYEoGdsa3H2fIf29TeKc7ZxFzLdOS4U38FmMP/BaKCYxNySeNHUMQ25MOGxWjFduxWuD0hwDbklwFCqmMVsQT0Xt3Wcr+go7vIgtieBhHoVsTTgyO9IX7oCX1BgHcIgthli8kDsifFgXFXFnROpBf/S5Q/r3+yXmTonvzhLumOOdmRhwxwT/TkvR3C0LrfNc6+Immsl/O4aMKfLf0CVDhn86JqFYUWtgOOGk2cmqdH6H4lYxV8IT5jHglj9G82M8qhmggucGTFkb1A7HB7nKWwbCfn2Mt2xGA4eBLX3jzlFB2kvm7rdkz2ZyI6Bf9t+SPgrESAGmMX0xhhUxw2bGX5IEZssqX8mXJII9YpWviH6hULNbSljh+YslGs5iPFIKkQSMlt6zI+kRuWwvAbiUsn3hASkdni85gFYU9glqxw0DCmvJhtYwEAi6UKxpicej7fFawjbJBcBGCZ4vCch/vsT/P5IAnmBIAdPVY+tQKlj45fObcQmaUXZbgc24YQzIFR4rCWM06HZAAkY9TNiNMQdK2SpfLCAll21CubEAF1wkQFU0C+iBKxEIRRbIoL7cATRoEXC5U9zWolmEqi/ckLaOqH46CNCtHJwYHkEwlpJljOFzzl7SNzxMseTGIvb1E1tCYagJfmLTVuRo1SVbsPYADpHFd8ACB2+idIVHSo0nC6N5MB5YqmEF1sTC9WCJbyslWA+iRedNA4NxGzkUrGxLYEDL1Ve8fC7yZugCL5/piCqBKSqwRieKQVdI0LUmNn9tFLkFhflrg1SEwpAHEynTd1OZW1Myh57p46zKO6B6GZGB9K0LyVtKRsYLe8diTADnh63jh0MQtbJzrBQJmO5sHLspycjeWpc8IzHOpZ3j4lATskWLU5VRQya7xtWYUHOc60xumF0daofazYSKnaL2uJ8rQWd8umSJ93E2Gc4fHnWCyq6ne4LTNVPUJe4oe7+szqfFbLY4nVeX92wkTtJPSdpGd42rZOMAAAAASUVORK5CYII=';">
                                <div class="linear-gradient"
                                     v-if="item.praiseNum !== 0"></div>
                            </div>
                            <span class="heart"
                                  :class="{animating: item.bePraise && isShowAnimationIndex.indexOf(index) !== -1 }"></span>

                            <transition name="fade">
                                <span class="like-num"
                                      v-if="item.praiseNum !== 0 && isShowAnimationIndex.indexOf(index) === -1"
                                      :class="{active:item.bePraise}">
                                    <i class="iconfont icon-dianzan1"></i>
                                    <em>{{item.praiseNum||0}}</em>
                                </span>
                            </transition>

                            <!-- <div class="linear-gradient"
                                 v-if="item.praiseNum !== 0"></div> -->
                        </tap>
                        <!--<span v-if="item.bePraise">-->
                        <!--<i class="iconfont active" :class="item.isNow?'animation':''">&#xe687;</i>-->
                        <!--</span>-->
                    </li>
                </template>
                <li style="width: 100%;margin-top: -0.2rem;"
                    v-if="!isCold && _userCount > 88">
                    <p class="check-more-participant"
                       @click="handleCheckMorePart">{{LANG.TEXT.BOSS_LABAL9}}</p>
                </li>
            </ul>
        </div>
        <p class="report-avatars-close">
            <tap @tap="closeAvatars">
                <i class="icon iconfont">&#xe68f;</i>
            </tap>
        </p>
        <!--</div>-->
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../css/variable";
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.report-avatars {
  background-color: rgba(255, 255, 255, 0.96);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  z-index: 5;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  /*border-radius:0 0 .12rem .12rem*/
}

.report-avatars-section {
  position: relative;
}

.report-avatars-title,
.report-avatars-close {
  width: 100%;
  .px2rem(height, 50);
  .px2rem(line-height, 50);
  .px2rem(font-size, 13);
  color: #768893;
  text-align: center;
  position: absolute;
  left: 0;
}

.report-avatars-title {
  .px2rem(line-height, 35);
}

.report-avatars-close {
  bottom: 0;
}

.report-avatars-body {
  position: absolute;
  width: 100%;
  .px2rem(top, 50);
  .px2rem(height, 242);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.report-avatars-body .check-more-participant {
  height: 0.8rem;
  margin-top: 0.2rem;
  line-height: 0.8rem;
  width: 100%;
  border: none;
  background-color: #fff;
  font-size: 0.24rem;
  text-align: center;
  color: #345791;
}

.report-avatars-list {
  //   overflow-y: auto;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  .px2rem(padding-left, 12);
  .px2rem(padding-right, 12);
}

.report-avatars-list li {
  display: inline-block;
  width: 25%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  /*.px2rem(padding-top,5);*/
  /*.px2rem(padding-bottom,5);*/
  .px2rem(margin-top, 10);
  .px2rem(margin-bottom, 10);
  text-align: center;
  vertical-align: middle;
  position: relative;
  height: 42px;
  .tap-wrap {
    position: relative;
    .img-box {
      display: inline-block;
      position: relative;
      width: 42px;
      height: 42px;
    }
  }
  .heart {
    height: 72px;
    width: 72px;
    position: absolute;
    margin: -15px 0px -13px -58px;
    display: inline-block;
    // cursor: none;
    background-image: url("../../assets/boss/like5.jpg");
    background-position: left;
    background-repeat: no-repeat;
    background-size: 2900%;
  }
  .animating {
    animation: heart-burst 0.8s steps(28) 1;
  }
  @keyframes heart-burst {
    from {
      background-position: left;
    }
    to {
      background-position: right;
    }
  }
  span.active {
    background-position: right;
  }

  .like-num {
    position: absolute; // background: rgb(255, 255, 255);
    // border: .5px solid #e6e8ee;
    display: inline-block;
    width: 42px;
    padding: 6px 0;
    /*left:0;*/
    bottom: 0px;
    text-align: center;
    transform: translateX(-50%);
    -webkit-transform: translateX(-100%);
    font-size: 12px;
    border-radius: 42px;
    // color: #c2ccd0;
    color: #fff;
    z-index: 5;
    &.active {
      color: #fda32c; // background: #FFFFFF; // border: .5px solid #eb6e3c #FDA32C 100%
    }
    em {
      font-style: normal;
    }
    .iconfont {
      font-size: 10px;
    } // 点赞爆炸
    .heart {
      display: inline-block;
      cursor: none;
      height: 35px;
      width: 35px; // margin: 50px 50px;
      margin: -16px -13px -13px -13px; // background-image: url('../../assets/boss/like.jpg');
      background-position: left;
      background-repeat: no-repeat;
      background-size: 2900%;
    }
    .animating {
      animation: heart-burst 0.8s steps(28) 1;
    }
    @keyframes heart-burst {
      from {
        background-position: left;
      }
      to {
        background-position: right;
      }
    }
    span.active {
      background-position: right;
    }
  }
  .creator-flag {
    position: absolute;
    width: 48px;
    height: 48px;
    border: 0.5px solid #eb6e3c;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  div.linear-gradient {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 42px;
    height: 21px;
    border-radius: 0 0 21px 21px;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(11, 14, 41, 0.5)
    );
  }
}

.report-avatars-list li img {
  width: 42px;
  height: 42px;
  vertical-align: top;
  border-radius: 50%;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAmVBMVEUAAAD4+fr5+fz8/Pz8/P35+vz5+vz4+vz4+fz5+fz5+vv5+vz6+vv5+fv5+fz7+//n6O/29vr0+fv7+//////l5+75+vz5+vzm6O75+vvm6O75+vv4+vz5+fz4+vzn6O76+v36+vz5/Pzn6e7m6O7m6O7m6O3m6O7m6O7m6O7m6O7l5+74+fvl5+3o6vds7flv8fxy8/bz9PiGBGUjAAAALHRSTlMAHhgSI/nt5+DayZ2Phlo6WTIpDQX49vHp0sjGvK6SkGxgT/Dg1bWd3IeFbPMCpZsAAAMzSURBVGjevZmJcqMwDIaFuUICgZzN0ZzNsW2FCbz/w+1opzpskfgxmoz3at9isjs2tflc9jbs1ste4ptbb7nejifups5rw0gp79abdfu3hnessyeogdsa3h2fif29tekc7zxfzldos4u38fmmp/BaKCYxNySeNHUMQ25MOGxWjFduxWuD0hwDbklwFCqmMVsQT0Xt3Wcr+go7vIgtieBhHoVsTTgyO9IX7oCX1BgHcIgthli8kDsifFgXFXFnROpBf/S5Q/r3+yXmTonvzhLumOOdmRhwxwT/TkvR3C0LrfNc6+Immsl/O4aMKfLf0CVDhn86JqFYUWtgOOGk2cmqdH6H4lYxV8IT5jHglj9G82M8qhmggucGTFkb1A7HB7nKWwbCfn2Mt2xGA4eBLX3jzlFB2kvm7rdkz2ZyI6Bf9t+SPgrESAGmMX0xhhUxw2bGX5IEZssqX8mXJII9YpWviH6hULNbSljh+YslGs5iPFIKkQSMlt6zI+kRuWwvAbiUsn3hASkdni85gFYU9glqxw0DCmvJhtYwEAi6UKxpicej7fFawjbJBcBGCZ4vCch/vsT/P5IAnmBIAdPVY+tQKlj45fObcQmaUXZbgc24YQzIFR4rCWM06HZAAkY9TNiNMQdK2SpfLCAll21CubEAF1wkQFU0C+iBKxEIRRbIoL7cATRoEXC5U9zWolmEqi/ckLaOqH46CNCtHJwYHkEwlpJljOFzzl7SNzxMseTGIvb1E1tCYagJfmLTVuRo1SVbsPYADpHFd8ACB2+idIVHSo0nC6N5MB5YqmEF1sTC9WCJbyslWA+iRedNA4NxGzkUrGxLYEDL1Ve8fC7yZugCL5/piCqBKSqwRieKQVdI0LUmNn9tFLkFhflrg1SEwpAHEynTd1OZW1Myh57p46zKO6B6GZGB9K0LyVtKRsYLe8diTADnh63jh0MQtbJzrBQJmO5sHLspycjeWpc8IzHOpZ3j4lATskWLU5VRQya7xtWYUHOc60xumF0daofazYSKnaL2uJ8rQWd8umSJ93E2Gc4fHnWCyq6ne4LTNVPUJe4oe7+szqfFbLY4nVeX92wkTtJPSdpGd42rZOMAAAAASUVORK5CYII=);
  background-size: cover;
}

/*.tap-container{*/

/*background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAmVBMVEUAAAD4+fr5+fz8/Pz8/P35+vz5+vz4+vz4+fz5+fz5+vv5+vz6+vv5+fv5+fz7+//n6O/29vr0+fv7+//////l5+75+vz5+vzm6O75+vvm6O75+vv4+vz5+fz4+vzn6O76+v36+vz5/Pzn6e7m6O7m6O7m6O3m6O7m6O7m6O7m6O7l5+74+fvl5+3o6vDs7fLv8fXy8/bz9PiGBGUjAAAALHRSTlMAHhgSI/nt5+DayZ2Phlo6WTIpDQX49vHp0sjGvK6SkGxgT/Dg1bWd3IeFbPMCpZsAAAMzSURBVGjevZmJcqMwDIaFuUICgZzN0ZzNsW2FCbz/w+1OpzPskfgXmOz3At9IsjS2TFLc9JBs1ste4PtBb7neJIfUpS5Rw0GP79AbDFU3hnESsYEoGdsa3H2fIf29TeKc7ZxFzLdOS4U38FmMP/BaKCYxNySeNHUMQ25MOGxWjFduxWuD0hwDbklwFCqmMVsQT0Xt3Wcr+go7vIgtieBhHoVsTTgyO9IX7oCX1BgHcIgthli8kDsifFgXFXFnROpBf/S5Q/r3+yXmTonvzhLumOOdmRhwxwT/TkvR3C0LrfNc6+Immsl/O4aMKfLf0CVDhn86JqFYUWtgOOGk2cmqdH6H4lYxV8IT5jHglj9G82M8qhmggucGTFkb1A7HB7nKWwbCfn2Mt2xGA4eBLX3jzlFB2kvm7rdkz2ZyI6Bf9t+SPgrESAGmMX0xhhUxw2bGX5IEZssqX8mXJII9YpWviH6hULNbSljh+YslGs5iPFIKkQSMlt6zI+kRuWwvAbiUsn3hASkdni85gFYU9glqxw0DCmvJhtYwEAi6UKxpicej7fFawjbJBcBGCZ4vCch/vsT/P5IAnmBIAdPVY+tQKlj45fObcQmaUXZbgc24YQzIFR4rCWM06HZAAkY9TNiNMQdK2SpfLCAll21CubEAF1wkQFU0C+iBKxEIRRbIoL7cATRoEXC5U9zWolmEqi/ckLaOqH46CNCtHJwYHkEwlpJljOFzzl7SNzxMseTGIvb1E1tCYagJfmLTVuRo1SVbsPYADpHFd8ACB2+idIVHSo0nC6N5MB5YqmEF1sTC9WCJbyslWA+iRedNA4NxGzkUrGxLYEDL1Ve8fC7yZugCL5/piCqBKSqwRieKQVdI0LUmNn9tFLkFhflrg1SEwpAHEynTd1OZW1Myh57p46zKO6B6GZGB9K0LyVtKRsYLe8diTADnh63jh0MQtbJzrBQJmO5sHLspycjeWpc8IzHOpZ3j4lATskWLU5VRQya7xtWYUHOc60xumF0daofazYSKnaL2uJ8rQWd8umSJ93E2Gc4fHnWCyq6ne4LTNVPUJe4oe7+szqfFbLY4nVeX92wkTtJPSdpGd42rZOMAAAAASUVORK5CYII=);*/

/*background-position: center center;*/

/*background-repeat: no-repeat;*/

/*background-size:42px 42px;*/

/*}*/

.report-avatars-close .tap-container {
  background: none;
}

.tap-container.active {
  opacity: 1;
}

.icon-avatarsclose:before {
  content: "\e68f";
}

.animation {
  animation: bounceIn 0.35s 0.1s ease both;
  -webkit-animation: bounceIn 0.35s 0.1s ease both;
  -moz-animation: bounceIn 0.35s 0.1s ease both;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    -webkit-transform: translate(-50%, -50%) scale(0.5);
  }
  50% {
    opacity: 1;
    -webkit-transform: translate(-50%, -50%) scale(1.5);
  }
  70% {
    -webkit-transform: translate(-50%, -50%) scale(1.2);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) scale(1);
  }
}

@-webkit-keyframes bounceIn {
  0% {
    opacity: 0;
    -webkit-transform: translate(-50%, -50%) scale(0.5);
  }
  50% {
    opacity: 1;
    -webkit-transform: translate(-50%, -50%) scale(1.5);
  }
  70% {
    -webkit-transform: translate(-50%, -50%) scale(1.2);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) scale(1);
  }
}

@-moz-keyframes bounceIn {
  0% {
    opacity: 0;
    -moz-transform: translate(-50%, -50%) scale(0.5);
  }
  50% {
    opacity: 1;
    -moz-transform: translate(-50%, -50%) scale(1.5);
  }
  70% {
    -moz-transform: translate(-50%, -50%) scale(1.2);
  }
  100% {
    -moz-transform: translate(-50%, -50%) scale(1);
  }
}
</style>
<script>
import Bus from '../boss/Bus'
import Tap from 'components/tap'
import LANG from '@/lang/cards/boss'
export default {
    name: 'report-avatars',
    data () {
        return {
            LANG,
            userList: [],
            reportId: '',
            interval: null,
            testStr: '',
            userTmp: [
                {
                    photoUrl: 'static/image/report_user/01.png',
                    bePraise: false,
                    owner: false,
                    praiseNum: 0,
                    oid: '001'
                },
                {
                    photoUrl: 'static/image/report_user/02.png',
                    bePraise: false,
                    owner: false,
                    praiseNum: 0,
                    oid: '002'
                },
                {
                    photoUrl: 'static/image/report_user/03.png',
                    bePraise: false,
                    owner: false,
                    praiseNum: 0,
                    oid: '003'
                },
                {
                    photoUrl: 'static/image/report_user/04.png',
                    bePraise: false,
                    owner: false,
                    praiseNum: 0,
                    oid: '004'
                },
                {
                    photoUrl: 'static/image/report_user/05.png',
                    bePraise: false,
                    owner: false,
                    praiseNum: 0,
                    oid: '005'
                },
                {
                    photoUrl: 'static/image/report_user/06.png',
                    bePraise: false,
                    owner: false,
                    praiseNum: 0,
                    oid: '006'
                }
            ],
            userAr: [
                {
                    photoUrl: 'static/image/report_user/ar/01.jpg',
                    bePraise: false,
                    owner: false,
                    praiseNum: 0,
                    oid: 'ar001'
                },
                {
                    photoUrl: 'static/image/report_user/ar/02.jpg',
                    bePraise: false,
                    owner: false,
                    praiseNum: 0,
                    oid: 'ar002'
                },
                {
                    photoUrl: 'static/image/report_user/ar/03.jpg',
                    bePraise: false,
                    owner: false,
                    praiseNum: 0,
                    oid: 'ar003'
                },
                {
                    photoUrl: 'static/image/report_user/ar/04.png',
                    bePraise: false,
                    owner: false,
                    praiseNum: 0,
                    oid: 'ar004'
                },
                {
                    photoUrl: 'static/image/report_user/ar/05.jpg',
                    bePraise: false,
                    owner: false,
                    praiseNum: 0,
                    oid: 'ar005'
                },
                {
                    photoUrl: 'static/image/report_user/ar/06.jpg',
                    bePraise: false,
                    owner: false,
                    praiseNum: 0,
                    oid: 'ar006'
                }
            ],
            myAtavars: [],   //  调整顺序后的头像
            notifyPersonList: [],  // 被点赞到的人
            userCount: 0, // 总共有多少人
            isShowAnimationIndex: [],
            userListTemp: [] // 保存一份用户原始数据，避免点赞过于频繁时增/减不对
        }
    },
    props: {
        vote: String,
        isCold: Boolean,
        isAr: Boolean,
        appId: String
    },
    components: { Tap },
    filters: {
        betterImg (value) {
            return value + '&spec=500'
        }
    },
    computed: {
        // 总共有多少人,| AR | 冷启动数据的区分
        _userCount () {
            if (!this.isCold) {
                return this.userCount
            } else if (this.isCold && !this.isAr) {
                return this.userTmp.length
            } else if (this.isCold && this.isAr) {
                return this.userAr.length
            }
        }
    },
    methods: {
        closeAvatars () {
            if (this.isCold) {
                this.userTmp = this.userTmp.map((item) => {
                    item.isNow = false
                    return item
                })
            }
            this.sendZanByGroup()
            Bus.$emit('event-close')
            this.isShowAnimationIndex = []
        },
        toZan (tIndex, val) {
            //                if (owner || bePraise) return
            if (!val.isNow && val.bePraise) return  // 已经点完赞的人不能再操作
            const pariseOrCancelParise = this.isGotoParise(tIndex, val)
            // this.cloneUserData()
            // 动画
            const indexPosition = this.isShowAnimationIndex.indexOf(tIndex)
            // console.log('@@@@isShowAnimationIndex', this.isShowAnimationIndex.toString(), indexPosition)
            if (this.isShowAnimationIndex.length > 0 && indexPosition !== -1) {
                this.isShowAnimationIndex.splice(indexPosition, 1)
                if (pariseOrCancelParise) { // 去点赞
                    this.isShowAnimationIndex.push(tIndex)
                }
            } else {
                // this.isShowAnimationIndex = tIndex
                this.isShowAnimationIndex.push(tIndex)
            }

            setTimeout(() => {
                // this.isShowAnimationIndex = ''
                const indexPositionTemp = this.isShowAnimationIndex.indexOf(tIndex)
                if (indexPositionTemp !== -1) {
                    this.isShowAnimationIndex.splice(indexPositionTemp, 1)
                }
            }, 801)

            if (this.isCold) { // 示例 数据
                if (this.isAr) { // Ar 数据
                    this.userAr = this.userAr.map((item, index) => {
                        if (tIndex === index) {
                            item.bePraise = !item.bePraise
                            let originPraiseNum = this.getPraiseNumByOid(item.oid)
                            if (originPraiseNum === null) {
                                // alert('error ' + item.oid + ' cannot be found in the userList')
                                originPraiseNum = item.praiseNum
                            }
                            // let originPraiseNum = 0
                            // if (this.userListTemp[index] && this.userListTemp[index].oid === item.oid) {
                            //     originPraiseNum = this.userListTemp[index].praiseNum
                            // } else {
                            //     originPraiseNum = item.praiseNum
                            // }
                            if (item.bePraise) {
                                setTimeout(function () {
                                    // item.praiseNum = (item.praiseNum + 1)
                                    item.praiseNum = originPraiseNum + 1
                                    // 有时竟然会变成false，奇怪
                                    item.bePraise = true
                                }, 800)
                            } else {
                                // item.praiseNum = (item.praiseNum - 1)
                                item.praiseNum = originPraiseNum
                            }
                            item.isNow = true
                        }
                        return item
                    })
                } else {
                    this.userTmp = this.userTmp.map((item, index) => {
                        if (tIndex === index) {
                            item.bePraise = !item.bePraise
                            let originPraiseNum = this.getPraiseNumByOid(item.oid)
                            if (originPraiseNum === null) {
                                // alert('error ' + item.oid + ' cannot be found in the userList')
                                originPraiseNum = item.praiseNum
                            }
                            // if (this.userListTemp[index] && this.userListTemp[index].oid === item.oid) {
                            //     originPraiseNum = this.userListTemp[index].praiseNum
                            // } else {
                            //     originPraiseNum = item.praiseNum
                            // }
                            if (item.bePraise) {
                                setTimeout(function () {
                                    // item.praiseNum = (item.praiseNum + 1)
                                    item.praiseNum = originPraiseNum + 1
                                    // 有时竟然会变成false，奇怪
                                    item.bePraise = true
                                }, 800)
                            } else {
                                // item.praiseNum = (item.praiseNum - 1)
                                item.praiseNum = originPraiseNum
                            }
                            // item.praiseNum = item.bePraise ? (item.praiseNum + 1) : (item.praiseNum - 1)
                            item.isNow = true
                        }
                        return item
                    })
                }
                return
            }
            //                let that = this
            //                let data = {
            //                    reportMsgId: this.reportId,
            //                    beReplayCommentId: '',
            //                    content: '真棒！为@' + name + ' 点赞',
            //                    type: 2,
            //                    notifyPersonList: [oid]
            //                }
            // for (let i = 0, len = this.userList.length; i < len; i++) {
            //     const item = this.userList[i]
            //     if (item.oid === val.oid) {
            //         // const cloneItemStr = JSON.stringify(item)
            //         // const cloneItem = JSON.parse(cloneItemStr)
            //         item.bePraise = !item.bePraise
            //         let originPraiseNum = this.getPraiseNumByOid(item.oid)
            //         // alert('originPraiseNum:' + originPraiseNum)
            //         if (originPraiseNum === null || originPraiseNum === undefined || isNaN(originPraiseNum)) {
            //             // alert('error ' + item.oid + ' cannot be found in the userList:' + originPraiseNum)
            //             originPraiseNum = item.praiseNum
            //         }
            //         // if (this.userListTemp[index] && this.userListTemp[index].oid === item.oid) {
            //         //     originPraiseNum = this.userListTemp[index].praiseNum
            //         // } else if (this.getPraiseNumByOid(item.oid) !== null) {
            //         //     originPraiseNum = this.getPraiseNumByOid(item.oid)
            //         // } else {
            //         //     originPraiseNum = item.praiseNum
            //         // }
            //         if (item.bePraise) {
            //             setTimeout(() => {
            //                 // item.praiseNum = item.praiseNum + 1
            //                 // const cloneItemInnerStr = JSON.stringify(item)
            //                 // const cloneItemInner = JSON.parse(cloneItemStr)
            //                 item.praiseNum = originPraiseNum + 1
            //                 // 有时竟然会变成false，奇怪
            //                 item.bePraise = true
            //                 // this.userList.splice(i, 1, cloneItemInner)
            //             }, 800)
            //         } else {
            //             // item.praiseNum = item.praiseNum - 1 < 0 ? 0 : item.praiseNum - 1
            //             item.praiseNum = originPraiseNum
            //         }
            //         item.isNow = true
            //         // this.userList.splice(i, 1, cloneItem)
            //         break
            //     }
            // }
            this.userList = this.userList.map((item, index) => {
                if (item.oid === val.oid) {
                    item.bePraise = !item.bePraise
                    let originPraiseNum = this.getPraiseNumByOid(item.oid)
                    // alert('originPraiseNum:' + originPraiseNum)
                    if (originPraiseNum === null || originPraiseNum === undefined || isNaN(originPraiseNum)) {
                        // alert('error ' + item.oid + ' cannot be found in the userList:' + originPraiseNum)
                        originPraiseNum = item.praiseNum
                    }
                    // if (this.userListTemp[index] && this.userListTemp[index].oid === item.oid) {
                    //     originPraiseNum = this.userListTemp[index].praiseNum
                    // } else if (this.getPraiseNumByOid(item.oid) !== null) {
                    //     originPraiseNum = this.getPraiseNumByOid(item.oid)
                    // } else {
                    //     originPraiseNum = item.praiseNum
                    // }
                    if (item.bePraise) {
                        setTimeout(() => {
                            // item.praiseNum = item.praiseNum + 1
                            item.praiseNum = originPraiseNum + 1
                            // 有时竟然会变成false，奇怪
                            item.bePraise = true
                        }, 800)
                    } else {
                        // item.praiseNum = item.praiseNum - 1 < 0 ? 0 : item.praiseNum - 1
                        item.praiseNum = originPraiseNum
                    }
                    item.isNow = true
                }
                return item
            })
        },
        // 根据oid获取点赞数
        getPraiseNumByOid (oid) {
            if (!this.userListTemp || this.userListTemp.length <= 0) {
                return null
            }
            // console.log('@@@@this.userListTemp', this.userListTemp)
            for (let i = 0, len = this.userListTemp.length; i < len; i++) {
                const user = this.userListTemp[i]
                if (user.oid === oid) {
                    return user.praiseNum
                }
            }
            return null
        },
        // 判断当前动作是要点赞还是取消点赞
        isGotoParise (tIndex, val) {
            let bePraise = null
            if (this.isCold) { // 示例 数据
                if (this.isAr) { // Ar 数据
                    this.userAr.forEach((item, index) => {
                        if (tIndex === index) {
                            // item.bePraise = !item.bePraise
                            bePraise = !item.bePraise
                        }
                        // return item
                    })
                } else {
                    this.userTmp.forEach((item, index) => {
                        if (tIndex === index) {
                            // item.bePraise = !item.bePraise
                            bePraise = !item.bePraise
                        }
                    })
                }
                return
            }
            this.userList.map((item) => {
                if (item.oid === val.oid) {
                    bePraise = !item.bePraise
                }
            })
            if (bePraise === null) {
            }
            return bePraise
        },
        // 复制一份用户数据
        cloneUserData () {
            // if (this.userListTemp && this.userListTemp.length > 0) {
            //     return
            // }
            // this.userListTemp
            if (this.isCold) { // 示例 数据
                if (this.isAr) { // Ar 数据
                    const str = JSON.stringify(this.userAr)
                    this.userListTemp = JSON.parse(str)
                } else {
                    const str = JSON.stringify(this.userTmp)
                    this.userListTemp = JSON.parse(str)
                }
                return
            }
            if (this.userList) {
                const str = JSON.stringify(this.userList)
                this.userListTemp = JSON.parse(str)
            }
        },
        sendZanByGroup () {
            if (this.isCold) return
            if (!this.userList || this.userList.length <= 0) {
                return
            }
            let data = {
                reportMsgId: this.reportId,
                beReplayCommentId: '',
                content: '真棒',
                type: 2,
                notifyPersonList: [],
                appId: this.appId
            }
            this.userList = this.userList.map((item) => {
                if (item.bePraise && item.isNow) { // 只有当下点赞的头像才会记录isNow
                    data.notifyPersonList.push(item.oid)
                }
                return item
            })
            if (data.notifyPersonList.length === 0) {
                return
            }
            let opt = {
                url: this.vote,
                method: 'POST',
                data,
                serializer: 'json',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
            this.request(opt, () => {
                this.userList = this.userList.map((item) => {
                    item.isNow = false
                    return item
                })
            })
        },
        sortUserList (list) {
            list = list || this.userTmp
            list.sort((val1, val2) => {
                return val2.status - val1.status
            })
            list = this.removeSameUsers(list)
            return list
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
        // 跳转到人员列表页
        handleCheckMorePart () {
            const url = info.origin +
                '/connecterp-lapp/report/persondetail/' +
                this.reportId +
                '?type=lapp&appId=' +
                this.appId
            this.redirectTo({
                url,
                appId: this.appId
            })
        }
    },
    mounted () {
        Bus.$on('event-avatars', (item) => {
            if (!item || !item.users) {
                return
            }
            this.userList = this.sortUserList(item.users)
            this.reportId = item.reportId
            this.userCount = item.userCount
            this.cloneUserData()
        })
        document.addEventListener('disappear', this.sendZanByGroup)
    },
    beforeDestroy () {
        Bus.$off('event-avatars')
    }
}
</script>
