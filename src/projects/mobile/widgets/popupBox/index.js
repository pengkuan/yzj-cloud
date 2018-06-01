/*
 * @Author: Jovey Zheng
 * @Date: 2017-09-16 12:01:02
 * @Last Modified by: Jovey Zheng
 * @Last Modified time: 2017-09-16 12:01:26
 */
import Vue from 'vue'
import PopupBoxComponent from './popupBox'

// 实例
let instance
/**
 * 弹出框主体函数，将实例加载到 DOM 中
 * @param {Object} options 组件 props 值
 */
const Popup = (options = {}) => {
    instance = new Vue({
        render (h) {
            return h(PopupBoxComponent, {
                props: options
            })
        }
    })
    // 渲染组件
    const component = instance.$mount()
    document.body.appendChild(component.$el)

    return {
        vm: instance.$children[0],
        renderComponent: component
    }
}

/**
 * 手动关闭
 */
Popup.destroy = () => {
    try {
        const el = document.querySelector('.popup__container')
        document.body.removeChild(el)
        return true
    } catch (err) {
        throw err
    }
}

Vue.prototype.$popup = Popup  // 载入 Vue 全局中

export default Popup
