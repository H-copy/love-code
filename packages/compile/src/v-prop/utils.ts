import {
  VPropType
} from './prop'

export function isVDynamiceProp(data: any): data is VPropType.DYNAMIC{
  return data === VPropType.DYNAMIC
}

export function isVForProp(data: any): data is VPropType.FOR{
  return data === VPropType.FOR
}

export function isVSlotProp(data: any): data is VPropType.SLOT{
  return data === VPropType.SLOT
}

export function isVModelProp(data: any): data is VPropType.MODEL{
  return data === VPropType.MODEL
}

export function isVIfProp(data: any): data is VPropType.IF{
  return data === VPropType.IF
}

export function isVEventProp(data: any): data is VPropType.EVENT{
  return data === VPropType.EVENT
}

export function isVRefProp(data: any): data is VPropType.REF{
  return data === VPropType.REF
}
