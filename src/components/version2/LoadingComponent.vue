<template>
    <div class="loadingHolder">
        <div class="lds-ring">
            <svg class="loaderSVG"></svg>
        </div>
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
            done: {
                type: Boolean,
                default: () => false
            }
        },
        data: function () {
            return {
                animationTime: 1200,
                loaderRadius: 40,
                loaderColor: "#009fbc",
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
            }
        },
        mounted: function () {
        },
        methods: {
            initializeLoaderElements: function () {
                this.arc = d3.arc()
                    .innerRadius(this.radius - this.loaderWidth)
                    .outerRadius(this.radius)
            },
            degToRad: function (degrees) {
                return degrees * Math.PI / 180
            },
            arcTween: function (newAngle, angle) {
                return (d) => {
                    let interpolate = d3.interpolate(d[angle], newAngle)
                    return (t) => {
                        d[angle] = interpolate(t)
                        return arc(d)
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
    .lds-ring {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
</style>