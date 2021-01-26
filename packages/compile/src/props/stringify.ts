import * as assert from '../utils/assert'
import {
  Prop
} from './props'
import {
  dataFormatter
} from './utils'
import {
  isNativeProp,
  isSlefProp,
  isDynamicProp,
  isEventProp,
  isModelProp,
  isIfProp,
  isRefProp,
  // isSlotProp,
  // isForProp
} from './assert'


/**
 * 生成基础属性模板
 * @param d 属性对象
 * @example
 * propStrinify(nativeProp('id', 'box'))
 * => id='box'
 */
export function propStrinify(d: Prop): string {
  return `${d.name}='${dataFormatter(d.value)}'`
}

/**
 * 生成自闭和标签模板
 * @param d 
 * @example
 * selfPropStrinify(selfProp('disabled'))
 * => 'disabled'
 */
export const selfPropStrinify = (d: Prop): string => {
  return `${d.name}`
}

/* vue 指令属性 */

/**
 * ref
 * @example
 * 1. vRefPropStringify(vRefProp('formEle'))
 * => ref='formEle'
 * 
 * 2. vRefPropStringify(vRefProp(e => {...}))
 * => :ref='e => {...}'
 */
export const vRefPropStringify = (d: Prop): string => {
  if (assert.isFunction(d.value)) {
    return `:ref='${d.value.toString()}'`
  }
  return `ref='${d.value}'`
}

function isDynamicFor(d: any): boolean{
  return !!d.value
}

/**
 * TODO
 * v-for
 * @example
 */
export const vForPropStringify = (d: Prop): string => {
  const { item, index, key } = d.forset
    const _value = isDynamicFor(d.forset) ? `"${d.forset.value}"` : d.forset.dynamice
    const _index = index === key ? `, ${index}` : index
    return `v-for='(${item}${_index}) of ${_value}' ${d._key.stringify()}`
}

/**
 * 属性模板生成器
 * @example
 * propToString(vEventProp({ arg: 'click',  modifiers: ['stop'] }, 'onClick'))
 * => v-on:click.stop='onClick'
 */
export const propToString = (d: Prop) =>{
  const formatterMap = [
    [isNativeProp,  propStrinify],
    [isDynamicProp,  propStrinify],
    [isEventProp,  propStrinify],
    [isModelProp,  propStrinify],
    [isIfProp, propStrinify],

    [isSlefProp,  selfPropStrinify],
    [isRefProp, vRefPropStringify],
    
    // [isSlotProp,  ],
    // [isForProp,  propStrinify],
  ]

  for (let i = 0; i < formatterMap.length; i++){
    const [ _if, _formatter ] = formatterMap[i]
    if (_if(d)) {
      return _formatter(d)
    }
  }
  
  return propStrinify(d)
}