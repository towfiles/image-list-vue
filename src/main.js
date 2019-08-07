import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import {globalConfigMixin} from './mixins/GlobalConfigMixin';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false;

// this will be used as the event bus
export const appEventBus = new Vue();


Vue.mixin({
    data: () => (globalConfigMixin)
});


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
