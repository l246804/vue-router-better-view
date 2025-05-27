import { createApp } from 'vue'
import BetterRouterView from 'vue-router-better-view'
import App from './App.vue'
import router from './router'
import 'modern-normalize'

const app = createApp(App)

app.use(router).use(BetterRouterView)

app.mount('#app')
