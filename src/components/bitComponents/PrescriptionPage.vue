<template>
    <div class="fit flex col justify-center align-center text-center border-box mt-3">
        <div class="flex-fit prescription-header">
            <slot name="header-text"></slot>
        </div>
        <div class="flex-fit prescription-sub-header pt-3 pb-2">
            <slot name="subheader-text"></slot>
        </div>
        <div class="flex-fit prescription-body pt-2">
            <slot name="prescriptions"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PrescriptionPage",
        props: {
            recommendations: {
                type: Array,
                default: () => [
                    {
                        rank: 10,
                        name: "Brand & Program Tracker",
                        soyou:  'This will help you establish customer perception of the CRM or loyalty programme and likes or dislikes pertaining to the brand experience and identify aspects to change or act on to increase satisfaction, loyalty and LTV.'
                    },
                    {
                        rank: 13,
                        name: "Customer Demographic Profiling",
                        soyou:  'Identify what your customers look like by examining key traits and the extent to which they over or under index.  Map characteristics to product and service.'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
    .fit {
        width: 100%;
        height: 100%;
    }
    .flex-fit {
        flex-basis: 100%;
    }
    .flex {
        display: flex;
    }
    .row {
        flex-flow: row wrap;
    }
    .col {
        flex-flow: column !important;
    }
    .align-center {
        align-items: center;
    }
    .align-start {
        align-items: flex-start;
    }
    .justify-center {
        justify-content: center;
    }
    .prescription-header {
        flex: 0 1 auto;
    }
    .prescription-sub-header {
        flex: 0 1 auto;
    }
    .prescription-body {
        flex: 1 1 auto;
    }
    .border-box {
        box-sizing: border-box;
    }
    .text-center {
        text-align: center;
    }
</style>