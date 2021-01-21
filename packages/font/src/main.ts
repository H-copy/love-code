import { createApp } from 'vue/dist/vue.esm-bundler'
// import drag from 'gao-vue-dragable'
import Antd from 'ant-design-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'

export default createApp(App)
  .use(Antd)
  .use(store)
  // .use(drag)
  .use(router)
  .mount('#app')
