import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from './plugins/axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/assets/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(axios)

export const useGlobals = () => app.config.globalProperties

app.mount('#app')
