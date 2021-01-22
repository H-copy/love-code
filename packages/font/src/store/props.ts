import {
  Input,
} from 'ant-design-vue'

import {
  PropGroup
} from '../props-panel'

export default {
  state: () => ({
    propsList: {
      div: {
        style: {
          title: 'style',
          props: {
            background: {
              component: Input,
              label: 'background',
              key: 'background',
              default: '#eee'
            }
          }
        }
      }
    } as { [c: string]: PropGroup }
  })
}

export const MODULE_NAME = 's_props'
