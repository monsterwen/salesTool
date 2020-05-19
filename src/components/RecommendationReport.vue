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
        ></ResultPage>
        <ResultPage
            :category="insight.category"
            :actualScoreDescriptor="insight.actualScoreDescriptor"
            :potentialScoreDescriptor="insight.potentialScoreDescriptor"
            :actualScore="insight.actualScore"
            :potentialScore="insight.potentialScore"
            :scoreDescription="insight.scoreDescription"
            :potentialDescription="insight.potentialDescription"
            :recommendedModules="insight.recommendedModules"
            :meterId="insight.meterId"
        ></ResultPage>
        <ResultPage
            :category="custexp.category"
            :actualScoreDescriptor="custexp.actualScoreDescriptor"
            :potentialScoreDescriptor="custexp.potentialScoreDescriptor"
            :actualScore="custexp.actualScore"
            :potentialScore="custexp.potentialScore"
            :scoreDescription="custexp.scoreDescription"
            :potentialDescription="custexp.potentialDescription"
            :recommendedModules="custexp.recommendedModules"
            :meterId="custexp.meterId"
        ></ResultPage>
        <ResultPage
            :category="technology.category"
            :actualScoreDescriptor="technology.actualScoreDescriptor"
            :potentialScoreDescriptor="technology.potentialScoreDescriptor"
            :actualScore="technology.actualScore"
            :potentialScore="technology.potentialScore"
            :scoreDescription="technology.scoreDescription"
            :potentialDescription="technology.potentialDescription"
            :recommendedModules="technology.recommendedModules"
            :meterId="technology.meterId"
        ></ResultPage>
    </div>
</template>

<script>
    import ResultPage from './ResultPage'
    export default {
        name: "RecommendationReport",
        components: {
            ResultPage
        },
        props: {
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
                            description: 'Establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                        }, {
                            name: 'Customer Demographic Profiling',
                            description: 'Identify what your customers look like by examining key traits and the extent to which they over or under index.  Map characteristics to product and service '
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
</style>