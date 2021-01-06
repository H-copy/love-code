import {
  VPropType
} from './prop'

export function isNative(data: any): data is VPropType.NATIVE{
  return data === VPropType.NATIVE
}

export function isDynamice(data: any): data is VPropType.DYNAMIC{
  return data === VPropType.DYNAMIC
}

export function isFor(data: any): data is VPropType.FOR{
  return data === VPropType.FOR
}

export function isSlot(data: any): data is VPropType.SLOT{
  return data === VPropType.SLOT
}

export function isModel(data: any): data is VPropType.MODEL{
  return data === VPropType.MODEL
}

export function isIf(data: any): data is VPropType.IF{
  return data === VPropType.IF
}

export function isEvent(data: any): data is VPropType.EVENT{
  return data === VPropType.EVENT
}

export function isRef(data: any): data is VPropType.REF{
  return data === VPropType.REF
}

export function isSelf(data: any): data is VPropType.SELF{
  return data === VPropType.SELF
}