<template>
    <div class="result-content">
        <div class="result-name">
            <p>{{category}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ResultPageHeader",
        props: {
            category: {
                type: String,
                default: () => 'Overall'
            }
        }
    }
</script>

<style scoped>
    .fit {
        width: 100%;
        height: 100%;
    }
    .result-header {
        height: 114px;
        display: flex;
        flex-flow: row wrap;
        margin-top: 12px;
    }
    .result-content {
        display: flex;
        flex-flow: row wrap;
    }
    .result-name {
        width: 100%;
        flex-basis: 100%;
    }
    p {
        margin: 0;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        color: #1d1d1f;
    }
    .result-name p {
        font-weight: 400;
        font-size: 28px;
        font-family: "Open Sans", Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        margin: 0;
        font-weight: bold;
    }
</style>