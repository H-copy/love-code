import {
  Tag,
  TagType,
  IS_TAG
} from './tag'
import {
  Prop
} from '../props'
import * as assert from '../utils/assert'

import {
  isTag
} from './assert'


export function node(type: TagType, tag: any, props?: Prop[], children?: Tag[]): Tag{
  return {
    tag,
    type,
    props,
    children,
    isTag: IS_TAG,
    parent: undefined
  }
}

export function textTag(tag: any): Tag{
  if (assert.isNull(tag) || assert.isUndefined(tag)) {
    return node(TagType.TEXT, '')
  }

  if (assert.isObject(tag) || assert.isArray(tag)) {
    return node(TagType.TEXT, JSON.stringify(tag, null, 2))
  }
  
  if (assert.isString(tag) || assert.isNumber(tag)) {
    return node(TagType.TEXT, tag)
  }
    
  return node(TagType.TEXT, tag.toString())
}

export function selfTag(tag: any, props?: Prop | Prop[]): Tag {
  const _props = assert.isArray(props) ? props : props ? [ props ] : props
  return node(TagType.SELF, tag, _props)
}

/**
 * 一般标签对象
 * @param tag 标签名称
 * @param props 标签属性
 * @param children 子标签
 * @returns Tag
 * @example
 * 1. nativeTag('div')
 * 2. nativeTag('div', nativeProp('id', 'body'))
 * 3. nativeTag('div', [nativeProp('id', 'body'), nativeProp('class', 'full')])
 * 4. nativeTag('div', nativeProp('id', 'body'), nativeTag('div'))
 * 5. nativeTag('div', nativeProp('id', 'body'), 'body')
 * 
 */
export function nativeTag(tag: any, props?: Prop | Prop[], children?: any): Tag {
  const _props = assert.isArray(props) ? props : !!props ? [props] : undefined
  let _children: Tag[] | undefined

  if (assert.isArray(children)) {
    // children 为标签列表
    _children = children.map((child: any) => {
      return isTag(child) ? child : textTag(child)
    })
  } else if (isTag(children)) {
    // children 为单一 标签对象
    _children = [children]
  } else if (assert.isUndefined(children)) {
    // children 为空
    _children = undefined
  } else {
    // 其他非标签对象类型，统一转为文本标签
    _children = [textTag(children)]
  }
  
  return node(TagType.NATIVE, tag, _props, _children)
}

export function dynamiceTag(tag: any): Tag {
  return node(TagType.DYNAMIC, tag)
}
