export default function install (Vue) {
    // 寻找容器卡片
    Vue.prototype.getContainerCard = function () {
        let p = this
        let card

        while (p.$parent && (p.$parent !== p)) {
            p = p.$parent
            if (p.card) {
                card = p
                break
            }
        }

        p = null

        return card
    }
}
