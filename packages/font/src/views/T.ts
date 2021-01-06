import {
  createTagNode,
  createTextNode,
  createEventProp,
  createDynamicProp,
  html,
  createCmpNode,
  createDynamicNode
} from '@love-code/complie'

import {
  Input
} from 'ant-design-vue'

import { ref } from 'vue'

export const root = createTagNode(
  'div',
  createDynamicProp(
    'style',
    {
      color: 'orange',
      fontSize: '14px'
    }
  ),
  [
    createTextNode('show me'),
    createDynamicNode('value'),
    createCmpNode(Input, [
      createDynamicProp('value', 'value'),
      createEventProp('input', 'onInput'),
    ])
  ]
)

console.log('root', html.parse(root))

export const T = {
  template: html.parse(root),
  setup() {
    const value = ref('')
    const onInput = (d: any) => {
      value.value = d.target.value
    }
    return {
      value,
      onInput
    }
  }
}

export function createCmp() {
  const tmp = createTagNode(
    'div',
    [],
    [
      createTagNode('h1', [], createTextNode('new cmp')),
    ]
  )
  console.log('tmp >>>', tmp)
  return {
    template: html.parse(tmp),
    setup() {
      return {}
    }
  }
}
