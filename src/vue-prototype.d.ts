/**
 * Vue 原型链定义 —— 自定义方法
 */
import Vue from 'vue'
import { OptionsObject as ToastOptions } from 'pc/elements/Toast'
import { Bridge } from 'pc/types'

declare module 'vue/types/vue' {
    interface Vue {
        // 方法
        $toast(options: ToastOptions | string): void
        request(options: any): Promise<any>
        showTabRedDot(options: { num: number }): void
        clearTabRedDot(): void
        redirectTo(options: any): void
        // 数据
        userInfo: Bridge.PersonInfo
    }
}
