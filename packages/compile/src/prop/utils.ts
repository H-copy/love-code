import { 
  isString,
  isObject,
  isArray
} from '../utils/assert'
import {
  basePropType,
  Prop,
  Props
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

export function listToObj(...p: Prop[]):Props {
  return p.reduce((acc:Props, next:Prop) => ({...acc, [next.name]:next}), {})
}

export function propListOrObj(props?: Props | Prop[]):Props {
  let _props:Props = {}

  if (!props) {
    _props = {}
  }
  
  if (isArray(props)) {
    _props = listToObj(...props)
  }

  if (isObject(props)) {
    _props = props as Props
  }

  return _props
}