import { isArray, isString } from '../utils/assert'
import { tagNameFormatter } from '../utils'
import {
  Node,
  baseNodeType
} from '../node'

import {
  propListOrObj,
} from '../prop'

import {
  VProps,
  MixVProp
} from '../v-prop'

function getComponentTagName(cmp: any):string {
  return isString(cmp) ? cmp : isString(cmp.name) ? cmp.name : ''
}

export class VNode extends Node{
  constructor(public type:baseNodeType, public component:any, public props?:VProps, public children?:Node[]){
    super(type, tagNameFormatter(getComponentTagName(component)), props, children)
    this.component = component
  }
}

/**
 * 组件标签
 * @summary
 * 例如: <cmp></cmp>
 */
export class VTagNode extends VNode{
  constructor(public component:any, public props?:VProps, public children?:Node[]) {
    super(baseNodeType.TAG, component, props, children)
  }

  static create(tag:any, props?: MixVProp | MixVProp[], children?:Node| Node[]){
    const _children = isArray(children) ? children : children ? [children] : []
    return new VTagNode(tag, propListOrObj(props), _children)
  } 
}


/**
 * 动态文本节点
 * @summary
 * 例如: {{ content }}
 */
export class VTextNode extends VNode {
  constructor(public component:string) {
    super(baseNodeType.TEXT, component)
  }

  stringify() {
    return `{{ ${this.tag} }}`
  }
  
  static create(tag:string){
    return new VTextNode(tag)
  } 
}


/**
 * 自闭合标签
 * @summary
 * 例如: <cmp /> 
 */
export class VSelf extends VNode {
  constructor(public tag:any, public props:VProps) {
    super(baseNodeType.SELF, tag, props)
  }

  stringify() {
    return `<${this.tag} ${this.propsStringify()}/>`
  }
  
  static create(tag:any, props?:MixVProp | MixVProp[]){
    return new VSelf(tag, propListOrObj(props))
  } 
}
