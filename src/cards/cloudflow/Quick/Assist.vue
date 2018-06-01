<style lang="less" scoped>
@import '../../../css/variable.less';

[data-v10][data-mobile] {
    .flow-statu-wrap {
        .content {
            .px2rem(height, 167);
        }
    }
}

.flow-statu-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    font-size: 0;
    line-height: 0;
    .content {
        .px2rem(height, 178);
        .px2rem(padding-left, 24);
        .px2rem(padding-right, 24);
        .header {
            font-style: normal;
            font-weight: 400;
            color: #1d1d1d;
            .px2rem(font-size, 14);
            .px2rem(line-height, 20);
            .px2rem(height, 20);
            .px2rem(margin-bottom, 12);
        }
        .todo-content {
            width: 100%;
            .px2rem(font-size, 14);
            .px2rem(line-height, 20);
            .px2rem(height, 80);
            overflow: hidden;
            word-break: break-all;
            word-wrap: break-word;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
        }
    }
}

[data-pc] {
    .resetDeskBtn {
        margin-bottom: 14px;
    }
}
[totalpage="1"],
[data-swiper-size="1"] {
    .resetDeskBtn {
        margin-bottom: 0;
    }
}
</style>

<template>
    <section class="flow-statu-wrap">
        <tap class="content" @tap="gotoDetail(data)">
            <h6 class="header">{{ data.title}}</h6>
            <p class="todo-content">
                {{ data.content }}
            </p>
        </tap>
        <card-buttons class="resetDeskBtn">
            <card-button @tap="gotoDetail(data)">{{LANG.gotoDetailBtnTxt}}</card-button>
        </card-buttons>
    </section>
</template>
<script>
import {CardButton, CardButtons} from 'card-components'
import Tap from 'components/tap'
import LANG from '@/lang/cards/cloudflow'

const quick = LANG.quick

export default {
    components: {
        CardButton,
        CardButtons,
        Tap
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            LANG: quick
        }
    },
    methods: {
        gotoDetail: function (todoData) {
            this.redirectTo({
                url: todoData.url,
                appId: todoData.appid
            })
        }
    }
}
</script>
