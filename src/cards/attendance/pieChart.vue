<template>
    <div class="pie-chart">
        <svg id="pieChart" :width="radii" :height="radii"></svg>
    </div>
</template>

<script>
import { pie, arc } from 'd3-shape'
import { select } from 'd3-selection'

export default {
    props: {
        piedata: {
            type: Array
        }
    },
    data () {
        return {
            radii: 138
        }
    },
    methods: {
        createChart () {
            const svg = select(this.$el.querySelector('svg'))
            const width = this.radii
            const height = this.radii
            const radius = Math.min(width, height) / 2
            const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`)
            const pieInst = pie()
                .sort(null)
                .value(d => d.value)

            const pathInst = arc()
                .outerRadius(radius)
                .innerRadius(0)

            const labelInst = arc()
                .outerRadius(radius - 25)
                .innerRadius(radius - 25)

            const arcInst = g.selectAll('.arc')
                .data(pieInst(this.piedata))
                .enter().append('g')
                .attr('class', 'arc')

            arcInst.append('path')
            .attr('class', 'path')
            .attr('d', pathInst)
            .attr('fill', d => d.data.color)

            arcInst.append('text')
            .attr('class', 'text')
            .attr('transform', d => {
                const percent = Math.round(100 * (d.endAngle - d.startAngle) / (Math.PI * 2))
                return percent === 100 ? `translate(0)` : `translate(${labelInst.centroid(d)})`
            })
            .attr('dy', '0.35em')
            .attr('dx', '0em')
            .attr('fill', d => d.data.color === '#EFF1F4' ? '#768893' : '#ffffff')
            .text(d => {
                return (d.endAngle - d.startAngle > 0.3 ? Math.round(100 * (d.endAngle - d.startAngle) / (Math.PI * 2)) + '%' : '')
            })
        }
    },
    mounted () {
        let fontSize = document.documentElement.style.fontSize

        if (/[\d\.]+px/.test(fontSize)) {
            fontSize = parseFloat(fontSize, 10)
        } else {
            fontSize = 50
        }
        
        this.radii = 138 * fontSize / 50

        if (this.piedata.length !== 0) {
            this.createChart()
        }
    }
}
</script>

<style lang="less">
.pie-chart {
    .text {
        font-size: 12px;
        text-anchor: middle;
    }
}
</style>
