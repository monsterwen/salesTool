<template>
    <div class="fit flex resultPageContainer" :id="category">
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
                :current-text="currentText"
                :target-text="targetText"
                :potential-text="potentialText"
                :totalRecommendations="recommendations.length"
                :selectedRecommendations="selectedRecommendations"
                :availableRecommendations="availableRecommendations"
                @selectedScore="setSelectedScore"></ScoreChart>
        </div>
        <div class="pageElement prescriptionHolder">
            <div class="result-body pt-3">
                <div class="result-container w3-animate-right" :class="{ 'display': state === 1}">
                    <ResultReport>
                        <template v-slot:score-title>
                            <b class="emphasized">{{ prescriptionTitle }}</b>
                        </template>
                        <template v-slot:score>
                            <p :style="{ color: scoreColor }">{{ formatScore(currentScore) }}</p>
                        </template>
                        <template v-slot:score-desc>
                            {{ currentDescription[currentLabel] }}
                        </template>
                        <template v-slot:prescription>
                            {{ currentPrescription }}
                        </template>
                        <template v-slot:gap-holder>
                            <div class="gap-list-holder" style="align-self: flex-end">
                                <ul class="gap-list" style="padding-left: 0;">
                                    <li v-for="(item, i) in recommendations" class="module-item" v-bind:key="`gap${i}`">
                                        <h5>{{item.gapDesc}}</h5>
                                    </li>
                                </ul>
                            </div>
                        </template>
                    </ResultReport>
                </div>
                <div class="result-container slide-in" :class="{ 'display': state === 2}">
                    <div class="slide-in modult-container fit"
                        v-for="(item, i) in recommendations"
                        :class="{ hidden: moduleState !== i }"
                        :key="`module${i}`">
                        <ModuleRecommendation
                            :label="whatUgetText">
                            <template v-slot:module-title>
                                {{ item.name }}
                            </template>
                            <template v-slot:module-logo>
                                <img class="dimension-png" :src="require(`../../assets/svg/logos/${svgPath[item.id]}.svg`)">
                            </template>
                            <template v-slot:header>
                                {{ item.soYouHeader }}
                            </template>
                            <template v-slot:prescription>
                                {{ item.soYouDesc }}
                            </template>
                            <template v-slot:includes-list-items>
                                <li v-for="(item, i) in item.includes" class="includes-item" v-bind:key="`selected${i}`">
                                    <p>{{item}}</p>
                                </li>
                            </template>
                        </ModuleRecommendation>
                    </div>
                </div>
                <div class="result-container slide-in" :class="{ 'display': state === 3}">
                    <ResultReport>
                        <template v-slot:score-title>
                            <h3 class="pt-4">{{ targetHeader }}</h3>
                        </template>
                        <template v-slot:score>
                            <p :style="{ color: targetColor }">{{ formatScore(selectedScore) }}</p>
                        </template>
                        <template v-slot:score-desc>
                            {{ descLabel }}
                        </template>
                        <template v-slot:prescription>
                            <h3>{{ reviewSelectionLabel }}</h3>
                        </template>
                        <template v-slot:gap-holder>
                            <div class="gap-list-holder review-container" style="align-self: flex-end">
                                <ul class="gap-list mb-1" style="padding-left: 0;">
                                    <li class="module-item title-module mt-0" v-if="selectedRec.length > 0">
                                        <h3>{{ selectedText }}</h3>
                                    </li>
                                    <li v-for="(item, i) in selectedRec" class="module-item" v-bind:key="`selected${i}`">
                                        <a class="recommendation"
                                           @click="recommendationClick(item)">
                                            <p>{{item.name}}</p>
                                        </a>
                                    </li>
                                    <li class="module-item title-module mt-0" v-if="notSelected.length > 0">
                                        <h3>{{ notSelectedText }}</h3>
                                    </li>
                                    <li v-for="(item, i) in notSelected" class="module-item" v-bind:key="`module${i}`">
                                        <a class="recommendation"
                                           @click="recommendationClick(item)">
                                            <p>{{item.name}}</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </template>
                    </ResultReport>
                </div>
            </div>
            <div class="result-footer flex align-center justify-center">
                <button class="button progress-button" style="vertical-align:middle" @click="nextState" :class="{ hidden: state === 2 }">
                    <h3>{{ buttonText }}</h3>
                    <i class="material-icons icon infoIcon pl-1" style="font-size: 26px;">arrow_forward</i>
                </button>
                <a class="button no-button mt-1 mr-2" style="vertical-align:middle" @click="nothanks" :class="{ hidden: state !== 2 }">
                    <h4>{{ noThanks }}</h4>
                </a>
                <a class="button interested-button mt-1 ml-2" style="vertical-align:middle" @click="interested" :class="{ hidden: state !== 2 }">
                    <h4>{{ interestedText }}</h4>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import ScoreChart from './ScoreChart'
    import ResultReport from '../bitComponents/ResultReport'
    // import ResultPageHeader from '../bitComponents/ResultPageHeader'
    // import PrescriptionPage from '../bitComponents/PrescriptionPage'
    import * as d3 from "d3";
    import ModuleRecommendation from './ModuleRecommendation'
    import {
        reviewSelectionText,
        selectedText,
        notSelectedText,
        whatUGet
    } from "../../copy/copy";

    export default {
        name: "ResultPageV2",
        components: {
            ModuleRecommendation,
            ResultReport,
            ScoreChart,
            // ResultPageHeader,
            // PrescriptionPage,
            // ModuleRecommendation
        },
        props: {
            noThanks: {
                type: String,
            },
            interestedText: {
                type: String,
            },
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
                default: () => 'Here are the areas we identified that we think are affecting your analytic capabilities the most'
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
            language: {
                type: String
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
                        id: 13,
                        rank: 13,
                        name: 'CX/MX Journey Mapping',
                        gapDesc: 'Optimizing customer experience flow across all key touchpoints',
                        soYouHeader: 'Experience your customers’ journeys',
                        soYouDesc: 'Leverage all available data to map and evaluate your customer journey, recommending strategies for improvement, and generating actionable insights',
                        includes: [
                            'Collaborative Work Sessions to Map Out Touchpoints and Key Moments',
                            'Optimized Customer Journey Map Informed by T.A.R.G.E.T. (Touchpoint And Relationship Gap Evaluation Tool)',
                            'Recommendations for Enhancements to Address Gaps and Redundancies'
                        ]
                    },{
                        id: 14,
                        rank: 14,
                        name: 'Loyalty Ideation Workshop',
                        gapDesc: 'Leveraging an idea bank to actively enhance your CRM/Loyalty program',
                        soYouHeader: 'Transform ideas into actionable insights',
                        soYouDesc: 'Through an ideation exercise with key stakeholders, we will take the lead in turning abstract ideas into a list of program concepts and immediate enhancements',
                        includes: [
                            'Categorized Idea Bank',
                            'Level of Effort/Impact Matrix',
                            'Straw Man Program Concepts',
                            'Quick Wins for Program Enhancement'
                        ]
                    },{
                        id: 15,
                        rank: 15,
                        name: 'Relationship Analyser',
                        gapDesc: 'Identifying how your customers perceive your CRM/Loyalty efforts',
                        soYouHeader: 'Discover how customers perceive your relationship',
                        soYouDesc: 'Employ a specialized set of research questions to gain a better understanding of customer sentiment toward your marketing efforts, loyalty program, and/or CRM initiatives',
                        includes: [
                            'Survey of Current Customers Tailored to Business Needs',
                            'Index of Survey Results Compared to Competitive Set',
                            'Recommendations to Strengthen Customer Relationships',
                            'Research Readout and Consulting Session'
                        ]
                    },{
                        id: 16,
                        rank: 16,
                        name: 'Loyalty Launch & Planning',
                        gapDesc: 'Following a detailed plan for launching a pilot or revised program',
                        soYouHeader: 'Get your loyalty program off to a successful start',
                        soYouDesc: 'This comprehensive resource outlines a pilot program structure, implementation plan, training plan, and post-launch measurement guide tailored to your specific needs',
                        includes: [
                            'Launch Roadmap with Milestones for Key Stakeholder Groups',
                            'Employee Training Manual',
                            'Employee Training Communications Kit',
                            'SPIF Recommendations'
                        ]
                    },{
                        id: 17,
                        rank: 17,
                        name: 'Strategic Vision & Roadmap',
                        gapDesc: 'Detailing a long-term strategic plan and guide to optimize marketing ',
                        soYouHeader: 'Keep your program relevant',
                        soYouDesc: 'We will develop a dynamic roadmap to guide program evolution and identify themes for short- and long-term program vision, resulting in a detailed 3-year strategic plan',
                        includes: [
                            'Topline Review of Corporate/Brand Initiatives and Directives',
                            'Joint Ideation and Planning Sessions for Program Goals Alignment',
                            'Details 3-Year Strategic Roadmap and Implementation Guide'
                        ]
                    },{
                        id: 18,
                        rank: 18,
                        name: 'Communications Audit',
                        gapDesc: 'Following a plan to address communications gaps and opportunities',
                        soYouHeader: 'Find out how your communications stack up',
                        soYouDesc: 'Our strategy team will inventory customer communications and analyze engagement metrics to identify weaknesses and recommend improvements',
                        includes: [
                            'Presentation Deck Identifying Communications Trends and Benchmarking Insights',
                            'Member Communications Scorecard',
                            'Recommendations for Enhancements to Address Gaps and Redundancies'
                        ]
                    },{
                        id: 19,
                        rank: 19,
                        name: 'Emotional Loyalty Measurement',
                        gapDesc: 'Tracking your customers’ rational and emotional loyalty to your brand',
                        soYouHeader: 'Measure both sides of the equation',
                        soYouDesc: 'Identify the depth of your customers’ emotional and rational connections to your brand and loyalty program with our proprietary Brierley Loyalty Quotient',
                        includes: [
                            'Survey of Current Customers Tailored to Business Needs',
                            'Interactive BLQ Dashboard with Rational & Emotional Measures by Brand',
                            'Recommendations to Improve Overall BLQ Scores'
                        ]
                    },
                ]
            },
            currentScore: {
                type: Number,
                default: () => 3
            },
            targetScore: {
                type: Number,
                default: () => 5
            },
            prescriptionTitle: {
                type: String
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
                default: () => [2.50000001, 3.50000001, 5]
            },
            descDomain: {
                type: Array,
                default: () => [0, .49999999, .5, 1]
            },
            colorRange: {
                type: Array,
                default: () => ['#D83737','#FFBF00','#A5BB00']
            },
            scoreRange: {
                type: Array,
                default: () => ['basic','emerging','sophisicated', 'perfect']
            },
            descRange: {
                type: Array,
                default: () => ['none','less','more', 'all']
            },
            buttonState: {
                type: Object,
                default: () => ({
                    1: 'Select Recommended Modules',
                    2: 'Proceed with selected modules',
                    3: 'Continue to Strategy Review'
                })
            },
            currentDescription: {
                type: Object,
                default: () => ({
                    basic: 'There is opportunity to expand your analytical toolkit to further uncover actionable insights',
                    emerging: 'The fundamentals of marketing analytics are evident, and there are additional steps you can take to further shore up your',
                    sophisicated: 'You have impressive analytics capabilities, and we may be able to help further augment your impressive marketing practice',
                    perfect: 'You Rock! You are clearly part of a data-driven marketing organization. There may be areas where we can augment or help out'
                })
            },
            // scoreDescription: {
            //     type: Object,
            //     default: () => ({
            //         basic: 'Work will be required to better leverage customer and member insights to develop a program that differentiates itself from the competition.',
            //         emerging: 'A clear program strategy is in play that is informed and driven by maturing customer insights drawn from an evolving analytic function.',
            //         sophisicated: 'The program will be clearly differentiated form the competition and driven by solid analytic and insight capabilities that informs a cultured loyalty strategy.'
            //     })
            // },
            scoreDescription: {
                type: Object,
                default: () => ({
                    none: 'While you may not have immediate interest in any of the modules we recommended, Brierley is here to provide analytics, strategic thinking and staff augmentation.',
                    less: 'These are great solutions to help address some of your most immediate opportunities. We would love to discuss these with you.',
                    more: 'There are plenty of solutions that we can put to work for you quickly. We would love to discuss options for an action plan with you.',
                    all: 'Great choices! We would love to help tailor an action plan to your needs and look forward to discussing these with you.'
                })
            }
        },
        data: function () {
            return {
                state: 1,
                moduleState: 0,
                selectedRecommendations: 0,
                recommendationSelected: {},
                hoveredModule: null,
                changeModules: false,
                stateConversion: {
                    1: 'current',
                    2: 'transition',
                    3: 'target'
                },
                selectedRec: [],
                notSelected: [],
                selectedScore: 0,
                colorScale: d3.scaleThreshold()
                    .domain(this.colorDomain)
                    .range(this.colorRange),
                labelScale: d3.scaleThreshold()
                    .domain(this.colorDomain)
                    .range(this.scoreRange),
                descScale: d3.scaleThreshold()
                    .domain(this.descDomain)
                    .range(this.descRange),
                svgPath: {
                    1: 'ProgramHealthAssessment',
                    2: 'ProgramCostBenefitAnalysis',
                    3: 'CoreCustomerSegmentation',
                    4: 'CustomerDemoProfile',
                    5: 'BrandProgramTracker',
                    6: 'PropensityModeling',
                    7: 'ProactiveChurnModeling',
                    8: 'LifetimeValueModeling',
                    9: 'PropensityModeling',
                    10: 'KPIMetricAudit',
                    11: 'AnalyticVisionRoadmap',
                    12: 'CompetitiveEvaluation',
                    13: 'cxmxjourneymapping',
                    14: 'LoyaltyIdeationWorkshop',
                    15: 'RelationshipAnalyzer',
                    16: 'LoyaltyLaunchPlanning',
                    17: 'StrategicVisionRoadmap',
                    18: 'RelationshipAnalyzer',
                    19: 'EmotionalLoyaltyMeasure',
                    20: 'LoyaltyCheckup',
                    21: 'MarketingJumpstart',
                    22: 'NBAMarketingPlan',
                }
            }
        },
        watch: {
            moduleState: function () {
                if (this.moduleState === this.recommendations.length) {
                    this.state = this.state + 1
                }
            },
            state: function () {
                console.log('state', this.state)
            }
        },
        computed: {
            // selRec: function () {
            //     let modules = []
            //     this.recommendations.forEach(d => {
            //         console.log('selrec', d)
            //         if (this.recommendationSelected[d.rank]) {
            //             modules.push(d)
            //         }
            //     })
            //     return modules
            // },
            whatUgetText: function () {
                return whatUGet[this.language]
            },
            reviewSelectionLabel: function () {
                return reviewSelectionText[this.language]
            },
            selectedText: function () {
                return selectedText[this.language]
            },
            notSelectedText: function () {
                return notSelectedText[this.language]
            },
            descSelect: function () {
                return this.selectedRec.length / this.recommendations.length
            },
            descLabel: function () {
                let descSelect = this.descSelect
                if (descSelect === 0) {
                    return this.scoreDescription.none
                }
                if (descSelect === 1) {
                    return this.scoreDescription.all
                }
                if (descSelect < 0.5) {
                    return this.scoreDescription.less
                }
                return this.scoreDescription.more
            },
            buttonText: function () {
                return this.buttonState[this.state]
            },
            chartState: function () {
                if (this.state < 4) {
                    return this.stateConversion[this.state]
                }
                return this.stateConversion[3]
            },
            scoreColor: function () {
                return this.colorScale(this.currentScore)
            },
            targetColor: function () {
                return this.colorScale(this.selectedScore)
            },
            currentLabel: function () {
                return this.labelScale(this.selectedScore)
            },
            selectedLabel: function () {
                return this.labelScale(this.selectedScore)
            },
            scoreDiff: function () {
                console.log(';scorefidd', this.targetScore, this.currentScore, this.recommendations)
                return (this.targetScore - this.currentScore) / this.recommendations.length
            },
            availableRecommendations: function () {
                return this.recommendations.length - this.moduleState
            },
            pickedRecommendations: function () {
                let pickedRecommendations = []
                this.recommendations.forEach(d => {
                    if (this.recommendationSelected[d.id]) {
                        pickedRecommendations.push(d.name)
                    }
                })
                return pickedRecommendations
            }
        },
        mounted: function () {
            console.log('rendering', this.category, this.recommendations)
            this.colorScale = d3.scaleThreshold()
                .domain(this.colorDomain)
                .range(this.colorRange)
            this.initializeRecommendationSelected()
        },
        methods: {
            formatScore: function (score) {
                return d3.format('.1f')(score)
            },
            recommendationClick: function (item) {
                this.recommendationSelected[item.rank] = !this.recommendationSelected[item.rank]

                let selected = []
                let notselected = []
                this.recommendations.forEach(d => {
                    if (this.recommendationSelected[d.rank]) {
                        selected.push(d)
                    } else {
                        notselected.push(d)
                    }
                })
                this.selectedRec = selected
                this.notSelected = notselected
            },
            nothanks: function () {
                console.log('nothanks', this.targetScore)
                this.targetScore = this.targetScore - this.scoreDiff
                this.nextModule()
            },
            interested: function () {
                console.log('interested')
                let selections = 0
                this.recommendationSelected[this.recommendations[this.moduleState].rank] = true
                let selected = []
                let notselected = []
                this.recommendations.forEach(d => {
                    if (this.recommendationSelected[d.rank]) {
                        selections = selections + 1
                        selected.push(d)
                    } else {
                        notselected.push(d)
                    }
                })
                this.selectedRec = selected
                this.notSelected = notselected
                this.selectedRecommendations = selections
                console.log(this.recommendationSelected)
                this.nextModule()
            },
            nextModule: function () {
                this.moduleState = this.moduleState + 1
                if (this.state !== 3) {
                    this.changeModules = !this.changeModules
                }
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
                console.log('statestate', this.state)
                if (this.state === 4) {
                    console.log('recommendations', this.recommendations, this.selectedRecommendations)
                    this.$emit('lastStep', this.category, {
                        segment: this.category,
                        moduleName: this.pickedRecommendations
                    })
                }
            },
            initializeRecommendationSelected: function () {
                this.recommendations.forEach((d) => this.recommendationSelected[d.rank] = false)
            },
            moduleSelected: function (rec, button) {
                console.log('ccscscscscs', button)
                this.recommendationSelected[rec.rank] = !this.recommendationSelected[rec.rank]
                this.changeModules = !this.changeModules
                console.log('ccscscscscs')
            }
        }
    }
</script>

<style scoped>
    @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');

    body {
        line-height: 1.3 !important;
        color: #1d1d1f !important;
    }
    p {
        margin-bottom: 0.5rem !important;
    }
    .no-button {
        color: #9f9fa1 !important;
    }
    .no-button :hover{
        color: #3c3c3e !important;
    }
    .interested-button {
        box-sizing: border-box;
        border-radius: 4px;
    }
    .interested-button :hover{
        border: 2px solid #009FBC;
    }
    .hidden {
        display: none !important;
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
    .recommendation :hover {
        border: 1px solid #9d9d9f;
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
        max-height: 100%;
    }
    .flex {
        display: flex;
        flex-flow: row wrap;
    }
    .pageElement {
        width: 50%;
        flex-basis: 50%;
        min-height: 800px;
        height: 800px;
        max-height: 800px;
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
        max-height: 310px;
        overflow-y: auto;
    }
    .review-container {
        max-height: 265px;
        overflow-y: auto;
    }

    .module-item:last-of-type, .module-item.title-module{
        border-bottom: none !important;
    }
    .module-item {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        flex-basis: 100%;
        justify-content: center;
        text-align: center;
        border-bottom: 0.5px solid #eeeeee;
    }
    .module-item h5 {
        margin-top: 8px;
        font-weight: normal !important;
        margin-bottom: 8px;
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
