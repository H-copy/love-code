import {
  Prop
} from '../props'

export enum TagType{
  NATIVE = '__NATIVE',
  SELF = '__SELF',
  DYNAMIC = '__DYNAMIC',
  TEXT = '__TEXT'
}

export const IS_TAG = '__TAG'

export interface Tag {
  isTag: '__TAG'
  tag: any
  type: TagType
  props?: Prop[]
  children?: Tag[]
  parent?: Tag
  [s:string]: any
}