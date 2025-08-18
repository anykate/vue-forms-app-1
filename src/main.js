import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import Vueform from '@vueform/vueform'
import vueformConfig from './../vueform.config'

createApp(App).use(Vueform, vueformConfig).mount('#app')
