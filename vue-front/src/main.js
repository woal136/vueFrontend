import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// css는 끝에 붙일 것
import './assets/common.css'

createApp(App)
    .use(router)
    .mount('#app')
