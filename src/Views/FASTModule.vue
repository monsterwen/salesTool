<template>
    <div class="fastModule" id="fast-module">

        <div class="fastContainer">
            <FASTInterface></FASTInterface>
        </div>
    </div>
</template>

<script>
    import FASTInterface from '../components/FASTInterface'
    export default {
        name: 'FASTModule',
        components: {FASTInterface},
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
    width: calc(100% - 53px);
    height: 56.25vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 0 26px 0 26px;
    margin-bottom: 100px;
}
.fastTitle {
    width: calc(100%);
    height: 78px;
    margin: 0 0px 0 0px;
    flex-basis: calc(100% + 104px);
    background-color: white;
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
.card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 40%;
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

</style>