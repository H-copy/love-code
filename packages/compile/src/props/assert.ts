import {
  IS_PROP,
  Prop,
  BasePropType,
  VPropType
} from './props'

export function isProp(d: any): d is Prop {
  return d.isProp === IS_PROP
}

export function isNativeProp(d: any): d is Prop{
  return isProp(d) && d.type === BasePropType.NATIVE
}

export function isSlefProp(d: any): d is Prop{
  return isProp(d) && d.type === BasePropType.SELF
}

export function isDynamicProp(d: any): d is Prop{
  return isProp(d) && d.type === VPropType.DYNAMIC
}

export function isEventProp(d: any): d is Prop{
  return isProp(d) && d.type === VPropType.EVENT
}

export function isModelProp(d: any): d is Prop{
  return isProp(d) && d.type === VPropType.MODEL
}

export function isSlotProp(d: any): d is Prop{
  return isProp(d) && d.type === VPropType.SLOT
}

export function isIfProp(d: any): d is Prop{
  return isProp(d) && d.type === VPropType.IF
}

export function isForProp(d: any): d is Prop{
  return isProp(d) && d.type === VPropType.FOR
}

export function isRefProp(d: any): d is Prop{
  return isProp(d) && d.type === VPropType.REF
}

