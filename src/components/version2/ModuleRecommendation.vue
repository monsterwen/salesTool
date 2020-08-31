<template>
    <div class="recommendation-container fit flex flex-column justify-content-start align-items-center">
        <div class="fit module-title-holder justify-content-center">
            <h2 class="flex module-score-title justify-content-center">
                <slot name="module-title"></slot>
            </h2>
        </div>
        <div class="module-logo">
            <div class="dimension-image justify-content-center">
                <img class="dimension-png" :src="require(`../../assets/svg/${svgPath}.svg`)">
            </div>
        </div>
        <div class="result-gap-description" style="width: 100%">
            <!--            <p>{{actualPrescription}}</p>-->
            <p><slot name="prescription"></slot></p>
        </div>
        <div class="included-container">
            <h5>Includes</h5>
            <div class="includes-list-holder review-container" style="align-self: flex-end">
                <ul class="includes-list" style="padding-left: 0;">
                    <li v-for="(item, i) in included" class="includes-item" v-bind:key="`selected${i}`">
                        <p>{{item}}</p>
                    </li>
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
    .fit {
        width: 100%;
        height: 100%;
    }
    .dimension-image {
        height: 100%;
        display: flex;
    }
    .dimension-png {
        height: 100%;
        padding-right: 24px;
    }
    .flex {
        display: flex;
    }
    .module-title-holder {
        flex: 0 1 48px;
    }
    .module-logo {
        flex: 0 1 24%;
        width: 100%;
    }
    .result-gap-description p {
        text-align: center;
        font-size: 20px;
    }
    .included-container {
        padding-right: 24px;
        padding-left: 24px;
        width: 420px;
    }
    .included-container h5 {
        display: flex;
        justify-content: center;
    }
    .includes-list {
        list-style: none;
    }
    .includes-item {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        flex-basis: 100%;
        justify-content: center;
        list-style: none;
        text-align: center;
    }
</style>