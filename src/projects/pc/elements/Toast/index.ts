import Vue from 'vue'
import ToastComponent from './component.vue'

export interface OptionsObject {
    text?: string
    icon?: string
    duration?: number
    showIcon?: boolean
    onClose?: () => any
}

function Install (Vue): void {
    Vue.prototype.$toast = (options: OptionsObject | string): object => {
        if (typeof options === 'string') {
            const obj: OptionsObject = {}
            obj.showIcon = false
            obj.text = options
            options = obj
        }

        let instance = new Vue({
            render (h) {
                return h(ToastComponent, {
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
}

export default Install
