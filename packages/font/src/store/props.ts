import { PInput } from '../components/p-input'
import {
  CmpPropGroup
} from '../props-panel'

export default {
  state: () => ({
    propsList: {
      div: {
        style: {
          title: 'style',
          props: {
            background: {
              component: PInput,
              label: 'style.backgound',
              key: 'v-bind:type',
              default: '',
              options: {}
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
              label: 'type',
              key: 'type',
              default: 'primary'
            }
          }
        }
      }
    } as CmpPropGroup
  })
}

export const MODULE_NAME = 's_props'
