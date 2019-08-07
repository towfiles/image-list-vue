<template>

    <v-overlay :value="show">
        <v-progress-circular indeterminate size="80"></v-progress-circular>
    </v-overlay>

</template>

<script>
    export default {
        name: "Loader",
        props: ['show'],
    }
</script>

<style scoped>

</style>