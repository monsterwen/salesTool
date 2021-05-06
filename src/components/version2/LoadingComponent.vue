<template>
    <div class="loadingHolder">
        <svg class="loaderSVG"></svg>
    </div>
</template>

<script>
    import * as d3 from 'd3'

    export default {
        name: "LoadingComponent",
        props: {
            loaderWidth: {
                type: Number,
                default: () => 24
            },
            duration: {
                type: Number,
                default: () => 2400
            },
            loaderColor: {
                type: String,
                default: () => '#009fbc'
            },
            done: {
                type: Boolean,
                default: () => false
            }
        },
        data: function () {
            return {
                //
                svgDimensions: {},
                svgWidth: 0,
                svgHeight: 0,
                radius: 0,
                //
                div: null,
                svg: null,
                g: null,
                loader: null,
                startCircle: null,
                endCircle: null,
            }
        },
        mounted: function () {
            this.initializeLoaderElements()
        },
        methods: {
            initializeLoaderElements: function () {
                this.svg = d3.select('.loaderSVG')

                this.svgDimensions = this.svg
                    .node()
                    .getBoundingClientRect()

                console.log('dimension', this.svgDimensions)
                this.svgWidth = this.svgDimensions.width
                this.svgHeight = this.svgDimensions.height

                this.radius = Math.min(this.svgWidth, this.svgHeight) / 2
                console.log('radies', this.radius)
                this.arc = d3.arc()
                    .innerRadius(this.radius - this.loaderWidth)
                    .outerRadius(this.radius)

                this.g = this.svg
                    .append('g')
                    .attr('transform', `translate(${this.svgWidth / 2},${this.svgHeight / 2})`)

                this.loader = this.g
                    .append('path')
                    .datum({ endAngle: 0, startAngle: 0})
                    .style('fill', this.loaderColor)
                    .attr('d', this.arc)
                // this.startCircle = this.g
                //     .append('circle')
                //     .style('fill', this.loaderColor)
                //     .attr('transform', `translate(0,${(0 - this.svgHeight) / 2 + this.loaderWidth / 2})`)
                //     .attr('width', this.loaderWidth)
                //     .attr('height', this.loaderWidth)
                //     .attr('r', this.loaderWidth / 2)
                //
                // this.endCircle = this.g
                //     .append('circle')
                //     .style('fill', this.loaderColor)
                //     .attr('transform', `translate(0,${(0 - this.svgHeight) / 2 + this.loaderWidth / 2}`)
                d3.interval(this.startInterval, this.duration * 2)
            },
            startInterval: function () {
                this.loader
                    .datum({ endAngle: 0, startAngle: 0})

                this.loader
                    .transition()
                    .duration(this.duration)
                    .attrTween('d', this.arcTween(this.degToRad(360), 'endAngle'))
                this.loader
                    .transition()
                    .delay(this.duration)
                    .duration(this.duration)
                    .attrTween('d', this.arcTween(this.degToRad(360), 'startAngle'))

            },
            degToRad: function (degrees) {
                return degrees * Math.PI / 180
            },
            arcTween: function (newAngle, angle) {
                return (d) => {
                    let interpolate = d3.interpolate(d[angle], newAngle)
                    return (t) => {
                        d[angle] = interpolate(t)
                        return this.arc(d)
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .loadingHolder {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .loaderSVG {
        width: 100%;
        height: 100%;
    }
</style>