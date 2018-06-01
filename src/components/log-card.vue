<style lang="less">
    .debug-card{
        height: 260px;
        overflow: auto;
    }
</style>
<template>
    <div class="debug-card" v-if="visible">
        <div v-for="(item, index) in logs" :key="index">{{item}}</div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            visible: false,
            logs: []
        }
    },
    created () {
        if (location.hostname.indexOf('172.200') === 0) {
            this.visible = true
            this.bus.$on('log', e => {
                let now = new Date().getTime()
                this.logs.unshift(`[${now}] - ${JSON.stringify(e)}`)
                if (this.logs.length > 20) {
                    this.logs.pop()
                }
            })
        }
    }
}
</script>
