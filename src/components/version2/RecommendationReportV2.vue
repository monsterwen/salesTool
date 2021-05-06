<template>
    <div class="recommendation-page">
        <ResultPage
                :category="analytic.category"
                :actualScoreDescriptor="analytic.actualScoreDescriptor"
                :potentialScoreDescriptor="analytic.potentialScoreDescriptor"
                :actualScore="analytic.actualScore"
                :potentialScore="analytic.potentialScore"
                :scoreDescription="analytic.scoreDescription"
                :potentialDescription="analytic.potentialDescription"
                :recommendedModules="analytic.recommendedModules"
                :meterId="analytic.meterId"
                :renderMarkers="renderMarkers"
        ></ResultPage>
        <ResultPage
                :category="strategy.category"
                :actualScoreDescriptor="strategy.actualScoreDescriptor"
                :potentialScoreDescriptor="strategy.potentialScoreDescriptor"
                :actualScore="strategy.actualScore"
                :potentialScore="strategy.potentialScore"
                :scoreDescription="strategy.scoreDescription"
                :potentialDescription="strategy.potentialDescription"
                :recommendedModules="strategy.recommendedModules"
                :meterId="strategy.meterId"
                :renderMarkers="renderMarkers"
        ></ResultPage>
        <div class="overall-holder">
            <div class="proceed">
                <p>Proceed with Selected Modules</p>
            </div>
        </div>
    </div>
</template>

<script>
    import ResultPage from '../ResultPage'

    export default {
        name: "RecommendatoinReportV2",
        components: {
            ResultPage
        },
        props: {
            selectedScore: {
                type: Number,
                default: () => 3.8
            },
            analytic: {
                type: Object,
                default: () => ({
                    category: 'Analytics',
                    actualScoreDescriptor: 'low',
                    potentialScoreDescriptor: 'high',
                    actualScore: 2.4,
                    potentialScore: 3.6,
                    scoreDescription: 'There are a few key areas that would elevate your analytical capability and give you improved visibility of how programmes are performing and key customer characteristics.',
                    potentialDescription: 'and ensure that all of your analytical needs are met, we recommend taking advantage of the following modules.',
                    recommendedModules: [
                        {
                            name: 'Brand & Programme Tracker',
                            id: 'bpt',
                            sub: 'This module will allow you to',
                            capabilities: [
                                'Improve and optimise key journeys',
                                'Adapt the programme to improve ling term member satisfaction'
                            ],
                            description: 'This will allow you to improve and optimise key journeys as well as adapt the program to improve long term member satisfaction'
                            // description: 'Establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                        }, {
                            name: 'Customer Demographic Profiling',
                            id: 'cdf',
                            sub: 'So you can',
                            capabilities: [
                                'Develop actionable customer segments',
                                'Develop personalised one to one customer tactics aligned in tone and channel preference'
                            ],
                            description: 'So you can enser '
                            // description: 'Identify what your customers look like by examining key traits and the extent to which they over or under index.  Map characteristics to product and service '
                        }
                    ],
                    meterId: 'meter-weeder'
                })
            },
            strategy: {
                type: Object,
                default: () => ({
                    category: 'Strategy',
                    actualScoreDescriptor: 'low',
                    potentialScoreDescriptor: 'mod',
                    actualScore: 1.2,
                    potentialScore: 3.0,
                    scoreDescription: 'There is an opportunity to better benchmark efforts against competitor offerings and review underlying design to cultivate improved value proposition, customer experience and long term emotional loyalty.',
                    potentialDescription: 'In order to improve existing strategical efforts, we recommend the following modules',
                    recommendedModules: [
                        {
                            name: 'Brand & Programme Tracker',
                            id: 'bpt',
                            sub: 'This module will allow you to',
                            capabilities: [
                                'Improve and optimise key journeys',
                                'Adapt the programme to improve ling term member satisfaction'
                            ],
                            description: 'This will allow you to improve and optimise key journeys as well as adapt the program to improve long term member satisfaction'
                            // description: 'Establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                        }, {
                            name: 'Customer Demographic Profiling',
                            id: 'cdf',
                            sub: 'So you can',
                            capabilities: [
                                'Develop actionable customer segments',
                                'Develop personalised one to one customer tactics aligned in tone and channel preference'
                            ],
                            description: 'So you can enser '
                            // description: 'Identify what your customers look like by examining key traits and the extent to which they over or under index.  Map characteristics to product and service '
                        }
                    ],
                    meterId: 'strategy-meter'
                })
            },
            insight: {
                type: Object,
                default: () => ({
                    category: 'Insight',
                    actualScoreDescriptor: 'mod',
                    potentialScoreDescriptor: 'high',
                    actualScore: 2.9,
                    potentialScore: 4.1,
                    scoreDescription: 'There are a few key areas that would elevate your analytical capability and give you improved visibility of how programmes are performing and key customer characteristics.',
                    potentialDescription: 'and ensure that all of your analytical needs are met, we recommend taking advantage of the following modules.',
                    recommendedModules: [
                        {
                            name: 'Brand & Programme Tracker',
                            description: 'Establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                        }, {
                            name: 'Customer Demographic Profiling',
                            description: 'Identify what your customers look like by examining key traits and the extent to which they over or under index.  Map characteristics to product and service '
                        }
                    ],
                    meterId: 'insight-meter'
                })
            },
            custexp: {
                type: Object,
                default: () => ({
                    category: 'Customer Experience',
                    actualScoreDescriptor: 'low',
                    potentialScoreDescriptor: 'high',
                    actualScore: 0.9,
                    potentialScore: 3.9,
                    scoreDescription: 'There are a few key areas that would elevate your analytical capability and give you improved visibility of how programmes are performing and key customer characteristics.',
                    potentialDescription: 'and ensure that all of your analytical needs are met, we recommend taking advantage of the following modules.',
                    recommendedModules: [
                        {
                            name: 'Brand & Programme Tracker',
                            description: 'Establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                        }, {
                            name: 'Customer Demographic Profiling',
                            description: 'Identify what your customers look like by examining key traits and the extent to which they over or under index.  Map characteristics to product and service '
                        }
                    ],
                    meterId: 'custexp-meter'
                })
            },
            technology: {
                type: Object,
                default: () => ({
                    category: 'Technology',
                    actualScoreDescriptor: 'low',
                    potentialScoreDescriptor: 'mod',
                    actualScore: 2.3,
                    potentialScore: 3.3,
                    scoreDescription: 'There are a few key areas that would elevate your analytical capability and give you improved visibility of how programmes are performing and key customer characteristics.',
                    potentialDescription: 'and ensure that all of your analytical needs are met, we recommend taking advantage of the following modules.',
                    recommendedModules: [
                        {
                            name: 'Brand & Programme Tracker',
                            description: 'Establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                        }, {
                            name: 'Customer Demographic Profiling',
                            description: 'Identify what your customers look like by examining key traits and the extent to which they over or under index.  Map characteristics to product and service '
                        }
                    ],
                    meterId: 'technology-meter'
                })
            },
            renderMarkers: {
                type: Boolean,
                default: () => true
            }
        },
        data: () => ({})
    }
</script>

<style scoped>
    .recommendation-page {
        width: 100%;
        overflow: auto;
    }
    .overall-holder {
        width: 100%;
        flex-basis: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 24px;
        margin-bottom: 24px;
        align-items: center;
        justify-content: center;
        padding-right: 128px;
    }
    .proceed {
        padding-left: 12px;
        padding-right: 12px;
        border-radius: 12px;
        margin-left: 54px;
        color: #009FBC;
        transition: all 0.2s;
    }
    .proceed:hover{
        background-color: rgba(0,158,188, 0.7);
        color: #ffffff;
    }
    .proceed p {
        font-size: 28px;
        margin: 0;
    }
    .proceed p:hover{
        font-weight: 500;
    }
</style>