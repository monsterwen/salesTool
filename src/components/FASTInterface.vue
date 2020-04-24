<template>
    <div class="fastHolder">
<!--        <div class="fastHeader">-->
<!--        </div>-->
        <div class="moduleHolder flexHolder questionHolder" :class="{ 'questionFinished': summary }">
            <div class="transitionOverlay"
                 :class="{ 'transitionActive': summary }">
            </div>
            <div class="questionFlex questionHeader">
                <div class="categoryHolder">
                    <QuestionCategory
                            questionName="Analysis"
                            questionKey="analysis"
                            :selected="selectedCategory === 'analysis' && !summary"
                            :categoryScore="scores.analysis"
                            :questionNumber="questionProgress.analysis"
                            :questionTotal="questionTotals.analysis">
                    </QuestionCategory>
                </div>
                <div class="categoryHolder">
                    <QuestionCategory
                            questionName="Insight"
                            questionKey="insight"
                            :selected="selectedCategory === 'insight' && !summary"
                            :categoryScore="scores.insight"
                            :questionNumber="questionProgress.insight"
                            :questionTotal="questionTotals.insight">
                    </QuestionCategory>
                </div>
                <div class="categoryHolder">
                    <QuestionCategory
                            questionName="Strategy"
                            questionKey="strategy"
                            :selected="selectedCategory === 'strategy' && !summary"
                            :categoryScore="scores.strategy"
                            :questionNumber="questionProgress.strategy"
                            :questionTotal="questionTotals.strategy">
                    </QuestionCategory>
                </div>
                <div class="categoryHolder">
                    <QuestionCategory
                            questionName="Technology / Efficiency"
                            questionKey="tes"
                            :selected="selectedCategory === 'tes' && !summary"
                            :categoryScore="scores.tes"
                            :questionNumber="questionProgress.tes"
                            :questionTotal="questionTotals.tes">
                    </QuestionCategory>
                </div>
                <div class="categoryHolder">
                    <QuestionCategory
                            questionName="Customer Experience"
                            questionKey="custexp"
                            :selected="selectedCategory === 'custexp' && !summary"
                            :categoryScore="scores.custexp"
                            :questionNumber="questionProgress.custexp"
                            :questionTotal="questionTotals.custexp">
                    </QuestionCategory>
                </div>
            </div>
            <div class="questionFlex questionContainer">
                <Questionaire
                    :questions="questions[selectedCategory]"
                    :category="selectedCategory"
                    @selection="questionSelected"
                    @reload="changeCategory">
                </Questionaire>
            </div>
        </div>
        <div id="summary-hold" class="moduleHolder flexHolder questionHolder" :class="{ 'summaryFinished': summary }">
            <div class="questionFlex questionHeader">
                <QuestionCategory
                        questionName="Summary"
                        questionKey="summary"
                        :selected="summary"
                        :categoryScore="scores.total / categories.length"
                        :questionNumber="questionProgress.total"
                        :questionTotal="questionTotals.total">
                </QuestionCategory>
            </div>
            <div class="questionFlex questionContainer">
                <RadarChart
                    :radarChartValues="scores"
                    :score="scores.total">
                </RadarChart>
            </div>
        </div></div>
</template>

<script>
    import RadarChart from '../components/RadarChart'
    import Questionaire from '../components/Questionaire'
    import QuestionCategory from './QuestionCategory'
    import * as d3 from 'd3'

    export default {
        name: "FASTInterface",
        components: {
            QuestionCategory,
            RadarChart,
            Questionaire
        },
        data: () => ({
            summary: false,
            questions: {
                analysis: [
                    {
                        question: 'Do you track loyalty and CRM program KPIs and benchmarks?',
                        type: 'analysis',
                        response: 'none'
                    }, {
                        question: 'Can you identify overt and latent customer traits? ',
                        type: 'analysis',
                        response: 'none'
                    }
                    //     question: 'Can you determine what your customers like and dislike about your brand experience?',
                    //     type: 'analysis',
                    //     response: 'none'
                    // }, {
                    //     question: 'Can you easily identify and change programme components to increase customer satisfaction, loyalty and LTV?',
                    //     type: 'analysis',
                    //     response: 'none'
                    // }, {
                    //     question: 'Are the drivers of negative customer value tracked and such behavioural insights actioned with tactical communications?',
                    //     type: 'analysis',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you have an effective solution for identifying products that create brand stickiness and retention?',
                    //     type: 'analysis',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you have a robust model for informing product bundling or merchandising decisions',
                    //     type: 'analysis',
                    //     response: 'none'
                    // }
                    //     question: 'Are you accurately reporting on CRM programme health or marketing efforts?',
                    //     type: 'analysis',
                    //     response: 'none'
                    // }, {
                    //     question: 'Are you focused on the most actionable sets of KPIs for the business?',
                    //     type: 'analysis',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you have a set of reliable benchmarks to contextualise performance?',
                    //     type: 'analysis',
                    //     response: 'none'
                    // }, {
                    //     question: 'Have you built executive dashboards to cleanly track achievement of key business objectives?',
                    //     type: 'analysis',
                    //     response: 'none'
                    // }
                    //     question: 'Is analytics effectively leveraged to improve marketing outcomes and CX?',
                    //     type: 'analysis',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you have an effective analytic toolkit informing targeting efforts and the strategic marketing plan?',
                    //     type: 'analysis',
                    //     response: 'none'
                    // }, {
                    //     question: 'Is there a roadmap allowing for future adoption of new analytic tools and solutions to enable a larger marketing growth plan?',
                    //     type: 'analysis',
                    //     response: 'none'
                    // }
                ],
                insight: [{
                        question: 'Do you have visibility and insight on programme effectiveness and scope for improvement?',
                        type: 'insight',
                        response: 'none'
                    }, {
                        question: 'Can you identify top performing customers and factors driving their retention?',
                        type: 'insight',
                        response: 'none'
                    }
                    //     question: 'Have you identified customer LTV and key moments of interest where value can be optimised?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know how much incremental revenue your loyalty or CRM programmes are driving?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know the cost of your current solution and its corresponding ROI?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know which customer segments and activities drive greatest uplift in engagement and profitability?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Is your customer audience grouped into actionable segments?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Are one to one tactics personalised in tone and aligned with channel preferences?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Are product preferences and channel responsiveness mapped at individual level?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know what your best customers look like and is this insight leveraged to optimise communications?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Is communication relevance optimised  by an understanding of how customer traits over or under index',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Can distinct product and service appeal be mapped to different customer types?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }
                    //     question: 'Do you know how your CRM or loyalty programme is perceived by your customers and what they like most?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Are you able to predict which customers are most likely to engage in behaviour favourable to business growth?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know how to better tailor messages and personalise messages to drive ROI uplift?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know what traits and attributes are presented by customers for certain purchases behaviours v other customers?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Can you easily action insights from purchase behaviour?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Are you able to identify at-risk customers before official lapse?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Taking into account varied transactional cadences of different persons with different need states can you identify churn risk?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know what churn inoculation tactics work best for the business?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know what each customer is worth to you?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Is your 1:1 marketing budget allocated to maximise future returns and lifetime value to the business?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you personalise content through highly relevant product recommendations?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }, {
                    //     question: 'Are products that drive brand retention and stickiness mapped in order of salience to customers?',
                    //     type: 'insight',
                    //     response: 'none'
                    // }
                ],
                strategy: [{
                        question: 'Can you evaluate how your CX compares with that of your competitors?',
                        type: 'strategy',
                        response: 'none'
                    }, {
                        question: 'Can you pinpoint the programme features that are considered table stakes in your market?',
                        type: 'strategy',
                        response: 'none'
                    }
                    //     question: 'Do you know what programme elements differentiate your programme from competitors?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know what the customer journeys most relevant to your business are?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know what the key moments of interest across the customer journey are(pain points, gaps, positive inflection points)?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know what enhancements are required to best optimise and impact the customer journey?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Can you easily identify the programme features and benefits that appeal to each customer persona?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Can you easily identify what programme enhancements are required to make the most immediate impact?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }
                    //     question: 'Do customers feel communications are effective, timely and relevant?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do customers feel they are deriving value form your CRM and / or loyalty endeavours?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know how your customers perceive your marketing endeavours compared to those of your competitors?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Have you established strategic milestones to get your programmes to market?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Are key metrics informing the success of the loyalty launch?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do customer facing employees have the critical information needed to support effective programme launch?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Has the necessary effort been taken to package up programme information and train customer facing staff?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Have enhancements been planned to refresh and evolve loyalty and CRM programmes?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Has the frequency of new features and functionality been decided?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Is there a phased plan reflecting the introduction of new features and functionality?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }
                    //     question: 'Do your customer communications follow marketing best practices (SUCH AS? - CLARIFY)?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know how your engagement metrics (SUCH AS?) compare to best in class benchmarks?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Can you identify customer programme loyalty as well as brand loyalty?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Are you able to benchmark programme loyalty against other brands in your competitive space?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know the areas you are over or under indexing in respect of emotional loyalty metrics?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Does the current programme structure incorporate best in class design principles?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know how the existing programme\'s structure compares to best in class programmes?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know what enhancements are required to achieve immediate and positive impact?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Are you looking at initiatives to test new features and develop 1:1 programme performance?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you feel there are campaign gaps that could be filled to drive uplift in topline results?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know what enhancements are required to best optimise and impact the customer journey?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }, {
                    //     question: 'Can you easily identify the programme features and benefits that appeal to each customer persona?',
                    //     type: 'strategy',
                    //     response: 'none'
                    // }
                ],
                tes: [{
                        question: 'Do you have centralised oversight and control of API users?',
                        type: 'tes',
                        response: 'none'
                    }, {
                        question: 'Do you have the ability to add, update, retrieve, and delete',
                        type: 'tes',
                        response: 'none'
                    }
                    //     question: 'Does the facility exist to easily add, update, and retrieve member records?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Can you review and easily access member point balance, status and tier details?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you have the capability to merge and unify member details?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you have the capability to identify and pull all information pertinent to DSAR?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Can your system support Right to be Forgotten / erasure requests from data subjects?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Can your platform manage, log and store consent and permission status detail in order to maintain the essential audit trail ?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Is the adding purchases for point accrual effectively supported?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Can you distinguish transactional from non-transactional engagement?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Is the retrieval of a member’s point history a standard feature?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }
                    //     question: 'Request credit for purchases  - TBC: what question needs to be asked?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Does functionality exist for the storage and retrieval of the rewards the catalogue?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Redeeming your points for rewards - Does facility exist to effectively and accurately process rewards redemption?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Retrieving a member’s rewards - Can you easily access and audit member reward history?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Setting your reward choice - Is it possible to set and allocate customer reward choices and options?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Enrolling into and retrieving promotions - Is customer promotional enrolment effectively supported?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Communications centre” through web /app - Can customer messages be pushed through a web or app based communications centre?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Retrieving or deleting a member’s messages - Is the management and storage of member messages supported (retrieval / deletion)?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Marking messages as read or unread - Can the system administer key messages status such as read or unread?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Retrieving all available coupons - Is a universal view of coupon availability available to programme administrators?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Retrieving all of a member’s available coupons - Can coupon qualification and availability be retrieved at individual member level?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Redeeming coupons - Is the redemption of coupons accurately tracked and stored at platform level?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Retrieve a list of stores or favourite stores - Can outlet groups be created and prioritised in the context of programme objectives?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Mark a favourite store - Is it possible to define store favourites?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }, {
                    //     question: 'Apple Wallet or Android Pay - Is Apple Wallet or Android Pay integrated with the platform?',
                    //     type: 'tes',
                    //     response: 'none'
                    // }
                ],
                custexp: [{
                        question: 'Do customer preferences lead content and communication distribution - bespoke content and channel planning?',
                        type: 'custexp',
                        response: 'none'
                    }, {
                        question: 'Is the programme\'s direct communicaitons strategy defined by a mobile first approach?',
                        type: 'custexp',
                        response: 'none'
                    }
                    //     question: 'Have you integrated your programmes with key social channels?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }, {
                    //     question: 'Have you developed an app based or mobile solution that integrates and supports the core customer programme?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }, {
                    //     question: 'Is AI employed to optimise loyalty and CRM programme experience (eg chatbots, campaign automation)?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you leverage customer effort metrics when developing loyalty platforms, tools and materials?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }, {
                    //     question: 'Are you employing the use of personalised dynamic content to enrich digital communication relevance?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }, {
                    //     question: 'Is website behaviour  / contextual data leveraged to enrich loyalty programme communications?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }, {
                    //     question: 'Has the business developed a SCV to drive better brand interactions?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }
                    //     question: 'Are real time trigger communications employed to optimise the customer journey at key touchpoints?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }, {
                    //     question: 'Are opportunities to generate new members always maximised across key customer touchpoints (e.g. in store, direct mail, SMS, face-to-face, call centre)',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }, {
                    //     question: 'Is customer advocacy being easily enabled and encouraged?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }, {
                    //     question: 'Does the business observe, track and address gaps in the customer experience?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do your customers enjoy a consistent experience when they engage with the brand?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }, {
                    //     question: 'Is gamification employed to make engagement with the brand more fun?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }, {
                    //     question: 'Does the business employ \'signature actions\' that differentiate the brand from the competition and make your experience unique?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }, {
                    //     question: 'Does the organisation ensure that a holistic experience is delivered by ensuring both front line and back office staff have roles to play?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }, {
                    //     question: 'Have you conducted primary research to really understand and leverage the values and ideals of your customers?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you know how your customers want to feel as a result of their experience with your brand?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }, {
                    //     question: 'Do you have a framework for turning negative customer experience into positive?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }, {
                    //     question: 'Can CX endeavours be measured to inform the ongoing strategy across internal (colleagues evidencing delivery) and external (NPS/CSAT) dimensions?',
                    //     type: 'custexp',
                    //     response: 'none'
                    // }
                ]
            },
            scores: {
                analysis: 0,
                insight: 0,
                strategy: 0,
                tes: 0,
                custexp: 0,
                total: 0
            },
            radarChartValues: {},
            questionProgress: {
                analysis: 0,
                insight: 0,
                strategy: 0,
                tes: 0,
                custexp: 0,
                total: 0
            },

            questionTotals: {},
            selectedCategory: 'analysis',
            categories: [
                'analysis',
                'insight',
                'strategy',
                'tes',
                'custexp'
            ]
        }),
        mounted: function () {
          this.createQuestionStatistics()
        },
        watch: {
            summary: function () {
                // this.changeSummary()
            }
        },
        methods: {
            changeSummary: function () {
                let fastHolder = d3.select('.fastHolder')
                let dimensions = fastHolder.node().getBoundingClientRect()
                let width = dimensions.width - 32
                console.log('gdsarefgdsvtgfredgtfbtrda')
                let summaryContainer = d3.select('#summary-hold')

                summaryContainer
                  .style('width', `${width - 32}px`)
                  .style('flex-basis', `${width - 32}px`)
            },
            changeCategory: function (prevCat) {
                let index = this.categories.indexOf(prevCat)

                if (index !== this.categories.length - 1) {
                    this.selectedCategory = this.categories[index + 1]
                } else {
                    this.scores.total = (this.scores.analysis +
                    this.scores.insight +
                    this.scores.strategy +
                    this.scores.tes +
                    this.scores.custexp)
                    this.summary = true
                    this.questionProgress.total = this.questionTotals.total
                }
            },
            createQuestionStatistics: function () {
                let questions = this.questions

                this.questionTotals = {
                    analysis: questions.analysis.length,
                    insight: questions.insight.length,
                    strategy: questions.strategy.length,
                    tes: questions.tes.length,
                    custexp: questions.custexp.length,
                    total: (questions.analysis.length +
                        questions.insight.length +
                        questions.strategy.length +
                        questions.tes.length +
                        questions.custexp.length)
                }
                console.log('====04040404====', this.questionTotals)
            },
            questionSelected: function (response, index, type) {
                // this.selectedIndex = this.selectedIndex + 1
                console.log('selected', response, index, type)
                this.questionProgress[type] = index + 1
                this.questions[type][index].response = response
                this.calculateScores()
                // console.log('questionSelected', this.questions)
            },
            calculateScores: function () {
                let questions = this.questions
                let questionTotals = this.questionTotals
                let scores = {}
                let responses = {
                    yes: {
                        analysis: 0,
                        insight: 0,
                        strategy: 0,
                        tes: 0,
                        custexp: 0
                    },
                    no: {
                        analysis: 0,
                        insight: 0,
                        strategy: 0,
                        tes: 0,
                        custexp: 0
                    },
                    na: {
                        analysis: 0,
                        insight: 0,
                        strategy: 0,
                        tes: 0,
                        custexp: 0
                    },
                    none: {
                        analysis: 0,
                        insight: 0,
                        strategy: 0,
                        tes: 0,
                        custexp: 0
                    }
                }

                questions.analysis.forEach(d => {
                    responses[d.response].analysis = responses[d.response].analysis + 1
                })
                questions.strategy.forEach(d => {
                    responses[d.response].strategy = responses[d.response].strategy + 1
                })
                questions.insight.forEach(d => {
                    responses[d.response].insight = responses[d.response].insight + 1
                })
                questions.tes.forEach(d => {
                    responses[d.response].tes = responses[d.response].tes + 1
                })
                questions.custexp.forEach(d => {
                    responses[d.response].custexp = responses[d.response].custexp + 1
                })

                let analysisDenom = questionTotals.analysis - responses.na.analysis
                let insightDenom = questionTotals.insight - responses.na.insight
                let strategyDenom = questionTotals.strategy - responses.na.strategy
                let tesDenom = questionTotals.tes - responses.na.tes
                let custexpDenom = questionTotals.custexp - responses.na.custexp

                scores.analysis = analysisDenom ? (responses.yes.analysis/ analysisDenom) * 100 : 0
                scores.insight = insightDenom ? (responses.yes.insight / insightDenom) * 100 : 0
                scores.strategy = strategyDenom ? (responses.yes.strategy / strategyDenom) * 100 : 0
                scores.tes = tesDenom ? (responses.yes.tes / tesDenom) * 100 : 0
                scores.custexp = custexpDenom ? (responses.yes.custexp / custexpDenom) * 100 : 0

                this.scores = scores
                this.scores.total = (this.scores.analysis +
                    this.scores.insight +
                    this.scores.strategy +
                    this.scores.tes +
                    this.scores.custexp)
                console.log('scoresscores', this.scores.analysis)
            }
        }
    }
</script>

<style scoped>
.fastHolder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.moduleHolder {
    width: 50%;
    max-width: 50%;
    flex-basis: 50%;
    max-height: 100%;
}
.flexHolder {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.questionHolder {
    overflow: hidden;
    transition: width 1s ease-in-out,
                flex-basis 1s ease-in-out;
}
.questionFinished {
    width: 32px;
    flex-basis: 32px;
}
.summaryFinished {
    width: calc(100% - 32px);
    flex-basis: calc(100% - 32px);
    max-width: calc(100% - 32px);
}
.questionFlex {
    flex-basis: 100%;
}
.questionHeader {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 52px;
    max-width: 100%;
    flex-basis: 100%;
}
.questionContainer {
    height: calc(100% - 52px);
    max-height: calc(100% - 52px);
    width: 100%;
    border: 6px solid #DEDEDE;
    border-top: 0;
    padding: 6px;
    padding-top: 0;
}
.transitionOverlay {
    width: 100%;
    height: 0;
    position: relative;
    top: 0;
    left: 0;
    background-color: #E0E0E0;
    overflow: hidden;
    transition: height 1s ease-in-out;
}
.transitionActive {
    height: 100%;
}
</style>