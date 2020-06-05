<template>
    <div class="wrapper-div">

        <!-- The Modal -->
        <div class="landing-wrapper" id="wrapper">
        <div class="header-container">
                <div class="header-curve">
                    <img
                            width="100%"
                            :src="require('../components/BrierlyCurve.svg')">
                </div>
                <div class="header-curve header-flex">
                    <div class="items-wrapper">
                        <div class="header-items">
                            <div class="header-content header-element header-left">
                                <div class="header-image">
                                    <img width="100%"
                                         class="survey-preview"
                                        :src="require('../assets/svg/b-logo-vert-tag.svg')">
                                </div>
                            </div>
                            <div class="header-content header-text header-element">
                                <div class="header-headline header-text-section">
                                    <p>Assess your program health</p>
                                </div>
                                <div class="header-subhead header-text-section">
                                    <p>Identify shortcomings and opportunities in your <br> customer loyalty and engagement programming</p>
                                </div>
                                <div class="header-button header-text-section">
                                    <button class="signup-button"
                                            v-on:click="scrollToSignUp()">Take the Assessment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
<!--            </div>-->
        </div>
        <div class="dimension-header">
            <div class="dimension-title">
                <p>The Loyalty Capability Diagnostic Tool</p>
            </div>
            <div class="dimension-desc">
                <p>Visualize opportunities to elevate your loyalty programme effectiveness and value with Brierley's FASTtrack Modules</p>
            </div>
        </div>
        <div class="dimension-container" id="fast-video">
            <div class="video-content">
                <div class="video-container">
                    <div class="video-placeholder">
                        <div class="button-holder">
                            <button class="play-button">
                                <i class="material-icons" style="font-size: 48px; color: rgba(0,0,0,0.5)">play_arrow</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dimension-container" id="matureAss">
        </div>
        <div class="dimension-header">
            <div class="dimension-title">
                <p>5 key dimensions</p>
            </div>
            <div class="dimension-desc">
                <p>Our 5 point loyalty maturity curve provides an in depth view of your current loyalty capability</p>
            </div>
        </div>
        <div class="dimension-container" id="analytics">
            <div class="dimension-content">
                <div class="dimension-text dimension-side dimension-left">
                    <div class="dimension-wrapper">
                        <div class="dimension-headline">
                            <p>Analytics</p>
                        </div>
                        <div class="dimension-subhead">
                            <p>Can my business make sense of data and identify trends?</p>
                        </div>
                        <div class="dimension-body">
                            <p>Ability to aquire and properly analyze large amounts of consumer data is crucial for a business to stay on the cutting
                                edge of business trends, illuminate customer characteristics, and ensure program health.
                                The analytical ability of a business can be the difference between success and failure of a product. </p>
                        </div>
                    </div>
                </div>
                <div class="dimension-side dimension-right">
                    <div class="dimension-image">
                        <img class="dimension-png" :src="require('../assets/svg/analytics.svg')">
                    </div>
                </div>
            </div>
        </div>
        <div class="dimension-container" id="strategy">
            <div class="dimension-content">
                <div class="dimension-side dimension-left">
                    <div class="dimension-image">
                        <img class="dimension-png" :src="require('../assets/images/strategyIcon.png')">
                    </div>
                </div>
                <div class="dimension-text dimension-side dimension-right">
                    <div class="dimension-wrapper">
                        <div class="dimension-headline">
                            <p>Strategy</p>
                        </div>
                        <div class="dimension-subhead">
                            <p>Can my business effectively synthesize analytics and insight to optimise program health?</p>
                        </div>
                        <div class="dimension-body">
                            <p>Being able to craft a viable plan that sets realistic goals and outlines the resources to execute it is essential in developing a differentiated programme. Describing and directing an appropriate directionof travel that positions the
                                evolution of the proposition for all stakeholders over the long term is key for success.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dimension-container" id="insight">
            <div class="dimension-content">
                <div class="dimension-text dimension-side dimension-left">
                    <div class="dimension-wrapper">
                        <div class="dimension-headline">
                            <p>Insight</p>
                        </div>
                        <div class="dimension-subhead">
                            <p>Can my business turn knowledge into action?</p>
                        </div>
                        <div class="dimension-body">
                            <p>The ability to take available analysis and turn it into actionable insight effectively is what sets brands apart from their competition. Being able to quickly adapt in order to change actions or responses based on interpretation of underlying data is a vital ingredient of a successful programme.</p>
                        </div>
                    </div>
                </div>
                <div class="dimension-side dimension-right">
                    <div class="dimension-image">
                        <img class="dimension-png" :src="require('../assets/images/insightIcon.png')">
                    </div>
                </div>
            </div>
        </div>
        <div class="dimension-container" id="technology">
            <div class="dimension-content">
                <div class="dimension-side dimension-left">
                    <div class="dimension-image">
                        <img class="dimension-png" :src="require('../assets/images/techIcon.png')">
                    </div>
                </div>
                <div class="dimension-text dimension-side dimension-right">
                    <div class="dimension-wrapper">
                        <div class="dimension-headline">
                            <p>Technology</p>
                        </div>
                        <div class="dimension-subhead">
                            <p>Is programme success supported by best in class tooling ?</p>
                        </div>
                        <div class="dimension-body">
                            <p>Having the ability to operationalise your loyalty programme so as to manage both outstanding customer experience and provide necessary management insight rests with having robust yet flexible tooling to ensure programme strategy and vision can be realized. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dimension-container" id="cx">
            <div class="dimension-content">
                <div class="dimension-text dimension-side dimension-left">
                    <div class="dimension-wrapper">
                        <div class="dimension-headline">
                            <p>Customer Experience</p>
                        </div>
                        <div class="dimension-subhead">
                            <p>Is the customer engaged and delighted throughout the journey?</p>
                        </div>
                        <div class="dimension-body">
                            <p>Engaging with the programme must be easy. Enabling frictionless, intuitive engagement that serves to address customer need and expectation across the journey is fundamental in developing positive experience. Programme integration across key inflection points and channels delivers optimum accessibility and opportunity to participate.</p>
                        </div>
                    </div>
                </div>
                <div class="dimension-side dimension-right">
                    <div class="dimension-image" style="padding-top: 4%;padding-bottom: 4%;">
                        <img class="dimension-png" :src="require('../assets/svg/customerEx/customerExp.svg')">
                    </div>
                </div>
            </div>
        </div>
        <div class="spacer"></div>
        <div class="dimension-container signup-container">
            <div class="signup-content" v-if="!displayQuestionaire">
                <SignUpField
                        @submitted="displayQuestionaire = true"
                    ></SignUpField>
            </div>
            <div class="questionaire-content" v-if="displayQuestionaire">
                <FASTModule></FASTModule>
            </div>
        </div>
<!--            <FASTModule></FASTModule>-->

    </div>
    </div>
</template>
<script>
    import FASTModule from "../Views/FASTModule";
    import SignUpField from "./SignUpField";
    // import BrierleyLogo from "./BrierleyLogo";
    // import * as d3 from 'd3'

    export default {
        name: 'Test',
        components:  {
            FASTModule,
            SignUpField
        },
        data: () => ({
            briefDesk: true,
            signupModal: null,
            signupContainer: null,
            displayQuestionaire: false
        }),
        mounted: function () {
            this.signupContainer = document.getElementsByClassName('.signup-container')
            // window.onclick = (event) => {
            //     if (event.target === signupContainer) {
            //         this.displayModal = false
            //     }
            // }
        },
        methods: {
            scrollToSignUp: function () {
                let signupContainer = document.getElementsByClassName('signup-container')
                console.log('scrollingto', signupContainer)
                signupContainer[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
            // populateModalElements: function () {
            //   this.signupModal = d3.select('.signup-modal')
            //
            // },
            // displayModal: function () {
            //
            // }
        }
    }
</script>
<style>
    /*@import '../assets/css/default.css';*/
    /*@import '../assets/css/fonts.css';*/
    .signup-modal {
        position: fixed; /* Stay in place */
        z-index: 1000; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        animation-name: fadeIn;
        animation-duration: 0.4s
    }
    .modal-hidden {
        display: none;
    }
    .modal-content {
        position: fixed;
        bottom: 0;
        background-color: #fefefe;
        width: 100%;
        -webkit-animation-name: slideIn;
        -webkit-animation-duration: 0.4s;
        animation-name: slideIn;
        animation-duration: 0.4s
    }

    .spacer {
        width: 100%;
        flex-basis: 100%;
        height: 48px;
    }
    .landing-wrapper {
        display: flex;
        flex-flow: row wrap;
    }
    .header-flex {
        display: flex;
        align-items: center;
        vertical-align: center;
    }
    .header-wrapper {
        width: 100%;
        flex-basis: 100%;
        background: #48922a;
        text-align: left;
    }
    .header-container {
        position: relative;
        width: 100%;
        flex-basis: 100%;
        height: 0em;
        padding-bottom: 37.5%;
        background: linear-gradient(to right, #009FBC, #A5BB00);
    }
    .items-wrapper {
        width: 100%;
        height: 60%;
        max-height: 300px;
    }
    .header-items {
        height: 100%;
        margin: 0 auto;
        width: 100%;
        max-width: 1800px;
        /*margin-top: 10%;*/
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .header-element {
        width: 100%;
        flex-basis: 100%;
        height: 100%;
        display: flex;
    }
    .header-curve {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
    }
    .header-left {
        width: 45%;
        flex-basis: 45%;
        justify-content: flex-end;
        border-right: 0.5px solid #FFFFFF;
    }
    .header-right {
        width: 55%;
        flex-basis: 55%;
        justify-content: flex-end;
        border-left: 0.5px solid #FFFFFF;
    }
    .header-content {
        /*width: 50%;*/
        /*flex-basis: 50%;*/
        height: 100%;
    }
    .header-text {
        display: flex;
        flex-flow: row wrap;
    }
    .header-text-section {
        width: 100%;
        flex-basis: 100%;
    }
    .header-image {
        width: 70%;
        height: auto;
        margin-left: 20%;
        margin-right: 10%;
        border-right: 0.5px;
    }
    .header-headline {
        color: #ffffff;
        font-weight: 700;
        text-align: left;
        margin-left: 5%;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
    }
    .header-headline p {
        color: #ffffff;
        font-weight: 700;
        text-align: left;
        font-size: 61px;
        line-height: 66px;
    }
    .header-subhead {
        color: #ffffff;
        font-size: 45px;
        line-height: 50px;
        text-align: left;
        margin-left: 5%;
    }
    .header-subhead p {
        font-weight: lighter;
        color: #ffffff;
        text-align: left;
    }
    @media (max-width: 1400px){
        .header-headline {
            color: #ffffff;
            font-weight: 700;
            text-align: left;
            margin-left: 3%;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
        }
        .header-headline p {
            color: #ffffff;
            font-weight: 700;
            text-align: left;
            font-size: 52px;
            line-height: 57px;
        }
        .header-subhead {
            color: #ffffff;
            font-size: 36px;
            line-height: 37px;
            text-align: left;
            margin-left: 3%;
        }
        .header-subhead p {
            font-weight: lighter;
            color: #ffffff;
            text-align: left;
        }
    }
    /*.survey-preview {*/
    /*    box-shadow: 0px 0px 20px 2px #ffffff;*/
    /*}*/
    .dimension-header {
        margin-top: 48px;
        margin-bottom: 36px;
        width: 100%;
        flex-basis: 100%;
    }
    .dimension-title {
        font-size: 56px;
        font-weight: bold;
    }
    .dimension-title p {
        margin-top: 12px;
        margin-bottom: 0;
        line-height: 130%;
    }
    .dimension-desc {
        font-size: 36px;
        font-weight: normal;
        margin: 0 auto;
        max-width: 80%;
    }
    .dimension-container {
        width: 100%;
        flex-basis: 100%;
    }
    .dimension-content {
        width: 100%;
        flex-basis: 100%;
        max-width: 1600px;
        margin: 0 auto;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
    }
    .dimension-side {
        width: 50%;
        flex-basis: 50%;
    }
    .dimension-left {
        border-right: 0.5px solid #CDCDCD;
        padding-right: 48px;
        justify-content: flex-end;
    }
    .dimension-left p {
        text-align: right;
    }
    .dimension-right {
        border-left: 0.5px solid #CDCDCD;
        padding-left: 48px;
        justify-content: flex-start;
    }
    .dimension-right p {
        text-align: left;
    }
    .dimension-text {
        display: flex;
        align-items: center;
    }
    .header-button {
        margin-left: calc(5% + 12px);
        text-align: left;
    }
    .signup-button {
        box-sizing: border-box;
        -webkit-appearance: none;
        display: inline-block;
        text-align: center;
        line-height: inherit;
        font-size: 12px;
        color: rgb(255, 255, 255);
        background-color: rgba(255, 255, 255, 0.3);
        cursor: pointer;
        width: fit-content;
        height: fit-content;
        border-radius: 10px;
        padding-left: 8px;
        padding-right: 8px;
        padding-top: 16px;
        padding-bottom: 16px;
        min-width: 152px;
        font-weight: bold;
        transition: 0.2s cubic-bezier(0.1, 0.7, 1.0, 0.1);
    }
    .signup-button:hover {
        color: rgba(0, 0, 0, 0.6);
        background-color: rgba(255, 255, 255, 0.8);
    }
    .signup-container {
        background-color: rgb(236, 238, 239);
        background: linear-gradient(right, #009FBC, #A5BB00);
    }
    .signup-content {
        width: 100%;
        flex-basis: 100%;
        max-width: 550px;
        margin: 48px auto;
        display: flex;
        flex-flow: row wrap;
    }
    .questionaire-content {
        width: 100%;
        flex-basis: 100%;
        max-width: 1800px;
        margin: 48px auto;
        display: flex;
        flex-flow: row wrap;
    }
    /*.dimension-left .dimension-text {*/
    /*    justify-content: flex-end;*/
    /*}*/
    /*.dimension-right .dimension-text {*/
    /*    justify-content: flex-start;*/
    /*}*/
    .dimension-headline p {
        font-size: 34px;
        font-weight: bold;
        line-height: 37px;
        margin-top: 12px;
        margin-bottom: 12px;
    }
    .dimension-subhead {
        margin: 12px 0;
    }
    .dimension-subhead p {
        font-size: 24px;
        font-weight: 400;
        line-height: 37px;
    }
    .dimension-body {
        width: 100%;
        max-width: 500px;
    }
    .dimension-left .dimension-body {
        margin-left: auto;
    }
    .dimension-body p {
        font-size: 18px;
        line-height: 1.6em;
        font-weight: 300;
    }
    .dimension-content {
        height: 44vh;
        min-height: 440px;
        max-height: 550px;
    }
    .video-content {
        width: 100%;
        flex-basis: 100%;
        max-width: 1600px;
        margin: 0 auto;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        height: auto;
    }
    .dimension-image {
        height: 100%;
        width: auto;
        display: flex;
        justify-content: flex-start;
    }
    .dimension-left .dimension-image {
        justify-content: flex-end;
    }
    .dimension-png {
        height: calc(100% - 24px);
        margin-top: 12px;
        margin-bottom: 12px;
    }
    .closebtn {
        margin-left: 15px;
        color: white;
        font-weight: bold;
        float: right;
        font-size: 22px;
        line-height: 20px;
        cursor: pointer;
        transition: 0.3s;
    }

    .closebtn:hover {
        color: black;
    }

    .wrapper-div {
        padding-bottom: 25vh;
        background-color: #ffffff;
    }
    .video-container {
        width: 60%;
        height: 100%;
    }
    .video-placeholder {
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
        border-radius: 6px;
        background: linear-gradient(top, rgba(0, 159, 188, 0.7), rgba(165, 187, 0, 0.7));
        position: relative;
    }
    .button-holder {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .play-button {
        border-radius: 100%;
        width: 72px;
        height: 72px;
        background-color: rgba(255, 255, 255, 0.5);
    }
    /* demo styles */

    @import url(https://fonts.googleapis.com/css?family=Roboto:400,500,300,700);
    section{
        margin: 50px;
    }



    /* for custom scrollbar for webkit browser*/

    ::-webkit-scrollbar {
        width: 6px;
    }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
    ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
</style>
<!--<script>-->
<!--    import FASTModule from "../Views/FASTModule";-->
<!--    import BrierleyLogo from "./BrierleyLogo";-->
<!--    export default {-->
<!--        components:  {FASTModule, BrierleyLogo}-->
<!--    }-->
<!--</script>-->