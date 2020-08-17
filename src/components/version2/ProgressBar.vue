<template>
    <div class="progressBarHolder">
        <div class="progressBarLabel">
            <p class="questionText"><span class="currentQuestion">{{ currQ }}</span>of<span class="totalQuestion">{{ numberQuestion }}</span></p>
        </div>
        <div class="progressBar">
            <div class="progressBarBody">
                <div class="progressMeter" :style="{ 'width': progressString, 'background-color': progressColor }"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as d3 from 'd3'
    export default {
        name: "ProgressBar",
        props: {
            currentQuestion: {
                type: Number,
                default: 1
            },
            numberQuestion: {
                type: Number,
                default: 10
            },
            colorRange: {
                type: Array,
                default: () => ['#ff2f2a','#fe1f1a','#FFBF00','#ffd114','#A5BB00','#48bb00']
            },
            stepColor: {
                type: String,
                default: () => '#0ad9ff'
            }
        },
        data: function () {
            return {
                colorScale: null,
                progressColor: '#ff2f2a'
            }
        },
        watch: {
            currentQuestion: function () {
                this.progressColor = this.stepColor
                setTimeout(() => {
                    this.progressColor = this.barColor
                }, 300)
            }
        },
        computed: {
            progressPercentage: function () {
                let progress = (this.currentQuestion / this.numberQuestion) * 100

                if (!progress) {
                    return 0
                }
                return progress
            },
            currQ: function () {
                if (this.currentQuestion < this.numberQuestion) {
                    return this.currentQuestion
                }
                return this.numberQuestion
            },
            progressString: function () {
                let progress = this.progressPercentage

                if (!progress) {
                    return '18px'
                }
                return `${progress}%`
            },
            barColor: function () {
                return this.colorScale(this.progressPercentage)
            }
        },
        created: function () {
            this.colorScale = d3.scaleLinear()
                .domain([0, 49, 50, 69, 70, 100])
                .range(this.colorRange)
        },
        methods: {

        }
    }
</script>

<style scoped>
    .questionText {
        margin-top: 6px;
        padding-right: 16px;
        font-size: 15px;
        margin-bottom: 0;
        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: #676767;
        line-height: 1em;
    }
    .currentQuestion {
        font-size: 16px;
        color: #565656;
        padding-right: 2px;
    }
    .totalQuestion {
        font-size: 16px;
        color: #454545;
        padding-left: 2px;
    }
    .progressBarHolder {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
    }
    .progressBarLabel {
        width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
    }
    .progressBar {
        width: 100%;
        flex-basis: 100%;
        height: 16px;
        padding-left: 8px;
        padding-right: 8px;
        margin-top: 1px;
    }
    .progressBarBody {
        width: 100%;
        height: 100%;
        margin-top: 2px;
        margin-bottom: 2px;
        margin-left: 2px;
        margin-right: 2px;
        padding-top: 4px;
        padding-bottom: 4px;
        padding-left: 4px;
        padding-right: 4px;
        border-radius: 18px;
        background-color: #dddddd;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .progressMeter {
        height: 100%;
        background-color: #721c24;
        border-radius: 18px;
        transition: width 100ms, background-color 200ms;
    }
</style>