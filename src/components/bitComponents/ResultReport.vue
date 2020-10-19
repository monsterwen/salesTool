<template>
    <div class="result-div">
        <div class="result-title-holder">
            <h2 class="result-score-title">
                <slot name="score-title"></slot>
            </h2>
        </div>
        <div class="result-score-div flex-row-wrap flex-full" id="cur-score-hold">
            <div class="result-score">
                <slot name="score"></slot>
            </div>
            <div class="result-score-collapse pl-2">
                <span class="result-score-button">
                    <i class="material-icons icon">info</i>
                </span>
            </div>
        </div>
        <div class="result-gap-description" style="width: 100%">
            <p><slot name="score-desc"></slot></p>
        </div>
        <div class="result-gap-header" style="width: 100%">
            <p><slot name="prescription"></slot></p>
        </div>
        <div class="gap-holder">
            <slot name="gap-holder"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ResultReport",
        props: {
            score: {
                type: Number,
                default: () => 2.4
            },
            colorDomain: {
                type: Array,
                default: () => [0, 2.5, 2.5000001, 3.5, 3.500001, 5]
            },
            colorRange: {
                type: Array,
                default: () => ['#D83737','#D83737','#FFBF00','#FFBF00','#A5BB00','#A5BB00']
            },
        }
    }
</script>

<style scoped>
    h3 {
        color: #1d1d1f;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }
    p {
        color: #1d1d1f;
        font-weight: normal;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .result-div {
        width: 100%;
    }
    .result-score-title {
        /*padding-top: 12px;*/
        width: 100%;
        height: auto;
        flex: 0 1 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-weight: normal;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin-top: 6px;
        font-size: 22px;
    }
    .result-score-title p {
        font-size: 26px;
    }
    .result-score-button {
        display: inline-block;
        border: none;
        margin: 0;
        text-decoration: none;
        background: none;
        color: #656567;
        font-family: sans-serif;
        font-size: 1rem;
        cursor: pointer;
        text-align: center;
        transition: background 250ms ease-in-out,
        transform 150ms ease;
        -webkit-appearance: none;
        -moz-appearance: none;
    }
    .result-gap-description p {
        text-align: center;
        font-size: 20px;
    }
    .result-gap-header p {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
    }
    .result-score {
        width: auto;
        flex-basis: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 36px;
    }
    .result-score p {
        margin-top: 8px;
        margin-bottom: 8px;
        font-weight: normal;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
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
        align-items: center;
        display: flex;
        transition: max-width 0.2s ease-out;
        width: 100%;
        overflow: hidden;
        flex: 0 1 auto;
    }
    .result-score-collapse {
        width: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .result-score p {
        font-size: 48px;
    }
    .gap-holder {
        width: 100%;
        margin-bottom: auto;
        flex: 0 1 auto;
        display: flex;
        justify-content: center;
        align-content: center;
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
</style>