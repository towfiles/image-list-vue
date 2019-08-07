import axios from "axios"
import {globalConfigMixin} from '../mixins/GlobalConfigMixin';


/** there would be a form of authentication to connect with this api in real scenarios.
 but this requires a user based login authentication to make the security effective**/
export default axios.create({
    baseURL : globalConfigMixin.apiConfig.url + globalConfigMixin.apiConfig.version
});