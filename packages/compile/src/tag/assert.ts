import {
  Tag,
  TagType,
  IS_TAG
} from './tag'


export function isTag(d: any): boolean {
  return !!d && d.isTag === IS_TAG
}

export function isNativeTag(d: any): boolean{
  return isTag(d) && d.type === TagType.NATIVE
}

export function isSlefTag(d: any): boolean{
  return isTag(d) && d.type === TagType.SELF
}

export function isDynamicTag(d: any): boolean{
  return isTag(d) && d.type === TagType.DYNAMIC
}

export function isTextTag(d: any): boolean{
  return isTag(d) && d.type === TagType.TEXT
}


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