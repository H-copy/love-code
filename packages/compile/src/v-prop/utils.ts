import {
  VPropType,

  VDynamiceProp,
  VEventProp,
  VForProp,
  VModelProp,
  VIfProp,
  VRefProp,
  VSlotProp
} from './prop'

export function isVDynamiceProp(data: any): data is VDynamiceProp{
  return data.type === VPropType.DYNAMIC
}

export function isVForProp(data: any): data is VForProp{
  return data.type === VPropType.FOR
}

export function isVSlotProp(data: any): data is VSlotProp{
  return data.type === VPropType.SLOT
}

export function isVModelProp(data: any): data is VModelProp{
  return data.type === VPropType.MODEL
}

export function isVIfProp(data: any): data is VIfProp{
  return data.type === VPropType.IF
}

export function isVEventProp(data: any): data is VEventProp{
  return data.type === VPropType.EVENT
}

export function isVRefProp(data: any): data is VRefProp{
  return data.type === VPropType.REF
}
