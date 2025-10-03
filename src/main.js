import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import core from '@/com/mixins/core.mixin'

createApp(App)
  .mixin({mixins: [core]})
  .use(store)
  .use(router)
  .mount('#app')