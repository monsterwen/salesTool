<template>
    <div class="wrapper">
        <div class="fastModule" id="fast-module">
<!--            <div class="fastTitle">-->
<!--                <div class="brierleyHolder">-->
<!--                    <BrierleyLogo></BrierleyLogo>-->
<!--                </div>-->
<!--            </div>-->
            <div class="fastContainer">
                <slot name="interface">
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    // import BrierleyLogo from '../components/BrierleyLogo'
    // import FASTInterface from '../components/FASTInterface'
    export default {
        name: 'FASTModule',
        components: {},
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
.wrapper {
    width: 100%;
}
.fastModule {
    width: 100%;
    min-height: 700px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    /*padding: 0 26px 0 26px;*/
}
.fastTitle {
    width: 100%;
    height: 64px;
    margin: 0 0px 0 0px;
    flex-basis: calc(100% + 104px);
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.brierleyHolder {
    height: calc(100% - 24px);
    width: 192px;
    margin: 6px 12px 6px 12px;
}
.fastContainer {
    width: 100%;
    min-height: 100%;
    /*padding-bottom: 56.25%;*/
    /*height: max(calc(100% - 84px), 700px);*/
    /*max-height: max(calc(100% - 84px), 700px);*/
    flex-basis: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    border-radius: 18px;
    background-color: #fff;
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
