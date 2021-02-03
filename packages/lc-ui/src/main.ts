import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import { createApp } from 'vue';
import lcUi from '../components'
import App from './App.vue';

createApp(App).use(Antd).use(lcUi).mount('#app');
