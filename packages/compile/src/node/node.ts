import { isArray } from "../utils/assert"
import {
  Prop,
  Props,
  listToObj,
  propListOrObj
} from '../prop'

export interface Node{
  tag: string
  type: string
  props?: Props
  children?: Node[]
  parent?: Node
  addProp(...p:Prop[]):Node
  addChild(...n:Node[]):Node
  stringify():string
  propsStringify(): string
  childenStringify(): string
  [s: string]: any
}

export enum baseNodeType {
  TAG =  '__TAG',
  TEXT =  '__TEXT',
  SELF = '__SELF',
  CDATA = '__CDATA'
}


export class Node{
  constructor(public type:string, public tag:string, public props?:Props, public children?:Node[]){
    this.tag = tag
    this.type = type
    this.props = props || {}
    this.children = []
    children && this.addChild(...children)
  }

  addProp(...p: Prop[]): Node{
    const _props = listToObj(...p)
    this.props = this.props ? { ...this.props, ..._props } : _props
    return this
  }

  addChild(...n: Node[]): Node{
    n.map(item => item.parent = this)
    this.children = this.children ? [...this.children, ...n] : n
    return this
  }
  
  propsStringify() {
    return this.props ? Object.values(this.props).map(prop => prop.stringify()).join(' ') : ''
  }

  childenStringify():string {
    return this.children ? this.children.map(child => child.stringify()).join(' ') : ''
  }
  
  stringify():string {
    if (!this.tag) {
      throw new Error(`未找到标签名: ${this.tag}`)
    }   
    const _props = this.propsStringify()
    const _children = this.childenStringify()
    return `<${this.tag}${ _props ? ' ' + _props : '' }>${_children ? ' ' + _children + ' ' : ''}</${this.tag}>`
  }
}


export class BaseNode extends Node{
  constructor(public type:baseNodeType, public tag:string, public props = {} as Props, public children=[] as Node[]){
    super(type, tag, props, children)
  }
}


export class BaseTagNode extends BaseNode {
  constructor(public tag:string, public props = {} as Props, public children = [] as Node[]) {
    super(baseNodeType.TAG, tag, props, children)
  }
  
  static create(tag:string, props?: Props | Prop[], children?:BaseNode| BaseNode[]){
    const _props = propListOrObj(props)
    const _children = isArray(children) ? children : children ? [children] : []
    return new BaseTagNode(tag, _props, _children)
  } 
}


export class BaseTextNode extends BaseNode {
  constructor(public tag:string) {
    super(baseNodeType.TEXT, tag)
  }

  stringify() {
    return this.tag
  }
  
  static create(tag:string){
    return new BaseTextNode(tag)
  } 
}


export class BaseSelf extends BaseNode {
  constructor(public tag:string, public props = {} as Props) {
    super(baseNodeType.SELF, tag, props)
  }

  stringify() {
    return `<${this.tag} ${this.propsStringify()}/>`
  }
  
  static create(tag:string, props?:Props | Prop | Prop[]){
    return new BaseSelf(tag, propListOrObj(props))
  } 
}
