<template>
    <v-container>
        <v-layout column>

            <Paginator
                    :disableNextButton="!(pagesLink.next)"
                    :disablePreviousButton="!(pagesLink.prev)"
                    :pageNumber="currentPage"
            />

            <ImageGrid :imagesData="imagesData" />
        </v-layout>

        <Loader :show="showLoader" />

        <IframeDialog
                :showDialog="showDialog"
                :dialogUrl="dialogUrl"
                :openDialogId="openDialogId"

        />

    </v-container>

</template>


<script>
    import {RepositoryFactory} from '../repository/RepositoryFactory';
    import ImageGrid from "./ImageGrid";
    import Paginator from "./Paginator";
    import {appEventBus} from '../main';
    import Loader from "./Loader";
    import IframeDialog from "./IframeDialog";

    export default {
        name: "ImagesListMain",
        components: {Loader, IframeDialog, Paginator, ImageGrid},
        data: () => ({
            imageList : [],
            imagesData: [],
            pagesLink: [],
            currentPage : 1,
            showLoader: true,
            dialogUrl: '',
            showDialog: false,
            openDialogId: 0

        }),
        created: function () {
            /*
            we can also use vuex with our repository data to make our data state managed.
            serving as a single source of truth. this will be very useful in bigger projects where
            there are alot of data interaction between so many components
             */
            this.loadImages();

        },
        methods :{
            parseLinkHeader : (header) => {
                const linkExp = /<[^>]*>\s*(\s*;\s*[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g // eslint-disable-line
                const paramExp = /[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g // eslint-disable-line


                let matches = header.match(linkExp);
                let results = {};

                for (let i = 0; i < matches.length; i++) {
                    let split = matches[i].split('>');
                    let href = split[0].substring(1);
                    let ps = split[1];

                    let s = ps.match(paramExp);
                    for (let j = 0; j < s.length; j++) {
                        let p = s[j];
                        let paramSplit = p.split('=');
                        let rel = paramSplit[1].replace(/["']/g, '');
                        results[rel] = href
                    }
                }

                return results
            },

            updateImageListAndPagesLink(responseData){

                this.imageList = this.imagesData = responseData.data;
                this.pagesLink = this.parseLinkHeader(responseData.headers.link);

            },

            onPageChange(){
                appEventBus.$on('changePage', (pageChangeType) => {
                    let url;
                    let pageNumber = this.currentPage;

                    if(pageChangeType === 'next' && this.pagesLink.next !== undefined){
                        url =  this.pagesLink.next;
                        pageNumber++;
                    }
                    else if(pageChangeType === 'prev' && this.pagesLink.prev !== undefined){
                        url =  this.pagesLink.prev;
                        pageNumber--;
                    }
                    else{
                        return ;
                    }

                    this.showLoader = true;
                    RepositoryFactory.get('images').getImagesListFromUrl(url).
                        then((response) => {
                        this.updateImageListAndPagesLink(response);
                        this.currentPage = pageNumber;
                        this.showLoader = false;

                    }).catch((error) => {
                        alert(`Error in changing pages: ${error}`);
                        this.showLoader = false;
                        throw new Error(error);

                    })
                })

            },

            onOpenImageUrl(){
                appEventBus.$on('openImageUrl', (imageUrl) => {
                    this.dialogUrl = imageUrl;
                    this.showDialog = true;
                    // this generates a random number every time to simulate a new dialog instance
                    this.openDialogId = Math.random();

                })

            },

            onItemsPerPageChange(){
                appEventBus.$on('getItemsPerPage', (itemsPerPage) => {
                    this.showLoader = true;
                    this.loadImages(this.currentPage, itemsPerPage);
                })

            },

            onFilterByAuthor(){
                appEventBus.$on('filterByAuthor', (authorName) => {
                    this.imagesData = this.imageList.filter((image) => {
                        return authorName.toLowerCase().split(' ').every(v => image.author.toLowerCase().includes(v));
                    });

                    if(authorName === ''){
                        this.imagesData = this.imageList;

                    }
                });

            },

            loadImages(page = 1, itemsPerPage = this.defaultItemsPerPage){

                RepositoryFactory.get('images').getImagesList(page, itemsPerPage).
                then((response) => {
                    this.updateImageListAndPagesLink(response);
                    this.showLoader = false;
                    this.registerEventListeners();
                }).catch((error) => {
                    alert(`ImageGrid Error: ${error}`);
                    this.showLoader = false;
                    throw new Error(error);

                });

            },

            registerEventListeners(){
                this.onPageChange();
                this.onOpenImageUrl();
                this.onItemsPerPageChange();
                this.onFilterByAuthor();
            }




        }
    }
</script>

<style scoped>

</style>