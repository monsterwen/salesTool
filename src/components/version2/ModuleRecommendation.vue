<template>
    <div class="recommendation-container fit flex flex-column justify-content-start align-items-center">
        <div class="fit module-title-holder justify-content-center">
            <h2 class="flex module-score-title justify-content-center">
                <slot name="module-title"></slot>
            </h2>
        </div>
        <div class="module-logo">
            <div class="dimension-image justify-content-center">
                <slot name="module-logo"></slot>
            </div>
        </div>
        <div class="fit module-title-holder justify-content-center">
            <h4 class="flex module-score-title justify-content-center" style="font-weight: 600;">
                <slot name="header"></slot>
            </h4>
        </div>
        <div class="result-gap-description" style="width: 100%">
            <p><slot name="prescription"></slot></p>
        </div>
        <div class="included-container">
            <h5>What You Get:</h5>
            <div class="includes-list-holder review-container" style="align-self: flex-end">
                <ul class="includes-list" style="padding-left: 0;">
                    <slot name="includes-list-items"></slot>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ModuleRecommendation",
        props: {
            svgPath: {
                type: String,
                default: () => 'analytics'
            },
            included: {
                type: Array,
                default: () => [
                    'Survey of Current Customers Tailored to Business Needs',
                    'Presentation Deck Identifying Trends, Benchmarking Insights, and Scoring Responses',
                    'Interactive Dashboard for User Queries and Drill-Down'
                ]
            }
        }
    }
</script>

<style scoped>
    ul, p {
        margin-bottom: 0.5rem;
    }
    .fit {
        width: 100%;
        height: 100%;
    }
    .dimension-image {
        height: 100%;
        display: flex;
        padding-top: 4px;
        padding-bottom: 4px;
        box-sizing: border-box;
    }
    .dimension-png {
        height: 100%;
    }
    .flex {
        display: flex;
    }
    .module-title-holder {
        flex: 0 1 30px;
        text-align: center;
    }
    .module-logo {
        flex: 0 1 35%;
        width: 100%;
    }
    .result-gap-description p {
        text-align: center;
        font-size: 20px;
    }
    .included-container {
        margin-top: 0.5rem;
        padding-top: 0.5rem;
        padding-right: 24px;
        padding-left: 24px;
        width: 420px;
        border-top: 1px solid #CDCDCD;
        border-bottom: 1px solid #CDCDCD;
    }
    .module-score-title {
        margin-bottom: 0;
        font-weight: bold;
    }
    .included-container h5 {
        display: flex;
        justify-content: center;
    }
    .includes-list {
        list-style: none;
    }
    .includes-list-holder {
        max-height: 180px;
        overflow-y: auto;
    }
    .includes-item:last-of-type {
        border-bottom: none !important;
    }
    .includes-item {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        flex-basis: 100%;
        justify-content: center;
        list-style: none;
        text-align: center;
        border-bottom: 0.5px solid #eeeeee;
    }
</style>