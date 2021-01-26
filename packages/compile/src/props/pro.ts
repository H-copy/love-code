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

import { assert } from 'vx-tools'

/**
 * 创建基础属性对象
 * @param type 属性类型
 * @param name 属性名称
 * @param value 属性值
 * @returns { Prop }
 * @example 
 * prop(BasePropType.NATIVE, 'id', 'container')
 * => { 
 *    name: 'id',
 *    value: 'container',
 *    type: '__NATIVE',
 *    isProp: '__Prop'
 *  }
 */
export function prop(type: string, name: string, value?: any): Prop {
  return { name, type, value, isProp: IS_PROP }
}

/* 基础 DOM 属性 */
export function nativeProp(name: string, value?: string): Prop {
  return prop(BasePropType.NATIVE, name, value)
}

export function selfProp(name: string): Prop {
  return prop(BasePropType.SELF, name, true)
}


/* VUE 指令属性 */

/**
 * 创建基础指令对象
 * @summary 
 * 这里将指令看做一类 vue 标签属性, 通过指令配置生成对应的
 * 属性名称, 例如： { name: 'v-on', arg: 'click', modifiers: ['stop] }
 * => 'v-on:click.stop'
 * @param type 属性类型
 * @param directive 指令配置
 * @param value 属性值
 * @returns { VDirectiveProp }
 * @example
 * vDirective(VPropType.DIRECTIVE, { name: 'h-size', arg: 'full' }, { width: 100, height: 100 })
 * => {
 *    name: 'h-size:full',
 *    value: { width: 100, height: 100 },
 *    type: '__DIRECTIVE',
 *    isProp: '__Prop',
 *    directive: { name: 'h-size', arg: 'full' } // 指令配置缓存, 提供给渲染器生成对应指令
 *  }
 */
export function vDirective(type: VPropType, directive: VDirective, value?: any): VDirectiveProp {
  return {
    ...prop(type, vDirectiveNameFormatter({ ...directive }), value),
    directive
  }
}

/**
 * 创建基础指令对象
 * @param name 指令配置
 * @param value 
 * @returns { VDirectiveProp }
 * @example
 * vDirectiveProp({ name: 'v-on', arg: 'click' }, 'onClick')
 * => {
 *   name: 'v-on:click',
 *   type: '__DIRECTIVE',
 *   value: 'onClick',
 *   isProp: '__Prop',
 *   directive: { name: 'v-on', arg: 'click' }
 * }
 */
export function vDirectiveProp(name: VDirective, value: any): VDirectiveProp {
  return vDirective(VPropType.DIRECTIVE, name, value)
}

/**
 * 创建事件指令对象
 * @param name 指令对象 | 事件名 
 * @param value 挂载属性 | 事件函数
 * @example
 * 1. vEventProp('click', 'onClick')
 * => {
 *    name: 'v-on:click',
 *    type: '__EVENT',
 *    value: 'onClick',
 *    isProp: '__Prop',
 *    directive: { name: 'v-on', arg: 'click' }
 * }
 * 
 * 2. vEventProp('click', () => {})
 * => {
 *   value: () => {},
 *   ...
 *  }
 * 
 * 3. vEventProp({ arg: 'click', modifiers: ['stop'] }, 'onClick')
 * => {
 *  name: 'v-on:click.stop',
 *  value: 'onClick',
 *  ...
 * }
 * 
 */
export function vEventProp(name: VPreDirective | string, value: VEventValue): VDirectiveProp {
  const _directive = assert.isString(name) ? { arg: name, name: 'v-on' } : { ...name, name: 'v-on' }
  return vDirective(VPropType.EVENT, _directive, value)
}


/**
 * 创建动态绑定指令对象
 * @param name 绑定属性名
 * @param value 挂载属性
 * @example
 * 1. vDynamiceProp('name', 'userName')
 * => {
 *    name: 'v-bind:name',
 *    type: '__DYNAMIC',
 *    value: 'userName',
 *    isProp: '__Prop',
 *    directive: { name: 'v-bind', arg: 'name' }
 * }
 * 
 * 2. vDynamiceProp('name', ['01', '02'])
 * => {
 *   value: ['01', '02']
 * }
 */
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
 * @example
 * 1. vModelProp('title')
 * => {
 *    name: 'v-model:modelValue',
 *    type: '__MODEL',
 *    value: 'title',
 *    isProp: '__Prop',
 *    directive: { name: 'v-model', arg: 'modelValue' }
 * }
 * 
 * 2. vModelProp('value', 'id')
 * => {
 *    name: 'v-model:value',
 *    type: '__MODEL',
 *    value: 'id',
 *    isProp: '__Prop',
 *    directive: { name: 'v-model', arg: 'value' }
 * }
 */
export function vModelProp(model: any, value?: any): VDirectiveProp {
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

/**
 * v-slot 指令属性
 * @param poistion 插槽名称
 * @param value 插槽值
 * @example
 * 1. vSlotProp()
 * => {
 *  name: 'v-slot:default',
 *  type: '__SLOT',
 *  value: undefined,
 *  isProp: '__Prop',
 *  directive: { name: 'v-slot', arg: 'default' }
 * }
 */
export function vSlotProp(poistion = 'default', value?: any): VDirectiveProp {
  const _directive = { name: 'v-slot', arg: poistion }
  return vDirective(VPropType.SLOT, _directive, value)
}

/**
 * v-if 指令属性
 * @param value 挂载属性名 | 布尔值
 * @example
 * 1. vIfProp('visibal')
 * => {
 *   name: 'v-if',
 *   type: '__IF',
 *   value: 'visibal',
 *   isProp: '__Prop',
 *   directive: { name: 'v-if' }
 * }
 * 
 * 2. vIfProp(true)
 * => {
 *   value: true,
 *   ...
 * }
 */
export function vIfProp(value: string | boolean): VDirectiveProp {
  const _directive = { name: 'v-if' }
  return vDirective(VPropType.IF, _directive, value)
}


/**
 * ref 指令
 * @param value 挂载名称，或挂载方法
 * @returns 返回指令属性对象
 * @example
 * 
 * 1. vRefProp('formEle')
 * => {
 *  name: 'ref,
 *  type: __IF,
 *  value: 'formEle',
 *  isProp: '__Prop',
 *  _directive: { name: 'ref' }
 * }
 * 
 * 2. vRefProp(ele => {...})
 * => {
 *  value: ele => {...},
 *  ...
 * }
 */
export function vRefProp(value: string | ((...args: any) => any)): VDirectiveProp {
  const _directive = { name: 'ref' }
  return vDirective(VPropType.REF, _directive, value)
}


export function mixDefaultForValue(v: VForValue | VForValueDynamice) {
  return { ...DEFAULT_FOR_VALUE, ...v }
}

// TODO
// v-if
export function isDynamicFor(d: any): d is VForValue {
  return !!d.value
}
