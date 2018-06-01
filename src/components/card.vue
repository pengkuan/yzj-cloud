<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}
</style>

<template>
    <card-container
        :card="card"
        :title="card.title"
        :height="cardHeight"
        :has-notify="hasNotify"
        :icon="card.icon"
        :icon-color="card.iconColor"
        :icon-background-color="card.iconBackgroundColor"
        :icon-cls="card.iconCls"
        :icon-data="card.iconData"
        :container-style="'position:relative;'"
        @request="request">
        <keep-alive>
            <component
                :is="'card_' + card.name"
                :card="card && JSON.parse(JSON.stringify(card))"
                :title="card.title"
                :actions="card.actions"
                :data="card.data && JSON.parse(JSON.stringify(card.data))"
                :loaded="true"
                @request="request"
                @removeCard="removeCard"
                @setHeight="_setHeight">
            </component>
        </keep-alive>
    </card-container>
</template>
<script>
import CardContainer from 'components/card-container'

export default {
    components: {
        CardContainer
    },
    props: ['hasNotify', 'card'],
    data () {
        return {
            cardHeight: this.card.height || 218
        }
    },
    methods: {
        request (card) {
            this.$emit('request', card)
        },
        removeCard () {
            this.$emit('removeCard')
        },
        _setHeight (height) {
            this.cardHeight = height
        }
    }
}
</script>
