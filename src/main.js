import Vue from 'vue'
import layout from './layout.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
new Vue({
  vuetify,

  render: h => h(layout),
}).$mount('#app')
