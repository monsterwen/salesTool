<template>
    <div class="result-page-holder">
        <div class="result-header">
            <div class="result-content">
                <div class="result-name"
                     v-on:click="displayBody = !displayBody">
                    <p>{{category}}</p>
                </div>
                <div class="result-meter">
                    <ScoreMeter
                        :holderId="meterId"
                        :currentScore="actualScore"
                        :potentialScore="potentialScore"
                        :renderMarkers="renderMarkers">
                    </ScoreMeter>
                </div>
            </div>
            <div class="arrow-holder"
                v-on:click="displayBody = !displayBody">
                <div class="result-expand" :class="{'active': displayBody}">
                </div>
            </div>
        </div>
        <div class="result-body" :class="{'hide-result-body': !displayBody}">
            <div class="result-score-title">
                <p>Your <b>Current</b> {{category}} score</p>
            </div>
            <div class="result-score" :style="`color: ${statusColors[actualScoreDescriptor]}`">
                <p>{{actualScore}}</p>
            </div>
            <div class="result-score-description">
                <p>{{scoreDescription}}</p>
            </div>
            <div class="result-score-title" style="margin-top: 24px;">
                <p>To Reach Your <b>Potential</b> {{category}} score of</p>
            </div>
            <div class="result-score" :style="`color: ${statusColors[potentialScoreDescriptor]}`">
                <p>{{potentialScore}}</p>
            </div>
            <div class="result-score-description" style="width: 60%">
                <p>{{potentialDescription}}</p>
            </div>
            <div class="module-list">
                <div v-for="(item, i) in recommendedModules" class="module-item" v-bind:key="`module${category}${i}`">
                    <div class="module-tick"></div>
                    <div class="module-title">
                        <p>{{item.name}}</p>
                    </div>
                    <div class="module-description">
                        <p>{{item.description}}</p>
                    </div>
                    <div class="module-link"
                         :class="{'selected': selectedModules[item.id]}"
                            v-on:click="selectedModules[item.id] = true">
                        <p v-on:click="selectedModules[item.id] = true">I'm interested</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import * as d3 from 'd3'
    import ScoreMeter from './ScoreMeter'

    export default {
        name: "ResultPage",
        components: {
            ScoreMeter
            // ScoreMeter
        },
        props: {
            category: {
                type: String,
                default: 'Analytics'
            },
            actualScoreDescriptor: {
                type: String,
                default: () => 'low'
            },
            potentialScoreDescriptor: {
                type: String,
                default: () => 'high'
            },
            actualScore: {
                type: Number,
                default: 2.5
            },
            potentialScore: {
                type: Number,
                default: 3.5
            },
            scoreDescription: {
                type: String,
                default: () => 'There are a few key areas that would elevate your analytical capability and give you improved visibility of how programmes are performing and key customer characteristics.'
            },
            potentialDescription: {
                type: String,
                default: () => 'and ensure that all of your analytical needs are met, we recommend taking advantage of the following modules.'
            },
            recommendedModules: {
                type: Array,
                default: () => [
                    {
                        name: 'Brand & Programme Tracker',
                        id: 'bpt',
                        description: 'Establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                    }, {
                        name: 'Customer Demographic Profiling',
                        id: 'cdf',
                        description: 'Identify what your customers look like by examining key traits and the extent to which they over or under index.  Map characteristics to product and service '
                    }
                ]
            },
            meterId: {
                type: String,
                default: () => 'meter-weeder'
            },
            renderMarkers: {
                type: Boolean,
                default: () => false
            }
        },
        data: () => ({
            scoreText: 'There are a few key areas that would elevate your analytical capability and give you improved visibility of how programmes are performing and key customer characteristics.',
            recomendationText: 'As a starting point we would suggest considering our XXX and YYY modules as priority.',
            displayBody: true,
            statusColors: {
                low: '#D83737',
                mod: '#FFBF00',
                high: '#A5BB00'
            },
            selectedModules: {}
        }),
        mounted: function () {
            this.recommendedModules.forEach((d) => {
                this.selectedModules[d.id] = false
            })
        }
    }
</script>

<style scoped>
    .result-page-holder {
        width: 100%;
        flex-basis: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: baseline;
    }
    .result-header {
        width: 100%;
        flex-basis: 100%;
        height: 114px;
        display: flex;
        flex-flow: row wrap;
        margin-top: 12px;
    }
    .result-content {
        width: calc(98% - 114px);
        flex-basis: calc(98% - 114px);
        height: 100%;
        display: flex;
        flex-flow: row wrap;
        padding-left: 2%;
    }
    .result-name {
        width: 100%;
        flex-basis: 100%;
        height: 32px;
    }
    p {
        margin: 0;
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }
    .result-name p {
        font-weight: 400;
        font-size: 28px;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        margin: 0;
        cursor: pointer;
    }
    .result-name p:hover{
        font-weight: 500;
        color: #2c3e50;
    }
    .result-meter {
        width: 100%;
        flex-basis: 100%;
        height: 82px;
    }
    .arrow-holder {
        width: 114px;
        flex-basis: 114px;
        height: 114px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .result-expand {
    }
    .result-expand::before {
        position: absolute;
        content: '';
        width: 0;
        height: 0;
        border: .5em solid transparent;
        border-left-color: gray;
        transform-origin: 0 50%;
        transform: rotate(90deg);
        transition: transform .25s;
    }
    .result-expand.active::before {
        transform: rotate(270deg) translateX(-9px);
    }
    .result-body {
        width: 100%;
        flex-basis: 100%;
        padding-left: 4%;
        padding-right: 128px;
        padding-top: 12px;
        text-align: center;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        animation: ease-in;
    }
    .result-score-title {
        padding-top: 12px;
        width: 100%;
    }
    .result-score-title p {
        font-size: 26px;
    }
    .result-score {
        width: 100%;
    }
    .result-score p {
        font-size: 48px;
    }
    .result-score-description {
        margin-top: 12px;
        font-size: 22px;
        width: 50%;
    }
    .hide-result-body {
        display: none;
    }
    .module-list {
        display: flex;
        flex-flow: row wrap;
        width: 60%;
        flex-basis: 60%;
        margin-top: 12px;
        justify-content: center;
        border-top: 1px solid #CDCDCD;
        border-bottom: 1px solid #CDCDCD;
        padding-bottom: 3px;
    }
    .module-item {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        flex-basis: 100%;
        justify-content: center;
        margin-top: 12px;
    }
    .module-title {
        font-size: 24px;
        font-weight: 600;
    }
    .module-description {
        font-size: 18px;
    }
    .module-link {
        margin-top: 6px;
        padding-left: 6px;
        padding-right: 6px;
        border-radius: 6px;
    }
    .module-link.selected {
        background-color: #009FBC;
    }
    .module-link p {
        margin-top: 8px;
        margin-bottom: 4px;
        color: #009FBC;
        cursor: pointer;
    }
    .module-link.selected p {
        color: #fff;
    }
</style>