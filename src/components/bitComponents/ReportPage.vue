<template>
    <div class="report-page fit flex justify-content-center align-items-center">
        <slot name="result-pages"></slot>
    </div>
</template>

<script>
    export default {
        name: "ReportPage",
        components: {}
    }
</script>

<style scoped>
    .report-page {
        width: 100%;
        min-height: 100%;
    }
</style>