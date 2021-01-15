import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import { createApp } from 'vue';
import App from './App.vue';
import zzUI from '../components'
import { HTTP } from '@micro/api'

createApp(App).use(Antd).use(zzUI.install, HTTP).mount('#app');
