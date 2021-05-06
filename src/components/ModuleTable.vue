<template>
    <div class="module-table-holder">
        <div class="module-table-header">
            <div class="module-table-title">
                <p>Recommended Modules</p>
            </div>
        </div>
        <div class="module-table-body">
            <div class="module-table-rows">
                <div class="module-row" v-for="(module, i) in modules" :key="`module${i}`">
                    <div class="module-name">
                        <p>{{module.name}}</p>
                    </div>
                    <div class="module-select">
                        <a class="module-button"
                           :href="changeSelection(this)"
                           :class="{ 'active': selectedModules[module.name] }"
                            v-on:click="selectedModules[module.name] = !selectedModules[module.name]"></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="module-table-footer"></div>
    </div>
</template>

<script>
    export default {
        name: "ModuleTable",
        props: {
            modules: {
                type: Array,
                default: () => [
                    {
                        name: 'Programme Health Assessment'
                    },
                    {
                        name: 'Programme Cost Benefit Analysis'
                    },
                    {
                        name: 'Core Customer Segmentation'
                    },
                    {
                        name: 'Customer Demographic Profiling'
                    },
                    {
                        name: 'Brand & Programme Tracker'
                    },
                    {
                        name: 'Propensity Modelling'
                    }
                ]
                // required: true
            }
        },
        data: () => ({
            selectedModules: {}
        }),
        mounted: function () {
            this.populateSelected()
        },
        methods: {
            populateSelected: function () {
                this.modules.forEach((d) => {
                    this.selectedModules[d.name] = false
                })
                console.log(this.selectedModules)
            },
            changeSelection: function (d) {
                console.log('fdfdf', d)
            }
        }
    }
</script>

<style scoped>
    .module-table-holder {
        width: 100%;
        height: 500px;
        display: flex;
        flex-flow: column wrap
    }
    .module-table-header {
        flex-basis: 52px;
        width: 100%;
        height: 52px;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;
        background-color: #CDCDCD;
        border-radius: 6px 6px 0 0;
    }
    .module-table-title {
        text-align: left;
        vertical-align: center;
    }
    .module-table-title p {
        font-size: 32px;
        font-weight: 400;
        margin: 0;
        margin-left: 12px;
    }
    .module-table-body {
        flex-basis: auto;
        width: 100%;
        min-height: calc(100% - 100px);
        max-height: calc(100% - 100px);
        overflow-y: auto;
        display: flex;
        flex-flow: column wrap;
    }
    .module-table-rows {
        width: calc(100% - 24px);
        height: calc(100% - 12px);
        padding: 6px 12px 6px 12px;
    }
    .module-row {
        display: flex;
        flex-flow: row wrap;
        flex-basis: auto;
        width: 100%;
        height: 36px;
        justify-content: center;
        align-items: center;
    }
    .module-name {
        width: calc(100% - 48px);
        flex-basis: calc(100% - 48px);
        align-self: flex-start;
    }
    .module-name p {
        font-size: 18px;
        font-weight: 300;
        margin-top: 8px;
        margin-bottom: 7px;
    }
    .module-select {
        width: 48px;
        flex-basis: 48px;
        height: 100%;
        display: flex;
        /*background-color: #721c24;*/
        align-items: center;
        justify-content: center;
    }
    .module-button {
        width: 16px;
        height: 16px;
        background-color: #721c24;
    }
    .module-button.active {
        width: 19px;
        height: 19px;
        background-color: #4cae4c;
    }
    .module-table-footer {
        height: 48px;
        flex-basis: 48px;
    }
</style>