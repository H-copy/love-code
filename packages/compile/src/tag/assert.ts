/**
 * 标签类型断言
 */
import {
  Tag,
  TagType,
  IS_TAG
} from './tag'

/**
 * 是否为节点对象
 * @param d 
 * @returns
 */
export function isTag(d: any): boolean {
  return !!d && d.isTag === IS_TAG
}

/**
 * 是否为默认节点
 * @param d 
 * @returns
 */
export function isNativeTag(d: any): boolean{
  return isTag(d) && d.type === TagType.NATIVE
}

/**
 * 是否为自闭和节点
 * @param d 
 * @returns
 */
export function isSlefTag(d: any): boolean{
  return isTag(d) && d.type === TagType.SELF
}

/**
 * 是否为动态值
 * @param d 
 * @returns
 */
export function isDynamicTag(d: any): boolean{
  return isTag(d) && d.type === TagType.DYNAMIC
}

/**
 * 是否为文本节点
 * @param d 
 * @returns
 */
export function isTextTag(d: any): boolean{
  return isTag(d) && d.type === TagType.TEXT
}

/* ts 类型断言 */


export function isTagType(d: any): d is Tag {
  return !!d && d.isTag === IS_TAG
}

export function isNativeTagType(d: any): d is Tag{
  return isTag(d) && d.type === TagType.NATIVE
}

export function isSlefTagType(d: any): d is Tag{
  return isTag(d) && d.type === TagType.SELF
}

export function isDynamicTagType(d: any): d is Tag{
  return isTag(d) && d.type === TagType.DYNAMIC
}

export function isTextTagType(d: any): d is Tag{
  return isTag(d) && d.type === TagType.TEXT
}