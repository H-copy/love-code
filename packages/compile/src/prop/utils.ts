import { 
  isString,
  isObject,
  isArray
} from '../utils/assert'
import {
  basePropType,
  Prop
} from './prop'

export function isProp(data: any): data is Prop{
  return data.type && isString(data.type) && data.name && isString(data.name)
}

export function isNativeProp(data: any): data is basePropType.NATIVE{
  return data === basePropType.NATIVE
}

export function isDynamiceProp(data: any): data is basePropType.DYNAMIC{
  return data === basePropType.DYNAMIC
}

export function isSelfProp(data: any): data is basePropType.SELF{
  return data === basePropType.SELF
}

export function listToObj<T extends Prop>(...p: T[]):{[s:string]: T} {
  return p.reduce((acc, next) => ({...acc, [next.name]:next}), {})
}

export function propListOrObj<U extends Prop >(props?: U | U[]):{[s:string]: U} {
  let _props = {}

  if (isArray(props)) {
    _props = listToObj<U>(...props)
  }

  if (isObject(props)) {
    props = props as U
    _props = {
      [props.name]: props
    }
  }

  return _props
}