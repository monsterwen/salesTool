<template>
    <div class="questionCategory"
         :class="{ 'selected': selected }"
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
            selected: {
                type: Boolean,
                default: () => false
            },
            colorRange: {
                type: Array,
                default: () => ['#D83737','#D83737','#FFBF00','#FFBF00','#A5BB00','#A5BB00']
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
            window.addEventListener('resize', this.updateMeter)
        },
        methods: {
            createMeterElements: function () {
                let div = d3
                    .select(`#${this.questionKey}`)
                    .select('.questionMeter')
                if (!div.node()) {
                    setTimeout(() => {
                        div = d3
                            .select(`#${this.questionKey}`)
                            .select('.questionMeter')
                        console.log('timeeededeeed', this.questionKey, div)
                    },1000)
                }
                console.log('doiiiivd', this.questionKey, div)
                let dimensions = div.node().getBoundingClientRect()
                let width = dimensions.width
                let height = dimensions.height
                console.log('width', width)
                let progressScale = d3.scaleLinear()
                    .domain([0, this.questionTotal])
                    .range([0, 100])

                let colorScale = d3.scaleLinear()
                    .domain([0, 49, 50, 69, 70, 100])
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

                this.meterDiv = div
                this.rect = rect
            },
            updateMeter: function () {
                this.rect
                    .transition()
                    .duration(300)
                    .attr('fill', 'rgba(252,205,18,0.98)')
                    .attr('width', `${this.progressScale(this.questionNumber)}%`)
                    .transition()
                    .duration(300)
                    .attr('fill', this.colorScale(this.categoryScore))
            }
        }
    }
</script>

<style scoped>

.questionCategory {
    flex-basis: 100%;
    width: 100%;
    height: 100%;
    background-color: #c1d82f;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    transition: background-color 0.5s ease-in-out;
}
.questionCategory :hover {
    background-color: #d7d7d7;
}
.selected {
    background-color: #dcdcdc;
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
@media (max-width: 1400px) {
    .questionName p {
        font-size: 14px;
    }
}
.questionMeter {
    flex-basis: 12px;
    heigth: 12px;
    max-height: 12px;
    width: 100%;
    background-color: white;
}
</style>