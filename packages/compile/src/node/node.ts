import { isArray } from "../utils/assert"

import {
  BaseProp
} from '../prop'

interface Prop {
  name: string
  type: any
  value?: any
  stringify(): string
  [s:string]:any
}

export interface Node<NT, PT extends Prop>{
  tag: string
  type: NT
  props?: PT[]
  children?: Node<NT, PT>[]
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

export class Node<NT, PT extends Prop>{
  constructor(public type:NT, public tag:string, public props?:PT[], public children?:Node<NT, PT>[]){
    this.tag = tag
    this.type = type
    this.props = props
    this.children = children
  }

  propsStringify() {
    return this.props ? this.props.map(prop => prop.stringify()).join(' ') : ''
  }

  childenStringify():string {
    return this.children ? this.children.map(child => child.stringify()).join(' ') : ''
  }
  
  stringify():string {
    if (!this.tag) {
      throw new Error(`未找到标签名: ${this.tag}`)
  }
    return `<${this.tag} ${this.propsStringify()}> ${this.childenStringify()} </${this.tag}>`
  }
}




export class BaseNode extends Node<baseNodeType, BaseProp>{
  constructor(public type:baseNodeType, public tag:string, public props = [] as BaseProp[], public children=[] as BaseNode[]){
    super(type, tag, props, children)
  }
}


export class BaseTagNode extends BaseNode {
  constructor(public tag:string, public props = [] as BaseProp[], public children = [] as BaseNode[]) {
    super(baseNodeType.TAG, tag, props, children)
  }
  
  static create(tag:string, props?: BaseProp | BaseProp[], children?:BaseNode| BaseNode[]){
    const _props = isArray(props) ? props : props ? [props] : []
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
  constructor(public tag:string, public props = [] as BaseProp[]) {
    super(baseNodeType.SELF, tag, props)
  }

  stringify() {
    return `<${this.tag} ${this.propsStringify()} />`
  }
  
  static create(tag:string, props?:BaseProp | BaseProp[]){
    const _props = isArray(props) ? props : props ? [props] : []
    return new BaseSelf(tag, _props)
  } 
}
