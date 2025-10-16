import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import core from '@/com/mixins/core.mixin'
import user from '@/com/mixins/user.mixin'

createApp(App)
  .mixin({mixins: [core, user]})
  .use(store)
  .use(router)
  .mount('#app')