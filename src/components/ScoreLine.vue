<template>
    <div class="lineHolder"></div>
</template>

<script>
    import * as d3 from 'd3'
    export default {
        name: "ScoreLine",
        props: {
            preScore: {
                type: Number
            },
            postScore: {
                type: Number
            },
            preColor: {
                type: String
            },
            postColor: {
                type: String
            },
            renderFull: {
                type: Boolean,
                default: () => false
            },
            margin: {
                type: Object,
                default: () => ({
                    bottom: 6
                })
            }
        },
        data: () => ({
            lineScaleX: null,
            lineScaleY: null,
            div: null,
            svg: null,
            g: null,
            dimensions: null,
            width: null,
            height: null,
            data: [0]
        }),
        watch: {
            renderFull: function () {
                console.log('rendering FULL LINE')
                this.data = [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5]
                this.transformComponents()
            }
        },
        mounted: function () {
            this.createComponents()
            // this.transformComponents()
        },
        methods: {
            createComponents: function () {
                let div = d3.select('.lineHolder')

                let dimensions = div.node().getBoundingClientRect()
                let width = dimensions.width
                let height = dimensions.height - this.margin.bottom

                let lineScaleX = d3.scaleLinear()
                    .domain([0, 5])
                    .range([0, width])

                let lineScaleY = d3.scalePow()
                    .domain([0, 5])
                    .range([height, 0])
                    .exponent(5)

                let svg = div
                    .append('svg')
                    .attr('class', 'lineSvg')
                    .attr('width', '100%')
                    .attr('height', '100%')

                let g = svg
                    .append('g')
                    .attr('id', 'line-g')

                this.lineScaleX = lineScaleX
                this.lineScaleY = lineScaleY
                this.div = div
                this.svg = svg
                this.g = g
            },
            transformComponents: function () {
                this.dimensions = this.div.node().getBoundingClientRect()
                this.width = this.dimensions.width
                this.height = this.dimensions.height - this.margin.bottom
                console.log('width', this.width)
                this.lineScaleX
                    .range([0, this.width])
                this.lineScaleY
                    .range([this.height, 0])

                // this.svg
                //     .attr('width', `${this.width}px`)
                //     .attr('height', `${this.height}px`)
                this.drawLine()
            },
            drawLine: function () {
                let lineScale = d3.line()
                    .x(d => this.lineScaleX(d)) // set the x values for the line generator
                    .y(d => this.lineScaleY(d)) // set the y values for the line generator
                    .curve(d3.curveMonotoneX) // apply smoothing to the line

                console.log('thisdata', this.data, this.preScore, this.postScore)
                let line = this.g
                    .selectAll('.scoreLine')
                    .data([this.data])
                line
                    .exit()
                    .remove()
                line
                    .enter()
                    .append('path')
                    .attr('d', lineScale)
                    .attr('stroke', '#A5BB00')
                    .attr('fill', 'none')
                    .attr('stroke-width', '5px')
                    .attr('class', 'scoreLine')
                let radarPoints = this.g
                    .selectAll('.progressPoint')
                    .data([this.preScore, this.postScore])
                radarPoints
                    .exit()
                    .remove()
                radarPoints = radarPoints
                    .enter()
                    .append('circle')
                    .merge(radarPoints)
                    .attr('class', 'radarPoint')
                radarPoints
                    .transition()
                    .duration(200)
                    .attr('r', '9px')
                    .attr('cx', (d) => this.lineScaleX(d))
                    .attr('cy', (d) => this.lineScaleY(d))
                    .style('fill', (d, i) => {
                        if (i === 0) {
                            return this.preColor
                        }
                        return this.postColor
                    })
                    .style('fill-opacity', 0.8)
                    .style('filter', 'url(#glow)')
            }
        }

    }
</script>

<style scoped>
.lineHolder {
    width: 100%;
    height: 100%;
}
</style>