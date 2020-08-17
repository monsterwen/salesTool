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
                        question: 'Is there room to improve understanding and tracking of program KPIs pinpointing where customer value lies?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Would increased visibility of program components driving positive ROI and incrementatility inform program development?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Would improved application of actionable customer behaviours and metrics better enable personalised communication planning?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Could the incorporation of external customer data for comparison and indexing purposes optimise your communication planning?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Would an elevated understanding of brand experience and program perception present the means to enhance and develop customer satisfaction, loyalty and LTV initiatives?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Could an ability to better predict customer action or purchasing behaviour be more effectively used for targeting purposes?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Would the means to identify the at-risk customer and influence their retention address a gap in your lifecycle marketing strategy?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Is there opportunity to better understand and then customise or personalise actions based on customers\' unique LTV?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Could improvement in the identification of products creating brand stickiness and retention be better leveraged to craft personalised offerings?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Does opportunity exist to better compare program metrics against other benchmarks and translate them into more usable dashboards for operational and executive purposes?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Is there scope to improve the role of analytics and accompanying tools in informing strategic marketing, CX and overall growth?',
                        type: 'analysis',
                        response: null
                    }, {
                        question: 'Would evaluation of current program features and experience against your competitors help to define bare minimum expectations and identify opportunities for differentiation?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Would detailed deconstruction and review of key customer journeys better detail relevance to business goals and surface key moments of interest and interactions to develop relevant customer dialogue?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Would identification of the most relevant program features and benefits at individual level and their operationalization be considered necessary to ensure program innovation?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Could understanding of how customers feel about the effectiveness of your communications and the value they derive from your loyalty endeavours be better considered and applied?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Would defining strategic program milestones to get the program to market, KPIs to measure achievement and the tools for staff to support roll-out better position the business for success?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Does the opportunity for establishing a plan for future program evolution and enhancement have a major role to play?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Would improved visibility of how customer communications are calibrated with channel best practices and the comparision of resulting engagement metrics against key benchmarks improve planning?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Does distinguishing brand loyalty from program loyalty and the ability to influence customer rational and emotional needs present an opportunity to elevate your program above the competition?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Would the evaluation of your program design and its structure serve to inform positive enhancement as it relates to the immediate competition?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Would a defined test and learn approach for new program features coupled to an understanding of those with most impact help elevate the approach to how they are activated 1:1?',
                        type: 'strategy',
                        response: null
                    }, {
                        question: 'Could data driven observations be better used to trigger more personalised communications and develop an individualised marketing pathway for each customer?',
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
            goToResults: function (questions) {
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
        height: auto;
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