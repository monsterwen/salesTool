<template>
    <div class="fastHolder">
        <div class="moduleHolder flexHolder questionHolder card" v-if="!showRecommendation">
            <div class="questionFlex questionHeader">
                <div class="questionTitle fullWidth">
                    <p class="questionCatTitle">{{ category }}</p>
                    <button class="infoButton" @click="displayTooltip">
                        <i class="material-icons icon infoIcon" style="font-size: 22px;">info_outline</i>
                    </button>
                    <div class="meter-tooltip" :class="{ 'show': showTooltip }">
                        <p>{{ tooltipText[category] }}</p>
                    </div>
                </div>
                <div class="questionProgress fullWidth">
                    <ProgressBar
                        :currentQuestion="selectedIndex + 1"
                        :numberQuestion="questions.length"
                        :stepColor="stepColor">
                    </ProgressBar>
                </div>
            </div>
            <div class="questionFlex questionContainer">
                <QuestionaireV2
                        :questions="questions"
                        @selection="questionSelected"
                        @reload="changeCategory"
                        @proceedToResults="goToResults"
                        @categoryChange="setCategory">
                </QuestionaireV2>
            </div>
        </div>
        <div id="summary-hold" class="moduleHolder flexHolder questionHolder card" v-if="showRecommendation">
            <div class="reportHolder" :class="{ 'reportFinished': summary }">
                <div class="recommendationHolder">
                    <RecommendationReportV2

                    ></RecommendationReportV2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import QuestionaireV2 from './QuestionaireV2'
    import ProgressBar from './ProgressBar'
    import RecommendationReportV2 from './RecommendationReportV2'
    export default {
        name: "FASTInterfaceV2",
        components: {
            QuestionaireV2,
            ProgressBar,
            RecommendationReportV2
        },
        data: function () {
            return {
                showRecommendation: false,
                showTooltip: false,
                questions: [
                    {
                        question: 'Do you have solid reporting  and benchmarks for how well your CRM or loyalty program is performing?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Are you confidently measuring loyalty or CRM program incrementality and ROI?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Does your organization have a robust customer segmentation that is used to direct marketing strategy (i.e., personalization, tone and media mix)?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Do you leverage customer demographics to guide your marketing efforts?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Do you routinely and thoroughly track how your program/CRM is perceived by your customers?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Are you able to predict/model which of your customers are most (and least) likely to engage in behaviors that are key for your business?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Can you identify which of your customers are at risk for leaving your brand well before they officially lapse?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Do you customize or personalize actions based on each customer\'s unique lifetime value score?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Do you have a data-driven strategy for personalizing product recommendations/offerings at the customer level?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Do you have a set of KPIs and interactive dashboards that cleanly tracks your progress toward key business objectives?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Is there a clear path for adopting new analytic tools and solutions to enable your long-term marketing vision?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Do you have a clear sense of how your program and customer experience compare to your competitive set?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Are you actively enhancing the customer journeys that are most impactful to your business?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Do you have an active idea bank of features and enhancements that will make immediate impact on your key customer segments?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Through the eyes of your customers, do you know how your communications efforts stack up against those of your competitors?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Do you have an action plan to effectively introduce a program to market and/or make impactful changes to an existing program?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Have you established a plan for future evolution & growth/enhancement of your current marketing program?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Are your customer communications fully aligned with marketing best practices in each channel?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Are you able to track and analyze emotional loyalty to your brand/program?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Are you confident your engagement and loyalty efforts incorporate best-in-class customer experiences/offerings?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Are you leveraging a test and learn plan made up of the most impactful quick campaigns to support your program & communication goals?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Have you mapped clear desired behaviors to each of your customers via a personalized marketing plan?',
                        type: 'strategy',
                        response: null
                    }
                ],
                category: '',
                selectedIndex: 0,
                tooltipText: {
                    analysis: 'analysistext',
                    strategy: 'strategytext',
                    '': null
                },
                stepColor: '#48bb00'
            }
        },
        mounted() {
        },
        methods: {
            goToResults: function () {
                this.$emit('goToResults')
                this.showRecommendation = true
            },
            questionSelected: function (d, i, y) {
                console.log('see;cted', d, i, y)
                this.stepColor = '#fe1f1a'
                if (d === 'yes') {
                    this.stepColor = '#48bb00'
                } else if (d === 'na') {
                    this.stepColor = '#ffd114'
                }
                this.selectedIndex = i + 1
            },
            setCategory: function (category) {
                console.log('cahate categort', category)
                this.category = category
            },
            displayTooltip: function () {
                this.showTooltip = !this.showTooltip
            }
        }
    }
</script>

<style scoped>
    /*@import url('https://necolas.github.io/normalize.css/8.0.1/normalize.css');*/

    @import '~normalize.css';
    p {
        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    .infoButton {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }
    .meter-tooltip p {
        margin: 6px;
        font-size: 16px !important;
    }
    .meter-tooltip {
        display: none;
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
    .meter-tooltip.show{
        display: block;
        opacity: 1;
    }
    .infoIcon {
        font-size: 22px;
        padding-bottom: 4px;
        padding-left: 4px;
    }
    .recommendationHolder {
        padding-top: 36px;
    }
    .fastHolder {
        width: 100%;
        height: 100%;
        display: flex;
        border-radius: 12px;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .moduleHolder {
        width: 100%;
        max-width: 100%;
        flex-basis: 100%;
        max-height: 100%;
    }
    .flexHolder {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
    }
    .questionFlex {
        flex-basis: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .fullWidth {
        width: 100%;
        flex-basis: 100%;
    }
    .questionHeader {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        align-content: flex-start;
        justify-content: flex-start;
        height: 94px;
        width: 100%;
        flex-basis: 100%;
        margin-top: 16px;
        margin-left: 16px;
        margin-right: 16px;

    }
    .questionCategoryHeader {
        /*height: 48px;*/
        color: #656565;
    }
    .questionCategoryHeader p {
        font-size: 0.8em;
        margin-top: 12px;
        font-weight: 200;
        margin-bottom: 0;
    }
    .questionTitle {
        /*height: 48px;*/
        color: #0b0b0b;
        display: flex;
        align-items: flex-end;
    }
    .questionTitle p {
        font-size: 1.7em;
        margin-top: 12px;
        font-weight: 600;
        margin-bottom: 0;
        margin-left: 16px;
        text-transform: capitalize;
    }
    .questionContainer {
        height: 60%;
        /*max-height: calc(100% - 48px);*/
        width: 100%;
        margin: 6px;
        border-top: 0;
        padding: 6px;
        padding-top: 0;
        transition: width 1s ease-in-out,
        height 1s ease-in-out,
        flex-basis 1s ease-in-out;
    }
</style>