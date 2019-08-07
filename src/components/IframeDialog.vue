<template>
    <v-layout justify-center>
        <v-dialog style="z-index: 1000" v-model="dialog" width="100%">
            <v-card class="iframe-dialog">
                <v-app-bar class="light-green white--text">

                    <v-toolbar-title>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                        :href="url"
                                        target="_blank"
                                        v-on="on"
                                >Open in New Tab
                                </v-btn>
                            </template>
                            <span>Click to open the full website which allows clickable actions on the website</span>
                        </v-tooltip>
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon dark @click="dialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-app-bar>

                <div class="iframe-dialog-wrapper">
                    <iframe :src="corsProxyUrl+encodeURIComponent(url)"></iframe>
                </div>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        name: "IframeDialog",
        props: ['showDialog', 'dialogUrl', 'openDialogId'],
        data: function () {
            return {
                dialog: false,
                url: '',

            }
        },
        watch: {
            openDialogId: function () {
                this.dialog = this.showDialog;
                this.url = this.dialogUrl;
            }
        }

    }

</script>

<style scoped lang="scss">

    .iframe-dialog {
        .iframe-dialog-wrapper {
            height: 100vh;
            overflow: scroll;
            iframe {
                width: 100%;
                height: 2000px;
                border: 0;
                pointer-events: none;
            }
        }
    }


</style>