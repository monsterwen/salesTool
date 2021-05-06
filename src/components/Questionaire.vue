<template>

    <div class="questionHolder">
        <div class="questionCarousel" :key="category">
            <div class="questionContainer actualQuestion"
                 v-for="(question, i) in questions"
                 :key="`${category}${i}`">
                <QuestionCard
                    :question="question"
                    :inactive="selectedIndex !== i"
                    :index="i"
                    @selection="questionSelected"
                    @inactiveClick="selectedIndex = i"
                ></QuestionCard>
            </div>
            <div class="questionContainer" style="background-color: rgba(0,0,0,0)">
            </div>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3'
import QuestionCard from './QuestionCard'
// const JSONToCSV = require("json2csv").parse
// const FileSystem = require("fs")
import {upload} from '../assets/js/fileupload.js'
import {submitJob} from '../assets/js/jobservice.js'
// eslint-disable-next-line no-unused-vars
import saveAs from 'file-saver'

export default {
name: 'Questionaire',
components: {QuestionCard},
modules: {
QuestionCard
},
props: {
questions: {
type: Array,
required: true
},
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
// questions: [
//     {
//         question: 'Do you track loyalty and CRM program KPIs and benchmarks?',
//         type: 'analysis',
//         response: null
//     }, {
//         question: 'Can you identify overt and latent customer traits? ',
//         type: 'analysis',
//         response: null
//     }, {
//         question: 'Can you determine what your customers like and dislike about your brand experience?',
//         type: 'analysis',
//         response: null
//     }, {
//         question: 'Can you easily identify and change programme components to increase customer satisfaction, loyalty and LTV?',
//         type: 'analysis',
//         response: null
//     }, {
//         question: 'Are the drivers of negative customer value tracked and such behavioural insights actioned with tactical communications?',
//         type: 'analysis',
//         response: null
//     }, {
//         question: 'Do you have an effective solution for identifying products that create brand stickiness and retention?',
//         type: 'analysis',
//         response: null
//     }, {
//         question: 'Do you have a robust model for informing product bundling or merchandising decisions',
//         type: 'analysis',
//         response: null
//     }, {
//         question: 'Are you accurately reporting on CRM programme health or marketing efforts?',
//         type: 'analysis',
//         response: null
//     }, {
//         question: 'Are you focused on the most actionable sets of KPIs for the business?',
//         type: 'analysis',
//         response: null
//     }, {
//         question: 'Do you have a set of reliable benchmarks to contextualise performance?',
//         type: 'analysis',
//         response: null
//     }, {
//         question: 'Have you built executive dashboards to cleanly track achievement of key business objectives?',
//         type: 'analysis',
//         response: null
//     }, {
//         question: 'Is analytics effectively leveraged to improve marketing outcomes and CX?',
//         type: 'analysis',
//         response: null
//     }, {
//         question: 'Do you have an effective analytic toolkit informing targeting efforts and the strategic marketing plan?',
//         type: 'analysis',
//         response: null
//     }, {
//         question: 'Is there a roadmap allowing for future adoption of new analytic tools and solutions to enable a larger marketing growth plan?',
//         type: 'analysis',
//         response: null
//     }, {
//         question: 'Do you have visibility and insight on programme effectiveness and scope for improvement?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Can you identify top performing customers and factors driving their retention?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Have you identified customer LTV and key moments of interest where value can be optimised?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Do you know how much incremental revenue your loyalty or CRM programmes are driving?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Do you know the cost of your current solution and its corresponding ROI?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Do you know which customer segments and activities drive greatest uplift in engagement and profitability?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Is your customer audience grouped into actionable segments?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Are one to one tactics personalised in tone and aligned with channel preferences?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Are product preferences and channel responsiveness mapped at individual level?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Do you know what your best customers look like and is this insight leveraged to optimise communications?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Is communication relevance optimised  by an understanding of how customer traits over or under index',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Can distinct product and service appeal be mapped to different customer types?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Do you know how your CRM or loyalty programme is perceived by your customers and what they like most?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Are you able to predict which customers are most likely to engage in behaviour favourable to business growth?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Do you know how to better tailor messages and personalise messages to drive ROI uplift?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Do you know what traits and attributes are presented by customers for certain purchases behaviours v other customers?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Can you easily action insights from purchase behaviour?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Are you able to identify at-risk customers before official lapse?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Taking into account varied transactional cadences of different persons with different need states can you identify churn risk?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Do you know what churn inoculation tactics work best for the business?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Do you know what each customer is worth to you?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Is your 1:1 marketing budget allocated to maximise future returns and lifetime value to the business?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Do you personalise content through highly relevant product recommendations?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Are products that drive brand retention and stickiness mapped in order of salience to customers?',
//         type: 'insight',
//         response: null
//     }, {
//         question: 'Can you evaluate how your CX compares with that of your competitors?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Can you pinpoint the programme features that are considered table stakes in your market?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Do you know what programme elements differentiate your programme from competitors?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Do you know what the customer journeys most relevant to your business are?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Do you know what the key moments of interest across the customer journey are(pain points, gaps, positive inflection points)?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Do you know what enhancements are required to best optimise and impact the customer journey?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Can you easily identify the programme features and benefits that appeal to each customer persona?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Can you easily identify what programme enhancements are required to make the most immediate impact?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Do customers feel communications are effective, timely and relevant?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Do customers feel they are deriving value form your CRM and / or loyalty endeavours?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Do you know how your customers perceive your marketing endeavours compared to those of your competitors?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Have you established strategic milestones to get your programmes to market?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Are key metrics informing the success of the loyalty launch?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Do customer facing employees have the critical information needed to support effective programme launch?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Has the necessary effort been taken to package up programme information and train customer facing staff?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Have enhancements been planned to refresh and evolve loyalty and CRM programmes?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Has the frequency of new features and functionality been decided?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Is there a phased plan reflecting the introduction of new features and functionality?',
//         type: 'strategy',
//         response: null
//     },
//     {
//         question: 'Do your customer communications follow marketing best practices (SUCH AS? - CLARIFY)?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Do you know how your engagement metrics (SUCH AS?) compare to best in class benchmarks?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Can you identify customer programme loyalty as well as brand loyalty?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Are you able to benchmark programme loyalty against other brands in your competitive space?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Do you know the areas you are over or under indexing in respect of emotional loyalty metrics?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Does the current programme structure incorporate best in class design principles?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Do you know how the existing programme\'s structure compares to best in class programmes?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Do you know what enhancements are required to achieve immediate and positive impact?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Are you looking at initiatives to test new features and develop 1:1 programme performance?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Do you feel there are campaign gaps that could be filled to drive uplift in topline results?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Do you know what enhancements are required to best optimise and impact the customer journey?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Can you easily identify the programme features and benefits that appeal to each customer persona?',
//         type: 'strategy',
//         response: null
//     }, {
//         question: 'Do you have centralised oversight and control of API users?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Do you have the ability to add, update, retrieve, and delete',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Does the facility exist to easily add, update, and retrieve member records?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Can you review and easily access member point balance, status and tier details?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Do you have the capability to merge and unify member details?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Do you have the capability to identify and pull all information pertinent to DSAR?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Can your system support Right to be Forgotten / erasure requests from data subjects?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Can your platform manage, log and store consent and permission status detail in order to maintain the essential audit trail ?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Is the adding purchases for point accrual effectively supported?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Can you distinguish transactional from non-transactional engagement?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Is the retrieval of a member’s point history a standard feature?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Request credit for purchases  - TBC: what question needs to be asked?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Does functionality exist for the storage and retrieval of the rewards the catalogue?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Redeeming your points for rewards - Does facility exist to effectively and accurately process rewards redemption?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Retrieving a member’s rewards - Can you easily access and audit member reward history?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Setting your reward choice - Is it possible to set and allocate customer reward choices and options?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Enrolling into and retrieving promotions - Is customer promotional enrolment effectively supported?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Communications centre” through web /app - Can customer messages be pushed through a web or app based communications centre?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Retrieving or deleting a member’s messages - Is the management and storage of member messages supported (retrieval / deletion)?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Marking messages as read or unread - Can the system administer key messages status such as read or unread?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Retrieving all available coupons - Is a universal view of coupon availability available to programme administrators?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Retrieving all of a member’s available coupons - Can coupon qualification and availability be retrieved at individual member level?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Redeeming coupons - Is the redemption of coupons accurately tracked and stored at platform level?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Retrieve a list of stores or favourite stores - Can outlet groups be created and prioritised in the context of programme objectives?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Mark a favourite store - Is it possible to define store favourites?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Apple Wallet or Android Pay - Is Apple Wallet or Android Pay integrated with the platform?',
//         type: 'tes',
//         response: null
//     }, {
//         question: 'Do customer preferences lead content and communication distribution - bespoke content and channel planning?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Is the programme\'s direct communicaitons strategy defined by a mobile first approach?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Have you integrated your programmes with key social channels?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Have you developed an app based or mobile solution that integrates and supports the core customer programme?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Is AI employed to optimise loyalty and CRM programme experience (eg chatbots, campaign automation)?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Do you leverage customer effort metrics when developing loyalty platforms, tools and materials?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Are you employing the use of personalised dynamic content to enrich digital communication relevance?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Is website behaviour  / contextual data leveraged to enrich loyalty programme communications?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Has the business developed a SCV to drive better brand interactions?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Are real time trigger communications employed to optimise the customer journey at key touchpoints?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Are opportunities to generate new members always maximised across key customer touchpoints (e.g. in store, direct mail, SMS, face-to-face, call centre)',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Is customer advocacy being easily enabled and encouraged?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Does the business observe, track and address gaps in the customer experience?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Do your customers enjoy a consistent experience when they engage with the brand?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Is gamification employed to make engagement with the brand more fun?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Does the business employ \'signature actions\' that differentiate the brand from the competition and make your experience unique?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Does the organisation ensure that a holistic experience is delivered by ensuring both front line and back office staff have roles to play?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Have you conducted primary research to really understand and leverage the values and ideals of your customers?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Do you know how your customers want to feel as a result of their experience with your brand?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Do you have a framework for turning negative customer experience into positive?',
//         type: 'custexp',
//         response: null
//     }, {
//         question: 'Can CX endeavours be measured to inform the ongoing strategy across internal (colleagues evidencing delivery) and external (NPS/CSAT) dimensions?',
//         type: 'custexp',
//         response: null
//     }
// ],
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

let dimensions = questionCarousel.node().getBoundingClientRect()
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
// this.questions[index].response = response
// this.calculateScores()
// console.log('questionSelected', this.questions)
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
    background-color: #EFEFEF;
}
.questionCarousel {
    width: max(75%, 400px);
    height: 96px;
    position: absolute;
    top: calc(50% - 72px);
    left: calc(50% -  max(37.5%, 200px));
    /*transform: translateZ(-288px);*/
    transform-style: preserve-3d;
    transition: transform .3s;
}
.questionContainer {
     position: absolute;
     width: calc(100% - 24px);
     height: 72px;
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