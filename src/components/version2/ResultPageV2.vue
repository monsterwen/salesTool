<template>
    <div class="fit flex resultPageContainer">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <div class="pageElement chartHolder">
            <ScoreChart
                :hoveredModule="hoveredModule"></ScoreChart>
        </div>
        <div class="pageElement prescriptionHolder">
            <div class="result-header">
                <ResultPageHeader></ResultPageHeader>
            </div>
            <div class="result-body">
                <div class="result-container w3-animate-right" :class="{ 'display': state === 1}">
                    <ResultReport>
                        <template v-slot:score-title>
                            Your <b class="emphasized">Current</b> Overall Score is:
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
                                        <!--                        </div>-->
                                        <!--                        <div class="module-link"-->
                                        <!--                             :class="{'selected': selectedModules[item.id]}"-->
                                        <!--                             v-on:click="selectedModules[item.id] = true">-->
                                        <!--                            <p v-on:click="selectedModules[item.id] = true">I'm interested</p>-->
                                        <!--                        </div>-->
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
                                        @mouseenter="hoveredModule = item"
                                        @mouseleave="hoveredModule = null"
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
                                                :class="{'selected': isSelected(item)}"
                                                v-on:click="moduleSelected(item)">
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
                            Your <b class="emphasized">Current</b> Overall Score is:
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
                                        <!--                        </div>-->
                                        <!--                        <div class="module-link"-->
                                        <!--                             :class="{'selected': selectedModules[item.id]}"-->
                                        <!--                             v-on:click="selectedModules[item.id] = true">-->
                                        <!--                            <p v-on:click="selectedModules[item.id] = true">I'm interested</p>-->
                                        <!--                        </div>-->
                                    </li>
                                </ul>
                            </div>
                        </template>
                    </ResultReport>
                </div>
            </div>
            <div class="result-footer">
                <button class="button" style="vertical-align:middle" @click="nextState"><span>Hover </span></button>
            </div>
        </div>
    </div>
</template>

<script>
    import ScoreChart from './ScoreChart'
    import ResultReport from '../bitComponents/ResultReport'
    import ResultPageHeader from '../bitComponents/ResultPageHeader'
    import PrescriptionPage from '../bitComponents/PrescriptionPage'

    export default {
        name: "ResultPageV2",
        components: {
            ResultReport,
            ScoreChart,
            ResultPageHeader,
            PrescriptionPage
        },
        props: {
            currentPrescription: {
                type: String,
                default: () => 'Based on the following key gaps in your analytic capabilities'
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
            prescriptionHeader: {
                type: String,
                default: () => 'You can take immediate, effective action to address these gaps'
            },
            prescriptionSubHeader: {
                type: String,
                default: () => 'with the following modules:'
            },
        },
        data: function () {
            return {
                state: 2,
                recommendationSelected: {},
                hoveredModule: null
            }
        },
        mounted: function () {
            this.initializeRecommendationSelected()
        },
        methods: {
            isSelected: function (rec) {
                console.log(rec, this.recommendationSelected)
                if (Object.prototype.hasOwnProperty.call(this.recommendationSelected, rec.rank)) {
                    return this.recommendationSelected[rec.rank]
                }
                return false
            },
            nextState: function () {
                this.state = this.state + 1
            },
            initializeRecommendationSelected: function () {
                this.recommendations.forEach((d) => this.recommendationSelected[d.rank] = false)
            },
            moduleSelected: function (rec) {
                this.recommendationSelected[rec.rank] = !this.recommendationSelected[rec.rank]
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
    .result-container {
        width: 100%;
        height: 100%;
        display: none;
    }
    .emphasized {
        padding-left: 6px;
        padding-right: 6px;
    }
    .fit {
        width: 100%;
        height: 100%;
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
    .result-footer {
        width: 100%;
        flex: 0 1 64px;
        height: 64px;
        background-color: #00c6ff;
    }
    .gap-list-holder {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        box-sizing: border-box;
        padding-left: 40px;
        padding-right: 40px;
        padding-top: 6px;
        justify-content: center;
        border-top: 1px solid #CDCDCD;
        border-bottom: 1px solid #CDCDCD;
        padding-bottom: 3px;
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