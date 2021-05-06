<template>
    <div class="loadingScreenDiv">
        <div class="loadingContainer">
            <div class="loadingContent">
                <p class="loadingHeader">
                    Preparing your results
                </p>
            </div>
            <div class="loadingContent">
                <div class="loadingLoader">
                    <LoadingComponent></LoadingComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LoadingComponent from './LoadingComponent'

    export default {
        name: "loadingScreen",
        components: {
            LoadingComponent
        }
    }
</script>

<style scoped>
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