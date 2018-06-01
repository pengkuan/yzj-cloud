<template>
    <div></div>
</template>

<script>
export default {
    props: {
        // 间隔
        interval: {
            type: Number,
            default: 3600
        },
        // 模式 autoSync/tabChange
        mode: {
            type: String,
            default: 'autoSync'
        }
    },

    methods: {
        // 自动同步数据
        _syncData () {
            const card = this.getContainerCard()

            if (card) {
                if (this.mode === 'autoSync') {
                    if (typeof this.interval !== 'number') {
                        return
                    }
                    setInterval(() => {
                        card.$emit('request', card.card)
                    }, this.interval * 1000)
                } else if (this.mode === 'tabChange' || this.mode === 'disappear') {
                    document.addEventListener('disappear', () => {
                        setTimeout(() => {
                            card.$emit('request', card.card)
                        }, 500)
                    })
                } else if (this.mode === 'appear') {
                    document.addEventListener('appear', () => {
                        card.$emit('request', card.card)
                    })
                }
            }
        }
    },

    mounted () {
        this._syncData()
    }
}
</script>

