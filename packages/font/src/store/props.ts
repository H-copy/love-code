import { PInput } from '../components/p-input'
import {
  CmpPropGroup
} from '../props-panel'

export default {
  state: () => ({
    propsList: {
      // div: {
      //   style: {
      //     title: 'style',
      //     props: {
      //       background: {
      //         component: PInput,
      //         label: 'style.backgound',
      //         key: 'v-bind:type',
      //         default: '',
      //         options: {}
      //       }
      //     }
      //   }
      // },
      'a-card': {
        base: {
          title: 'base',
          props: {
            title: {
              component: PInput,
              name: 'title',
              createType: 'nativeProp',
              default: 'card title'
            },
            size: {
              component: PInput,
              name: 'size',
              createType: 'nativeProp',
              default: 'default'
            },
            type: {
              component: PInput,
              name: 'type',
              createType: 'nativeProp',
              default: ''
            }
          }
        }
      },
      'a-button': {
        base: {
          title: 'base',
          props: {
            type: {
              component: PInput,
              name: 'type',
              createType: 'nativeProp',
              label: 'button type',
              default: 'primary'
            },
          }
        }
      }
    } as CmpPropGroup
  })
}

export const MODULE_NAME = 's_props'
