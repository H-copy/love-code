import {
  Button,
  Input,
  Card
} from 'ant-design-vue'
import { CmpMod } from '../creator'

export default {
  state: () => ({
    cmpList: {
      text: () => {
        return {
          component: 'text',
          type: 'textTag',
          name: 'text',
        }
      },
      div: () => {
        return {
          component: 'div',
          type: 'nativeTag',
          name: 'div',
          props: [
            {
              type: 'vDynamiceProp',
              name: 'style',
              value: {
                minWidth: '100px',
                minHeight: '100px',
                border: '1px solid transparent',
                borderColor: '#aaa',
                background: '#eee'
              }
            }
          ]
        }
      },
      button: () => {
        return {
          component: Button,
          name: 'a-button',
          type: 'nativeTag',
          img: 'https://hbimg.huabanimg.com/f79521d397561c75faa4728e8e52e355d15a0ee96a18-3EAN48_fw658/format/webp',
        }
      },
      input: () => {
        return {
          component: Input,
          name: 'a-input',
          type: 'nativeTag',
          img: 'https://hbimg.huabanimg.com/f79521d397561c75faa4728e8e52e355d15a0ee96a18-3EAN48_fw658/format/webp',
        }
      },
      card: () => {
        return {
          component: Card,
          name: 'a-card',
          type: 'nativeTag',
          props: [
            {
              type: 'nativeProp',
              name: 'title',
              value: 'card'
            }
          ]
        }
      }
    } as { [s: string]: () => CmpMod }
  })
}

export const MODULE_NAME = 's_components'
