import {
  basePropType
} from './prop'

export function isNative(data: any): data is basePropType.NATIVE{
  return data === basePropType.NATIVE
}

export function isDynamice(data: any): data is basePropType.DYNAMIC{
  return data === basePropType.DYNAMIC
}

export function isSelf(data: any): data is basePropType.SELF{
  return data === basePropType.SELF
}