<template>
    <div class="radarChart" id="radar-chart-holder">

    </div>
</template>

<script>
    import * as d3 from 'd3'
    export default {
        name: 'RadarChart',
        props: {
            radarChartValues: {
                type: Object,
                required: true
            },
            maxValue: {
                type: Number,
                default: () => 100
            },
            gridLevels: {
                type: Number,
                default: () => 10
            },
            gridOpacity: {
                type: Number,
                default: () => 0.1
            },
            areaOpacity: {
                type: Number,
                default: () => 0.35
            },
            labelFactor: {
                type: Number,
                default: () => 1.1
            },
            lineFactor: {
                type: Number,
                default: () => 1
            },
            lineWidth: {
                type: Number,
                default: () => 2
            },
            pointRadius: {
                type: Number,
                default: () => 3
            },
            wrapWidth: {
                type: Number,
                default: () => 20
            },
            score: {
                type: Number,
                default: () => 0
            },
            margin: {
                type: Object,
                default: () => {
                    return {
                        top: 32,
                        right: 6,
                        bottom: 24,
                        left: 24
                    }
                }
            },
            scoreRange: {
                type: Array,
                default: () => [0, 200, 500]
            },
            colorRange: {
                type: Array,
                default: () => ['#D83737', '#FFBF00', '#A5BB00']
            }
        },
        watch: {
            radarChartData: function () {
                this.initializeValues()
                this.transformRadarChart()
            },
            radarChartValues: function () {
                console.log('radarChartVa;llues', this.radarChartValues)
                this.radarChartData = [{
                        axis: 'Analysis',
                        key: 'analysis',
                        value: this.radarChartValues.analysis
                    }, {
                        axis: 'Insight',
                        key: 'insight',
                        value: this.radarChartValues.insight
                    }, {
                        axis: 'Strategy',
                        key: 'strategy',
                        value: this.radarChartValues.strategy
                    }, {
                        axis: 'Technology / Efficiency & Systems',
                        key: 'tes',
                        value: this.radarChartValues.tes
                    }, {
                        axis: 'Customer Experience',
                        key: 'custexp',
                        value: this.radarChartValues.custexp
                    }
                ]
                // this.initializeValues()
                // this.transformRadarChart()
            }
        },
        data: () => {
            return {
                // chart elements
                div: null,
                svg: null,
                radarG: null,
                axisG: null,
                labelsG: null,
                blogG: null,
                tooltip: null,
                // glow
                filter: null,
                feGaussianBlur: null,
                feMerge: null,
                feMergeNode_1: null,
                feMergeNode_2: null,
                //
                overallMaturityScore: 0,
                radarChartData: [
                    {
                        axis: 'Analysis',
                        key: 'analysis',
                        value: 0
                    },
                    {
                        axis: 'Insight',
                        key: 'insight',
                        value: 0
                    },
                    {
                        axis: 'Strategy',
                        key: 'strategy',
                        value: 0
                    },
                    {
                        axis: 'Technology / Efficiency & Systems',
                        key: 'tes',
                        value: 0
                    },
                    {
                        axis: 'Customer Experience',
                        key: 'custexp',
                        value: 0
                    }
                ],
                measures: [],
                measureNum: 0,
                //
                width: 0,
                height: 0,
                radius: 0,
                radian: 0,
                // scales
                colorScale: null,
                radiusScale: null,
                radarLine: null
            }
        },
        mounted: function () {
            window.addEventListener('resize', () => {
                console.log('radarresize')
                this.initializeValues()
                this.transformRadarChart()
            })
            this.initializeValues()
            this.renderRadarChart()
            this.transformRadarChart()
        },
        methods: {
            initializeValues: function () {
                let data = this.radarChartData
                let margin = this.margin

                let measures =  data.map(d => d.axis)
                let measureNum = measures.length

                let div = d3.select('#radar-chart-holder')

                let dimensions = div.node().getBoundingClientRect()
                let width = dimensions.width - margin.left - margin.right
                let height = dimensions.height - margin.top - margin.bottom

                let radius = Math.min(width / 2, height / 2)
                let radian = Math.PI * 2 / measureNum

                this.measures = measures

                this.div = div
                // this.svg = svg
                this.width = width
                this.height = height

                this.radius = radius
                this.radian = radian

            },
            renderRadarChart: function () {
                // let data = this.radarChartData
                // let measures = this.measures

                let div = this.div

                // let margin = this.margin
                // let width = this.width
                // let height = this.height

                // let radius = this.radius
                // let radian = this.radian

                let svg = div
                    .append('svg')
                    .attr('id', 'radar-chart-svg')
                    .style('overflow', 'visible')

                svg
                    .classed('radarChartSVG', true)

                let radarG = svg
                    .append('g')
                    .attr('id', 'radar-group')
                    // .attr('transform', `translate(${width / 2 + margin.left},${height / 2 + margin.top}`)

                let filter = radarG
                    .append('defs')
                    .append('filter')
                    .attr('id', 'glow')
                let feGaussianBlur = filter
                    .append('feGaussianBlur')
                    .attr('stdDeviation', '3')
                    .attr('result', 'coloredBlur')
                let feMerge = filter
                    .append('feMerge')
                let feMergeNode_1 = feMerge
                    .append('feMergeNode')
                    .attr('in', 'coloredBlur')
                let feMergeNode_2 = feMerge
                    .append('feMergeNode')
                    .attr('in', 'SourceGraphic')

                let axisG = radarG
                    .append('g')
                    .attr('class', 'axisGroup')
                    .attr('id', 'axis-group')

                let blobG = radarG
                    .append('g')
                    .attr('class', 'blobGroup')
                    .attr('id', 'blob-group')

                let tooltip = radarG
                    .append('text')
                    .attr('class', 'tooltip')
                tooltip
                    .classed('hidden', true)

                this.svg = svg
                this.radarG = radarG
                this.axisG = axisG
                this.blogG = blobG
                this.tooltip = tooltip
                this.filter = filter
                this.feGaussianBlur = feGaussianBlur
                this.feMerge = feMerge
                this.feMergeNode_1 = feMergeNode_1
                this.feMergeNode_2 = feMergeNode_2
            },
            transformRadarChart: function () {
                let margin = this.margin
                // let width = this.width
                // let height = this.height

                let maxValue = this.maxValue
                let radius = this.radius
                let radian = this.radian

                this.svg
                    .attr('width', `${margin.left + radius * 2 + margin.right}`)
                    .attr('height', `${margin.top + radius * 2 + margin.bottom}`)

                this.radarG
                    .attr('transform', `translate(${radius + margin.left},${radius + margin.top})`)

                let colorScale = d3.scaleLinear()
                    .domain(this.scoreRange)
                    .range(this.colorRange)

                let radiusScale = d3.scaleLinear()
                    .domain([-10, maxValue])
                    .range([0, radius])

                let radarLine = d3.radialLine()
                    .curve(d3.curveCardinalClosed.tension(0.3))
                    .radius(d => radiusScale(d.value))
                    .angle((d, i) => radian * i)

                this.colorScale = colorScale
                this.radiusScale = radiusScale
                this.radarLine = radarLine
                this.drawRadarChart()
            },
            drawRadarChart: function () {
                let data = this.radarChartData
                // let values = this.radarChartValues
                let measures = this.measures
                // let radarG = this.radarG
                let axisG = this.axisG
                let blobG = this.blogG
                let tooltip = this.tooltip

                let radius = this.radius
                let radian = this.radian

                let gridLevels = this.gridLevels + 1
                let gridSpacing = radius / gridLevels
                let fontSize = Math.min(16, (gridSpacing * 0.9))
                let gridOpacity = this.gridOpacity
                let gridMax = this.maxValue
                let labelFactor = this.labelFactor
                let lineFactor = this.lineFactor
                let areaOpacity = this.areaOpacity
                let lineWidth = this.lineWidth
                let pointRadius = this.pointRadius
                // eslint-disable-next-line no-unused-vars
                let wrapWidth = this.wrapWidth

                let colorScale = this.colorScale
                let radiusScale = this.radiusScale
                let radarLine = this.radarLine

                let chartBackground = axisG
                    .selectAll('.gridBackground')
                    .data([gridLevels + 1])
                chartBackground
                    .exit()
                    .transition()
                    .duration(200)
                    .attr('r', 0)
                    .remove()
                chartBackground = chartBackground
                    .enter()
                    .append('circle')
                    .merge(chartBackground)
                    .attr('class', 'gridBackground')
                chartBackground
                    .transition()
                    .duration(200)
                    .style('fill', '#CDCDCD')
                    .style('stroke', 'none')
                    .attr('r', radius)
                    .style('fill-opacity', gridOpacity / 2)
                    .style('filter', 'url(#glow)')

                let chartGrid = axisG
                    .selectAll('.gridLevels')
                    .data(d3.range(0, (gridLevels + 1)).reverse())
                chartGrid
                    .exit()
                    .transition()
                    .duration(200)
                    .attr('r', 0)
                    .remove()
                chartGrid = chartGrid
                    .enter()
                    .append('circle')
                    .merge(chartGrid)
                    .attr('class', 'gridLevels')
                chartGrid
                    .transition()
                    .duration(200)
                    .style('fill', 'none')
                    .style('stroke', '#CDCDCD')
                    .attr('r', d => (radius / gridLevels) * d)
                    .style('fill-opacity', gridOpacity)
                    .style('filter', 'url(#glow)')

                let chartLabels = axisG
                    .selectAll('.axisLabel')
                    .data(d3.range(1, (gridLevels + 1)).reverse())
                chartLabels
                    .exit()
                    .remove()
                chartLabels = chartLabels
                    .enter()
                    .append('text')
                    .merge(chartLabels)
                    .attr('class', 'axisLabel')
                chartLabels
                    .transition()
                    .duration(200)
                    .attr('x', 2)
                    .attr('y', d => ((0 - d) * radius) / gridLevels - 1)
                    .text(d => gridMax * (d - 1) / (gridLevels - 1))
                    .style('font-size', `${fontSize}px`)

                let chartLines = axisG
                    .selectAll('.axis')
                    .data(measures)
                chartLines
                    .exit()
                    .remove()
                chartLines = chartLines
                    .enter()
                    .append('g')
                    .attr('class', 'axis')
                chartLines
                    .append('line')
                    .transition()
                    .duration(200)
                    .style('stroke', '#CDCDCD')
                    .style('stoke-width', '2px')
                    .attr('x1', 0)
                    .attr('y1', 0)
                    .attr('x2', (d, i) => radiusScale(gridMax * lineFactor) * Math.cos(radian * i - Math.PI / 2))
                    .attr('y2', (d, i) => radiusScale(gridMax * lineFactor) * Math.sin(radian * i - Math.PI / 2))
                    .attr('class', 'line')
                    // .style('filter', 'url(#glow)')
                chartLines
                    .append('text')
                    .transition()
                    .duration(200)
                    .attr('class', 'legend')
                    .style('font-size', '11px')
                    .attr('text-anchor', 'middle')
                    .attr('dy', '0.35em')
                    .attr('x', (d, i) => radiusScale(gridMax * labelFactor) * (Math.cos(radian * i - Math.PI / 2) * 1.02))
                    .attr('y', (d, i) => radiusScale(gridMax * labelFactor) * (Math.sin(radian * i - Math.PI / 2) * 1.02))
                    .text(d => d)
                    .call(this.wrap, wrapWidth)

                let radarArea = blobG
                    .selectAll('.radarArea')
                    .data([data])
                radarArea
                    .exit()
                    .remove()
                radarArea = radarArea
                    .enter()
                    .append('path')
                    .merge(radarArea)
                    .attr('class', 'radarArea')
                radarArea
                    .transition()
                    .duration(200)
                    .attr('d', d => radarLine(d))
                    .style('fill', colorScale(this.score))
                    .style('fill-opacity', areaOpacity)
                    .style('filter', 'url(#glow)')

                let radarPath = blobG
                    .selectAll('.radarLine')
                    .data([data])
                radarPath
                    .exit()
                    .remove()
                radarPath = radarPath
                    .enter()
                    .append('path')
                    .merge(radarPath)
                    .attr('class', 'radarLine')
                radarPath
                    .transition()
                    .duration(200)
                    .attr('d', d => radarLine(d))
                    .style('stroke-width', `${lineWidth}px`)
                    .style('stroke', colorScale(this.score))
                    .style('fill', 'none')
                    .style('filter', 'url(#glow)')
                    // .style('')

                let radarPoints = blobG
                    .selectAll('.radarPoint')
                    .data(data)
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
                    .attr('r', pointRadius)
                    .attr('cx', (d, i) => radiusScale(d.value) * Math.cos(radian * i - Math.PI/2))
                    .attr('cy', (d, i) => radiusScale(d.value) * Math.sin(radian * i - Math.PI/2))
                    .style('fill', colorScale(this.score))
                    .style('fill-opacity', 0.8)
                    .style('filter', 'url(#glow)')

                let tooltipPoints = blobG
                    .selectAll('.tooltipPoint')
                    .data(data)
                tooltipPoints
                    .exit()
                    .remove()
                tooltipPoints = tooltipPoints
                    .enter()
                    .append('circle')
                    .merge(tooltipPoints)
                    .attr('class', 'tooltipPoint')
                tooltipPoints
                    .transition()
                    .duration(200)
                    .attr('r', pointRadius * 2)
                    .attr('cx', (d, i) => radiusScale(d.value) * Math.cos(radian * i - Math.PI/2))
                    .attr('cy', (d, i) => radiusScale(d.value) * Math.sin(radian * i - Math.PI/2))
                    .style('fill-opacity', 0)
                tooltipPoints
                    .on('mouseover', function (d) {
                        let text = d3.select(this)
                        let x = parseFloat(text.attr('cx')) - 8
                        let y = parseFloat(text.attr('cy')) - 8

                        tooltip
                            .classed('hidden', false)
                        tooltip
                            .transition()
                            .duration(200)
                            .attr('x', x)
                            .attr('y', y)
                            .text(d3.format('.2f')(d.value))
                    })
                    .on('mouseout', function () {
                        tooltip
                            .classed('hidden', true)
                    })
            },
            wrapLabels: function (group, width) {
                // console.log('text', text, text.text())
                group.each(function (d) {
                    let text = d3.select(this)
                    // eslint-disable-next-line no-useless-escape
                    let words = d.split(' ').reverse()
                    let word = words.pop()
                    let line = []
                    let lineNumber = 0
                    let lineHeight = 1.4
                    let x = text.attr('x')
                    let y = text.attr('y')
                    let dy = 0.35
                    let tspan = text
                        .text(null)
                        .append('tspan')
                        .attr('x', x)
                        .attr('y', y)
                        .attr('dy', `${dy}em`)
                        // .text(word)
                    console.log(words, text, d, tspan)

                    while (word) {
                        line.push(word)
                        tspan.text(line.join(' '))
                        if (tspan.node().getComputedTextLength() > width) {
                            console.log('word', word, line)
                            line.pop()
                            tspan.text(line.join(' '))
                            line = [word]
                            lineNumber = lineNumber + 1
                            tspan = text
                                .append('tspan')
                                .attr('x', x)
                                .attr('y', y)
                                .attr('dy', `${lineHeight + dy}em`)
                                .text(word)
                        }
                        word = words.pop()
                    }
                })
            },
            wrap: function (text, width) {
                console.log('lovelove', text, width)
                text.each(function () {
                    var text = d3.select(this)
                    var words = text.text().split(/\s+/).reverse()
                    var word
                    var line = []
                    var lineNumber = 0
                    var lineHeight = 1.0 // ems
                    var y = text.attr('y')
                    var dy = 0.35
                    var tspan = text.text(null).append('tspan').attr('x', 0 - 3).attr('y', y).attr('dy', dy + 'em')
                    console.log('sqeeeeee', text, words, dy, y)
                    while (words.length > 0) {
                        word = words.pop()
                        console.log(word)
                        line.push(word)
                        tspan.text(line.join(' '))
                        console.log('loine', tspan, lineNumber)
                        if (tspan.node().getComputedTextLength() > width) {
                            line.pop()
                            lineNumber = lineNumber + 1
                            tspan.text(line.join(' '))
                            line = [word]
                            tspan = text.append('tspan').attr('x', 0 - 3).attr('y', y).attr('dy', lineHeight + dy + 'em').text(word)
                        }
                    }
                    if (lineNumber < 3) {
                        text.attr('y', 0 - (lineNumber * lineHeight * 4 + (dy * 3)) * (3 / 2))
                    }
                })
            }
        }
    }
</script>

<style scoped>
.radarChart {
    width: 100%;
    height: 100%;
}
.radarChartSVG {
    /*width: 100%;*/
    /*height: 100%;*/
    overflow: visible;
}
</style>