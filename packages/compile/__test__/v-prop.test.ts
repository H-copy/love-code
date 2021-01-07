
import {
  VPropType,

  VDirectiveProp,
  VEventProp,
  VDynamiceProp,
  // VModelProp,
  // VSlotProp,
  // VIfProp,
  // VForValue,
  // VForProp,
} from '../src/v-prop'


describe('VDirectiveProp', () => {

  test('self directive: only', () => {
    expect(VDirectiveProp.create({
      name: 'l-self',
    }, 'data').stringify()).toBe(`l-self='data'`)
  })

  test('self directive: arg', () => {
    expect(VDirectiveProp.create({
      name: 'l-self',
      arg: 'active'
    }, 'data').stringify()).toBe(`l-self:active='data'`)
  })

  test('self directive: modifiers', () => {
    expect(VDirectiveProp.create({
      name: 'l-self',
      modifiers: ['stop', 'pop']
    }, 'data').stringify()).toBe(`l-self.stop.pop='data'`)
  })

  test('self directive: modifiers', () => {
    expect(VDirectiveProp.create({
      name: 'l-self',
      isSelf: true
    }, 'data').stringify()).toBe(`l-self`)
  })

  test('self directive: arg modifiers isDynamic', () => {
    expect(VDirectiveProp.create({
      name: 'l-self',
      arg: 'type',
      modifiers: ['stop', 'pop'],
      isDynamic: true
    }, 'data').stringify()).toBe(`l-self:[type].stop.pop='data'`)
  })
  
})

describe('VEventProp', () => {

  const type1 = "v-on:click='onClick'"
  test(type1, () => {
    expect(VEventProp.create({
      arg: 'click',
    }, 'onClick').stringify()).toBe(type1)

  })

  const type2 = `v-on:click='() => { true ? "a" : "b"; }'`
  test(type2, () => {
    expect(VEventProp.create({
      arg: 'click',
    }, () => { true ? "a" : "b" }).stringify()).toBe(type2)
  })

  const type3 = `v-on:click.stop='() => { true ? "a" : "b"; }'`
  test(type3, () => {
    expect(VEventProp.create({
      arg: 'click',
      modifiers: ['stop']
    }, () => { true ? "a" : "b" }).stringify()).toBe(type3)
  })

  const type4 = `v-on:[event].stop='() => { true ? "a" : "b"; }'`
  test(type4, () => {
    expect(VEventProp.create({
      arg: 'event',
      modifiers: ['stop'],
      isDynamic: true,
    }, () => { true ? "a" : "b" }).stringify()).toBe(type4)
  })
  
})

describe('VDynamiceProp', () => {

  test('type', () => {
    expect(VDynamiceProp.create('prop', 'value').type).toBe(VPropType.DYNAMIC)
  })

  const type1 = `v-bind:prop='value'`
  test(type1, () => {
    expect(VDynamiceProp.create('prop', 'value').stringify()).toBe(type1)
  })

})