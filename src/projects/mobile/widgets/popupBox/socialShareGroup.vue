/*
 * @Author: Jovey Zheng
 * @Date: 2017-09-16 12:02:10
 * @Last Modified by: Jovey Zheng
 * @Last Modified time: 2017-09-20 19:16:45
 */
<style lang="less" scoped>
@import url('../../../../css/variable');

ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .px2rem(font-size, 11);
    li {
        .px2rem(min-width, 60);
    }
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
    <ul>
        <ShareItem v-for="item in shareList"
                   :key="item.type"
                   :text="item.text"
                   :type="item.type"
                   :picSrc="item.picSrc"
                   :tapAction="item.tapAction" />
    </ul>
</template>

<script>
import Tap from '../../../../components/tap'
import ShareItem from './shareItem'
import contactSVG from '../../../../assets/activity/contact.svg'
import workmateSVG from '../../../../assets/activity/workmate.svg'
import wechatSVG from '../../../../assets/activity/wechat.svg'
import LANG from '@/lang/index'

export default {
    name: 'socialShareGroup',
    components: {
        Tap,
        ShareItem
    },
    props: {
        // 分享按钮列表（默认有下面三种），类型为数组-对象: [{}]
        list: {
            type: Array,
            default: []
        },
        // 是否显示预设的三种按钮
        showPreset: {
            type: Boolean,
            default: true
        },
        // 是否点击分享之后弹窗消失
        isSharedToClose: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            // 分享按钮列表
            shareList: this.showPreset
                        ? [{
                            type: 'contact',
                            text: LANG.shareContacts.tel,
                            picSrc: contactSVG,
                            tapAction: this.contactShare
                        }, {
                            type: 'workmate',
                            text: LANG.shareContacts.cloudhub,
                            picSrc: workmateSVG,
                            tapAction: this.workmateShare
                        }, {
                            type: 'wechat',
                            text: LANG.shareContacts.wechat,
                            picSrc: wechatSVG,
                            tapAction: this.wechatShare
                        }].concat(this.list)
                        : this.list
        }
    },
    methods: {
        /**
         *  微信分享按钮点击事件
         * @param {Object} e event 元素事件对象
         */
        wechatShare (e) {
            this.$emit('wechatShare', e)
            if (this.isSharedToClose) {
                this.destroyedParent()
            }
        },
        /**
         * 云之家同事分享按钮点击事件
         * @param {Object} e event 元素事件对象
         */
        workmateShare (e) {
            this.$emit('workmateShare', e)
            if (this.isSharedToClose) {
                this.destroyedParent()
            }
        },
        /**
         * 手机联系人分享按钮点击事件
         * @param {Object} e event 元素事件对象
         */
        contactShare (e) {
            this.$emit('contactShare', e)
            if (this.isSharedToClose) {
                this.destroyedParent()
            }
        },
        /**
         * 清除父节点
         */
        destroyedParent () {
            document.body.removeChild(this.$parent.$el)
        }
    }
}
</script>
