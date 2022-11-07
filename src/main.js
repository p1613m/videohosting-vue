import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

const app = createApp(App)

axios.defaults.baseURL = 'http://videohosting.local/api'
axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('auth-user-token')

app.use(router)

app.mount('#app')
