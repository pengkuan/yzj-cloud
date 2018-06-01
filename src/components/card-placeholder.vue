<style lang="less" scoped>
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background: #FFF;
    }
    .container > div{
        width: 100%;
        height: 100%;
    }

    // 图文列表
    .list{
        overflow: hidden;
        .list-item{
            width: 100%;
            padding-top: 10px;
            padding-left: 10px;
            padding-right: 10px;
            height: 60px;
            display: flex;
            .list-item-pic{
                width: 36px;
                height: 36px;
                background: #E6EAEC;
                border-radius: 3px;
            }
            .list-item-text{
                flex: 1;
                margin-left: 10px;
                &::before{
                    display: block;
                    content: ' ';
                    width: 100%;
                    height: 10px;
                    background: #E6EAEC;
                }
                &::after{
                    display: block;
                    content: ' ';
                    width: 80%;
                    height: 6px;
                    background: #E6EAEC;
                    margin-top: 10px;
                }
            }
        }
    }

    // 文字列表
    .text-list{
        overflow: hidden;
        .text-list-item{
            margin-top: 20px;
            margin-left: 10px;
            margin-right: 10px;
            height: 10px;
            background: #E6EAEC;
        }
    }

    // 头像列表
    .container .face-list{
        overflow: hidden;
        height: auto;
        .face-list-text{
            width: 50%;
            height: 8px;
            background: #E6EAEC;
            margin-left: auto;
            margin-right: auto;
        }
        .face-list-items{
            margin-top: 40px;
            text-align: center;
            display: flex;
            .face-list-item-box{
                flex: 1;
                .face-list-item{
                    width: 40px;
                    height: 40px;
                    display: inline-block;
                    border-radius: 50%;
                    background: url(../assets/comm/default-photo.png) 50% 50% no-repeat;
                    background-size: 100%;
                }
            }
        }
    }

    // 应用列表
    .container .app-list{
        height: auto;
        overflow: hidden;
        display: flex;
        .app-list-item-box{
            flex: 1;
        }
        .app-list-item{
            width: 42px;
            margin-left: auto;
            margin-right: auto;
            &::before{
                content: ' ';
                display: block;
                width: 42px;
                height: 42px;
                background: #E6EAEC;
                border-radius: 3px;
            }
            &::after{
                content: ' ';
                display: block;
                width: 42px;
                height: 42px;
                margin-top: 35px;
                background: #E6EAEC;
                border-radius: 3px;
            }
        }
    }

    // 详情
    .container .detail{
        height: auto;
        overflow: hidden;
        .detail-pic{
            width: 42px;
            height: 42px;
            background: #E6EAEC;
            border-radius: 3px;
            margin-left: auto;
            margin-right: auto;
        }
        .detail-row1{
            margin-top: 25px;
            width: 60%;
            height: 8px;
            background: #E6EAEC;
            margin-left: auto;
            margin-right: auto;
        }
        .detail-row2{
            margin-top: 20px;
            width: 30%;
            height: 6px;
            background: #E6EAEC;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>
<template>
  <div class="container">
      <div class="list" v-if="typeName === 'list'">
          <div class="list-item" v-for="(item, index) in [1,2,3]" :key="index">
              <div class="list-item-pic"></div>
              <div class="list-item-text"></div>
          </div>
      </div>
      <div class="text-list" v-if="typeName === 'text-list'">
          <div class="text-list-item" v-for="(p, index) in [60,80,40,70]" 
            :style="'width:' + p + '%'"
            :key="index">
          </div>
      </div>
      <div class="face-list" v-if="typeName === 'face-list'">
          <div class="face-list-text"></div>
          <div class="face-list-items">
            <div class="face-list-item-box" v-for="(p, index) in [1,2,3,4,5]" :key="index">
                <div class="face-list-item">
                </div>
            </div>
          </div>
      </div>
      <div class="app-list" v-if="typeName === 'app-list'">
          <div class="app-list-item-box" v-for="(p, index) in [1,2,3,4]" 
            :key="index">
            <div class="app-list-item"></div>
          </div>
      </div>
      <div class="detail" v-if="typeName === 'detail'">
          <div class="detail-pic"></div>
          <div class="detail-row1"></div>
          <div class="detail-row2"></div>
      </div>
  </div>
</template>
<script>
const types = ['list', 'text-list', 'face-list', 'app-list', 'detail']

export default {
    props: {
        type: {
            type: String,
            validator: function (value) {
                return types.includes(value)
            }
        },
        name: {
            type: String
        }
    },
    computed: {
        typeName () {
            if (this.type) return this.type

            switch (this.name) {
                case 'myfav':
                    return 'list'
                case 'task':
                case 'track-flow':
                case 'easyworkflow':
                case 'boss':
                    return 'text-list'
                case 'myapp':
                    return 'app-list'
                case 'diligent':
                    return 'face-list'
                case 'kdrive':
                case 'attendance':
                case 'crm':
                    return 'detail'
            }
        }
    }
}
</script>
