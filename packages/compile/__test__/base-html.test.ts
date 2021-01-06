import {
  parse,
  baseParseProps,
  baseParseProp
} from '../src/html'

import {
  createNativeProp,
  createSelfProp,
  createDynamicProp
} from '../src/prop'

describe('baseParseProp', () => {

  test('native', () => {
    expect(baseParseProp(createNativeProp('name','coco'))).toBe(`name='coco'`)
  })

  test('self', () => {
    expect(baseParseProp(createSelfProp('disabled'))).toBe(`disabled`)
  })

  test('dynamic', () => {
    expect(baseParseProp(createDynamicProp('reactVal', '24'))).toBe(`reactVal=24`)
  })

});



describe('baseParseProps', () => {

  const props = [
    createNativeProp('name', 'coco'),
    createSelfProp('active'),
    createDynamicProp('value', '{newVal}'),
  ]

  expect(baseParseProps(props)).toBe(`name='coco' active value={newVal}`)
  
});


import {
  createTextNode,
  createSelfNode,
  createTagNode
} from '../src/node'


describe('parse', () => {

  test('text node', () => {
    const msg = 'message'
    const node = createTextNode(msg)
    expect(parse(node)).toBe(msg)
  })

  test('self close node', () => {
    const tag = 'hr'
    const nodeNative = createSelfNode(tag, createNativeProp('style', '{color: "orange"}'))
    expect(parse(nodeNative)).toBe(`<hr style='{color: "orange"}'/>`)

    const nodeDynamic = createSelfNode(tag, createDynamicProp('value', '{40}'))
    expect(parse(nodeDynamic)).toBe(`<hr value={40}/>`)
  })

  test('tag node', () => {
    const tag = 'div'
    const nodeNative = createTagNode(tag, createNativeProp('style', '{color: "orange"}'))
    expect(parse(nodeNative)).toBe(`<div style='{color: "orange"}'>  </div>`)

    const nodeDynamic = createTagNode('span', createDynamicProp('value', '{40}'))
    expect(parse(nodeDynamic)).toBe(`<span value={40}>  </span>`)

    const nodeChildren = createTagNode(
      'div',
      [],
      [ nodeNative, nodeDynamic ]
    )
    
    expect(parse(nodeChildren)).toBe(`<div> <div style='{color: "orange"}'>  </div> <span value={40}>  </span> </div>`)

  })
  
  
});
