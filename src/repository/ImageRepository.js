import repository from './Repository';
import {globalConfigMixin} from '../mixins/GlobalConfigMixin';



export default {

    getImagesList(page, limit) {
       return new Promise((resolve, reject) => {

           // if(limit < globalConfigMixin.defaultItemsPerPage)
           //     throw new Error(`items should not be less than ${globalConfigMixin.defaultItemsPerPage} `);

           if(limit > globalConfigMixin.maximumItemsPerPage)
               throw new Error(`items should not be greater than ${globalConfigMixin.maximumItemsPerPage} `);

           if(page > 0 ){
                let result = repository.get(
                   globalConfigMixin.imagesListResource + `?page=${page}&limit=${limit}`
               );
                resolve(result)

           }

           // if our code got here
           reject('An error occurred when getting images');

       })


    },
    getImagesListFromUrl(url) {
        return repository.get(url);
    }

}