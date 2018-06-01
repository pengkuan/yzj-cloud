const Action = r => r(require('./action'))
const Swiper = r => {
    if (qing.isDesktop) {
        return r(require('@/components/Swiper/desktopWrapper.vue'))
    }
    return r(require('./swiper'))
}
const Container = r => r(require('./container'))
const Sync = r => r(require('./sync'))
const CardButtons = r => r(require('./buttons'))
const CardButton = r => r(require('./button'))

// 导出全部组件
export default {
    Action,
    Swiper,
    Container,
    Sync,
    CardButtons,
    CardButton
}

// 导出单个组件
export {
    Action,
    Swiper,
    Container,
    Sync,
    CardButtons,
    CardButton
}
