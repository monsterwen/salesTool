<template>
    <div class="lineHolder"></div>
</template>

<script>
    import * as d3 from 'd3'
    // import { voronoiMapSimulation } from 'd3-voronoi-map'
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
                    right: 36,
                    bottom: 64
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
            data: [0],
            voronoiClip: [],
            voronoiData: [{
                index: 0,
                weight: 25,
                label: 'Basic',
                range: '(1)'
            }, {
                index: 1,
                weight: 50,
                label: 'Emerging',
                range: '(2-3)'
            }, {
                index: 2,
                weight: 25,
                label: 'Sophisticated',
                range: '(4-5)'
            }],
            rangeText: {
                basic: {
                    name: 'Basic',
                    range: '(0-1)'
                },
                emerg: {
                    name: 'Emerging',
                    range: '(2-3)'
                },
                soph: {
                    name: 'Sophisticated',
                    range: '(4-5)'
                }
            },
            vorSimulation: null,
            colorRange: {
                basic: '#D83737',
                emerg: '#FFBF00',
                soph: '#A5BB00'
            },
            shadowColors: {
                basic: '#862f2f',
                emerg: '#ac7c00',
                soph: '#d1ff00'
            },
            rangePoints: {
                basic: [],
                emerg: [],
                soph: []
            },
            rangeNames: [
                'basic',
                'emerg',
                'soph',
            ],
            rangeBlobs: null,
            rangeLabels: null
        }),
        watch: {
            renderFull: function () {
                console.log('rendering FULL LINE')
                this.data = [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.1]
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
                    .domain([0, 5.1])
                    .range([0, width])

                let lineScaleY = d3.scalePow()
                    .domain([0, 5.1])
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
            createRangePoints: function () {
                let lineScaleX = this.lineScaleX
                let lineScaleY = this.lineScaleY
                this.rangePoints.basic = [
                    [lineScaleX(0) + 6,lineScaleY(0) + 4],
                    [lineScaleX(1),lineScaleY(1) + 4],
                    [lineScaleX(1.25),lineScaleY(1.25) + 4],
                    [lineScaleX(1.5),lineScaleY(1.5) + 4],
                    [lineScaleX(1.95) - 6,lineScaleY(1.95) + 4],
                    [lineScaleX(1.95),lineScaleY(1.95) + 4],
                    [lineScaleX(2) - 12,lineScaleY(2) + 4],
                    [lineScaleX(2) - 8,lineScaleY(2) + 4],
                    [lineScaleX(2) - 6,lineScaleY(2) + 4],
                    // [lineScaleX(2.05),lineScaleY(1.95) - 6 + this.margin.bottom],
                    [lineScaleX(2.1) - 6,lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(2.1) - 6,lineScaleY(0) - 6 + this.margin.bottom],
                    // [lineScaleX(2.1),lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(1.95) - 6,lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(1.5),lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(1),lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(0.5),lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(0) + 6,lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(0) + 6,lineScaleY(0) + this.margin.bottom - 6],
                    [lineScaleX(0) + 6,lineScaleY(0) + 4]
                ]
                this.rangePoints.emerg = [
                    [lineScaleX(2),lineScaleY(2) + 6],
                    [lineScaleX(2.5),lineScaleY(2.5) + 6],
                    [lineScaleX(3),lineScaleY(3) + 8],
                    [lineScaleX(3.5),lineScaleY(3.5) + 8],
                    [lineScaleX(3.95) - 6,lineScaleY(3.95) + 6],
                    [lineScaleX(3.95) - 6,lineScaleY(3.95) + 8],
                    [lineScaleX(3.95),lineScaleY(3.95) + 8],
                    // [lineScaleX(3.95),lineScaleY(3.95) - 6 + this.margin.bottom],
                    [lineScaleX(5.1) - 6,lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(5.1),lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(4.9) - 6,lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(3.5),lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(3),lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(2.5),lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(2.1) + 6,lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(2.1),lineScaleY(0) + this.margin.bottom - 6],
                    [lineScaleX(2.1) - 6,lineScaleY(0) - 6 + this.margin.bottom],
                    // [lineScaleX(2),lineScaleY(0) + 6],
                    [lineScaleX(2) - 6,lineScaleY(2) + 4],
                    [lineScaleX(2) - 6,lineScaleY(2) + 4],
                    [lineScaleX(2),lineScaleY(2) + 4]
                ]
                this.rangePoints.soph = [
                    [lineScaleX(3.95) - 6,lineScaleY(3.95) + 8],
                    [lineScaleX(3.95),lineScaleY(3.95) + 8],
                    [lineScaleX(4.25),lineScaleY(4.25) + 8],
                    [lineScaleX(4.5),lineScaleY(4.5) + 8],
                    [lineScaleX(4.5),lineScaleY(4.5) + 8],
                    [lineScaleX(4.75),lineScaleY(4.75) + 8],
                    [lineScaleX(4.95),lineScaleY(4.95) + 8],
                    [lineScaleX(5.1) - 6,lineScaleY(5.1) + 8],
                    [lineScaleX(5.1),lineScaleY(5.1) + 8],
                    [lineScaleX(5.1) - 6 + this.margin.right / 2,lineScaleY(5.1) + 8],
                    [lineScaleX(5.1) - 6 + this.margin.right,lineScaleY(5.1) + 8],
                    [lineScaleX(5.1) - 6 + this.margin.right,lineScaleY(5.1) + 8],
                    [lineScaleX(5.1) - 6 + this.margin.right,lineScaleY(3.5) + 8],
                    [lineScaleX(5.1) - 6 + this.margin.right,lineScaleY(2.5) + 8],
                    [lineScaleX(5.1) - 6 + this.margin.right,lineScaleY(1.5) + 8],
                    [lineScaleX(5.1) - 6 + this.margin.right,lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(5.1) - 6 + this.margin.right,lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(5.1) - 6,lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(5.075),lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(5.075),lineScaleY(0) - 6 + this.margin.bottom],
                    [lineScaleX(3.95) - 6,lineScaleY(3.95) + 8]
                ]

                let lineGenerator = d3.line()
                    .curve(d3.curveBasisClosed)
                this.rangeBlobs = this.g
                    .selectAll('.rangeBlobs')
                    .data(this.rangeNames)
                this.rangeBlobs = this.rangeBlobs
                    .enter()
                    .append('path')
                    .merge(this.rangeBlobs)
                    .attr('class', 'rangeBlob')
                    .attr('d', d => lineGenerator(this.rangePoints[d]))
                    .attr('stroke', d => this.colorRange[d])
                    .attr('stroke-width', '2px')
                    .attr('fill', d => this.colorRange[d])
                    .style('fill-opacity', 0.35)
                    .style('filter', 'url(#glow)')
                this.rangeLabels = this.g
                    .selectAll('.rangeText')
                    .data(this.rangeNames)
                this.rangeLabels = this.rangeLabels
                    .enter()
                    .append('text')
                    .merge(this.rangeLabels)
                    .attr('x', d => {
                        let centroid = this.computeCentroid(this.rangePoints[d])
                        return centroid[0]
                    })
                    .attr('y', d => {
                        let centroid = this.computeCentroid(this.rangePoints[d])
                        console.log(centroid)
                        return centroid[1]
                    })
                    .text(null)
                    .style('text-anchor', 'middle')
                    .style('text-shadow', d => `0 0 10px #${this.shadowColors[d]}`)
                this.rangeLabels
                    .append('tspan')
                    .attr('dy', '0em')
                    .text(d => this.rangeText[d].name)
                    .style('font-size', `18px`)
                    .style('font-weight', 'bold')
                    .style('text-anchor', 'middle')
                this.rangeLabels
                    .append('tspan')
                    .attr('x', d => {
                        let centroid = this.computeCentroid(this.rangePoints[d])
                        return centroid[0]
                    })
                    .attr('dy', '1.2em')
                    .text(d => this.rangeText[d].range)
                    .style('font-size', `14px`)
                    .style('text-anchor', 'middle')
                this.rangeBlobs
                    .on('mouseover', this.blobMouseover)
                    .on('mouseout', this.blobMouseout)
            //     this.g
            //         .append('path')
            //         .attr('class', 'rangeBlob')
            //         .attr('d', lineGenerator(emergPoints))
            //         .attr('stroke', '#FFBF00')
            //         .attr('stroke-width', '2px')
            //         .attr('fill', '#FFBF00')
            //         .style('fill-opacity', 0.35)
            //         .style('filter', 'url(#glow)')
            //     this.g
            //         .append('path')
            //         .attr('class', 'rangeBlob')
            //         .attr('d', lineGenerator(sophPoints))
            //         .attr('stroke', '#A5BB00')
            //         .attr('stroke-width', '2px')
            //         .attr('fill', '#A5BB00')
            //         .style('fill-opacity', 0.35)
            //         .style('filter', 'url(#glow)')
            },
            blobMouseover: function (blobName) {
                this.rangeBlobs
                    .transition()
                    .duration(100)
                    .style('fill-opacity', function (d) {
                        if (d === blobName) {
                            return 0.5
                        }
                        return 0.2
                    })
                    .attr('stroke-opacity', function (d) {
                        if (d === blobName) {
                            return 1
                        }
                        return 0.5
                    })
            },
            blobMouseout: function () {
                this.rangeBlobs
                    .transition()
                    .duration(100)
                    .style('fill-opacity', 0.35)
                    .attr('stroke-opacity', 1)
            },
            computeCentroid: function (pts) {
                let nPts = pts.length
                let x = 0
                let y = 0
                let f = 0
                let j = nPts-1
                let p1 = 0
                let p2 = 0

                for (let i = 0; i < nPts; j = i++) {
                    p1 = pts[i]
                    p2 = pts[j]
                    f = p1[0] * p2[1] - p2[0] * p1[1]
                    x += (p1[0] + p2[0]) * f
                    y += (p1[1] + p2[1]) * f
                }

                f = this.area(pts) *6
                return [x /f ,y / f]
            },
            area: function (pts) {
                let area = 0
                let nPts = pts.length
                let j = nPts-1
                let p1 = 0
                let p2 = 0

                for (let i = 0; i < nPts; j = i++) {
                    p1 = pts[i]
                    p2=pts[j]
                    area += p1[0] * p2[1]
                    area -= p1[1] * p2[0]
                }
                area /= 2
                return area
            },
            // createVoronoiClip: function () {
            //     let clip = [
            //         [this.width,0],
            //         [this.width + this.margin.right,0],
            //         [this.width + this.margin.right,this.height + this.margin.bottom],
            //         [0,this.height + this.margin.bottom],
            //         [0,this.height]
            //     ]
            //     let points = [
            //       0, 0.25, 0.5, 0.75,
            //       1, 1.25, 1.5, 1.75,
            //       2, 2.25, 2.5, 2.75,
            //       3, 3.25, 3.5, 3.75,
            //       4, 4.25, 4.5, 4.75, 5
            //     ]
            //     points.forEach(d => clip.push([
            //         this.lineScaleX(d),
            //         this.lineScaleY(d)
            //     ]))
            //     this.voronoiClip = clip
            //     let simulation = voronoiMapSimulation(this.voronoiData)
            //         .clip(clip)  // set the clipping polygon
            //         // .stop()
            //     this.vorSimulation = simulation
            //     this.drawVoronoi()
            // },
            transformComponents: function () {
                this.dimensions = this.div.node().getBoundingClientRect()
                this.width = this.dimensions.width - this.margin.right
                this.height = this.dimensions.height - this.margin.bottom
                console.log('width', this.width)
                this.lineScaleX
                    .range([0, this.width])
                this.lineScaleY
                    .range([this.height, 0])

                // this.svg
                //     .attr('width', `${this.width}px`)
                //     .attr('height', `${this.height}px`)
                // this.createVoronoiClip()
                this.createRangePoints()
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
            // ,
            // drawVoronoi: function () {
            //     let state = this.vorSimulation.state()
            //     let polygons = state.polygons
            //     console.log('polygons', polygons)
            //     let polyPaths = this.g
            //         .selectAll('.vorPath')
            //         .data(polygons)
            //     polyPaths
            //         .enter()
            //         .append('path')
            //         .merge(polyPaths)
            //         .attr('class', 'vorPath')
            //         .attr('d', d => `M${d.join(',')}z`)
            //         .attr('fill', (d, i) => {
            //             console.log('cooor', this.colorRange, i)
            //             return this.colorRange[i]
            //         })
            // }

    }

    }
</script>

<style scoped>
.lineHolder {
    width: 100%;
    height: 100%;
}
</style>