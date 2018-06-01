<template>
    <div class="finance"
         ref="finance">
        
        <!-- 三张表 -->
        <div v-if="reportType === 'financeTable'"
             class="time-finance-true">
            <article class="article-title"
                     ref="articleTitle">
                <div v-for="item in tHeader">{{item.alias}}</div>
            </article>
            <div class="container"
                 ref="container">
                <li v-for="item in tBody">
                    <div>{{item.project}} &nbsp;</div>
                    <div>{{item.amount}} &nbsp;</div>
                </li>
            </div>
        </div>

        <!-- 自定义表格 -->
        <div v-else
             class="time-finance-false">
            <table>
                <thead>
                    <tr>
                        <th v-for="(item,index) in tHeader"
                            v-if="index < 3"><div class="table-cell">{{item.alias}}</div></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tBody">
                        <td v-for="(i,idx) in item"
                            :key="idx"
                            v-if="idx < 3"
                            :class="{isNum: getDataType(index,idx)}"><div class="">{{formatTableData(index,idx,i)}}</div></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
// import { formatNumber } from './util.js'
export default {
    data () {
        return {
            tHeader: [],
            tBody: []
        }
    },
    props: {
        diagram: Object,
        reportType: String
    },
    computed: {

    },
    methods: {
        getDataType (index, idx) {
            // 数值类型右对齐
            const diagram = this.diagram
            if (diagram && diagram.diagramPattern && diagram.diagramPattern.xAxisPattern && diagram.diagramPattern.xAxisPattern.fieldPattern && diagram.diagramPattern.xAxisPattern.fieldPattern[0].length && diagram.diagramPattern.yAxisPattern && diagram.diagramPattern.yAxisPattern.fieldPattern[0] && diagram.diagramPattern.yAxisPattern.fieldPattern[0].length) {
                const dataX = diagram.diagramPattern.xAxisPattern.fieldPattern[0]
                const dataY = diagram.diagramPattern.yAxisPattern.fieldPattern[0]
                const data = dataX.concat(dataY)
                return data[idx].dataType === 'number'
            } else {
                if (this.reportType === 'financeTable' && idx === 1) {
                    return true
                } else {
                    const data = diagram.diagramPattern.xAxisPattern.fieldPattern[0].length ? diagram.diagramPattern.xAxisPattern.fieldPattern[0] : diagram.diagramPattern.yAxisPattern.fieldPattern[0]
                    return data[idx].dataType === 'number'
                }
            }
        },
        formatNumberTable (num) {
            if (isNaN(num)) {
                return num
            }
            num = (num + '').split('.')
            let num0 = num[0]
            let num1 = num[1] ? num[1].replace(/0+$/, '') : ''
            return num0.replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + (num1 ? '.' : '') + num1
        },
        // index:第几行，idx：第几列
        formatTableData (index, idx, data) {
            const diagram = this.diagram
            if ((diagram && diagram.diagramData && diagram.diagramData.xAxis && diagram.diagramData.xAxis.length && diagram.diagramData.xAxis[0] && diagram.diagramData.xAxis[0].data) || (diagram && diagram.diagramData && diagram.diagramData.yAxis && diagram.diagramData.yAxis.length && diagram.diagramData.yAxis[0] && diagram.diagramData.yAxis[0].data)) {
                const dataX = diagram.diagramPattern.xAxisPattern.fieldPattern[0]
                if (dataX.length > 3) {
                    if (dataX[idx].dataType === 'string') {
                        return data
                    } else if (dataX[idx].dataType === 'number') {
                        if (dataX[idx].format) {
                            const format = dataX[idx].format
                            if (format === 'percentage') {
                                return this.formatNumberTable(String((Number(data) * 100).toFixed(2))) + '%'
                            } else {
                                return this.formatNumberTable(data)
                            }
                        } else {
                            return this.formatNumberTable(data)
                        }
                    } else {
                        return data
                    }
                } else {
                    // const dataY = diagram.diagramPattern.yAxisPattern.fieldPattern[0]
                    if (idx < dataX.length) {
                        if (dataX[idx].dataType === 'string') {
                            return data
                        } else if (dataX[idx].dataType === 'number') {
                            const format = dataX[idx].format
                            if (format === 'percentage') {
                                return this.formatNumberTable(String((Number(data) * 100).toFixed(2))) + '%'
                            } else {
                                return this.formatNumberTable(data)
                            }
                        } else {
                            return data
                        }
                    } else {
                        const dataY = diagram.diagramPattern.yAxisPattern.fieldPattern[0]
                        if (dataY[idx - (dataX.length)].dataType === 'string') {
                            return data
                        } else if (dataY[idx - (dataX.length)].dataType === 'number') {
                            const format = dataY[idx - dataX.length].format
                            if (format === 'percentage') {
                                return this.formatNumberTable(String((Number(data) * 100).toFixed(2))) + '%'
                            } else {
                                return this.formatNumberTable(data)
                            }
                        } else {
                            return data
                        }
                    }
                }
            }
        },
        computTHeader () {
            const diagram = this.diagram
            if (diagram && diagram.diagramPattern && diagram.diagramPattern && diagram.diagramPattern.yAxisPattern && diagram.diagramPattern.yAxisPattern.fieldPattern && diagram.diagramPattern.yAxisPattern.fieldPattern.length && diagram.diagramPattern.xAxisPattern && diagram.diagramPattern.xAxisPattern.fieldPattern && diagram.diagramPattern.xAxisPattern.fieldPattern.length) {
                this.tHeader = diagram.diagramPattern.xAxisPattern.fieldPattern[0].concat(
                    diagram.diagramPattern.yAxisPattern.fieldPattern[0])
            } else {
                // 三张表，只有数值或维度
                this.tHeader = diagram.diagramPattern.xAxisPattern.fieldPattern[0] || diagram.diagramPattern.yAxisPattern.fieldPattern[0]
            }
        },
        computTBody () {
            const diagram = this.diagram
            if (diagram && diagram.diagramData && diagram.diagramData.yAxis && diagram.diagramData.yAxis.length && diagram.diagramData.yAxis[0].data && diagram.diagramData.xAxis && diagram.diagramData.xAxis.length && diagram.diagramData.xAxis[0].data) {
                const dataY = diagram.diagramData.yAxis
                const dataX = diagram.diagramData.xAxis
                const data = dataX.concat(dataY)
                for (let i = 0; i < data.length; i++) {
                    for (let ii = 0; ii < data[i].data.length; ii++) {
                        if (this.tBody.length >= data[i].data.length) {
                            for (let iii = 0; iii < this.tBody.length; iii++) {
                                if (iii === ii) {
                                    this.tBody[iii].push(data[i].data[ii])
                                }
                            }
                        } else {
                            const tr = []
                            tr.push(data[i].data[ii])
                            this.tBody.push(tr)
                        }
                    }
                }
            } else {
                // 三张表，只有一个维度或者一个数值的情况
                if (this.reportType === 'financeTable') {
                    const projectData = diagram.diagramData.yAxis[0].data
                    const AmountData = diagram.diagramData.yAxis[1].data
                    for (let i = 0; i < projectData.length; i++) {
                        const obj = {
                            project: '',
                            amount: ''
                        }
                        obj.project = projectData[i]
                        obj.amount = AmountData[i]
                        this.tBody.push(obj)
                    }
                } else {
                    const data = diagram.diagramData.xAxis.length ? diagram.diagramData.xAxis : diagram.diagramData.yAxis
                    for (let i = 0; i < data.length; i++) {
                        for (let ii = 0; ii < data[i].data.length; ii++) {
                            if (this.tBody.length >= data[i].data.length) {
                                for (let iii = 0; iii < this.tBody.length; iii++) {
                                    if (iii === ii) {
                                        this.tBody[iii].push(data[i].data[ii])
                                    }
                                }
                            } else {
                                const tr = []
                                tr.push(data[i].data[ii])
                                this.tBody.push(tr)
                            }
                        }
                    }
                }
            }
        }
    },
    mounted () {
        const that = this
        setTimeout(() => {
            that.computTHeader()
        }, 0)
        setTimeout(() => {
            that.computTBody()
        }, 0)
    }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import '../../css/variable';
.finance {
  margin-top: 10px;
  
  .time-finance-true {
    .article-title {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(129, 190, 255, 1);
      color: rgba(255, 255, 255, 1);
      font-family: PingFangSC-Semibold;
      width: 100%;
      .px2rem(font-size,14);
      div {
        height: .8rem;
        line-height: .8rem;
        text-align: center;  
        font-weight: 700;      
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;  
        width: 50%;      
      }
      div:nth-child(1) {
        flex: 5;
      }
      div:nth-child(2) {
        flex: 5;
      }
    }
    .container {
      overflow: hidden;
      height: 3.21rem;
      top: 0.6183rem;
      background-color: #f1f7ff;
      .px2rem(font-size,16);
      li {
        list-style: none;
        display: flex;
        font-size: .274rem;
        border-bottom: 1px solid #e4f1ff;
        align-items: center;
        div {
          padding-left: 0.171rem;
          color: #494b52;
        //   letter-spacing: 0.1px;
          font-size: .274rem;
          line-height: 0.35rem;
          border-right: 1px solid rgba(228, 241, 255, 1);
          // text-indent: .12368rem;

          // padding-left: .12368rem;
          padding-top: 0.171rem;
          padding-bottom: 0.171rem;
          flex: 6;
          word-break: break-word;
        }
        div + div {
          padding-left: 0;
          border-right: 0;
          flex: 6;
          text-align: right;
        //   padding-bottom: 14px;
        }
        div {
            // line-height: 0;
            display: inline-block;
        }       
      }
    }
  }

  .time-finance-false {
    overflow: hidden;
    word-break: break-word;
      table {
        width: 100%;
        table-layout: fixed;
        thead {
          background-color: rgba(129, 190, 255, 1);
          color: rgba(255, 255, 255, 1);
          font-family: PingFangSC-Semibold;
          .px2rem(font-size,14);
          tr {
            height: 0.685rem;
            line-height: 0.685rem;
          }
          th {
            text-align: center;
            // font-weight: 700 !important;
            // border: 1px solid #e4f1ff;
            white-space: normal;
            word-break: break-word;

          }
        }

        tbody {
          font-weight: 400;
          background-color: #f1f7ff;
          font-family: PingFangSC-Regular; 
          .px2rem(font-size,16);
          tr {
            height: 0.685rem;
            line-height: 0.685rem;
          }
          td {
            // padding-left: 0.14rem;
            // padding: 14px 12px 14px 8px;
            .px2rem(padding-top, 14);
            .px2rem(padding-right,12);
            .px2rem(padding-bottom, 14);
            .px2rem(padding-left, 12);
            line-height: 0.376rem;
            // white-space: nowrap;
            vertical-align: middle;
            border-bottom: 1px solid #e4f1ff;
            border-left: 1px solid #e4f1ff;
            border-right: 1px solid rgba(228, 241, 255, 1);
            box-sizing: border-box;
            word-break: break-word;
          }
        }
      }
    .isNum {
      text-align: right;
      padding-right: 0.14rem;
      word-break: break-word;
    }
  }
  .table-cell {
        // width: 150px;
        word-break: break-all;
        height: auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
  }  
}
</style>
