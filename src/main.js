import { createApp } from 'vue'
// import { createBootstrap } from 'bootstrap-vue-next'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import nearley from 'nearley'
import App from './App.vue'

// Vue.use(BootstrapVue)
// Vue.config.productionTip = false
//
// new Vue({
//   render: h => h(App),
// }).$mount('#app')

const app = createApp(App);
// app.use(createBootstrap())

app.mount('#app')
