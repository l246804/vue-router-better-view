import ElementPlus from 'element-plus'
import PlusProComponents from 'plus-pro-components'
import { createApp } from 'vue'
import BetterRouterView from '../../src'
import App from './App.vue'
import router from './router'
import 'modern-normalize'
import 'element-plus/dist/index.css'
import 'plus-pro-components/index.css'

const app = createApp(App)

app.use(router).use(BetterRouterView).use(ElementPlus).use(PlusProComponents)

app.mount('#app')
