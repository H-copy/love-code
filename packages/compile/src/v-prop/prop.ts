import { dataFormatter } from '../utils/data-fomatter'
import {
  Prop,
  BaseProp,
} from '../prop'
import { isFunction, isString } from '../utils/assert'

export enum VPropType {
  // vue
  FOR = '__FOR',
  SLOT = '__SLOT',
  MODEL = '__MODEL',
  IF = '__IF',
  EVENT = '__EVENT',
  DIRECTIVE = '__DIRECTIVE',
  REF = '__REF',
  DYNAMIC = '__DYNAMIC',
  
}

export type MixVProp = VProp | BaseProp

export class VProp implements Prop{
  constructor(public type:VPropType, public name:string,  public value?:any){
    this.name = name
    this.value = value
    this.type = type
  }

  stringify():string {
    return `${this.name}='${dataFormatter(this.value)}'`
  }

}

/**
 * 指令参数配置
 * @param name 指令名 例如: v-on
 * @param arg 指令参数 例如: v-on:click
 * @param modifiers 修饰符 例如: v-on:click.stop
 * @param isDynamic 是否为动态属性 例如: v-bind:[prop]
 * @param isSelf 是否为单指令 例如: v-pre
 */
interface VDirective{
  name: string
  arg?: string
  modifiers?: string[],
  isDynamic?: boolean,
  isSelf?: boolean
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
function vDirectiveNameFormatter(d: VDirective) {
  const { name, arg, modifiers, isDynamic, isSelf } = d
  if (isSelf) {
    return name
  }
  const _arg = !arg ? '' : isDynamic ? `:[${arg}]` : `:${arg}`
  const _modifiers = (modifiers || []).join('.')
  return `${name}${_arg}${_modifiers ? '.' + _modifiers : ''}`
}

/**
 * 指令属性
 */
export class VDirectiveProp extends VProp {
  constructor(public directive:VDirective,  public value:any){
    super(VPropType.DIRECTIVE, vDirectiveNameFormatter(directive), value)
    this.directive = directive
  }

  stringify() {
    if (this.directive.isSelf) {
      return this.directive.name
    }
    return super.stringify()
  }

  static create(name:VDirective, value:any){
    return new VDirectiveProp(name, value)
  }

}



type VEventValue = string | ((...args:any) => any)


interface VPreDirective{
  arg?: string
  modifiers?: string[]
  isDynamic?: boolean
}

/**
 * 事件属性
 */
export class VEventProp extends VProp{
  public directive: VDirective
  constructor(event:VPreDirective,  public value:VEventValue){
    super(VPropType.EVENT, vDirectiveNameFormatter({...event, name: 'v-on'}), value)
    this.directive = {
      name: 'v-on',
      ...event
    }
  }

  static create(name:VPreDirective | string, value:VEventValue){
    if (isString(name)) {
      name = {arg: name}
    }
    return new VEventProp(name, value)
  }
}


/**
 * 指令 v-bind
 */
export class VDynamiceProp extends VProp {
  public directive: VDirective
  constructor(dynamice:string,  public value:VEventValue){
    super(VPropType.DYNAMIC, vDirectiveNameFormatter({name: 'v-bind', arg: dynamice}), value)
    this.directive = {
      name: 'v-bind',
      arg: dynamice
    }
  }

  static create(dynamice:string, value:VEventValue){
    return new VDynamiceProp(dynamice, value)
  }

}


/**
 * 指令 v-model
 */
export class VModelProp extends VProp{
  public directive: VDirective
  constructor(model:string,  public value:any){
    super(VPropType.MODEL, vDirectiveNameFormatter({arg: model, name: 'v-model'}), value)
    this.directive = {
      name: 'v-model',
      arg: model
    }
  }

  static create(model:any, value?:any){
    // 匹配参数模式 v-model='value'
    if (!value && model) {
      value = model
      model = ''
    }
    return new VModelProp(model, value)
  }
}


/**
 * 指令 v-slot
 */
export class VSlotProp extends VProp{
  public directive: VDirective
  constructor(model:VPreDirective,  public value:any){
    super(VPropType.SLOT, vDirectiveNameFormatter({...model, name: 'v-slot'}), value)
    this.directive = {
      name: 'v-slot',
      ...model
    }
  }

  static create(model:VPreDirective, value:any){
    return new VSlotProp(model, value)
  }
}



/**
 * 指令 v-if
 */
export class VIfProp extends VProp{
  public directive: VDirective
  constructor(public value:string | boolean){
    super(VPropType.IF, vDirectiveNameFormatter({name: 'v-if'}), value)
    this.directive = {
      name: 'v-if',
    }
  }

  static create(value:string | boolean){
    return new VIfProp(value)
  }
}



/**
 * 指令 ref
 */
export class VRefProp extends VProp{
  public directive: VDirective
  constructor(public value:string | typeof Function){
    super(VPropType.REF, vDirectiveNameFormatter({name: 'ref'}), value)
    this.directive = {
      name: 'ref',
    }
  }

  stringify() {
    if (isFunction(this.value)) {
      return `:ref='${this.value.toString()}'`
    }
    return `ref='${this.value}'`
  }
  
  static create(value:string | typeof Function){
    return new VRefProp(value)
  }
}



export interface VForValue{
  value: number | string | any[] | typeof Object
  item?: string
  index?: string
  key?: string
}

export interface VForValueDynamice{
  dynamice: string
  item?: string
  index?: string
  key?: string
}

const DEFAULT_FOR_VALUE = {
  value: '',
  dynamice: '',
  item: 'item',
  index: 'index',
  key: 'index',
}

function mixDefaultForValue(v:VForValue | VForValueDynamice) {
  return {...DEFAULT_FOR_VALUE, ...v}
}

function isDynamicFor(d: any): d is VForValue{
  return !!d.value
}

/**
 * 指令 v-for
 * @summary 
 * 构建目标模式：
 * v=for='(item, index) of list' :key='index'
 * v-for='(item) of list' :key='item.index'
 */
export class VForProp extends VProp{
  private _key: VDynamiceProp
  constructor(public forset:VForValue | VForValueDynamice){
    super(VPropType.FOR, vDirectiveNameFormatter({name: 'v-if'}), isDynamicFor(forset) ? forset.value : forset.dynamice)
    this.forset = mixDefaultForValue(forset) 
    this._key = VDynamiceProp.create('key', (this.forset.key || this.forset.index) as string)
  }

  stringify() {
    const { item, index, key } = this.forset
    const _value = isDynamicFor(this.forset) ? `"${this.forset.value}"` : this.forset.dynamice
    const _index = index === key ? `, ${index}` : index
    return `v-for='(${item}${_index}) of ${_value}' ${this._key.stringify()}`
  }
  
  static create(model:VForValue | VForValueDynamice){
    return new VForProp(model)
  }
}
