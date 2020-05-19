<template>
    <div class="score-meter-holder" :id="holderId">
        <div class="marks-div" :style="`height: ${margin.top}px;width: calc(100% - ${margin.left + margin.right}px);`">
            <svg class="meter-marks" id="potential">
            </svg>
        </div>
        <div class="score-meter" :style="`height: calc(100% - ${margin.top + margin.bottom}px);width: calc(100% - ${margin.left + margin.right}px);`">
            <div class="low-section"></div>
            <div class="moderate-section"></div>
            <div class="high-section"></div>
        </div>
        <div class="marks-div" :style="`height: ${margin.bottom}px;width: calc(100% - ${margin.left + margin.right}px);`">
            <svg class="meter-marks" id="current">
            </svg>
        </div>
    </div>
</template>

<script>
    import * as d3 from 'd3'

    export default {
        name: "ScoreMeter",
        props: {
            currentScore: {
                type: Number,
                default: () => 2.5
            },
            potentialScore: {
                type: Number,
                default: () => 3.6
            },
            holderId: {
                type: String,
                default: () => 'meter-hold'
            },
            margin: {
                type: Object,
                default: () => ({
                    left: 36,
                    top: 28,
                    topOffset: 3,
                    right: 6,
                    bottom: 28
                })
            }
        },
        data: () => ({
           scoreScale: null,
           currentArrow: null,
           potentialArrow: null,
            div: null,
            currentSvg: null,
            potentialSvg: null,
            width: 0,
            height: 0,
        }),
        mounted: function () {
            this.populateScale()
        },
        methods: {
            populateScale: function () {
                let triangleGenerator = d3.symbol()
                    .type(d3.symbolTriangle)
                    .size(this.margin.top * 3);
                this.div = d3.select(`#${this.holderId}`)
                this.currentSvg = this.div
                    .select('#current')
                    .attr('width', '100%')
                    .attr('height', '100%')
                this.potentialSvg = this.div
                    .select('#potential')
                    .attr('width', '100%')
                    .attr('height', '100%')
                this.width = this.potentialSvg.node().getBoundingClientRect().width

                this.scoreScale = d3.scaleLinear()
                    .domain([0,5])
                    .range([0,this.width])
                console.log('current', this.scoreScale(this.currentScore))
                this.currentArrow = this.currentSvg
                    .append('g')
                    .attr('opacity', 0)
                    .attr('transform', `translate(${this.scoreScale(this.currentScore)},${this.margin.bottom / 3})`)
                this.currentArrow
                    .append('path')
                    .attr('d', triangleGenerator)
                this.currentArrow
                    .append('text')
                    .attr('class', 'state-labels')
                    .attr('text-anchor', 'middle')
                    .attr('font-family', 'Avenir, Helvetica, Arial, sans-serif')
                    .attr('y', this.margin.top / (3 / 2))
                    .style('font-size', `${this.margin.bottom / (3 / 2)}px`)
                    .text('Current')
                this.potentialArrow = this.potentialSvg
                    .append('g')
                    .attr('opacity', 0)
                    .attr('transform', `translate(${this.scoreScale(this.potentialScore)},${this.margin.top / (3 / 2) + this.margin.topOffset}) rotate(180)`)
                this.potentialArrow
                    .append('path')
                    .attr('d', triangleGenerator)
                this.potentialArrow
                    .append('text')
                    .attr('transform', `rotate(180)`)
                    .attr('class', 'state-labels')
                    .attr('text-anchor', 'middle')
                    .attr('font-family', 'Avenir, Helvetica, Arial, sans-serif')
                    .attr('y', this.margin.topOffset - this.margin.top / 3)
                    .style('font-size', `${this.margin.top / (3 / 2)}px`)
                    .text('Potential')
                setTimeout(this.setMarkers, 511);
            },
            setMarkers: function () {
                this.width = this.potentialSvg.node().getBoundingClientRect().width
                console.log('thiswifdht', this.width)


                this.scoreScale
                    .range([0,this.width])
                this.currentArrow
                    .transition()
                    .duration(200)
                    .attr('opacity', 1)
                    .attr('transform', `translate(${this.scoreScale(this.currentScore)},${this.margin.bottom / 3})`)

                this.potentialArrow
                    .transition()
                    .duration(200)
                    .attr('opacity', 1)
                    .attr('transform', `translate(${this.scoreScale(this.potentialScore)},${this.margin.top / (3 / 2) + this.margin.topOffset}) rotate(180)`)

            }
        }
    }
</script>

<style scoped>
    .state-labels {
        text-anchor: middle;
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }
    .score-meter-holder {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        overflow: visible;
    }
    .marks-div {

    }
    .score-meter {
        display: flex;
    }
    .low-section {
        width: 50%;
        flex-basis: 50%;
        background-color: #D83737;
        border-radius: 12px 0 0 12px;
    }
    .moderate-section {
        width: 20%;
        flex-basis: 20%;
        background-color: #FFBF00;
    }
    .high-section {
        width: 30%;
        flex-basis: 30%;
        background-color: #A5BB00;
        border-radius: 0 12px 12px 0;
    }
</style>