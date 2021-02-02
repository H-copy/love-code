export const IS_PROP = '__Prop'

/**
 * 基础属性对象
 * @prop name 属性名
 * @prop type 属性类型
 * @prop value 属性值
 * @prop isProp Prop 属性对象判断标识
 */
export interface Prop {
  name: string
  type: string
  value: any
  isProp: '__Prop'
  [s: string]: any
}

/**
 * dom 属性类型
 */
export enum BasePropType {
  NATIVE = '__NATIVE',
  SELF = '__SELF',
}

/**
 * vue 指令属性类型
 */
export enum VPropType {
  FOR = '__FOR',
  SLOT = '__SLOT',
  MODEL = '__MODEL',
  IF = '__IF',
  EVENT = '__EVENT',
  DIRECTIVE = '__DIRECTIVE',
  REF = '__REF',
  DYNAMIC = '__DYNAMIC',
}

/**
 * 属性集合
 */
export interface Props {
  [k: string]: Prop
}

/**
 * 指令参数配置
 * @prop name 指令名 例如: v-on
 * @prop arg 指令参数 例如: v-on:click
 * @prop modifiers 修饰符 例如: v-on:click.stop
 * @prop isDynamic 是否为动态属性 例如: v-bind:[prop]
 * @prop isSelf 是否为单指令 例如: v-pre
 */
export interface VDirective {
  name: string
  arg?: string
  modifiers?: string[],
  isDynamic?: boolean,
  isSelf?: boolean
}

/**
 * vue 指令属性
 * @prop directive 指令配置
 */
export interface VDirectiveProp extends Prop {
  directive: VDirective
}

/**
 * 构建指令属性名
 * @summary 构建通用vue执行
 * 构建目标模式：
 * v-pre
 * v-model='value'
 * v-slot:footer='links'
 * v-on:click.stop='onChange'
 * v-bind:[prop]='value'
 */
export function vDirectiveNameFormatter(d: VDirective) {
  const { name, arg, modifiers, isDynamic, isSelf } = d
  if (isSelf) {
    return name
  }
  const _arg = !arg ? '' : isDynamic ? `:[${arg}]` : `:${arg}`
  const _modifiers = (modifiers || []).join('.')
  return `${name}${_arg}${_modifiers ? '.' + _modifiers : ''}`
}

/**
 * vue 指令配置对象
 */
export interface VPreDirective {
  arg?: string
  modifiers?: string[]
  isDynamic?: boolean
}

/**
 * 函数类型
 */
export type VEventValue = string | ((...args: any) => any)


/**
 * v-for 指令接口
 */
export interface VForValue {
  value: number | string | any[] | typeof Object
  item?: string
  index?: string
  key?: string
}

export interface VForValueDynamice {
  dynamice: string
  item?: string
  index?: string
  key?: string
}

/**
 * v-for 指令默认配置
 */
export const DEFAULT_FOR_VALUE = {
  value: '',
  dynamice: '',
  item: 'item',
  index: 'index',
  key: 'index',
}

