<template>
    <div class="loadingScreenDiv">
        <div class="loadingContainer">
            <div class="loadingContent">
                <p class="loadingHeader">
                    {{ surveyCompleteText }}
                </p>
            </div>
            <div class="loadingContent">
                <div class="loadingLoader">
                    <i class="material-icons icon" style="font-size: 96px;">done</i>
                </div>
            </div>
            <div class="loadingContent">
                <p class="loadingHeader">
                    {{ thanksCompleteText }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        surveyComplete,
        thanksComplete
    } from "../../copy/copy";

    export default {
        name: "AllDone",
        props: {
            language: {
                type: String
            }
        },
        computed: {
            surveyCompleteText: function () {
                return surveyComplete[this.language]
            },
            thanksCompleteText: function () {
                return thanksComplete[this.language]
            }
        }
    }
</script>

<style scoped>
    .all-done-icon {
        min-width: 96px;
        min-height: 96px;
        width: 96px;
        height: 96px;
    }
    .loadingScreenDiv {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: row wrap;
        box-sizing: border-box;
    }
    .loadingContainer {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding-left: 16%;
        padding-right: 16%;
        padding-top: 48px;
        padding-botton: 40px;
    }
    .loadingContent {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-basis: 100%;
        width: 100%;
    }
    .loadingHeader {
        color: #1d1d1f;
        font-family: "Open Sans", Arial, Helvetica, sans-serif;
        font-size: 2em;
        font-weight: 600;
    }
    .loadingLoader {
        padding-top: 56px;
        min-width: 96px;
        min-height: 96px;
    }
</style>
