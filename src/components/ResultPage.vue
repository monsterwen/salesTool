<template>
    <div class="result-page-holder">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
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
            <div class="result-half left-half">
                <div class="result-title-holder">
                    <h2 class="result-score-title">
                        Your <b>Current</b> {{category}} score is
                    </h2>
                </div>
                <div class="result-score-div flex-row-wrap flex-full" id="cur-score-hold">
                    <div class="result-score" :style="`color: ${statusColors[actualScoreDescriptor]}`">
                        <p>{{actualScore}}</p>
                    </div>
                    <div class="result-score-description" :class="{ 'result-hidden': !actualDesc}">
                        <p style="min-width: 96%;">{{scoreDescription}}</p>
                    </div>
                    <div class="result-score-collapse">
                        <button
                                v-on:click="actualDesc = !actualDesc"
                                class="result-score-button">
                            <i class="material-icons icon" v-if="!actualDesc">info</i>
                            <i class="material-icons icon" v-if="actualDesc">check</i>
                        </button>
                    </div>
                </div>
                <div class="result-gap-description" style="width: 100%">
                    <p>{{actualPrescription}}</p>
                </div>
                <div class="gap-holder" style="margin-top: 12px">
                    <div class="gap-list-holder" style="align-self: flex-end">
                        <ul class="gap-list" style="padding-left: 0;">
                            <li v-for="(item, i) in identifiedGaps" class="module-item" v-bind:key="`gap${i}`">
                                <!--                        <div class="module-tick"></div>-->
                                <!--                        <div class="module-title">-->
                                <!--                            <p>{{item}}</p>-->
                                <!--                        </div>-->
                                <!--                        <div class="module-description">-->
                                <h3>{{item.header}}</h3>
                                <p style="margin-block-start: 6px;">{{item.desc}}</p>
                                <!--                        </div>-->
                                <!--                        <div class="module-link"-->
                                <!--                             :class="{'selected': selectedModules[item.id]}"-->
                                <!--                             v-on:click="selectedModules[item.id] = true">-->
                                <!--                            <p v-on:click="selectedModules[item.id] = true">I'm interested</p>-->
                                <!--                        </div>-->
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="result-half right-half">
                <h2 class="result-score-title">
                    Your <b>Potential</b> {{category}} score of
                </h2>
                <div class="result-score-div flex-row-wrap flex-full">
                    <div class="result-score" :style="`color: ${statusColors[potentialScoreDescriptor]}`">
                        <p>{{potentialScore}}</p>
                    </div>
                    <div class="result-score-description" :class="{ 'result-hidden': !potentialDesc}">
                        <p style="min-width: 96%;">{{potentialDescription}}</p>
                    </div>
                    <div class="result-score-collapse">
                        <button
                                v-on:click="potentialDesc = !potentialDesc"
                                class="result-score-button">
                            <i class="material-icons icon" v-if="!potentialDesc">info</i>
                            <i class="material-icons icon" v-if="potentialDesc">check</i>
                        </button>
                    </div>
                </div>
                <div class="result-gap-description" style="width: 100%">
                    <p>{{potentialPrescription}}</p>
                </div>
                <div class="gap-holder">
                    <div class="module-list">
                        <div v-for="(item, i) in recommendedModules" class="module-item" v-bind:key="`module${category}${i}`">
                            <div class="module-tick"></div>
                            <div class="module-title">
                                <p>{{item.name}}</p>
                            </div>
                            <div class="module-sub">
                                <p>{{item.sub}}</p>
                            </div>
                            <ul class="gap-list" v-if="item.capabilities">
                                <li v-for="(cap, i) in item.capabilities" class="capability-item" v-bind:key="`cap${i}`">
                                    <!--                        <div class="module-tick"></div>-->
                                    <!--                        <div class="module-title">-->
                                    <!--                            <p>{{item}}</p>-->
                                    <!--                        </div>-->
                                    <!--                        <div class="module-description">-->
<!--                                    <h3>{{item.header}}</h3>-->
                                    <p>{{cap}}</p>
                                    <!--                        </div>-->
                                    <!--                        <div class="module-link"-->
                                    <!--                             :class="{'selected': selectedModules[item.id]}"-->
                                    <!--                             v-on:click="selectedModules[item.id] = true">-->
                                    <!--                            <p v-on:click="selectedModules[item.id] = true">I'm interested</p>-->
                                    <!--                        </div>-->
                                </li>
                            </ul>
                            <div class="module-description" v-else>
                                <p>{{item.description}}</p>
                            </div>
                            <button class="module-link"
                                 :class="{'selected': isSelected(item)}"
                                    v-on:click="interestedClick">
                                <p>I'm interested</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as d3 from 'd3'
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
                default: () => 'There are a few key areas that would elevate your analytical capability and give you improved visibility of how programmes are performing and key customer characteristics'
                // default: () => 'There are a few key areas that would elevate \n your analytical capability and give you improved\n visibility of how programmes are performing\n and key customer characteristics'
            },
            potentialDescription: {
                type: String,
                default: () => 'This score represents what is possible when\n the identified gaps are addressed with our\nrecommended modules'
            },
            actualPrescription: {
                type: String,
                default: () => 'Based on the following key gaps in your analytic capabilities'
            },
            potentialPrescription: {
                type: String,
                default: () => 'Can be reached by addressing the identified gaps in your analytic capabilities with the following modules'
            },
            identifiedGaps: {
                type: Array,
                default: () => [{
                        header: 'Establishing customer perception of the CRM or loyalty programme',
                        desc:  'Your business seems to struggle in gauging the likes and dislikes pertaining to the brand experience and identifying key aspects to change in order to increase satisfaction, loyalty, and LTV.'
                    },
                    {
                        header: 'Identifying your customers demographics',
                        desc: 'You seem to be falling short of effectively addressing the the traits of your customers and the extent to which they over or under index in those traits.'
                    }
                ]
            },
            recommendedModules: {
                type: Array,
                default: () => [
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
                ]
            },
            meterId: {
                type: String,
                default: () => 'meter-weeder'
            },
            renderMarkers: {
                type: Boolean,
                default: () => true
            }
        },
        data: () => ({
            scoreText: 'There are a few key areas that would elevate your analytical capability and give you improved visibility of how programmes are performing and key customer characteristics.',
            recomendationText: 'As a starting point we would suggest considering our XXX and YYY modules as priority.',
            displayBody: true,
            actualDesc: false,
            potentialDesc: false,
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
        },
        computed: {
            // scoreDescWrapped: function () {
            //     return this.wrapText(this.scoreDescription, width)
            // }
        },
        methods: {
            interestedClick: function (d, elm) {
                this.selectedModules[d.id] = !this.selectedModules[d.id]
                console.log('interested', d, this.selectedModules[d.id], elm)
            },
            isSelected: function (elm) {
                return this.selectedModules[elm.id]
            },
            wrapText: function (text) {
                // console.log('d3 score', d3.select('#cur-score-hold'))
                // let width = d3.select('#cur-score-hold')
                //     .node()
                //     .getBoundingClientRect()
                //     .width / 2
                let width = 75
                let virtHolder = d3.create('div:p')
                let words = text.split(' ')
                // let line = []
                let finalString = ''
                let textWidth = 0

                for (let i = 0; i < words.length; i++) {
                    virtHolder
                        .html(`${finalString} ${words[i]}`)
                    textWidth = virtHolder.node().getBoundingClientRect().width
                    console.log(textWidth, virtHolder)
                    if (textWidth < width) {
                        finalString = `${finalString} ${words[i]}`
                    } else {
                        finalString = `${finalString}\n${words[i]}`
                        virtHolder
                            .html('')
                    }
                }
                console.log('final', finalString)
                return finalString
            }
        }
    }
</script>

<style scoped>
     .result-body h2 {
        font-weight: normal;
         font-family: Avenir, Helvetica, Arial, sans-serif;
         -webkit-font-smoothing: antialiased;
         -moz-osx-font-smoothing: grayscale;
         margin-top: 6px;
         font-size: 26px;
    }
     ul {
         display: block;
         list-style-type: disc;
         margin-block-start: 1em;
         margin-block-end: 1em;
         margin-inline-start: 0px;
         margin-inline-end: 0px;
         padding-inline-start: 40px;
     }
    .result-page-holder {
        width: 100%;
        flex-basis: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: center;
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
        width: calc(98% - 64px);
        flex-basis: calc(98% - 64px);
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
        width: 64px;
        flex-basis: 64px;
        height: 114px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .result-score-collapse {
        width: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .result-score-button {
        width: 100%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .icon {
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
        width: 96%;
        flex-basis: 96%;
        padding-top: 12px;
        text-align: center;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        animation: ease-in;
    }
    .result-quadrant {
        width: calc(50% - 12px);
        flex-basis: calc(50% - 12px);
        display: flex;
        flex-flow: row wrap;
        animation: ease-in;
    }
    .result-half {
        width: calc(50% - 13px);
        flex-basis: calc(50% - 13px);
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-content: center;
        animation: ease-in;
        border-left: 0.5px solid #CDCDCD;
        border-right: 0.5px solid #CDCDCD;
    }
    .left-half {
        padding-right: 12px;
    }
    .right-half {
        padding-left: 12px;
        justify-content: center;
    }
    .result-score-title {
        padding-top: 12px;
        width: 100%;
        flex: 0 1 auto;
        height: 0;
    }
    .result-score-title p {
        font-size: 26px;
    }
    button {
         display: inline-block;
         border: none;
         margin: 0;
         text-decoration: none;
         background: none;
         color: #656565;
         font-family: sans-serif;
         font-size: 1rem;
         cursor: pointer;
         text-align: center;
         transition: background 250ms ease-in-out,
         transform 150ms ease;
         -webkit-appearance: none;
         -moz-appearance: none;
     }
    .result-score {
        width: auto;
        flex-basis: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 36px;
    }
    .flex-row-wrap {
        display: flex;
        flex-flow: row wrap;
    }
    .flex-full {
        width: 100%;
        flex-basis: 100%;
    }
    .result-score-div {
        justify-content: center;
        transition: max-width 0.2s ease-out;
        width: 100%;
        min-height: 125px;
        max-height: 125px;
        overflow: hidden;
        flex: 0 1 auto;
    }
    .result-score p {
        font-size: 48px;
    }
    .result-score-description {
        margin-top: 12px;
        margin-left: 12px;
        font-size: 16px;
        max-width: 50%;
        border-left: 0.5px solid #CDCDCD;
        display: flex;
        align-items: center;
        text-align: start;
        overflow: hidden;
        transition: max-width 0.4s ease-out;
    }
    @media (max-width: 1400px) {
        .result-score-description {
            font-size: 12px;
        }
    }
    .result-hidden {
        max-width: 0%;
        border-left: none;
    }
    .result-score-description p {
        margin-left: 12px;
        margin-right: 123px;
        max-height: 113px;
        transition: max-width 0.4s ease-out;
        display: block;
    }
    .result-gap-description {
        font-size: 22px;
        width: 50%;
        flex: 0 1 auto;
        display: flex;
        justify-content: center;
        align-content: center;
    }
    .result-gap-description p {
        width: 60%;
        min-width: 350px;
    }
    .hide-result-body {
        display: none;
    }
    .gap-holder {
        width: 100%;
        margin-bottom: auto;
        flex: 0 1 auto;
        display: flex;
        justify-content: center;
        align-content: center;
    }
    .gap-list-holder {
        display: flex;
        flex-flow: row wrap;
        width: 60%;
        min-width: 350px;
        margin-top: 6px;
        justify-content: center;
        border-top: 1px solid #CDCDCD;
        border-bottom: 1px solid #CDCDCD;
        padding-bottom: 3px;
    }
    .module-list {
        display: flex;
        flex-flow: row wrap;
        width: 60%;
        min-width: 350px;
        flex-basis: 60%;
        margin-top: 6px;
        justify-content: center;
        border-top: 1px solid #CDCDCD;
        border-bottom: 1px solid #CDCDCD;
        padding-bottom: 3px;
    }
    .module-item {
        /*display: flex;*/
        /*flex-flow: row wrap;*/
        width: 100%;
        flex-basis: 100%;
        /*justify-content: center;*/
        margin-top: 12px;
        list-style: none;
    }
    .capability-item {
        /*display: flex;*/
        /*flex-flow: row wrap;*/
        width: 100%;
        flex-basis: 100%;
        /*justify-content: center;*/
        margin-top: 12px;
        text-align: left;
    }
    .module-title {
        font-size: 24px;
        line-height: 1.05em;
        font-weight: 600;
    }
    .gap-list {
        margin-block-start: 6px;
        margin-block-end: 6px;
    }
    .module-sub {
        margin-block-start: 6px;
        font-size: 20px;
        font-weight: 500;
    }
    .module-description {
        font-size: 18px;
    }
    .module-link {
        margin-top: 0;
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
     .module-link:hover {
         background-color: #009FBC;
     }
    .module-link:hover p {
        color: #fff;
    }
     h3 {
         margin: 0;
         font-family: Avenir, Helvetica, Arial, sans-serif;
         -webkit-font-smoothing: antialiased;
         -moz-osx-font-smoothing: grayscale;
     }
</style>