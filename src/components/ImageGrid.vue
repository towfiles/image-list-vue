<template>

    <v-layout
        align-center
        justify-center
        row
        fill-height
    >
        <div
            v-for="image in imagesData"
            v-bind:key="image.id"
        >
            <ImageCard :image="image" />

        </div>
    </v-layout>
</template>

<script>

    import ImageCard from "./ImageCard";

    export default {
        name: "ImageGrid",
        components: {ImageCard},
        props: ['imagesData'],
    }
</script>

<style scoped>

</style>