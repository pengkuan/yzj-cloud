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
            .fields-wrap {
                list-style: none;
                padding: 0;
                margin: 0;
                .field {
                    padding: 0;
                    margin: 0;
                    .label {
                        .px2rem(font-size, 14);
                        .px2rem(line-height, 20);
                        color: #768893;
                        vertical-align: middle;
                    }
                    .text {
                        .px2rem(font-size, 14);
                        .px2rem(line-height, 20);
                        color: #030303;
                        vertical-align: middle;
                    }
                }
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
        <div class="content">
            <h6 class="header">{{ data.title}}</h6>
            <ul class="fields-wrap">
                <li class="field" v-for="(value, key, index) in data.extendMap" :key="index">
                    <label class="label">{{ key }}：</label><span class="text">{{ value }}</span>
                </li>
            </ul>
        </div>
        <card-buttons class="resetDeskBtn">
            <card-button>{{ LANG.quickAgreeBtnTxt }}</card-button>
        </card-buttons>
    </section>
</template>
<script>
import {CardButton, CardButtons} from 'card-components'
import {isValidDate, formatDate} from '@/utils'
import LANG from '@/lang/cards/cloudflow'

export default {
    components: {
        CardButton,
        CardButtons
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            LANG: LANG.quick
        }
    },
    methods: {
        formatDate: function (value) {
            const d = new Date(value)
            if (isValidDate(d)) {
                return formatDate(d, 'yyyy-MM-dd HH:mm:ss')
            }
            return value
        }
    }
}
</script>
