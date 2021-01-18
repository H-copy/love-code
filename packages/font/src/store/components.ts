import {
  Button,
  Input,
  Switch
} from 'ant-design-vue'
import {
  CmpMap
} from '../types'

export default {
  state: () => ({
    cmpList: {
      button: {
        component: Button,
        name: 'a-button',
        img: 'https://hbimg.huabanimg.com/f79521d397561c75faa4728e8e52e355d15a0ee96a18-3EAN48_fw658/format/webp',
        props: {}
      },
      input: {
        component: Input,
        name: 'a-input',
        img: 'https://hbimg.huabanimg.com/f79521d397561c75faa4728e8e52e355d15a0ee96a18-3EAN48_fw658/format/webp',
        props: {}
      },
      switch: {
        component: Switch,
        name: 'a-switch'
      }
    } as CmpMap
  })
}

export const MODULE_NAME = 's_components'
