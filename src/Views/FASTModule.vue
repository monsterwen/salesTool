<template>
    <div class="fastModule" id="fast-module">
        <div class="fastTitle">
            <div class="brierleyHolder">
                <BrierleyLogo></BrierleyLogo>
            </div>
        </div>
        <div class="fastContainer">
            <FASTInterface></FASTInterface>
        </div>
    </div>
</template>

<script>
    import BrierleyLogo from '../components/BrierleyLogo'
    import FASTInterface from '../components/FASTInterface'
    export default {
        name: 'FASTModule',
        components: {FASTInterface, BrierleyLogo},
        data: () => ({
            radarMargins: {
                top: 12,
                right: 12,
                bottom: 12,
                left: 12
            }
        })
    }
</script>

<style scoped>
.fastModule {
    width: calc(100%);
    height: 56.25vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 0 26px 0 26px;
}
.fastTitle {
    width: calc(100%);
    height: 78px;
    margin: 0 0px 0 0px;
    flex-basis: calc(100% + 104px);
    background-color: #E0E0E0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.brierleyHolder {
    height: 100%;
    width: 192px;
    margin: 12px 12px 6px 12px;
}
.fastContainer {
    width: 100%;
    height: 100%;
    /*padding-bottom: 56.25%;*/
    /*height: max(calc(100% - 84px), 700px);*/
    /*max-height: max(calc(100% - 84px), 700px);*/
    flex-basis: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    background-color: #f0f0f0;
}
</style>