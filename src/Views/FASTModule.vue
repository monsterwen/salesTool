<template>
    <div class="fastModule" id="fast-module">
        <div class="moduleHolder">
            <Questionaire></Questionaire>
        </div>
        <div class="moduleHolder">
            <RadarChart></RadarChart>
        </div>
    </div>
</template>

<script>
    import RadarChart from '../components/RadarChart'
    import Questionaire from '../components/Questionaire'

    export default {
        name: 'FASTModule',
        components: {Questionaire, RadarChart},
        modules: {
            RadarChart,
            Questionaire
        },
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
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}
.moduleHolder {
    width: 50%;
    max-width: 50%;
    flex-basis: 50%;
}
</style>