/**
 * 属性断言
 */
import {
  IS_PROP,
  Prop,
  BasePropType,
  VPropType
} from './props'

/**
 * 是否为属性对象 
 * @param d 
 * @returns
 */
export function isProp(d: any): d is Prop {
  return d.isProp === IS_PROP
}

/**
 * 是否为默认属性
 * @param d 
 * @returns
 */
export function isNativeProp(d: any): d is Prop{
  return isProp(d) && d.type === BasePropType.NATIVE
}

/**
 * 是否为单属性
 * @param d 
 */
export function isSlefProp(d: any): d is Prop{
  return isProp(d) && d.type === BasePropType.SELF
}

/**
 * 是否为动态属性
 * @param d 
 */
export function isDynamicProp(d: any): d is Prop{
  return isProp(d) && d.type === VPropType.DYNAMIC
}

/**
 * 是否为 v-on属性
 * @param d 
 * @returns
 */
export function isEventProp(d: any): d is Prop{
  return isProp(d) && d.type === VPropType.EVENT
}

/**
 * 是否为 v-model属性
 * @param d 
 * @returns
 */
export function isModelProp(d: any): d is Prop{
  return isProp(d) && d.type === VPropType.MODEL
}

/**
 * 是否为 v-slot属性
 * @param d 
 * @returns
 */
export function isSlotProp(d: any): d is Prop{
  return isProp(d) && d.type === VPropType.SLOT
}

/**
 * 是否为 v-if属性
 * @param d 
 * @returns
 */
export function isIfProp(d: any): d is Prop{
  return isProp(d) && d.type === VPropType.IF
}

/**
 * 是否为 v-for属性
 * @param d 
 * @returns
 */
export function isForProp(d: any): d is Prop{
  return isProp(d) && d.type === VPropType.FOR
}

/**
 * 是否为 ref属性
 * @param d 
 * @returns
 */
export function isRefProp(d: any): d is Prop{
  return isProp(d) && d.type === VPropType.REF
}

