import { isArray, isString } from '../utils/assert'
import {
  Node,
  baseNodeType,
  BaseNode
} from '../node'

import {
  BaseProp
} from '../prop'

import {
  VProp,
} from '../v-prop'



function getComponentTagName(cmp: any):string {
  return isString(cmp) ? cmp : isString(cmp.name) ? cmp.name : ''
}

export type MixVProp = VProp | BaseProp
export type MixNode = VNode | BaseNode

export class VNode extends Node<baseNodeType, MixVProp> {
  constructor(public type:baseNodeType, public component:any, public props?:MixVProp[], public children?:MixNode[]){
    super(type, getComponentTagName(component), props, children)
    this.component = component
  }
}

export class VTagNode extends VNode{
  constructor(public component:any, public props?:MixVProp[], public children?:MixNode[]) {
    super(baseNodeType.TAG, component, props, children)
  }

  static create(tag:any, props?: MixVProp | MixVProp[], children?:MixNode| MixNode[]){
    const _props = isArray(props) ? props : props ? [props] : []
    const _children = isArray(children) ? children : children ? [children] : []
    return new VTagNode(tag, _props, _children)
  } 
}


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


export class VSelf extends VNode {
  constructor(public tag:any, public props: MixVProp[]) {
    super(baseNodeType.SELF, tag, props)
  }

  stringify() {
    return `<${this.tag} ${this.propsStringify()} />`
  }
  
  static create(tag:any, props?:MixVProp | MixVProp[]){
    const _props = isArray(props) ? props : props ? [props] : []
    return new VSelf(tag, _props)
  } 
}