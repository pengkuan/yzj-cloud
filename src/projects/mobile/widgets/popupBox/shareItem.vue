/*
 * @Author: Jovey Zheng 
 * @Date: 2017-09-16 14:02:22 
 * @Last Modified by: Jovey Zheng
 * @Last Modified time: 2017-09-16 14:29:59
 */
 <style lang="less" scoped>
 li {
     .tap-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #8c98a1;
        img {
            display: block;
            width: .84rem;
            margin-bottom: .24rem;
        }
    }
 }
 </style>
 
<template>
    <li :class="className">
        <tap @tap="tapAction">
            <img :src="picSrc" :alt="type">
            <span v-html="text" />
        </tap>
    </li>
</template>

<script>
import Tap from '../../../../components/tap'

export default {
    name: 'shareItem',
    components: {
        Tap
    },
    props: {
        // 自定义类名
        className: {
            type: String,
            default: ''
        },
        // 类型
        type: {
            type: String,
            default: ''
        },
        // 点击事件
        tapAction: {
            type: Function,
            default: () => { console.log('Tap me') }
        },
        // 图片链接
        picSrc: {
            type: String,
            default: ''
        },
        // 图片下方文字
        text: {
            type: String,
            default: ''
        }
    }
}
</script>
