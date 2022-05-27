import { createApp } from 'vue'

import store from '@/store.js'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import GSignInButton from 'vue-google-signin-button'



const app = createApp(App)
app.use(GSignInButton)
app.use(store)
app.use(router)

app.mount('#app')
