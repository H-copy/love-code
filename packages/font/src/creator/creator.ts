import { isArray } from '@/utils/assert'
import * as compile from '@love-code/compile'
import { getCmpMark } from './utils'

export interface TTag extends compile.Tag{
  id: string
  name: string
  parent: TTag
  parentId: string
  children: TTag[]
}

const tagFn = {
  nativeTag: compile.nativeTag,
  dynamiceTag: compile.dynamiceTag,
  textTag: compile.textTag,
  selfTag: compile.selfTag,
}

type TagCreate = keyof typeof tagFn

const propFn = {
  nativeProp: compile.nativeProp,
  selfProp: compile.selfProp,
  vEventProp: compile.vEventProp,
  vDynamiceProp: compile.vDynamiceProp,
  vModelProp: compile.vModelProp,
  vIfProp: compile.vIfProp,
  vSlotProp: compile.vSlotProp,
  vRefProp: compile.vRefProp,
  isDynamicFor: compile.isDynamicFor,
}

export type PropCreate = keyof typeof propFn

export interface PropMod{
  type: PropCreate,
  name: string
  value?: any
}

export interface CmpMod{
  component: any,
  type: TagCreate,
  name: string,
  props?: PropMod[]
  img?: string
} 

export function propCreator(mod: PropMod) {
  const _creator = propFn[mod.type]
  if (!_creator) {
    console.error(`未找到属性构建方法： ${mod.type}`)
    return undefined
  }
  return _creator(mod.name, mod.value) as compile.Prop
}

export function propListCreator(mod: PropMod | PropMod[]) {
  const _mods = isArray(mod) ? [...mod] : [mod]
  return _mods.reduce((acc, next) => {
    const _p = propCreator(next)
    return _p ? [...acc, _p] : acc
  }, [] as compile.Prop[])
}


export function tagCreator(mod: CmpMod, parentId?: string): TTag {
  const {
    component,
    type,
    props,
    name
  } = mod
  const _creator = compile[type]
  if (!_creator) {
    throw (new Error(`未找到组件构建方法： ${type}`))
  }
  const _props = props ? propListCreator(props) : undefined
  const _tag = _creator(component, _props)
  _tag.id = getCmpMark()
  _tag.name = name
  _tag.parentId = parentId
  return _tag as TTag
}




