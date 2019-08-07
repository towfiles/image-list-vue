<template>
    <v-hover>
        <template v-slot:default="{ hover }">
            <v-card
                    :width="defaultImageWidth"
                    class="ma-4 image-card"
                    @click="openImageUrl(image.url)"
            >
                <v-img
                        class="white--text"
                        :height="defaultImageHeight"
                        :src="getImageDownloadLink(apiConfig.url, image.id, defaultImageWidth, defaultImageHeight)"
                >
                </v-img>

                <v-card-text>
                    <v-chip
                            color="primary"
                            label
                    >
                        <v-icon left>mdi-account-circle-outline</v-icon>
                        <span class="image-author-name">{{image.author}}</span>
                    </v-chip>

                    <v-chip class="image-id">#{{image.id}}</v-chip>


                </v-card-text>

                <v-fade-transition>
                    <v-overlay
                            v-if="hover"
                            absolute
                            color="#036358"
                    >
                        <v-btn x-large ><v-icon>open_in_new</v-icon> Open </v-btn>

                    </v-overlay>
                </v-fade-transition>

            </v-card>
        </template>
    </v-hover>
</template>

<script>
    import {appEventBus} from '../main';
    export default {
        name: "ImageCard",
        props: ['image'],
        methods: {
            getImageDownloadLink : (url, id, width, height) => `${url}/id/${id}/${width}/${height}`,

            openImageUrl : imageUrl => appEventBus.$emit('openImageUrl', imageUrl)
        },
    }
</script>

<style scoped lang="scss">

    .image-card {
        .image-author-name {
            max-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .image-id {
            float: right;
        }
    }

</style>