export interface Node<NT,PT>{
  tag: any
  type: NT
  props: PT[]
  children: Node<NT, PT>[]
  [s:string]: any
}

export enum baseNodeType {
  TAG =  '__TAG',
  TEXT =  '__TEXT',
  SELF = '__SELF',
  CDATA = '__CDATA'
}


export class BaseNode implements Node<baseNodeType, any>{
  constructor(public tag:any, public type:baseNodeType, public props = [] as any[], public children=[] as BaseNode[]){
    this.tag = tag
    this.type = type
    this.props = props
    this.children = children
  }

  static create<T>(tag:any, type:baseNodeType, props?:T[], children?:BaseNode[]){
    return new BaseNode(tag, type, props, children)
  } 
}
