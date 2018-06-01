<template>
  <div>
      <button @click="inc">+</button>
      <span>{{ count }}</span>
      <button @click="dec">-</button>
      <span>{{ multiple }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, State, Getter } from 'vuex-class'

@Component
export default class A extends Vue {
    @State count: number
    @Action inc: Function
    @Action dec: Function
    @Getter multiple: number
}
</script>
