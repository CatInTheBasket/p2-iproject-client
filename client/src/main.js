import { createApp } from 'vue'

import store from '@/store.js'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
