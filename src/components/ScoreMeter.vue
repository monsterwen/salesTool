<template>
    <div class="score-meter-holder" :id="holderId">
        <div class="marks-div" :style="`height: ${margin.top}px;width: 100%; padding-right: ${margin.right}px; padding-left: ${margin.left}px;`">
            <svg class="meter-marks" id="potential">
            </svg>
        </div>
        <div class="score-meter" :style="`height: calc(100% - ${margin.top + margin.bottom}px);width: 100%; padding-right: ${margin.right}px; padding-left: ${margin.left}px;`">
            <div class="low-section range">
                <div class="meter-tooltip">
                    <h3><b>Basic</b> (1 - 2.5)</h3>
                    <p>Work is required to better leverage customer and member insights to develop a programme that differentiates itself from the competition.  Efforts to better understand customer wants and needs are required as is a re-evaluation of the core programme proposition and overall design to set a clearer direction of travel.  It’s possible that limitations with the platform supporting the programme are throttling the ability to introduce more compelling programme features and deliver a more immersive customer experience.</p>
                </div>
            </div>
            <div class="moderate-section range">
                <div class="meter-tooltip">
                    <h3><b>Emerging</b> (2.5 - 3.5)</h3>
                    <p>A clear programme strategy is in play that is informed and driven by maturing customer insights drawn from an evolving analytic function.  Improved understanding of key customer groups and their behaviours is providing scope to better personalise offers and communications and importantly deliver experiential impact.  Potential exists to challenge the programme status quo with the introduction of new features and capabilities that will serve to amplify the value proposition and distinguish the brand from its immediate competitor set.</p>
                </div>
            </div>
            <div class="high-section range">
                <div class="meter-tooltip">
                    <h3><b>Sophisticated</b> (3.5 - 5)</h3>
                    <p>The programme is clearly differentiated form the competition and driven by solid analytic and insight capabilities that informs a cultured loyalty strategy. Efforts are made to continually evolve the programme and keep ahead of the pack supported by robust programme design and operationalised with a dedicated loyalty platform. Focus is on elevating the customer experience across multiple touch points and channels and securing stronger emotional connections with customer and programme members.</p>
                </div>
            </div>
        </div>
        <div class="marks-div" :style="`height: ${margin.bottom}px;width: 100%; padding-right: ${margin.right}px; padding-left: ${margin.left}px;`">
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
                    left: 12,
                    top: 28,
                    topOffset: 3,
                    right: 6,
                    bottom: 28
                })
            },
            renderMarkers: {
                type: Boolean,
                default: () => false
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
        watch: {
            renderMarkers: function () {
                this.setMarkers()
            }
        },
        mounted: function () {
            this.populateScale()
            if (this.renderMarkers) {
                this.setMarkers()
            }
        },
        methods: {
            populateScale: function () {
                console.log('potentialscore', this.potentialScore)
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
                // setTimeout(this.setMarkers, 511);
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
    h3 {
        margin: 0;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    p {
        margin: 0;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .meter-tooltip h3 {
        margin: 6px 0;
    }
    .meter-tooltip p {
        margin: 0 6px;
    }
    .marks-div {

    }
    .score-meter {
        display: flex;
    }
    .meter-tooltip {
        visibility: hidden;
        padding-left: 8px;
        padding-right: 8px;
        max-width: 400px;
        background-color: rgba(61, 61, 61, 0.9);
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        padding-bottom: 6px;
        position: relative;
        z-index: 1;
        top: 125%;
        left: 50%;
        transform: translateX(-40%);
        margin-left: -60px;
        opacity: 0;
        transition: opacity 0.3s;
    }
    @media (max-width: 1400px) {
        .meter-tooltip p {
            font-size: 12px;
        }
    }
    .meter-tooltip::before {
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent rgba(61, 61, 61, 0.9) transparent;
    }
    .range:hover .meter-tooltip {
        visibility: visible;
        opacity: 1;
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