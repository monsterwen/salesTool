<template>
    <div class="fastHolder">
        <div class="moduleHolder flexHolder questionHolder card" v-if="fastState === 1">
            <div class="questionFlex questionHeader">
                <div class="questionTitle fullWidth">
                    <p class="questionCatTitle">{{ category }}</p>
<!--                    <button class="infoButton" @click="displayTooltip">-->
<!--                        <i class="material-icons icon infoIcon" style="font-size: 22px;">info_outline</i>-->
<!--                    </button>-->
<!--                    <div class="meter-tooltip" :class="{ 'show': showTooltip }">-->
<!--                        <p>{{ tooltipText[category] }}</p>-->
<!--                    </div>-->
                </div>
                <div class="questionProgress fullWidth">
                    <ProgressBar
                        :currentQuestion="selectedIndex + 1"
                        :numberQuestion="questions.length"
                        :of-text="ofText"
                        :stepColor="stepColor">
                    </ProgressBar>
                </div>
            </div>
            <div class="questionFlex questionContainer">
                <QuestionaireV2
                    :questions="questions"
                    :language="language"
                    @selection="questionSelected"
                    @reload="changeCategory"
                    @proceedToResults="goToResults"
                    @categoryChange="setCategory">
                </QuestionaireV2>
            </div>
        </div>
        <div class="moduleHolder flexHolder questionHolder card" v-if="fastState === 2">
            <LoadingScreen></LoadingScreen>
        </div>
        <div id="report-hold" class="moduleHolder flexHolder questionHolder card" v-if="fastState === 3">
            <div class="reportHolder" :key="reportState">
                <div class="recommendationHolder"
                     v-if="reportState === 'analytics'">
                                <ResultPageV2
                                    :current-text="currentText"
                                    :target-text="targetText"
                                    :potential-text="potentialText"
                                    :category="analysisLabel"
                                    :chartId="'analyticsChart'"
                                    :currentPrescription="analysisCurrPrescription"
                                    :recommendations="recommendations.analytics"
                                    :currentScore="scores.analytics.current"
                                    :targetScore="5"
                                    :language="language"
                                    :prescriptionHeader="analysisPrescHeader"
                                    :prescriptionSubHeader="analysisPrescSubHeader"
                                    :targetHeader="analysisTargetHead"
                                    :buttonState="analyticButtons"
                                    :currentDescription="analysisCurrDesc"
                                    :prescription-title="analysisTitle"
                                    :scoreDescription="analyticScoreDesc"
                                    :no-thanks="noThanks"
                                    :interestedText="interested"
                                    @lastStep="lastStep">
                                </ResultPageV2>
                </div>
                <div class="recommendationHolder"
                     v-else>
                                <ResultPageV2
                                    :current-text="currentText"
                                    :target-text="targetText"
                                    :potential-text="potentialText"
                                    :category="strategyLabel"
                                    :chartId="'strategyChart'"
                                    :currentPrescription="strategyCurrPrescription"
                                    :recommendations="recommendations.strategy"
                                    :currentScore="scores.strategy.current"
                                    :targetScore="5"
                                    :language="language"
                                    :prescriptionHeader="strategyPrescHeader"
                                    :prescriptionSubHeader="strategyPrescSubHeader"
                                    :targetHeader="strategyTargetHead"
                                    :buttonState="strategyButtons"
                                    :currentDescription="strategyCurrDesc"
                                    :prescription-title="strategyTitle"
                                    :scoreDescription="strategyScoreDesc"
                                    :no-thanks="noThanks"
                                    :interestedText="interested"
                                    @lastStep="lastStep">
                                </ResultPageV2>
                </div>
            </div>
        </div>
        <div id="summary-hold" class="moduleHolder flexHolder questionHolder card" v-if="fastState === 4">
            <div class="reportHolder">
                <div class="recommendationHolder">
                    <all-done
                        :language="language"
                    ></all-done>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import QuestionaireV2 from './QuestionaireV2'
    import ProgressBar from './ProgressBar'
    // import ReportPage from '../bitComponents/ReportPage'
    // import RecommendationReportV2 from './RecommendationReportV2'
    import LoadingScreen from './LoadingScreen'
    import ResultPageV2 from './ResultPageV2'
    import AllDone from "./AllDone";
    import { getAnalysis, getStrategy, submitJob, salesEmail } from '../../assets/js/jobservice'
    import { upload } from '../../assets/js/fileupload'
    import { getScores, getRecommendations } from '../../assets/js/scoreCalculator'
    import { surveyQuestions,
        analyticsScoreDesription,
        analyticButtons,
        analysisCurrentScoreDescription,
        analysisPrescriptionHeader,
        analysisPrescriptionSubHeader,
        analysisTargetHeader,
        strategyScoreDescriptions,
        stratButtons,
        strategyCurrentScoreDescription,
        strategyPrescriptionHeader,
        strategyPrescriptionSubHeader,
        strategyTargetHeader,
        analysisTitle,
        strategyTitle,
        analysisText,
        strategyText,
        analysisCurrentPrescription,
        strategyCurrentPrescription,
        recommendationsObject,
        interested,
        noThanks,
        targetText,
        currentText,
        potentialText,
        ofText
    } from '../../copy/copy'

    export default {
        name: "FASTInterfaceV2",
        components: {
            ResultPageV2,
            AllDone,
            // ReportPage,
            QuestionaireV2,
            ProgressBar,
            // RecommendationReportV2,
            LoadingScreen
        },
        props: {
            jobKey: {
                type: String,
                default: () => Math.random() + ''
            },
            language: {
                type: String,
                default: () => 'en'
            }
        },
        data: function () {
            return {
                showRecommendation: false,
                fastState: 1,
                analysisReady: false,
                strategyReady: false,
                analysisrecom: [],
                strategyrecom: [],
                error: false,
                reportState: 'analytics',
                showTooltip: false,
                scores: {},
                // strategyScoreDesc: {
                //     none: 'While you may not have immediate interest in any of the modules we recommended, Brierley is  here to provide analytics, strategic thinking and staff augmentation.',
                //     less: 'These are great solutions to help address some of your most immediate opportunities. We would love to discuss these with you.',
                //     more: 'There are plenty of solutions that we can put to work for you quickly. We would love to discuss options for an action plan with you.',
                //     all: 'Great choices! We would love to help tailor an action plan to your needs and look forward to discussing these with you'
                // },
                // analyticButtons: {
                //     1: 'Select From Recommended Modules',
                //     2: 'Proceed with selected modules',
                //     3: 'Continue to Strategy Review'
                // },
                // strategyButtons: {
                //     1: 'Select From Recommended Modules',
                //     2: 'Proceed with selected modules',
                //     3: 'Complete Your Survey'
                // },
                // analysisCurrDesc: {
                //     basic: 'You’ve got an exciting journey ahead. Expand your analytical toolkit to further uncover actionable insights.',
                //     emerging: 'You’ve got the fundamentals of marketing analytics down. Now take your  capabilities to the next level.',
                //     sophisicated: 'Your analytics capabilities are impressive. Here’s how you can further augment your marketing practice.',
                //     perfect: 'You Rock! You are clearly part of a data-driven marketing organization. There may be areas where we can augment or help out'
                // },
                // strategyCurrDesc: {
                //     basic: 'The opportunities are endless! Increase your strategic planning to optimize your marketing efforts.',
                //     emerging: 'You clearly have solid strategic chops. Level up your efforts with a little help from us.',
                //     sophisicated: 'Your strategic acumen is impressive. Here are a few places to bolster your efforts.',
                //     perfect: 'You’re a strategy stud! You know better than most that there’s always room for new POVs. Check out how we can help evolve your practice.'
                // },
                questions: [],
                category: '',
                selectedIndex: 0,
                tooltipText: {
                    analysis: 'analysistext',
                    strategy: 'strategytext',
                    '': null
                },
                stepColor: '#48bb00',
                recommendations: {},
                salesToolResult: []
            }
        },
        watch: {
            analysisReady: function () {
                if (this.analysisReady && this.strategyReady) {
                    this.fastState = 3
                }
            },
            strategyReady: function () {
                if (this.analysisReady && this.strategyReady) {
                    this.fastState = 3
                }
            },
            reportState: function () {
                console.log('report state', this.reportState)
            },
            language: function () {
                this.questions = this.surveyQuestions[this.language]
            }
        },
        computed: {
            ofText: function () {
                return ofText[this.language]
            },
            currentText: function () {
                return currentText[this.language]
            },
            targetText: function () {
                return targetText[this.language]
            },
            potentialText: function () {
                return potentialText[this.language]
            },
            noThanks: function () {
                return noThanks[this.language]
            },
            interested: function () {
                return interested[this.language]
            },
            salesObject: function () {
                return {
                    'jobKey': this.jobKey,
                    'salesToolResult': this.salesToolResult
                }
            },
            analyticScoreDesc: function () {
                return analyticsScoreDesription[this.language]
            },
            strategyScoreDesc: function () {
                return strategyScoreDescriptions[this.language]
            },
            analyticButtons: function () {
                return analyticButtons[this.language]
            },
            strategyButtons: function () {
                return stratButtons[this.language]
            },
            analysisTitle: function () {
                return analysisTitle[this.language]
            },
            strategyTitle: function () {
                return strategyTitle[this.language]
            },
            analysisCurrDesc: function () {
                return analysisCurrentScoreDescription[this.language]
            },
            strategyCurrDesc: function () {
                return strategyCurrentScoreDescription[this.language]
            },
            analysisPrescHeader: function () {
                return analysisPrescriptionHeader[this.language]
            },
            strategyPrescHeader: function () {
                return strategyPrescriptionHeader[this.language]
            },
            analysisPrescSubHeader: function () {
                return analysisPrescriptionSubHeader[this.language]
            },
            strategyPrescSubHeader: function () {
                return strategyPrescriptionSubHeader[this.language]
            },
            analysisTargetHead: function () {
                return analysisTargetHeader[this.language]
            },
            strategyTargetHead: function () {
                return strategyTargetHeader[this.language]
            },
            analysisCurrPrescription: function () {
                return analysisCurrentPrescription[this.language]
            },
            strategyCurrPrescription: function () {
                return strategyCurrentPrescription[this.language]
            },
            analysisLabel: function () {
                return analysisText[this.language]
            },
            strategyLabel: function () {
                return strategyText[this.language]
            },
            recData: function () {
                return recommendationsObject[this.language]
            }
        },
        mounted() {
            this.questions = [...surveyQuestions[this.language]]
        },
        methods: {
            goToResults: function (questions, output, filename) {
                this.$emit('goToResults')
                this.fastState = 2
                this.recommendations = getRecommendations(questions, this.recData)
                this.scores = getScores(questions)
                this.analysisReady = true
                this.strategyReady = true
                // this.convertToCsv(output, filename)
                console.log('filename', filename)
                this.showRecommendation = true
            },
            lastStep: function (category, obj) {
                console.log('go th', category)
                this.salesToolResult.push(obj)
                if (category === 'Analytics' || category === 'Analítica') {
                    this.reportState = 'strategy'
                } else {
                    this.fastState = 4
                    console.log('salesobject', this.salesObject)
                    salesEmail(this.salesObject)
                        .catch(err => {
                            alert('There was an error uploading the file.  Please try again.' + err.message.toString())
                        })
                        .then((response) => {
                            console.log('SALESOBJECT')
                            console.log(response)
                        })
                }
            },
            questionSelected: function (d, i, y) {
                console.log('see;cted', d, i, y)
                this.stepColor = '#fe1f1a'
                if (d === 'Yes') {
                    this.stepColor = '#48bb00'
                } else if (d === 'N/A') {
                    this.stepColor = '#ffd114'
                }
                this.questions[i].response = d
                this.selectedIndex = i + 1
            },
            setCategory: function (category) {
                console.log('cahate categort', category)
                this.category = category
            },
            displayTooltip: function () {
                this.goToResults(this.questions)
                this.showTooltip = !this.showTooltip
            },
            convertToCsv: function (output, filename) {
                // eslint-disable-next-line no-unused-vars
                const data = JSON.stringify(output)
                // parse data
                console.log('output',output)
                this.submit(filename, data)
            },
            uploadfile: function (blob, filename) {
                const formData = new FormData()
                formData.append('file', blob, filename)
                upload(formData)
                    .catch(err => {
                        alert('There was an error uploading the file.  Please try again.' + err.message.toString())
                    })
                    .then((response) => {
                        console.log('successfully uploaded file to HDFS')
                        console.log(response)
                        this.submit(filename)
                    })
            },
            submit: function (fileName, data) {
                console.log('subimiitteting', fileName, data)
                var jobObj = {
                    'app': "sales",
                    'jobId': fileName,
                    'delimiter': ",",
                    'fileLocation': data,

                }
                submitJob(jobObj)
                    .catch(err => {
                        console.log('error job submit', err)
                        alert('Problem submitting job to server.  ' + err.message.toString())
                    })
                    .then((response) => {
                        // alert('Form Submitted!')
                        // wait 30 sec
                        console.log('submitJob', response)
                        var timer = setInterval(() => {
                            // this.$emit('getrecom',fileName,timer)
                            this.updaterecom(fileName, timer)
                        }, 10000);
                        //this.$emit('getrecom',fileName)
                        console.log(response)
                    })
            },
            updaterecom: function(jobid,timerid) {
                // call apis
                // getAnalysis(jobid)
                getAnalysis(jobid)
                    // eslint-disable-next-line no-unused-vars
                    .catch(err => {
                        console.log(err)
                        this.error = true
                        // alert('Could not get User BALOR Job History results. ' + err.message.toString())
                    })
                    .then((response) => {
                        console.log('response', response)
                        let analysisoutput = response.data.data.SalesToolResult[0].recommendation
                        console.log('analysisoutput', analysisoutput)

                        let temprecom = []
                        for(let i=0;i<analysisoutput.length;i++) {
                            let tempjson = {
                                name: analysisoutput[i].Module,
                                rank: analysisoutput[i].rank,
                                sub: 'This module will allow you to:',
                                soyou: analysisoutput[i].So_You,
                                description: 'Establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                            }
                            temprecom.push(tempjson)
                        }
                        this.analysisrecom = temprecom
                        console.log('analysisraw', this.analysisrecom)
                        clearInterval(timerid)
                        this.analysisReady = true

                        //     {
                        //         name: 'Brand & Programme Tracker',
                        //         id: 'bpt',
                        //         sub: 'This module will allow you to:',
                        //         capabilities: [
                        //             'Improve and optimise key journeys',
                        //             'Adapt the programme to improve long term member satisfaction'
                        //         ],
                        //         description: 'Establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                        //     },
                    })
                //let insightsraw = getInsights(jobid)
                // let strategyraw = getStrategy(jobid)
                getStrategy(jobid)
                    // eslint-disable-next-line no-unused-vars
                    .catch(err => {
                        console.log(err)
                        // alert('Could not get User BALOR Job History results. ' + err.message.toString())
                    })
                    .then((response) => {
                        let strategyoutput = response.data.data.SalesToolResult[0].recommendation
                        console.log('strategyoutput', strategyoutput)

                        let temprecom = []
                        for(let i=0;i<strategyoutput.length;i++) {
                            let tempjson = {
                                name: strategyoutput[i].Module,
                                rank: strategyoutput[i].rank,
                                sub: 'This module will allow you to:',
                                soyou: strategyoutput[i].So_You,
                                description: 'Establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                            }
                            temprecom.push(tempjson)
                        }
                        this.strategyrecom = temprecom
                        this.strategyReady = true
                        console.log('this.trategyrecom', this.strategyrecom)
                        //     {
                        //         name: 'Brand & Programme Tracker',
                        //         id: 'bpt',
                        //         sub: 'This module will allow you to:',
                        //         capabilities: [
                        //             'Improve and optimise key journeys',
                        //             'Adapt the programme to improve long term member satisfaction'
                        //         ],
                        //         description: 'Establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                        //     },
                    })
                // parse raw data
            },
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
        min-height: 700px;
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
        min-height: 100%;
    }
    .reportHolder {
        min-height: 100%;
        width: 100%;
        flex-basis: 100%;
        /*padding: 24px;*/
        position: relative;
        overflow: hidden;
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
        color: #1d1d1f;
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
