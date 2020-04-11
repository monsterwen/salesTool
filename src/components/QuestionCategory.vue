<template>
    <div class="questionCategory"
        :id="questionKey">
        <div class="questionName">
            <p>{{ questionName }}</p>
        </div>
        <div class="questionMeter"></div>
    </div>
</template>

<script>
    import * as d3 from 'd3'

    export default {
        name: "questionCategory",
        props: {
            questionName: {
                type: String,
                required: true
            },
            questionKey: {
                type: String,
                default: () => 'category'
            },
            categoryScore: {
                type: Number,
                default: () => 0
            },
            questionNumber: {
                type: Number
            },
            questionTotal: {
                type: Number
            },
            colorRange: {
                type: Array,
                default: () => ['#D83737', '#CFCFCF', '#8EAC1D']
            }
        },
        watch: {
            questionNumber: function () {
                this.updateMeter()
            },
            questionTotal: function () {
                this.createMeterElements()
            }
        },
        data: () => ({
            meterDiv: null,
            meterSvg: null,
            meterRect: null,
            //
            progressScale: null,
            colorScale: null
        }),
        mounted: function () {
            // this.createMeterElements()
        },
        methods: {
            createMeterElements: function () {
                let div = d3
                    .select(`#${this.questionKey}`)
                    .select('.questionMeter')

                let dimensions = div.node().getBoundingClientRect()
                let width = dimensions.width
                let height = dimensions.height

                let progressScale = d3.scaleLinear()
                    .domain([0, this.questionTotal])
                    .range([0, width])

                let colorScale = d3.scaleLinear()
                    .domain([0, 40, 100])
                    .range(this.colorRange)
                let svg = div
                    .append('svg')
                    .attr('class', 'rectSvg')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', '100%')
                    .attr('height', height)
                let g = svg
                    .append('g')
                    .attr('class', 'meter-group')
                    .attr('transform', 'translate(0,-5)')

                let rect = g
                    .append('rect')
                    .attr('id', 'meterRect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', 0)
                    .attr('height', height)
                console.log('width', width, this.questionTotal)
                this.progressScale = progressScale
                this.colorScale = colorScale

                this.rect = rect
            },
            updateMeter: function () {
                this.rect
                    .transition()
                    .duration(300)
                    .attr('fill', 'rgba(252,205,18,0.98)')
                    .attr('width', this.progressScale(this.questionNumber))
                    .transition()
                    .duration(300)
                    .attr('fill', this.colorScale(this.categoryScore))
            }
        }
    }
</script>

<style scoped>

.questionCategory {
    flex-basis: 20%;
    width: 20%;
    height: 100%;
    background-color: #EDEDED;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    transition: background-color 0.2s ease-in-out;
}

.questionName {
    flex-basis: calc(100% - 12px);
    height: calc(100% - 12px);
    max-height: calc(100% - 12px);
    width: 100%;
    display: table;
}
.questionName p {
    user-select: none;
    text-align:center;
    vertical-align: middle;
    display: table-cell;
    cursor: pointer;
}
.questionMeter {
    flex-basis: 12px;
    heigth: 12px;
    max-height: 12px;
    width: 100%;
    background-color: #DDDDDD;
}
</style>