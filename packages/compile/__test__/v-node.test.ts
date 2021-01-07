import {
  VTextNode,
  VTagNode,
  // VSelf
} from '../src/v-node'

import {
  BaseTextNode
} from '../src/node'

import {
  // VDirectiveProp,
  // VEventProp,
  // VDynamiceProp,
  // VModelProp,
  // VSlotProp,
  // VIfProp,
  // VForValue,
  // VForProp,
} from '../src/v-prop'

import {
  BaseNativeProp,
  // BaseSelfProp,
} from '../src/prop'

describe('VTextNode', () => {
  test('stringify', () => {
    expect(VTextNode.create('message').stringify()).toBe(`{{ message }}`)
  })
})

describe('VTagNode', () => {

  test('BaseNativeProp', () => {
    expect(VTagNode.create(
      { name: 'a-button' },
      BaseNativeProp.create('id', 'container'),
      BaseTextNode.create('click me')
    ).stringify()
    ).toBe(
      `<a-button id='container'> click me </a-button>`
    )
  })
  
})