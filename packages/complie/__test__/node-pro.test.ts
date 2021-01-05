import { nodeType, propType } from '../src/node'
import {
  createTagNode,
  createCmpNode,
  createTextNode,
  createDynamicNode,
  createSelfNode,

  createNativeProp,
  createEventProp,
  createDynamicProp
} from '../src/node-pro'



test('createTagNode', () => {
  const tagName = 'div'
  const node = createTagNode(tagName)
  expect(node.tag).toBe(tagName)
  expect(node.type).toBe(nodeType.TAG)
});


test('createCmpNode', () => {
  const tagName = 'div'
  const node = createCmpNode(tagName)
  expect(node.tag).toBe(tagName)
  expect(node.type).toBe(nodeType.COMPONENT)
});


test('createTextNode', () => {
  const tagName = 'div'
  const node = createTextNode(tagName)
  expect(node.tag).toBe(tagName)
  expect(node.type).toBe(nodeType.TEXT)
});

test('createDynamicNode', () => {
  const tagName = 'div'
  const node = createDynamicNode(tagName)
  expect(node.tag).toBe(tagName)
  expect(node.type).toBe(nodeType.DYNAMIC)
});

test('createSelfNode', () => {
  const tagName = 'div'
  const node = createSelfNode(tagName)
  expect(node.tag).toBe(tagName)
  expect(node.type).toBe(nodeType.SELF)
});


test('createNativeProp', () => {
  const propName = 'style'
  const propValue = { color: 'orange' }
  const prop = createNativeProp(propName, propValue)
  expect(prop.type).toBe(propType.NATIVE)
  expect(prop.name).toBe(propName)
  expect(prop.value).toBe(propValue)
});


test('createEventProp', () => {
  const propName = 'click'
  const propValue = () => ({msg: 'event'})
  const prop = createEventProp(propName, propValue)
  expect(prop.type).toBe(propType.EVENT)
  expect(prop.name).toBe(propName)
  expect(prop.value).toBe(propValue)
  expect(prop.value()).toStrictEqual(propValue())
});

test('createEventProp error', () => {
  const propName = 'click'
  const propValue = [] as any
  expect(() => createEventProp(propName, propValue)).toThrow()
});


test('createDynamicProp', () => {
  const propName = 'class'
  const propValue = ['coco']
  const prop = createDynamicProp(propName, propValue)
  expect(prop.type).toBe(propType.DYNAMIC)
  expect(prop.name).toBe(propName)
  expect(prop.value).toBe(propValue)
});