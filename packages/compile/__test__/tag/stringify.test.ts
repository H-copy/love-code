import {
  tagtoString,
  textTag,
  selfTag,
  nativeTag
} from '../../src/tag'

import {
  nativeProp,
  vDynamiceProp,
  vModelProp,
  vEventProp
} from '../../src/props'


describe('tag stringify', () => {

  test('textTag', () => {
    const _t = textTag('show me')
    expect(tagtoString(_t)).toBe('show me')
  })

  test('textTag empty', () => {
    expect(tagtoString(textTag(undefined))).toBe('')
    expect(tagtoString(textTag(null))).toBe('')
    expect(tagtoString(textTag(''))).toBe('')
  })

  test('slefTag nativeProp', () => {
    const _t = selfTag(
      'hr',
      nativeProp('class', 'line')
    )
    expect(tagtoString(_t)).toBe(`<hr class='line'/>`)
  })

  test('slefTag v-bind', () => {
    const _t = selfTag(
      'hr',
      vDynamiceProp('class', ['active'])
    )
    expect(tagtoString(_t)).toBe(`<hr v-bind:class='["active"]'/>`)
  })

  test('slefTag v-model', () => {
    const _t = selfTag(
      'input',
      vModelProp('name')
    )
    expect(tagtoString(_t)).toBe(`<input v-model:modelValue='name'/>`)
  })

  test('slefTag v-on', () => {
    const _t = selfTag(
      'input',
      vEventProp('input', 'onInput')
    )
    expect(tagtoString(_t)).toBe(`<input v-on:input='onInput'/>`)
  })



  test('nativeTag nativeProp', () => {
    const _t = nativeTag(
      'div',
      nativeProp('class', 'box')
    )
    expect(tagtoString(_t)).toBe(`<div class='box'></div>`)
  })

  test('nativeTag v-bind', () => {
    const _t = nativeTag(
      'span',
      vDynamiceProp('class', ['active'])
    )
    expect(tagtoString(_t)).toBe(`<span v-bind:class='["active"]'></span>`)
  })

  test('nativeTag children', () => {
    const _t1 = nativeTag(
      'span',
      vDynamiceProp('class', ['active'])
    )

    const _t2 = nativeTag(
      'div',
      nativeProp('id','box'),
      _t1
    )
    expect(tagtoString(_t2)).toBe(`<div id='box'><span v-bind:class='["active"]'></span></div>`)
  })

})