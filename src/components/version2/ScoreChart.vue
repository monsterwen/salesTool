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
                default: () => 5
            },
            recommendations: {
                type: Array,
                default: () => [
                    {
                        rank: 10,
                        name: "Brand & Program Tracker",
                        soyou:  'This will help you establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                    },
                    {
                        rank: 13,
                        name: "Customer Demographic Profiling",
                        soyou:  'Identify what your customers look like by examining key traits and the extent to which they over or under index.  Map characteristics to product and service.'
                    }
                ]
            },
            totalRecommendations: {
                type: Number,
                default: () => 4
            },
            selectedRecommendations: {
                type: Number,
                default: () => 0
            },
            availableRecommendations: {
                type: Number,
                default: () => 3
            },
            selectedModules: {
                type: Object
            },
            changeModules: {
                type: Boolean
            },
            hoveredModule: {
                type: Object,
                default: () => null
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
            diffColor: {
                type: String,
                default: () => '#009FBC'
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
            currentText: {
                type: String,
                default: () => 'Current'
            },
            targetText: {
                type: String,
                default: () => 'Target'
            },
            potentialText: {
                type: String,
                default: () => 'Potential'
            },
            duration: {
                type: Number,
                default: () => 500
            },
            diffOffset: {
                type: Number,
                default: () => 8
            },
            colorDomain: {
                type: Array,
                default: () => [2.5000001, 3.5000001]
            },
            colorRange: {
                type: Array,
                default: () => ['#D83737','#FFBF00','#A5BB00']
            },
            margin: {
                type: Object,
                default: () => ({
                    top: 32,
                    right: 40,
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
                markerG: null,
                xAxisG: null,
                yAxisG: null,
                currentG: null,
                targetG: null,
                currentBar: null,
                targetBar: null,
                currentLine: null,
                markers: null,
                markerText: null,
                targetLine: null,
                diffBars: null,
                backgroundBar: null,
                //
                xAxisScale: null,
                yAxisScale: null,
                colorScale: null,
                xAxis: null,
                yAxis: null,
                yAxisText: null,
                //
                dimensions: {},
                width: 0,
                height: 0,
                rendered: false,
                lineScores: {
                    current: this.currentScore,
                    selected: this.currentScore,
                    potential: 5,
                }
            }
        },
        computed: {
            xAxisRange: function () {
                if (this.chartState === 'current') {
                    return [this.currentText]
                }
                if (this.chartState === 'transition') {
                    return [this.targetText]
                }
                return [this.currentText, this.targetText]
            },
            markerData: function () {
                if (this.chartState === 'current') {
                    return [
                        {
                        name: this.currentText,
                        score: this.lineScores.current
                        }
                    ]
                }
                if (this.chartState === 'transition') {
                    return [
                        {
                            name: this.currentText,
                            score: this.lineScores.current
                        }, {
                            name: this.targetText,
                            score: this.lineScores.selected
                        }, {
                            name: this.potentialText,
                            score: this.targetScore
                        },
                    ]
                }
                return [
                    {
                        name: this.currentText,
                        score: this.lineScores.current
                    }, {
                        name: this.targetText,
                        score: this.lineScores.selected
                    }
                ]
            },
            chartTicks: function () {
                if (this.chartState === 'current') {
                    return (Math.floor(this.currentScore * 1.05 / 0.5) + 1)
                }
                return 11
            },
            yAxisRange: function () {
                if (this.chartState === 'current') {
                    return [0, Math.min(this.chartTicks * 0.5, 5)]
                }
                return [0, 5]
            },
            scoreDiff: function () {
                return (5 - this.currentScore) / this.totalRecommendations
            },
            barWidth: function () {
                return this.yAxisScale(0) -  this.yAxisScale(this.scoreDiff)
            },
            diffHeight: function () {
                return this.yAxisScale(0) -  this.yAxisScale(this.scoreDiff) - this.diffOffset
            }
        },
        watch: {
            changeModules: function () {
                console.log('selecemodule', this.selectedModules, this.selectedRecommendations)
                this.lineScores.selected = this.lineScores.current + this.scoreDiff * this.selectedRecommendations
                console.log('selectedpls', this.lineScores.selected, this.lineScores.current, this.scoreDiff, this.selectedRecommendations)
                this.transformChart()
                this.drawMarkers()
                this.renderDiffChart()
            },
            chartState: function () {
                this.transformChart()
                this.renderBackground()
                this.drawMarkers()
                console.log('chartstate', this.chartState)
                if (this.chartState === 'transition') {
                    this.renderDiffChart()
                } else {
                    this.$emit('selectedScore', this.lineScores.selected)
                    this.renderTargetChart()
                }
            },
            hoveredModule: function () {
                console.log('hovered', this.hoveredModule)
                console.log('hovSELELECT', this.selectedModules)
                if (this.chartState !== 'transition') {
                    return
                }
                if (this.hoveredModule) {
                    this.diffMouseOver(null, 0)
                    this.lineScores.selected = Math.min(this.lineScores.selected + this.scoreDiff, this.targetScore)
                    this.drawMarkers()
                    return
                }
                this.lineScores.selected = this.lineScores.current + this.scoreDiff * (this.recommendations.length - this.selRec().length)
                console.log('linescterdsfd', this.lineScores, this.recommendations, this.selRec())
                this.drawMarkers()
                this.resetDiffBars()
            },
            availableRecommendations: function () {
                if (this.chartState !== 'target') {
                    this.renderDiffChart()
                }
            }
        },
        mounted: function () {
            this.initializeChartElements()
            this.transformChart()
            this.renderBackground()
            this.drawMarkers()
            this.renderCurrentChart()
            this.rendered = true
            console.log(this.totalRecommendations, 'dsdsdsdsdsdfdsafdsa')
        },
        methods: {
            selRec: function () {
                let modules = []
                this.recommendations.forEach(d => {
                    if (!this.selectedModules[d.rank]) {
                        modules.push(d)
                    }
                })
                return modules
            },
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
                this.markerG = this.svg
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
                    .attr('x', 0 - 4)
                    .attr('y', 6)
                    .attr('dy', '0.71em')
                    .attr('text-anchor', 'end')
                    .attr('fill', this.textColor)
                    .attr('font-size', '1.5em')
                    .attr('font-weight', '600')
                    .text(this.yAxisLabel)

                this.currentG
                    .attr('transform', `translate(${this.xAxisScale(this.currentText)},0)`)

                this.currentBar = this.currentG
                    .append('rect')
                    .attr('class', 'bar')
                    .attr('id', 'current-bar')
                    .attr('rx', `${this.diffOffset}px`)
                    .attr('ry', `${this.diffOffset}px`)
                    .attr('fill', this.colorScale(this.currentScore))
                    .attr('x', (this.xAxisScale.bandwidth() - this.barWidth) / 2)
                    .attr('y', this.height)
                    .attr('width', this.barWidth)
                    .attr('height', 0)

                this.currentBar
                    .transition()
                    .duration(this.duration)
                    .attr('height', this.height - this.yAxisScale(this.currentScore))
                    .attr('y', this.yAxisScale(this.currentScore))
            },
            renderBackground: function () {
                let barRange = [...Array(this.chartTicks + 1).keys()]

                let duration = 0
                if (this.rendered) {
                    duration = this.duration
                }

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
            drawMarkers: function () {
                this.markers = this.markerG
                    .selectAll('.marker')
                    .data(this.markerData)
                this.markers
                    .exit()
                    .transition()
                    .duration(this.duration / 1.5)
                    .attr('x2', 0)
                    .remove()
                this.markers = this.markers
                    .enter()
                    .append('line')
                    .merge(this.markers)
                    .attr('class', 'marker')
                    .attr('stroke', (d) => {
                        if (d % 2 !== 0) {
                            return this.backgroundAltColor
                        }
                        return this.backgroundColor
                    })
                    .attr('stroke-dasharray', '2,2')
                    .attr('x1', 0)

                this.markers
                    .transition()
                    .duration(this.duration)
                    .attr('x2', this.width)
                    .attr('y1', (d) => this.yAxisScale(d.score) + 1)
                    .attr('y2', (d) => this.yAxisScale(d.score) + 1)

                this.markerText = this.markerG
                    .selectAll('.marker-text')
                    .data(this.markerData)
                this.markerText
                    .exit()
                    .transition()
                    .duration(this.duration / 1.5)
                    .attr('x', 0)
                    .attr('fill-opacity', 0)
                    .remove()
                this.markerText = this.markerText
                    .enter()
                    .append('text')
                    .merge(this.markerText)
                    .attr('class', 'marker-text')
                    .attr('dy', '1em')
                    .attr('alignment-baseline', 'baseline')
                    .attr('text-anchor', 'end')
                    .attr('fill', this.textColor)
                    .attr('font-size', '0.87em')
                    .attr('font-weight', '600')
                this.markerText
                    .transition()
                    .duration(this.duration / 1.5)
                    .attr('x', this.width)
                    .attr('fill-opacity', 1)
                    .attr('y', d => {
                        if (d.name === this.targetText && this.chartState === 'transition' && (d.score === this.lineScores.current || d.score === this.lineScores.potential)) {
                            return this.yAxisScale(d.score)
                        }
                        return this.yAxisScale(d.score) - 16
                    })
                    .text(d => d.name)


                this.markerScores = this.markerG
                    .selectAll('.marker-score')
                    .data(this.markerData)
                this.markerScores
                    .exit()
                    .transition()
                    .duration(this.duration / 1.5)
                    .attr('x', 0)
                    .remove()
                this.markerScores = this.markerScores
                    .enter()
                    .append('text')
                    .merge(this.markerScores)
                    .attr('class', 'marker-score')
                    .attr('dy', '1em')
                    .attr('alignment-baseline', 'middle')
                    .attr('text-anchor', 'start')
                    .attr('fill', this.textColor)
                    .attr('font-size', '0.97em')
                    .attr('font-weight', '600')
                this.markerScores
                    .transition()
                    .duration(this.duration / 1.5)
                    .attr('x', this.width + 8)
                    .attr('y', d => this.yAxisScale(d.score) - 14)
                    .attr('fill-opacity', d => {
                        if (d.name === this.targetText && this.chartState === 'transition' && (d.score === this.lineScores.current || d.score === this.lineScores.potential)) {
                            return 0
                        }
                        return 1
                    })
                    .text(d => d3.format('.1f')(d.score))
            },
            transformChart: function () {
                this.dimensions = this.div
                    .node()
                    .getBoundingClientRect()
                this.width = this.dimensions.width - this.margin.left - this.margin.right
                this.height = this.dimensions.height - this.margin.top - this.margin.bottom

                this.backgroundG
                    .attr('transform', `translate(${this.margin.left},${this.margin.top})`)

                this.markerG
                    .attr('transform', `translate(${this.margin.left},${this.margin.top})`)

                this.barG
                    .attr('transform', `translate(${this.margin.left},${this.margin.top})`)

                this.xAxisG
                    .attr('id', 'x-axis-g')
                    .attr('class', 'axis-g')
                    .attr('transform', `translate(${this.margin.left},${this.margin.top + this.height})`)

                this.yAxisG
                    .attr('transform', `translate(${this.margin.left},${this.margin.top})`)

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
                this.colorScale = d3.scaleThreshold()
                    .domain(this.colorDomain)
                    .range(this.colorRange)
            },
            renderDiffChart: function () {
                let diffBars = [...Array(this.availableRecommendations).keys()]

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
                    .attr('x', 0 - 5)
                    .attr('y', 6)
                    .text(this.yAxisLabel)

                this.currentG
                    .transition()
                    .duration(this.duration)
                    .attr('transform', `translate(${this.xAxisScale(this.targetText)},0)`)
                this.targetG
                    .transition()
                    .duration(this.duration)
                    .attr('transform', `translate(${this.xAxisScale(this.targetText)},0)`)

                this.currentBar
                    .transition()
                    .duration(this.duration)
                    .attr('x', (this.xAxisScale.bandwidth() - this.barWidth) / 2)
                    .attr('y', this.yAxisScale(this.currentScore))
                    .attr('width', this.barWidth)
                    .attr('height', this.height - this.yAxisScale(this.currentScore))

                this.targetBar = this.targetG
                    .selectAll('.target-bar')
                    .data(['target'])
                this.targetBar
                    .exit()
                    .remove()
                this.targetBar = this.targetBar
                    .enter()
                    .append('rect')
                    .merge(this.targetBar)
                    .attr('class', 'target-bar')
                    .attr('rx', `${this.diffOffset}px`)
                    .attr('ry', `${this.diffOffset}px`)
                    .attr('x', (this.xAxisScale.bandwidth() - this.barWidth) / 2)
                    .attr('width', this.barWidth)
                console.log('line', this.lineScores)
                this.targetBar
                    .transition()
                    .duration(this.duration)
                    .attr('fill', this.colorScale(this.lineScores.selected))
                    .attr('height', this.height - this.yAxisScale(this.lineScores.selected))
                    .attr('y', this.yAxisScale(this.lineScores.selected))

                this.diffBars = this.targetG
                    .selectAll('.diffBars')
                    .data(diffBars)
                this.diffBars
                    .exit()
                    .transition()
                    .duration(this.duration)
                    .attr('height', 0)
                    .attr('fill-opacity', 0)
                    .remove()
                this.diffBars = this.diffBars
                    .enter()
                    .append('rect')
                    .merge(this.diffBars)
                    .attr('class', 'diffBars')
                    .attr('rx', `${this.diffOffset}px`)
                    .attr('ry', `${this.diffOffset}px`)
                    .attr('fill', this.diffColor)
                    .attr('width', this.diffHeight)
                    .attr('fill-opacity', 0.56)
                this.diffBars
                    .on('mouseover', this.diffMouseOver)
                    .on('mouseout', this.resetDiffBars)
                this.resetDiffBars()
            },
            diffMouseOver: function (diff, index) {
                this.diffBars
                    .transition()
                    .duration(this.duration / 4)
                    .attr('width', this.diffHeight)
                    .attr('height', this.diffHeight)
                    .attr('x', (this.xAxisScale.bandwidth() - this.diffHeight) / 2)
                    .attr('y', (d, i) => {
                        return this.yAxisScale(this.lineScores.selected) - this.barWidth * (i + 1)
                    })
                    .attr('fill-opacity', (d, i) => {
                        if (diff === d || index === i) {
                            return 1
                        }
                        return 0.56
                    })

            },
            resetDiffBars: function () {
                console.log('resetetetete')
                this.diffBars
                    .transition()
                    .duration(this.duration / 4)
                    .attr('height', this.diffHeight)
                    .attr('y', (d, i) => {
                        return this.yAxisScale(this.lineScores.selected) - this.barWidth * (i + 1)
                    })
                    .attr('width', this.diffHeight)
                    .attr('x', (this.xAxisScale.bandwidth() - this.diffHeight) / 2)
                    .attr('fill-opacity', 0.56)

                // this.targetBar
                //     .transition()
                //     .duration(this.duration / 4)
                //     .attr('fill-opacity', 1)
            },
            renderTargetChart: function () {
                console.log('TARGERCTERF', this.yAxis)
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
                    .attr('x', 0 - 5)
                    .attr('y', 6)
                    .text(this.yAxisLabel)

                this.diffBars = this.targetG
                    .selectAll('.diffBars')
                    .data([])
                this.diffBars
                    .exit()
                    .transition()
                    .duration(this.duration)
                    .attr('height', 0)
                    .remove()

                this.currentG
                    .transition()
                    .duration(this.duration)
                    .attr('transform', `translate(${this.xAxisScale(this.currentText)},0)`)
                this.targetG
                    .transition()
                    .duration(this.duration)
                    .attr('transform', `translate(${this.xAxisScale(this.targetText)},0)`)

                this.currentBar
                    .transition()
                    .duration(this.duration)
                    .attr('x', (this.xAxisScale.bandwidth() - this.barWidth) / 2)
                    .attr('y', this.yAxisScale(this.currentScore))
                    .attr('width', this.barWidth)
                    .attr('height', this.height - this.yAxisScale(this.currentScore))

                this.targetBar
                    .attr('rx', `${this.diffOffset}px`)
                    .attr('ry', `${this.diffOffset}px`)
                    .attr('x', (this.xAxisScale.bandwidth() - this.barWidth) / 2)
                    .attr('width', this.barWidth)
                this.targetBar
                    .transition()
                    .duration(this.duration)
                    .attr('fill', this.colorScale(this.lineScores.selected))
                    .attr('height', this.height - this.yAxisScale(this.lineScores.selected))
                    .attr('y', this.yAxisScale(this.lineScores.selected))
            }
        }
    }
</script>

<style scoped>
    .fit {
        min-width: 100%;
        min-height: 100%;
        max-width: 100%;
        max-height: 100%;
    }
    .axis-g {
        font-size: 48px;
    }
</style>
