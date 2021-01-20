import {
  nativeTag,
  TagType,
  IS_TAG,
  textTag,
  selfTag
} from '../../src/tag'
import {
  nativeProp
} from '../../src/props'

describe('tag pro', () => {

  test('nativeTag only tag', () => {
    const c = nativeTag('span')
    expect(c).toMatchObject({
      isTag: IS_TAG,
      tag: 'span',
      parent: undefined,
      type: TagType.NATIVE,
      props: undefined,
      children: undefined,
    })
  })

  test('nativeTag one prop', () => {
    const p = nativeProp('id', 'container')
    const c = nativeTag('div', p)

    expect(c).toMatchObject({
      isTag: IS_TAG,
      tag: 'div',
      parent: undefined,
      type: TagType.NATIVE,
      props: [p],
      children: undefined,
    })
  
  })

  test('nativeTag prop list', () => {
    const p1 = nativeProp('id', 'container')
    const p2 = nativeProp('class', 'full')
    const c = nativeTag('div', [p1, p2])

    expect(c).toMatchObject({
      isTag: IS_TAG,
      tag: 'div',
      parent: undefined,
      type: TagType.NATIVE,
      props: [p1, p2],
      children: undefined,
    })
  
  })

  /**
   * 非 Tag 类型统一转为 TextTag 作为纯文本标记
   */
  test('nativeTag children is not Tag', () => {
    const p = nativeProp('id', 'container')
    const child = 'click me'
    const c = nativeTag('button', p, child)
    expect(c).toMatchObject({
      isTag: IS_TAG,
      tag: 'button',
      parent: undefined,
      type: TagType.NATIVE,
      props: [p],
      children: [
        textTag(child)
      ],
    })
  })

  test('nativeTag one children', () => {
    const p = nativeProp('id', 'container')
    const child = nativeTag('h1', undefined, 'title')
    const c = nativeTag('div', p, child)
    expect(c).toMatchObject({
      isTag: IS_TAG,
      tag: 'div',
      parent: undefined,
      type: TagType.NATIVE,
      props: [p],
      children: [ child ],
    })
  })

  test('nativeTag children list', () => {
    const p = nativeProp('id', 'container')
    const child1 = nativeTag('h1', undefined, 'title')
    const child2 = nativeTag('p', undefined, 'more more more')
    const c = nativeTag('div', p, [ child1, child2 ])
    expect(c).toMatchObject({
      isTag: IS_TAG,
      tag: 'div',
      parent: undefined,
      type: TagType.NATIVE,
      props: [p],
      children: [ child1, child2 ],
    })
  })

  test('textTag null or undefined', () => {
    expect(textTag(undefined)).toMatchObject({
      isTag: IS_TAG,
      tag: '',
      parent: undefined,
      type: TagType.TEXT,
      props: undefined,
      children: undefined
    })

    expect(textTag(null)).toMatchObject({
      isTag: IS_TAG,
      tag: '',
      parent: undefined,
      type: TagType.TEXT,
      props: undefined,
      children: undefined
    })
  })

  test('textTag object or array', () => {
    const obj = { name: 'coco', age: 14 }
    expect(textTag(obj).tag).toBe(JSON.stringify(obj, null, 2))
    const arr = [obj, obj]
    expect(textTag(arr).tag).toBe(JSON.stringify(arr, null, 2))
  })

  test('textTag string or number', () => {
    const str = 'str'
    expect(textTag(str).tag).toBe(str)
    const num = 0
    expect(textTag(num).tag).toBe(0)
  })
  
  test('textTag other', () => {
    const fn = () => console.log('fn')
    expect(textTag(fn).tag).toBe(fn.toString())
  })


  test('selfTag', () => {
    const p = nativeProp('id', 'line')
    expect(selfTag('hr', p)).toMatchObject({
      isTag: IS_TAG,
      type: TagType.SELF,
      parent: undefined,
      tag: 'hr',
      props: [p],
      children: undefined
    })
  })
  
})