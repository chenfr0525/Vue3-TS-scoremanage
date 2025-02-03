import { createApp } from 'vue'
//element使用
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//pinia
import { createPinia } from 'pinia'
import piniaPlugin from './utils/piniLocalStore'
//router
import router from "./router"
//request导入
import request from './utils/request'

import App from './App.vue'

const app=createApp(App)
const pinia=createPinia()
pinia.use(piniaPlugin({
  key:"dsadmin"
}))
//将axios的request挂载到vue上
app.config.globalProperties.$request=request

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
