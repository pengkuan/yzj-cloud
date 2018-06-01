import config from 'config'

export default function install (Vue) {
    // 只在正式环境进行统计，其它环境打印控制台日志
    if (window._dataly && (config.runenv === 'yzj')) {
        Vue.prototype.dataly = function (val, callback) {
            setTimeout(() => {
                window._dataly.push(['_trackEvent', val, callback])
            }, 1000)
        }
    } else {
        Vue.prototype.dataly = function (val) {
            console.info(JSON.stringify(val))
        }
    }

    let lastCardDatalyTime = 0
    Vue.prototype.cardDataly = function (val, callback) {
        // 每0.1秒最多统计一次
        if (new Date().getTime() - lastCardDatalyTime < 100) return
        lastCardDatalyTime = new Date().getTime()

        setTimeout(() => {
            let card = (this.getContainerCard() || {}).card
            if (!card || !card.title) return

            this.dataly({
                position: card.title + '卡片',
                event: val
            }, callback)

            card = null
        }, 0)
    }
}
