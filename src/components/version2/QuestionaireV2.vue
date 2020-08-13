<template>

    <div class="questionHolder">
        <div class="questionCarousel" :key="category">
            <div class="questionContainer actualQuestion"
                 v-for="(question, i) in questions"
                 :key="`${category}${i}`">
                <QuestionCardV2
                    :question="question"
                    :inactive="selectedIndex !== i"
                    :index="i"
                    @selection="questionSelected"
                    @inactiveClick="selectedIndex = i"
                ></QuestionCardV2>
            </div>
            <div class="questionContainer" style="background-color: rgba(0,0,0,0)">
            </div>
        </div>
        <div class="gradientOverlay top"></div>
        <div class="gradientOverlay bottom"></div>
    </div>
</template>

<script>
import * as d3 from 'd3'
import QuestionCardV2 from './QuestionCardV2'
// const JSONToCSV = require("json2csv").parse
// const FileSystem = require("fs")
import { upload } from '../../assets/js/fileupload'
import {submitJob} from '../../assets/js/jobservice.js'
// eslint-disable-next-line no-unused-vars
import saveAs from 'file-saver'

export default {
    name: 'QuestionaireV2',
    components: {
        QuestionCardV2
    },
    modules: {
        QuestionCardV2
    },
    props: {
        // questions: {
        //     type: Array,
        //     required: true
        // },
        category: {
            type: String,
            required: true
        },
        margin: {
            type: Object,
            default: () => ({
                top: 12,
                left: 12,
                bottom: 12,
                right: 12
            })
        }
    },
    watch: {
        category: function () {
            console.log('=======questions', this.category, this.questions)
            // this.initializeValues()
            this.selectedIndex = 0
            // this.arrangeQuestions()
        },
    // selectedIndex: function () {
    //     // this.initializeValues()
    //     console.log('selectedINdex', this.selectedIndex)
    //     this.arrangeQuestions()
    // }
    },
    data: () => {
        return {
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
            responses: {
                'analysis': {
                    'yes': 0,
                    'no': 0,
                    'na': 0
                },
                'insight': {
                    'yes': 0,
                    'no': 0,
                    'na': 0
                },
                'strategy': {
                    'yes': 0,
                    'no': 0,
                    'na': 0
                },
                'tes': {
                    'yes': 0,
                    'no': 0,
                    'na': 0
                },
                'custexp': {
                    'yes': 0,
                    'no': 0,
                    'na': 0
                },
            },
            output: [],
            scores: {
            analysis: 0,
            insight: 0,
            strategy: 0,
            tes: 0,
            custexp: 0
            },
            selectedIndex: 0,
            // dimensions
            width: 0,
            height: 0,
            //
            questionNum: 0,
            questionTotals: {},
            //
            div: null,
            questionCarousel: null,
            questionCards: null
        }
    },
    updated: function () {
        this.initializeValues()
        this.arrangeQuestions()
    },
    mounted: function () {
    // let selectedIndex = this.selectedIndex
    // let questionCards = questionCarousel
    //     .selectAll('.questionContainer')
    // let questionNumber = questionCards.size()
    // let dimensions = questionCards.node().getBoundingClientRect()
    // let width = dimensions.width
    // let height = dimensions.height

    // console.log('height', width, height)
        this.initializeValues()
        this.arrangeQuestions()
    },
    methods: {
        initializeValues: function () {
            let questions = this.questions
            let questionNum = questions.length

            let div = d3.select('.questionHolder')

            let questionCarousel = div
                .select('.questionCarousel')

            let dimensions = questionCarousel
                .node()
                .getBoundingClientRect()

            let width = dimensions.width
            let height = dimensions.height

            let questionCards = questionCarousel
                .selectAll('.questionContainer')

            console.log('questionCards', questionCards)
            this.width = width
            this.height = height

            this.div = div
            this.questionCarousel = questionCarousel
            this.questionCards = questionCards

            this.questionNum = questionNum
        },
        arrangeQuestions: function () {
            console.log('arrangeQuestions', this.category)
            // let div = this.div
            let selectedIndex = this.selectedIndex
            // let questionCarousel = this.questionCarousel
            let questionCards = this.questionCards
            console.log('arrangeQuestions', this.category, questionCards, selectedIndex)

            let margin = this.margin
            // let width = this.width
            let height = this.height

            let translateY = 0
            let translateZ = 0
            questionCards
                .each(function (d, i) {
                    let distance = i - selectedIndex
                    translateY = (margin.top + height) * distance
                    translateZ = Math.abs(distance) * (0 - 84)
                    d3.select(this)
                        .style('transform', `translateY(${translateY}px) translateZ(${translateZ}px)`)
                    d3.select(this)
                        .classed('moved', true)
                })
            if (selectedIndex === this.questions.length) {
                this.resetCarosel()
            }
        },
        resetCarosel: function () {
            // this.questionCards
            //     .each(function () {
            //         d3.select(this)
            //             .style('transform', `translateY(0px) translateZ(0px)`)
            //     })
            // // this.questionCards.remove()
            // this.questionCarousel.selectAll('.actualQuestion').remove()
            this.$emit('reload', this.category)
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
        questionSelected: function (response, index, type, module,question) {
            this.selectedIndex = this.selectedIndex + 1
            console.log('questionSelected..', question)
            this.$emit('selection', response, index, type, module)
            this.output.push({question,response})
            console.log("output", this.output)
            if(module == "CX/MX Journey Mapping" && index == 5) {
                // 1. convert to csv
                console.log("inside question select")
                var filename = "output" + new Date().getTime()+'.txt'
                this.$emit('selection', response, index, type, module)
                this.convertToCsv(this.output, filename)
            }
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
                    var timer = setInterval(() => {
                        this.$emit('getrecom',fileName,timer)
                    }, 10000);
                    //this.$emit('getrecom',fileName)
                    console.log(response)
                })
        }
    }
}
</script>

<style scoped>
.questionHolder {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
    perspective: 1000px;
    background-color: #fff;
}
.gradientOverlay {
    position: absolute;
    left: 0;
    height: 24px;
    width: 100%;
}
.gradientOverlay.top {
    top: 0;
    background: linear-gradient(top, #ffffff, rgba(0, 0, 0, 0));
}
.gradientOverlay.bottom {
    bottom: 0;
    background: linear-gradient(bottom, #ffffff, rgba(0, 0, 0, 0));
}
.questionCarousel {
    width: max(75%, 400px);
    height: 120px;
    position: absolute;
    top: calc(50% - 96px);
    left: calc(50% -  max(37.5%, 200px));
    /*transform: translateZ(-288px);*/
    transform-style: preserve-3d;
    transition: transform .3s;
}
.questionContainer {
     position: absolute;
     width: calc(100% - 24px);
     min-height: 96px;
     left: 12px;
     top: 12px;
     /*border: 2px solid black;*/
     /*background-color: #CDCDCD;*/
     text-align: center;
     transition: transform .3s, opacity 1s;
 }
/*.questionContainer:nth-child(9n+1) { transform: rotateX(  0deg) translateZ(288px); }*/
/*.questionContainer:nth-child(9n+2) { transform: rotateX( 40deg) translateZ(288px); }*/
/*.questionContainer:nth-child(9n+3) { transform: rotateX( 80deg) translateZ(288px); }*/
/*.questionContainer:nth-child(9n+4) { transform: rotateX(120deg) translateZ(288px); }*/
/*.questionContainer:nth-child(9n+5) { transform: rotateX(160deg) translateZ(288px); }*/
/*.questionContainer:nth-child(9n+6) { transform: rotateX(200deg) translateZ(288px); }*/
/*.questionContainer:nth-child(9n+7) { transform: rotateX(240deg) translateZ(288px); }*/
/*.questionContainer:nth-child(9n+8) { transform: rotateX(280deg) translateZ(288px); }*/
/*.questionContainer:nth-child(9n+9) { transform: rotateX(320deg) translateZ(288px); }*/
/*.questionContainer:nth-child(9n+1) { transform: translateY( 0px) translateZ(0px);}*/
/*.questionContainer:nth-child(9n+2) { transform: translateY( 230px) }*/
/*.questionContainer:nth-child(9n+3) { transform: translateY( 230px) }*/
/*.questionContainer:nth-child(9n+4) { transform: translateY( 230px) }*/
/*.questionContainer:nth-child(9n+5) { transform: translateY( 230px) }*/
/*.questionContainer:nth-child(9n+6) { transform: translateY( 230px) }*/
/*.questionContainer:nth-child(9n+7) { transform: translateY( 230px) }*/
/*.questionContainer:nth-child(9n+8) { transform: translateY( 230px) }*/
/*.questionContainer:nth-child(9n+9) { transform: translateY( 230px) }*/
</style>