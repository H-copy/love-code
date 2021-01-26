import {
  propToString,
  nativeProp,
  selfProp,

  vDynamiceProp,
  vModelProp,
  vEventProp,
  vIfProp,
  vRefProp
} from '../../src/props'

describe('props stringify', () => {

  test('propToString native', () => {
    const _p = nativeProp('id', 'box')
    expect(propToString(_p)).toBe(`id='box'`)
  })

  test('propToString self', () => {
    const _p = selfProp('disabled')
    expect(propToString(_p)).toBe(`disabled`)
  })

  test('propToString dynamic', () => {
    const _p = vDynamiceProp('class', ['active', 'small'])
    expect(propToString(_p)).toBe(`v-bind:class='["active","small"]'`)
  })

  test('propToString model only', () => {
    const _p = vModelProp('userName')
    expect(propToString(_p)).toBe(`v-model:modelValue='userName'`)
  })

  test('propToString model bind name', () => {
    const _p = vModelProp('title','articleTitle')
    expect(propToString(_p)).toBe(`v-model:title='articleTitle'`)
  })

  test('propToString event onlye', () => {
    const _p = vEventProp('click','onClick')
    expect(propToString(_p)).toBe(`v-on:click='onClick'`)
  })

  test('propToString event modifier', () => {
    const _p = vEventProp({ arg: 'click', modifiers: ['stop'] },'onClick')
    expect(propToString(_p)).toBe(`v-on:click.stop='onClick'`)
  })

  test('propToString event expression', () => {
    const _p = vEventProp({ arg: 'click', modifiers: ['stop'] }, (d) => console.log(d))
    expect(propToString(_p)).toBe(`v-on:click.stop='(d) => console.log(d)'`)
  })
  
  test('propToString if only', () => {
    const _p = vIfProp('visibal')
    expect(propToString(_p)).toBe(`v-if='visibal'`)
  })
  
  test('propToString if boolean', () => {
    const _p = vIfProp(false)
    expect(propToString(_p)).toBe(`v-if='false'`)
  })

  test('propToString ref only', () => {
    const _p = vRefProp('form')
    expect(propToString(_p)).toBe(`ref='form'`)
  })
  
  test('propToString ref expression', () => {
    const _p = vRefProp(d => console.log(d))
    expect(propToString(_p)).toBe(`:ref='d => console.log(d)'`)
  })
  
})
