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
export function vDirectiveProp(type: VPropType, directive: VDirective, value?: any): VDirectiveProp{
  return {
    ...prop(type, vDirectiveNameFormatter({...directive}), value),
    directive
  }
}

export function vDirective(name: VDirective, value: any ): VDirectiveProp {
  return vDirectiveProp(VPropType.DIRECTIVE, name, value)
}

export function vEventProp(name: VPreDirective | string, value: VEventValue): VDirectiveProp {
  const _directive = assert.isString(name) ? { arg: name, name: 'v-on' } : { ...name, name: 'v-on' }
  return vDirectiveProp(VPropType.EVENT, _directive, value)
}

export function vDynamiceProp(name: string, value: any): VDirectiveProp {
  const _directive = { name: 'v-bind', arg: name }
  return vDirectiveProp(VPropType.DYNAMIC, _directive, value)
}

export function vModelProp(model: any, value?: any):VDirectiveProp {
   // 匹配参数模式 v-model='value'
   if (!value && model) {
    value = model
    model = ''
  }
  const _directive = { name: 'v-model', arg: model }
  return vDirectiveProp(VPropType.MODEL, _directive, value)
}

export function vSlotProp(model: VPreDirective, value: any): VDirectiveProp{
  const _directive = { name: 'v-slot', ...model }
  return vDirectiveProp(VPropType.SLOT, _directive, value)
}


export function vIfProp(value: string | boolean): VDirectiveProp{
  const _directive = { name: 'v-if' }
  return vDirectiveProp(VPropType.IF, _directive, value)
}


export function vRefProp(value: string | typeof Function): VDirectiveProp{
  const _directive = { name: 'ref' }
  return vDirectiveProp(VPropType.REF, _directive, value)
}


export function mixDefaultForValue(v:VForValue | VForValueDynamice) {
  return {...DEFAULT_FOR_VALUE, ...v}
}

export function isDynamicFor(d: any): d is VForValue{
  return !!d.value
}
