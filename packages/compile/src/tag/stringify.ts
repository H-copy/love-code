import {
  Tag
} from './tag'

import {
  propToString
} from '../props'

import {
  isSlefTag,
  isTextTag,
  isDynamicTag
} from './assert'
import { assert } from 'vx-tools'

import {
  tagNameFormatter
} from '../utils'

export function getTagName(t: any): string {
  return tagNameFormatter(assert.isString(t) ? t : !!t ? t.name : '') 
}

export interface GetTagName {
  (t: Tag): string
}

export function tagtoString(t: Tag, gTag:GetTagName = getTagName ): string{
  const { tag, props, children } = t

  if (isTextTag(t)) {
    return tag
  }
  
  const _tag = gTag(tag)
  if (!_tag) {
    console.error(`无法找到标签名称: ${JSON.stringify(t, null, 2)}`)
    return ''
  }
  
  

  const _propsStr =  props ? Object.values(props).map(p => propToString(p)).join(' ') : ''
  
  if (isDynamicTag(t)) {
    return `{{ ${_tag} }}`
  }
    
  if (isSlefTag(t)) {
    return `<${_tag} ${_propsStr}/>`
  }

  const _childrenStr = children ? children.map(item => tagtoString(item)).join(' ') : ''
  return `<${_tag} ${_propsStr}>${_childrenStr}</${_tag}>`
}

