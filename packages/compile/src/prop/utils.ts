import { 
  isString,
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

// export function listToObj<T extends Prop>(...p: T[]):{[s:string]: T} {
//   return p.reduce((acc, next) => ({...acc, [next.name]:next}), {})
// }

export function propListOrObj<U extends Prop >(props?: U | U[]):U[] {
  return isArray(props) ? props : props ? [props] : []
}