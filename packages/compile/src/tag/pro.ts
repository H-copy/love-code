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
    isTag: IS_TAG
  }
}

export function textTag(tag: any): Tag{
  if (assert.isNull(tag) || assert.isUndefined(tag)) {
    return node(TagType.TEXT, '')
  }

  if (assert.isObject(tag)) {
    return node(TagType.TEXT, JSON.stringify(tag, null, 2))
  }
    
  return node(TagType.TEXT, tag.toString())
}

export function selfTag(tag: any, props?: Prop | Prop[]): Tag {
  const _props = assert.isArray(props) ? props : props ? [ props ] : props
  return node(TagType.SELF, tag, _props)
}

export function nativeTag(tag: any, props?: Prop | Prop[], children?: any): Tag {
  const _props = assert.isArray(props) ? props : !!props ? [props] : undefined
  let _children: Tag[] | undefined

  if (assert.isArray(children)) {
    _children = children.map((child: any) => {
      return isTag(child) ? child : textTag(child)
    })
  } else if (isTag(children)) {
    _children = [ children ]
  } else {
    _children = [textTag(children)]
  }
  
  return node(TagType.NATIVE, tag, _props, _children)
}

export function dynamiceTag(tag: any): Tag {
  return node(TagType.DYNAMIC, tag)
}
