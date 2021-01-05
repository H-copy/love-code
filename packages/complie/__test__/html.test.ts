import {
  tagNameFormatter,
  parse,
  parseProps,
  parseProp
} from '../src/html'
import {
  createNativeProp,
  createEventProp,
  createDynamicProp,

  createTextNode,
  createSelfNode,
  createTagNode,
} from '../src/node-pro'


test('tagNameFormatter', () => {
  expect(tagNameFormatter('AButton')).toBe('a-button')
  expect(tagNameFormatter('active')).toBe('active')
  expect(tagNameFormatter('ABCD23U')).toBe('a-b-c-d23-u')
})


describe('parseProp', () => {

  test('native', () => {
    expect(parseProp(createNativeProp('name','coco'))).toBe('name="coco"')
    expect(parseProp(createNativeProp('age',24))).toBe('age=24')
    expect(parseProp(createNativeProp('disabled', false))).toBe('disabled=false')
  })

  test('dynamic', () => {
    expect(parseProp(createDynamicProp('name','coco'))).toBe(`:name='"coco"'`)
    expect(parseProp(createDynamicProp('age',24))).toBe(`:age='24'`)
    expect(parseProp(createDynamicProp('disabled', false))).toBe(`:disabled='false'`)
    expect(parseProp(createDynamicProp('user', {name:'coco', age:24}))).toBe(`:user='{name:"coco",age:24}'`)
    expect(parseProp(createDynamicProp('callback', () => { }))).toBe(`:callback='() => { }'`)
  })
  
  test('event', () => {
    expect(parseProp(createEventProp('click', () => {}))).toBe(`@click='() => { }'`)
  })
  
});


describe('parseProps', () => {

  const props = [
    createNativeProp('name', 'coco'),
    createDynamicProp('age', 24),
    createDynamicProp('disabled', false),
    createEventProp('click', () => {})
  ]

  expect(parseProps(props)).toBe(` name="coco" :age='24' :disabled='false' @click='() => { }'`)
  
});

describe('parse', () => {

  test('text node', () => {
    const tag = 'show me'
    const node = createTextNode(tag)
    expect(parse(node)).toBe(tag)
  })

  test('self close node', () => {
    const tag = 'hr'
    const node = createSelfNode(tag, createDynamicProp('style', {color: 'orange'}))
    expect(parse(node)).toBe(`<hr :style='{color:"orange"}'/>`)
  })

  test('tag node', () => {
    const tag = 'div'
    const node = createTagNode(tag, createDynamicProp("class", ['active', 'default']), createTextNode('hello'))
    expect(parse(node)).toBe(`<div :class='["active","default"]'> hello </div>`)
  })
  
  test('component node', () => {
    const tag = 'div'
    const node = createTagNode(tag, createEventProp("click", () => { }), createTextNode('hello'))
    expect(parse(node)).toBe(`<div @click='() => { }'> hello </div>`)
  })
  
});
