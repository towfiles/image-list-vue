<template>

    <v-card
            width="100%"
            class="mx-auto paginator"
    >


        <v-layout
                justify-center
                align-center
                fill-height
                row>

            <v-flex class="pagination-text-field" xs3 sm3 md1>

                <v-text-field
                        placeholder="Images per page"
                        type="number"
                        height="30"
                        solo
                        rounded
                        :value="itemsPerPage" @input="getItemsPerPage"
                ></v-text-field>
            </v-flex>

            <v-flex class="pagination-text-field" xs6 sm6 md2>

                <v-text-field
                        placeholder="Filter By Author"
                        type="text"
                        height="30"
                        solo
                        rounded
                        v-model="authorName" @input="filterByAuthor"
                ></v-text-field>
            </v-flex>

            <div class="page-change">
                <v-btn
                        class="button-label"
                        large
                        :disabled="disablePreviousButton" @click="changePage('prev')" color="success">
                    <v-icon>navigate_before</v-icon>
                    {{labels.prev}}
                </v-btn>


                <span class="button-label">Page: {{pageNumber}}</span>


                <v-btn class="button-label"
                       large
                       :disabled="disableNextButton" @click="changePage('next')" color="success">
                    <v-icon>navigate_next</v-icon>
                    {{labels.next}}
                </v-btn>
            </div>

        </v-layout>


    </v-card>


</template>

<script>

    import {appEventBus} from '../main';
    import _ from 'lodash';

    export default {
        name: "Pagination",
        props: ['disableNextButton', 'disablePreviousButton', 'pageNumber'],
        data: () => ({
            itemsPerPage: 0,
            authorName: ''

        }),
        created: function () {
            this.itemsPerPage = this.defaultItemsPerPage

        },
        methods: {
            changePage(pageChangeType) {
                appEventBus.$emit('changePage', pageChangeType);
                this.authorName = '';
            },

            getItemsPerPage: _.debounce(function (e) {
                this.itemsPerPage = e;
                appEventBus.$emit('getItemsPerPage', this.itemsPerPage);

            }, 1000),
            filterByAuthor: _.debounce(function (e) {
                this.authorName = e;
                appEventBus.$emit('filterByAuthor', this.authorName);

            }, 1000)
        }
    }
</script>

<style lang="scss">

    .v-input__slot {
        min-height: 40px !important;
    }

    .paginator {
        .pagination-text-field {
            height: 40px;
            margin: 10px;
        }
        .page-change {
            .button-label {
                margin: 10px;
            }
        }
    }

</style>