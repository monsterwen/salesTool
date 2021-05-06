<template>
    <div class="resultsGraphHolder" :id="divId">
        <svg class="resultsGraphSVG">
            <g class="xAxisG"></g>
            <g class="yAxisG"></g>
            <g class="barG"></g>
        </svg>
    </div>
</template>

<script>
    import * as d3 from 'd3'

    export default {
        name: "ResultsGraph",
        props: {
            divId: {
                type: String,
                default: () => 'resultsDiv'
            },
            margin: {
                type: Object,
                default: () => ({
                    top: 36,
                    left: 36,
                    bottom: 36,
                    right: 36
                })
            }
        },
        data: function () {
            return {
                barDiv: null,
                barSvg: null,
                xAxisG: null,
                yAxisG: null,
                barG: null,
                //
                dimensions: {},
                width: 0,
                height: 0,
            }
        },
        computed: {
        },
        mounted: function () {
            this.populateChartElements()
        },
        methods: {
            populateChartElements: function () {
                this.barDiv = d3.select(`#${this.divId}`)
                this.barSvg = this.barDiv.select('.resultsGraphSVG')
                this.xAxisG = this.barSvg.select('.xAxisG')
                this.yAxisG = this.barSvg.select('.yAxisG')
                this.barG = this.barSvg.select('.barG')
            },
            transformChartElements: function () {
                this.dimensions = this.barDiv.node().getBoundingClientRect()
                this.width = this.dimensions.width - this.margin.left - this.margin.right
                this.height = this.dimensions.height - this.margin.top - this.margin.bottom

                this.axisG
                    .attr('transform', `translate(`)
            }
        }
    }
</script>

<style scoped>
    .resultsGraphHolder {
        width: 100%;
        height: 100%;
    }
</style>