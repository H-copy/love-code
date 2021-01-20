import {
  Prop,
  BasePropType,
  VPropType,
  VDirective,
  vDirectiveNameFormatter,
  VPreDirective,
  VEventValue,
  VDirectiveProp,
  VForValue,
  VForValueDynamice,
  DEFAULT_FOR_VALUE,
  IS_PROP
} from './props'

import * as assert from '../utils/assert'

export function prop(type: string, name: string, value?: any): Prop {
  return { name, type, value, isProp: IS_PROP }
}

// 基础 DOM 属性
export function nativeProp(name: string, value?: string): Prop{
  return prop(BasePropType.NATIVE, name, value)
}

export function selfProp(name: string): Prop{
  return prop(BasePropType.SELF, name, true)
}


// VUE 属性
export function vDirective(type: VPropType, directive: VDirective, value?: any): VDirectiveProp{
  return {
    ...prop(type, vDirectiveNameFormatter({...directive}), value),
    directive
  }
}

export function vDirectiveProp(name: VDirective, value: any ): VDirectiveProp {
  return vDirective(VPropType.DIRECTIVE, name, value)
}

export function vEventProp(name: VPreDirective | string, value: VEventValue): VDirectiveProp {
  const _directive = assert.isString(name) ? { arg: name, name: 'v-on' } : { ...name, name: 'v-on' }
  return vDirective(VPropType.EVENT, _directive, value)
}

export function vDynamiceProp(name: string, value: any): VDirectiveProp {
  const _directive = { name: 'v-bind', arg: name }
  return vDirective(VPropType.DYNAMIC, _directive, value)
}

/**
 * v-model 指令属性
 * @summary
 * 需要匹配形式:
 * 1. v-model='value'
 * 2. v-model:change='value'
 */
export function vModelProp(model: any, value?: any):VDirectiveProp {
   // 匹配参数模式 v-model='value'
   if (!value && model) {
    value = model
    model = { arg: 'modelValue' }
   } else if (assert.isString(model)) {
    model = { arg: model }
  }
  
  if (!assert.isObject(model)) {
    throw new Error(`v-model 属性设置错误 ${model} ${value}`)
  }
  
  const _directive = { name: 'v-model', ...model }
  return vDirective(VPropType.MODEL, _directive, value)
}

export function vSlotProp(poistion = 'default', value?: any): VDirectiveProp{
  const _directive = { name: 'v-slot', arg: poistion }
  return vDirective(VPropType.SLOT, _directive, value)
}


export function vIfProp(value: string | boolean): VDirectiveProp{
  const _directive = { name: 'v-if' }
  return vDirective(VPropType.IF, _directive, value)
}


export function vRefProp(value: string | ((...args: any) => any)): VDirectiveProp{
  const _directive = { name: 'ref' }
  return vDirective(VPropType.REF, _directive, value)
}


export function mixDefaultForValue(v: VForValue | VForValueDynamice) {
  return {...DEFAULT_FOR_VALUE, ...v}
}

// TODO
export function isDynamicFor(d: any): d is VForValue{
  return !!d.value
}
