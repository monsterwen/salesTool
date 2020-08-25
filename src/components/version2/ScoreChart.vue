<template>
    <div class="fit chartContainer" :id="chartId">
        <svg class="fit chartSvg"></svg>
    </div>
</template>

<script>
    import * as d3 from 'd3'

    export default {
        name: "scoreChart",
        props: {
            chartId: {
                type: String,
                default: () => 'scoreChart'
            },
            currentScore: {
                type: Number,
                default: () => 2.5
            },
            targetScore: {
                type: Number,
                default: () => 4.1
            },
            currentColor: {
                type: String,
                default: () => '#D83737'
            },
            targetColor: {
                type: String,
                default: () => '#A5BB00'
            },
            backgroundColor: {
                type: String,
                default: () => '#1d1d1f'
            },
            backgroundAltColor: {
                type: String,
                default: () => '#9d9d9f'
            },
            textColor: {
                type: String,
                default: () => '#1D1D1F'
            },
            chartState: {
                type: String,
                default: () => 'current'
            },
            xAxisLabel: {
                type: String,
                default: () => null
            },
            yAxisLabel: {
                type: String,
                default: () => 'Overall'
            },
            duration: {
                type: Number,
                default: () => 500
            },
            margin: {
                type: Object,
                default: () => ({
                    top: 32,
                    right: 32,
                    bottom: 32,
                    left: 32
                })
            }
        },
        data: function () {
            return {
                div: null,
                svg: null,
                barG: null,
                backgroundG: null,
                xAxisG: null,
                yAxisG: null,
                currentG: null,
                targetG: null,
                currentBar: null,
                targetBar: null,
                backgroundBar: null,
                //
                xAxisScale: null,
                yAxisScale: null,
                xAxis: null,
                yAxis: null,
                yAxisText: null,
                //
                dimensions: {},
                width: 0,
                height: 0,
                rendered: false
            }
        },
        computed: {
            xAxisRange: function () {
                if (this.chartState === 'current') {
                    return ['Current']
                }
                return ['Current', 'Target']
            },
            chartTicks: function () {
                if (this.chartState === 'current') {
                    return (Math.floor(this.currentScore * 1.05 / 0.5) + 1)
                }
                return (Math.floor(this.targetScore * 1.05 / 0.5) + 1)
            },
            yAxisRange: function () {
                // if (this.chartState === 'current') {
                //     return [0, Math.min(this.chartTicks * 0.5, 5)]
                // }
                return [0, Math.min(this.chartTicks * 0.5, 5)]
            }
        },
        watch: {
            chartState: function () {
                this.transformChart()
                this.renderBackground()
                this.renderTargetChart()
            }
        },
        mounted: function () {
            this.initializeChartElements()
            this.transformChart()
            this.renderBackground()
            this.renderCurrentChart()
            this.rendered = true
        },
        methods: {
            initializeChartElements: function () {
                this.div = d3.select(`#${this.chartId}`)
                this.svg = this.div.select('.chartSvg')

                this.dimensions = this.div
                    .node()
                    .getBoundingClientRect()
                this.width = this.dimensions.width - this.margin.left - this.margin.right
                this.height = this.dimensions.height - this.margin.top - this.margin.bottom

                this.backgroundG = this.svg
                    .append('g')
                    .attr('class', 'background-g')
                    .attr('transform', `translate(${this.margin.left},${this.margin.top})`)

                this.barG = this.svg
                    .append('g')
                    .attr('class', 'bar-g')
                    .attr('transform', `translate(${this.margin.left},${this.margin.top})`)

                this.xAxisG = this.svg
                    .append('g')
                    .attr('id', 'x-axis-g')
                    .attr('class', 'axis-g')
                    .attr('transform', `translate(${this.margin.left},${this.margin.top + this.height})`)

                this.yAxisG = this.svg
                    .append('g')
                    .attr('id', 'y-axis-g')
                    .attr('class', 'axis-g')
                    .attr('transform', `translate(${this.margin.left},${this.margin.top})`)

                this.currentG = this.barG
                    .append('g')
                    .attr('class', 'current-g')
                this.targetG = this.barG
                    .append('g')
                    .attr('class', 'target-g')
            },
            renderCurrentChart: function () {
                console.log('yAxis', this.yAxis)
                this.xAxisG
                    .call(this.xAxis)
                this.xAxisG.select('.domain').remove()
                this.xAxisG
                    .selectAll('.tick line')
                    .remove()
                this.xAxisG
                    .selectAll('.tick text')
                    .attr('font-size', '18px')
                    .attr('fill', this.textColor)

                this.yAxisG
                    .call(this.yAxis)
                this.yAxisG.select('.domain').remove()
                this.yAxisG
                    .selectAll('.tick line')
                    .remove()
                this.yAxisG
                    .selectAll('.tick text')
                    .attr('font-size', '18px')
                    .attr('fill', this.textColor)
                this.yAxisText = this.yAxisG
                    .append('text')
                    .attr('class', 'chart-text')
                    .attr('transform', 'rotate(-90)')
                    .attr('x', 0 - 3)
                    .attr('y', 6)
                    .attr('dy', '0.71em')
                    .attr('text-anchor', 'end')
                    .attr('fill', this.textColor)
                    .attr('font-size', '1.5em')
                    .attr('font-weight', '600')
                    .text(this.yAxisLabel)

                this.currentG
                    .attr('transform', `translate(${this.xAxisScale('Current')},0)`)

                this.currentBar = this.currentG
                    .append('rect')
                    .attr('class', 'bar')
                    .attr('id', 'current-bar')
                    .attr('rx', '4px')
                    .attr('ry', '4px')
                    .attr('fill', this.currentColor)
                    .attr('x', 0)
                    .attr('y', this.height)
                    .attr('width', this.xAxisScale.bandwidth())
                    .attr('height', 0)

                this.currentBar
                    .transition()
                    .duration(this.duration)
                    .attr('height', this.height - this.yAxisScale(this.currentScore))
                    .attr('y', this.yAxisScale(this.currentScore))

                this.currentBar
                    .on('click', () => {
                        this.chartState = 'target'
                    })

            },
            renderBackground: function () {
                // let barHeight = this.yAxisScale(0) - this.yAxisScale(0.5) + 1
                let barRange = [...Array(this.chartTicks + 1).keys()]

                let duration = 0
                if (this.rendered) {
                    duration = this.duration
                }
                // legend.append("line")//making a line for legend
                //     .attr("x1", width - 28)
                //     .attr("x2", width)
                //     .attr("y1", 10)
                //     .attr("y2", 10)
                //     .style("stroke-dasharray","5,5")//dashed array for line
                //     .style("stroke", color);
                this.backgroundBar = this.backgroundG
                    .selectAll('.backgroundLine')
                    .data(barRange)
                this.backgroundBar
                    .exit()
                    .remove()
                this.backgroundBar = this.backgroundBar
                    .enter()
                    .append('line')
                    .merge(this.backgroundBar)
                    .attr('class', 'backgroundLine')
                    .attr('stroke', (d) => {
                        if (d % 2 !== 0) {
                            return this.backgroundAltColor
                        }
                        return this.backgroundColor
                    })
                this.backgroundBar
                    .transition()
                    .duration(duration)
                    .attr('x1', 0)
                    .attr('x2', this.width)
                    .attr('y1', (d) => this.yAxisScale(d / 2) + 1)
                    .attr('y2', (d) => this.yAxisScale(d / 2) + 1)

            },
            // transformBackground: function () {
            //     let barHeight = this.yAxisScale(0) - this.yAxisScale(1)
            //     this.backgroundBar = this.backgroundG
            //         .selectAll('.backgroundBar')
            //         .data([...Array(Math.floor(this.chartTicks / 2)).keys()])
            //         .enter()
            //         .append('rect')
            //         .attr('class', 'backgroundBar')
            //         .attr('fill', (d) => {
            //             console.log('bvackgreea', (d + 1) / 2)
            //             if (d % 2 === 0) {
            //                 console.log('bvackgreea', d)
            //                 return this.backgroundColor
            //             }
            //             return 'none'
            //         })
            //         .attr('fill-opacity', 0.6)
            //         .attr('x', 0)
            //         .attr('y', (d) => this.yAxisScale(d + 1))
            //         .attr('width', this.width)
            //         .attr('height', barHeight)
            //
            // },
            transformChart: function () {
                this.xAxisScale = d3.scaleBand()
                    .domain(this.xAxisRange)
                    .rangeRound([0, this.width])
                    .paddingInner(0.3)
                    .paddingOuter(0.25)

                this.yAxisScale = d3.scaleLinear()
                    .domain(this.yAxisRange)
                    .rangeRound([this.height, 0])
                    .nice()
                this.xAxis = d3.axisBottom(this.xAxisScale)
                    .tickSize(1)
                this.yAxis = d3.axisLeft(this.yAxisScale)
                    .ticks(this.chartTicks)
                    .tickFormat((e) => {
                        if (Math.floor(e) !== e) {
                            return
                        }
                        return e
                    })
                    .tickSize(1)
            },
            renderTargetChart: function () {
                console.log('yAxis', this.yAxis)
                this.xAxisG
                    .transition()
                    .duration(this.duration)
                    .call(this.xAxis)
                this.xAxisG.select('.domain').remove()
                this.xAxisG
                    .selectAll('.tick line')
                    .remove()
                this.xAxisG
                    .selectAll('.tick text')
                    .attr('font-size', '18px')
                    .attr('fill', this.textColor)

                this.yAxisG
                    .transition()
                    .duration(this.duration)
                    .call(this.yAxis)
                this.yAxisG.select('.domain').remove()
                this.yAxisG
                    .selectAll('.tick line')
                    .remove()
                this.yAxisG
                    .selectAll('.tick text')
                    .attr('font-size', '18px')
                    .attr('fill', this.textColor)

                this.yAxisText
                    .transition()
                    .duration(this.duration)
                    .attr('transform', 'rotate(-90)')
                    .attr('x', 0 - 3)
                    .attr('y', 6)
                    .text(this.yAxisLabel)

                this.currentG
                    .transition()
                    .duration(this.duration)
                    .attr('transform', `translate(${this.xAxisScale('Current')},0)`)
                this.targetG
                    .transition()
                    .duration(this.duration)
                    .attr('transform', `translate(${this.xAxisScale('Target')},0)`)

                this.currentBar
                    .transition()
                    .duration(this.duration)
                    .attr('x', 0)
                    .attr('y', this.yAxisScale(this.currentScore))
                    .attr('width', this.xAxisScale.bandwidth())
                    .attr('height', this.height - this.yAxisScale(this.currentScore))

                this.targetBar = this.targetG
                    .append('rect')
                    .attr('class', 'bar')
                    .attr('id', 'target-bar')
                    .attr('rx', '4px')
                    .attr('ry', '4px')
                    .attr('fill', this.targetColor)
                    .attr('x', 0)
                    .attr('y', this.height)
                    .attr('width', this.xAxisScale.bandwidth())
                    .attr('height', 0)
                this.targetBar
                    .transition()
                    .delay(this.duration)
                    .duration(this.duration)
                    .attr('height', this.height - this.yAxisScale(this.targetScore))
                    .attr('y', this.yAxisScale(this.targetScore))

            }
        }
    }
</script>

<style scoped>
    .fit {
        width: 100%;
        height: 100%;
    }
    .axis-g {
        font-size: 48px;
    }
</style>