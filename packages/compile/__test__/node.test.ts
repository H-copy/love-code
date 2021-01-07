import {
  baseNodeType,
  BaseTagNode,
  BaseTextNode,
  BaseSelf
} from '../src/node'

import {
  BaseNativeProp,
  BaseSelfProp,
  BaseDynamiceProp,
} from '../src/prop'

describe('BaseTagNode', () => {
  test('type', () => {
    const n = BaseTagNode.create('div', BaseNativeProp.create('id', 'native'))
    expect(n.type).toBe(baseNodeType.TAG)
  })

  test('BaseNativeProp stringify', () => {
    const n = BaseTagNode.create('div',BaseNativeProp.create('id', 'native'))
    expect(n.stringify()).toBe(`<div id='native'>  </div>`)
  })

  test('BaseSelfProp stringify', () => {
    const n = BaseTagNode.create('i',BaseSelfProp.create('active'))
    expect(n.stringify()).toBe(`<i active>  </i>`)
  })

  test('BaseDynamiceProp stringify', () => {
    const n = BaseTagNode.create('span',BaseDynamiceProp.create('self', true))
    expect(n.stringify()).toBe(`<span self=true>  </span>`)
  })

  test('child stringify', () => {
    const n = BaseTagNode.create(
      'div',
      BaseNativeProp.create('class', 'container'),
      BaseTagNode.create('div',BaseNativeProp.create('id', 'native'))
    )
    expect(n.stringify()).toBe(`<div class='container'> <div id='native'>  </div> </div>`)
  })

  test('children stringify', () => {
    const n = BaseTagNode.create(
      'div',
      BaseNativeProp.create('class', 'container'),
      [
        BaseTagNode.create('div', BaseNativeProp.create('id', 'native')),
        BaseTagNode.create('i',BaseSelfProp.create('active'))
      ]
    )
    expect(n.stringify()).toBe(`<div class='container'> <div id='native'>  </div> <i active>  </i> </div>`)
  })
  
})


describe('BaseTextNode', () => {
  test('type', () => {
    const n = BaseTextNode.create('div')
    expect(n.type).toBe(baseNodeType.TEXT)
  })

  test('stringify', () => {
    const n = BaseTextNode.create('show me')
    expect(n.stringify()).toBe(`show me`)
  })
 
})

describe('BaseSelf', () => {
  test('type', () => {
    const n = BaseSelf.create('div')
    expect(n.type).toBe(baseNodeType.SELF)
  })

  test('BaseNativeProp stringify', () => {
    const n = BaseSelf.create('hr', BaseNativeProp.create('id', 'hr'))
    expect(n.stringify()).toBe(`<hr id='hr' />`)
  })

  test('BaseNativeProp stringify', () => {
    const n = BaseSelf.create('hr', BaseSelfProp.create('disabeld'))
    expect(n.stringify()).toBe(`<hr disabeld />`)
  })

  test('BaseNativeProp stringify', () => {
    const n = BaseSelf.create('hr', BaseDynamiceProp.create('disabeld', true))
    expect(n.stringify()).toBe(`<hr disabeld=true />`)
  })
 
})
