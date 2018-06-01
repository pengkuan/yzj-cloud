<template>
    <div class="amount-wrapper">
        <p class="title">{{titleText}}</p>
        <p class="amount">{{computAmount}}</p>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../css/variable";
.amount-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  p {
    .px2rem(font-size, 15);
    color: #768893;
    &:last-of-type {
      margin-top: 20px;
      .px2rem(margin-top, 20);
      .px2rem(font-size, 46);
      color: #494b52;
    }
  }
}
</style>
<script>
import { formatNumber } from './util.js'
export default {
    name: 'report-amount',
    props: {
        title: {
            type: String,
            default: ''
        },
        amount: {
            type: String | Number,
            default: '0.00'
        },
        unit: {
            type: String,
            default: ''
        },
        item: Object
    },
    computed: {
        titleText () {
            return this.unit ? `${this.title} (${this.unit})` : this.title
        },
        computAmount () {
            const format = this.item && this.item.diagram.diagramPattern.yAxisPattern.fieldPattern[0][0].format
            if (format === 'percentage') {
                return formatNumber(Number(this.amount * 100).toFixed(2)) + '%'
            } else {
                return formatNumber(this.amount)
            }
        }
    },
    filters: {
        setAmount (v) {
            // if (this.item && this.item.diagram.diagramPattern.yAxisPattern.fieldPattern[0][0].format) {
            //     const format = this.item.diagram.diagramPattern.yAxisPattern.fieldPattern[0][0].format
            //     // console.log(this.amount)
            //     // console.log(this.item)
            //     const num = v.toFixed(2) + (format === 'percentage') ? '%' : ''
            //     return formatNumber(num)
            // }

            // const arr = v.toString().split('.')
            // return (arr[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + (arr[1] ? `.${arr[1]}` : '.00')
        }
    },
    mounted () {
        // console.log(this.diagram.diagramPattern.yAxisPattern.fieldPattern[0][0].format)
        // console.log(this.item.diagram.diagramPattern.yAxisPattern.fieldPattern[0][0].format)
    }
}
</script>
