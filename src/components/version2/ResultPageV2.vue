<template>
    <div class="fit flex resultPageContainer">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <div class="pageElement chartHolder">
            <ScoreChart
                :chartId="chartId"
                :yAxisLabel="category"
                :currentScore="currentScore"
                :targetScore="targetScore"
                :selectedModules="recommendationSelected"
                :hoveredModule="hoveredModule"
                :changeModules="changeModules"
                :chartState="chartState"
                @selectedScore="setSelectedScore"></ScoreChart>
        </div>
        <div class="pageElement prescriptionHolder">
            <div class="result-header">
                <ResultPageHeader
                    :category="category"></ResultPageHeader>
            </div>
            <div class="result-body">
                <div class="result-container w3-animate-right" :class="{ 'display': state === 1}">
                    <ResultReport>
                        <template v-slot:score-title>
                            Your <b class="emphasized">Current</b> Overall Score is:
                        </template>
                        <template v-slot:score>
                            <p :style="{ color: scoreColor }">{{ formatScore(currentScore) }}</p>
                        </template>
                        <template v-slot:prescription>
                            {{ currentPrescription }}
                        </template>
                        <template v-slot:gap-holder>
                            <div class="gap-list-holder" style="align-self: flex-end">
                                <ul class="gap-list" style="padding-left: 0;">
                                    <li v-for="(item, i) in identifiedGaps" class="module-item" v-bind:key="`gap${i}`">
                                        <!--                        <div class="module-tick"></div>-->
                                        <!--                        <div class="module-title">-->
                                        <!--                            <p>{{item}}</p>-->
                                        <!--                        </div>-->
                                        <!--                        <div class="module-description">-->
                                        <h3>{{item.header}}</h3>
                                        <p style="margin-block-start: 6px;">{{item.desc}}</p>
                                    </li>
                                </ul>
                            </div>
                        </template>
                    </ResultReport>
                </div>
                <div class="result-container slide-in" :class="{ 'display': state === 2}">
                    <PrescriptionPage>
                        <template v-slot:header-text>
                            <h3>{{ prescriptionHeader }}</h3>
                        </template>
                        <template v-slot:subheader-text>
                            <h4>{{ prescriptionSubHeader }}</h4>
                        </template>
                        <template v-slot:prescriptions>
                            <div class="gap-list-holder" style="align-self: flex-end">
                                <ul class="gap-list" style="padding-left: 0;">
                                    <li v-for="(item, i) in recommendations"
                                        class="module-item"
                                        v-bind:key="`gap${i}`"
                                        @mouseenter="moduleMouseOver(item)"
                                        @mouseleave="moduleMouseOut(item)"
                                        >
                                        <!--                        <div class="module-tick"></div>-->
                                        <!--                        <div class="module-title">-->
                                        <!--                            <p>{{item}}</p>-->
                                        <!--                        </div>-->
                                        <!--                        <div class="module-description">-->
                                        <h3>{{item.name}}</h3>
                                        <p style="margin-block-start: 6px;">{{item.soyou}}</p>
                                        <!--                        </div>-->
                                        <!--                        <div class="module-link"-->
                                        <!--                             :class="{'selected': selectedModules[item.id]}"-->
                                        <!--                             v-on:click="selectedModules[item.id] = true">-->
                                        <!--                            <p v-on:click="selectedModules[item.id] = true">I'm interested</p>-->
                                        <!--                        </div>-->
                                        <button class="module-link"
                                                v-if="!recommendationSelected[item.rank]"
                                                @click="moduleSelected(item, $event)">
                                            <p>I'm interested</p>
                                        </button>
                                        <button class="module-link selected"
                                                v-if="recommendationSelected[item.rank]"
                                                @click="moduleSelected(item, $event)">
                                            <p>I'm interested</p>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </template>
                    </PrescriptionPage>
                </div>
                <div class="result-container slide-in" :class="{ 'display': state === 3}">
                    <ResultReport>
                        <template v-slot:score-title>
                            {{ targetHeader }}
                        </template>
                        <template v-slot:score>
                            <p :style="{ color: targetColor }">{{ formatScore(selectedScore) }}</p>
                        </template>
                        <template v-slot:prescription>
                            {{ scoreDescription[selectedLabel] }}
                        </template>
                        <template v-slot:gap-holder>
                            <div class="gap-list-holder review-container" style="align-self: flex-end">
                                <ul class="gap-list" style="padding-left: 0;">
                                    <li class="module-item">
                                        <h3>Selected</h3>
                                    </li>
                                    <li v-for="(item, i) in selRec" class="module-item" v-bind:key="`selected${i}`">
                                        <p>{{item.name}}</p>
                                    </li>
                                    <li class="module-item">
                                        <h3>Not Selected</h3>
                                    </li>
                                    <li v-for="(item, i) in modules" class="module-item" v-bind:key="`module${i}`">
                                        <p>{{item.name}}</p>
                                    </li>
                                </ul>
                            </div>
                        </template>
                    </ResultReport>
                </div>
            </div>
            <div class="result-footer flex align-center justify-center">
                <button class="button progress-button" style="vertical-align:middle" @click="nextState">
                    <h3>{{ buttonText }}</h3>
                    <i class="material-icons icon infoIcon pl-1" style="font-size: 26px;">arrow_forward</i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import ScoreChart from './ScoreChart'
    import ResultReport from '../bitComponents/ResultReport'
    import ResultPageHeader from '../bitComponents/ResultPageHeader'
    import PrescriptionPage from '../bitComponents/PrescriptionPage'
    import * as d3 from "d3";

    export default {
        name: "ResultPageV2",
        components: {
            ResultReport,
            ScoreChart,
            ResultPageHeader,
            PrescriptionPage
        },
        props: {
            chartId: {
                type: String,
                default: () => 'chartchart'
            },
            category: {
                type: String,
                default: () => 'Analytics'
            },
            currentPrescription: {
                type: String,
                default: () => 'Here are the shortcomings we identified that we think are affecting your analytic capabilities the most'
            },
            identifiedGaps: {
                type: Array,
                default: () => [
                    {
                        header: 'Establishing customer perception of the CRM or loyalty programme',
                        desc:  'Your business seems to struggle in gauging the likes and dislikes pertaining to the brand experience and changing key aspects in order to increase satisfaction, loyalty, and LTV.'
                    },
                    {
                        header: 'Identifying your customers demographics',
                        desc: 'You seem to be falling short of effectively addressing the the traits of your customers and the extent to which they over or under index in those traits.'
                    }
                ]
            },
            modules: {
                type: Array,
                default: () => [
                    {
                        rank: 1,
                        name: "Program Health Assessment",
                        soyou:  'This will help you establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                    },
                    {
                        rank: 4,
                        name: "Program Cost-Benefit Analysis",
                        soyou:  'This will help you establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                    },
                    {
                        rank: 2,
                        name: "Core Customer Segmentation",
                        soyou:  'This will help you establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                    },
                    {
                        rank: 8,
                        name: "Customer Demographic Profiling",
                        soyou:  'This will help you establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                    },
                    {
                        rank: 5,
                        name: "Brand & Program Tracker",
                        soyou:  'This will help you establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                    },
                    {
                        rank: 11,
                        name: "Propensity Modeling",
                        soyou:  'This will help you establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                    },
                    {
                        rank: 13,
                        name: "Proactive Churn Modeling",
                        soyou:  'This will help you establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                    },
                ]
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
            currentScore: {
                type: Number,
                default: () => 2.4
            },
            targetScore: {
                type: Number,
                default: () => 4.1
            },
            prescriptionHeader: {
                type: String,
                default: () => 'You can take immediate, effective action to address the critical shortcomings we\'ve identified'
            },
            prescriptionSubHeader: {
                type: String,
                default: () => 'with the following modules'
            },
            targetHeader: {
                type: String,
                default: () => 'With the use of your selected modules, you can expect your strategic capabilities to improve to'
            },
            colorDomain: {
                type: Array,
                default: () => [2.50000001, 3.50000001]
            },
            colorRange: {
                type: Array,
                default: () => ['#D83737','#FFBF00','#A5BB00']
            },
            scoreRange: {
                type: Array,
                default: () => ['basic','emerging','sophisicated']
            },
            buttonState: {
                type: Object,
                default: () => ({
                    1: 'Address Shortcomings',
                    2: 'Proceed with selected modules',
                    3: 'Continue to Strategy Review'
                })
            },
            scoreDescription: {
                type: Object,
                default: () => ({
                    basic: 'Work will be required to better leverage customer and member insights to develop a program that differentiates itself from the competition.',
                    emerging: 'A clear program strategy is in play that is informed and driven by maturing customer insights drawn from an evolving analytic function.',
                    sophisicated: 'The program will be clearly differentiated form the competition and driven by solid analytic and insight capabilities that informs a cultured loyalty strategy.'
                })
            }
        },
        data: function () {
            return {
                state: 1,
                recommendationSelected: {},
                hoveredModule: null,
                changeModules: false,
                stateConversion: {
                    1: 'current',
                    2: 'transition',
                    3: 'target'
                },
                selectedScore: 0,
                colorScale: d3.scaleThreshold()
                    .domain(this.colorDomain)
                    .range(this.colorRange),
                labelScale: d3.scaleThreshold()
                    .domain(this.colorDomain)
                    .range(this.scoreRange),
            }
        },
        computed: {
            selRec: function () {
                let modules = []
                this.recommendations.forEach(d => {
                    if (!this.recommendationSelected[d.rank]) {
                        modules.push(d)
                    }
                })
                return modules
            },
            buttonText: function () {
                return this.buttonState[this.state]
            },
            chartState: function () {
                return this.stateConversion[this.state]
            },
            scoreColor: function () {
                return this.colorScale(this.currentScore)
            },
            targetColor: function () {
                return this.colorScale(this.selectedScore)
            },
            selectedLabel: function () {
                return this.labelScale(this.selectedScore)
            }
        },
        mounted: function () {
            this.colorScale = d3.scaleThreshold()
                .domain(this.colorDomain)
                .range(this.colorRange)
            this.initializeRecommendationSelected()
        },
        methods: {
            formatScore: function (score) {
                return d3.format('.1f')(score)
            },
            isSelected: function (rec) {
                console.log('press', rec, this.recommendationSelected)
                if (Object.prototype.hasOwnProperty.call(this.recommendationSelected, rec.rank)) {
                    return this.recommendationSelected[rec.rank]
                }
                return false
            },
            setSelectedScore: function (score) {
                this.selectedScore = score
            },
            moduleMouseOver: function (item) {
                if (!this.recommendationSelected[item.rank]) {
                    this.hoveredModule = item
                }
            },
            moduleMouseOut: function (item) {
                if (!this.recommendationSelected[item.rank]) {
                    this.hoveredModule = null
                }
            },
            nextState: function () {
                this.state = this.state + 1
                if (this.state === 3) {
                    this.$emit('lastStep')
                }
            },
            initializeRecommendationSelected: function () {
                this.recommendations.forEach((d) => this.recommendationSelected[d.rank] = false)
            },
            moduleSelected: function (rec, button) {
                console.log('ccscscscscs', button)
                this.recommendationSelected[rec.rank] = !this.recommendationSelected[rec.rank]
                this.changeModules = !this.changeModules
                console.log('ccscscscscs', this.recommendationSelected)
            }
        }
    }
</script>

<style scoped>
    p {
        margin-bottom: 0.5rem !important;
    }
    .module-link {
        margin-top: 0;
        padding-left: 6px;
        padding-right: 6px;
        border-radius: 6px;
    }
    .module-link.selected {
        background-color: #009FBC;
    }
    .module-link p {
        margin-top: 8px;
        margin-bottom: 4px;
        color: #009FBC;
        cursor: pointer;
        pointer-events: none;
    }
    .module-link.selected p {
        color: #fff;
    }
    .module-link:hover {
        background-color: #009FBC;
    }
    .module-link:hover p {
        color: #fff;
    }
    .resultPageContainer {
        min-height: 100%;
    }
    h3 {
        margin: 0;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    h4 {
        margin: 0;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .display {
        display: block !important;
    }
    .progress-button {
        color: #1D1D1F !important;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        background: none;
        border: none;
        border-radius: 16px;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }
    .result-container {
        width: 100%;
        height: 100%;
        min-height: 100%;
        display: none;
    }
    .emphasized {
        padding-left: 6px;
        padding-right: 6px;
    }
    .fit {
        width: 100%;
        height: 100%;
        min-height: 100%;
    }
    .flex {
        display: flex;
        flex-flow: row wrap;
    }
    .pageElement {
        width: 50%;
        flex-basis: 50%;
        min-height: 512px;
    }
    .chartHolder {
        /*padding-top: 56px;*/
    }
    .prescriptionHolder {
        display: flex;
        flex-flow: column;
        box-sizing: border-box;
        padding-bottom: 24px;
        padding-left: 12px;
        padding-right: 12px;
    }
    .result-header {
        width: 100%;
        flex: 0 1 auto;
        height: auto;
        display: flex;
        flex-flow: row wrap;
        margin-top: 24px;
    }
    .result-body {
        width: 100%;
        flex: 1 1 auto;
        height: auto;
    }
    .fit {
        width: 100%;
        height: 100%;
    }
    .flex-fit {
        flex-basis: 100%;
    }
    .flex {
        display: flex;
    }
    .row {
        flex-flow: row wrap;
    }
    .col {
        flex-flow: column !important;
    }
    .align-center {
        align-items: center;
    }
    .align-start {
        align-items: flex-start;
    }
    .justify-center {
        justify-content: center;
    }
    .result-footer {
        width: 100%;
        flex: 0 1 64px;
        height: 64px;
    }
    .gap-list-holder {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        box-sizing: content-box;
        padding-top: 6px;
        justify-content: center;
        border-top: 1px solid #CDCDCD;
        border-bottom: 1px solid #CDCDCD;
        padding-bottom: 3px;
    }
    .review-container {
        max-height: 310px;
        overflow-y: auto;
    }
    .module-item {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        flex-basis: 100%;
        justify-content: center;
        margin-top: 6px;
        list-style: none;
        text-align: center;
    }
    .module-item h3 {
        margin-top: 6px;
        margin-bottom: 6px;
    }
    .module-item p {
        color: #1d1d1f;
    }
    .gap-list {
        margin-block-start: 0px;
        margin-block-end: 0px;
    }
    button {
        display: inline-block;
        border: none;
        margin: 0;
        text-decoration: none;
        background: none;
        color: #656565;
        font-family: sans-serif;
        font-size: 1rem;
        cursor: pointer;
        text-align: center;
        transition: background 250ms ease-in-out,
        transform 150ms ease;
        -webkit-appearance: none;
        -moz-appearance: none;
    }
    .w3-animate-fading{animation:fading 10s infinite}@keyframes fading{0%{opacity:0}50%{opacity:1}100%{opacity:0}}
    .w3-animate-opacity{animation:opac 0.8s}@keyframes opac{from{opacity:0} to{opacity:1}}
    .w3-animate-top{position:relative;animation:animatetop 0.4s}@keyframes animatetop{from{top:-300px;opacity:0} to{top:0;opacity:1}}
    .w3-animate-left{position:relative;animation:animateleft 0.4s}@keyframes animateleft{from{left:-300px;opacity:0} to{left:0;opacity:1}}
    .slide-in {
        position:relative;
        animation:animateright 0.4s
    }
    @keyframes animateright {
             from{right:-300px;opacity:0} to{right:0;opacity:1}
    }
    .slide-out {
        position:relative;
        animation: slideOut 0.4s
    }
    @keyframes slideOut {
         from {
             left: 0px;
             opacity: 1
         }
        to {
            left: -300px;
            opacity: 0;
        }
    }
    .w3-animate-bottom{position:relative;animation:animatebottom 0.4s}@keyframes animatebottom{from{bottom:-300px;opacity:0} to{bottom:0;opacity:1}}
    .w3-animate-zoom {animation:animatezoom 0.6s}@keyframes animatezoom{from{transform:scale(0)} to{transform:scale(1)}}
    .w3-animate-input{transition:width 0.4s ease-in-out}.w3-animate-input:focus{width:100%!important}
</style>