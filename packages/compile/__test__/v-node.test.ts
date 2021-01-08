import {
  VTextNode,
  VTagNode,
  // VSelf
} from '../src/v-node'

import {
  baseNodeType,
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
  test('type', () => {
    expect(VTextNode.create('message').type).toBe(baseNodeType.TEXT)
  })
  test('tag stringify', () => {
    expect(VTagNode.create('AButton').stringify()).toBe(`<a-button></a-button>`)
  })
  test('component stringify', () => {
    expect(VTagNode.create({name: "AButton"}).stringify()).toBe(`<a-button></a-button>`)
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