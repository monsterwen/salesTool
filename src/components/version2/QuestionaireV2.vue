<template>

    <div class="questionHolder">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
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
                <div class="proceed" :class="{ 'show': selectedIndex === questions.length}">
<!--                    <button @click="convertToCsv(output, filename)">-->
                    <button @click="proceedToResults">
                        <p class="proceedText">Submit Survey</p>
                        <i class="material-icons icon infoIcon" style="font-size: 26px;">arrow_forward</i>
                    </button>
                </div>
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
import { submitJob } from '../../assets/js/jobservice.js'
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
        questions: {
            type: Array,
            required: true
        },
        // category: {
        //     type: String,
        //     required: true
        // },
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
            // this.selectedIndex = 0
            // this.arrangeQuestions()
            this.$emit('categoryChange', this.category)
        }
    },
    data: () => {
        return {
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
            category: '',
            output: [],
            filename: '',
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
        this.category = this.questions[0].type
        this.initializeValues()
        this.arrangeQuestions()
    },
    created: function () {
        this.selectedIndex = 0
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
        proceedToResults: function () {
            // this.convertToCsv(this.output, this.filename)
            this.$emit('proceedToResults', this.questions, this.output, this.filename)
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
                        .style('transform', `translateX(0px) translateY(${translateY}px) translateZ(${translateZ}px)`)
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
            if (this.selectedIndex < this.questions.length) {
                this.category = this.questions[this.selectedIndex].type
            }
            console.log('questionSelected..', question)
            this.$emit('selection', response, index, type, module)
            this.output.push({question,response})
            console.log("output", this.output)
            if(this.selectedIndex >= this.questions.length) {
                // 1. convert to csv
                console.log("inside question select")
                this.filename = "output" + new Date().getTime()+'.txt'
                this.$emit('selection', response, index, type, module)
                this.$emit('categoryChange', 'Complete!')
            }
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
    .proceed {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 1500ms;
        margin-top: 36px;
    }
    .proceed.show {
        opacity: 1;
    }
    .proceed button {
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
        font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    .proceedText {
        padding-left: 8px;
        padding-right: 8px;
        font-weight: bold;
        font-size: 28px;
    }
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
    background: linear-gradient(to bottom, #ffffff, rgba(0, 0, 0, 0));
}
.gradientOverlay.bottom {
    bottom: 0;
    background: linear-gradient(to top, #ffffff, rgba(0, 0, 0, 0));
}
.navButtons {
    width: 12%;
    height: 96px;
    position: absolute;
    top: calc(50% - 84px);
    right: 12px;
    display: flex;
    flex-flow: column wrap;
    border-radius: 4px;
}
.navButton {
    width: 100%;
    height: 50%;
    flex-basis: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    background-color: #efefef;
}
.navButton :hover{
    background-color: #dedede;
}
.navButton.up {
    border-radius: 4px 0 0 4px;
}
.navButton.down {
    border-radius: 0 4px 4px 0;
}
.questionCarousel {
    width: min(85%, 500px);
    height: 120px;
    position: absolute;
    top: calc(50% - 96px);
    left: calc(50% -  min(42.5%, 250px));
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