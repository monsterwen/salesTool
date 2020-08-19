<template>
    <div class="fastHolder">
        <div class="moduleHolder flexHolder questionHolder card" v-if="fastState === 1">
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
        <div class="moduleHolder flexHolder questionHolder card" v-if="fastState === 2">
            <LoadingScreen></LoadingScreen>
        </div>
        <div id="summary-hold" class="moduleHolder flexHolder questionHolder card" v-if="fastState === 3">
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
    import LoadingScreen from './LoadingScreen'

    import {getAnalysis, getStrategy, submitJob} from "../../assets/js/jobservice";
    import {upload} from "../../assets/js/fileupload";
    export default {
        name: "FASTInterfaceV2",
        components: {
            QuestionaireV2,
            ProgressBar,
            RecommendationReportV2,
            LoadingScreen
        },
        data: function () {
            return {
                showRecommendation: false,
                fastState: 1,
                analysisReady: false,
                strategyReady: false,
                error: false,
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
            }
        },
        mounted() {
        },
        methods: {
            goToResults: function (questions, output, filename) {
                this.$emit('goToResults')
                this.fastState = 2
                this.convertToCsv(output, filename)
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
            },
            convertToCsv: function (output, filename) {
                // eslint-disable-next-line no-unused-vars
                const data = JSON.stringify(output)
                // parse data
                console.log('output',output)
                var parsed = ''
                var question = "Question"
                var response = "Response"
                parsed += question +','
                parsed += response
                parsed += '\n'
                for(var i=0;i<output.length;i++) {
                    parsed += output[i].question+','
                    parsed += output[i].response
                    parsed += '\n'
                }
                console.log('parsed',parsed)
                // eslint-disable-next-line no-unused-vars
                // eslint-disable-next-line no-unused-vars
                var blob = new Blob([parsed], {
                    type: "text/plain;charset=utf-8"
                });
                this.uploadfile(blob,filename)
            },
            uploadfile: function (blob, filename) {
                const formData = new FormData()
                formData.append('file', blob, filename)
                console.log('formDataUpload', formData)
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
            submit: function (fileName) {
                var jobObj = {
                    'app': "sales",
                    'jobId': fileName,
                    'delimiter': ",",
                    'fileLocation': 'hdfs:///user/admin/' + fileName,

                }
                submitJob(jobObj)
                    .catch(err => {
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
                                id: 'bpt',
                                sub: 'This module will allow you to:',
                                capabilities: [
                                    analysisoutput[i].So_You
                                ],
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
                                id: 'bpt',
                                sub: 'This module will allow you to:',
                                capabilities: [
                                    strategyoutput[i].So_You
                                ],
                                description: 'Establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                            }
                            temprecom.push(tempjson)
                        }
                        this.strategyrecom = temprecom
                        this.strategyReady = true

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