

export enum nodeType {
  TAG =  '__TAG',
  COMPONENT =  '__COMPONENT',
  DYNAMIC =  '__DYNAMIC',
  TEXT =  '__TEXT',
  SELF =  '__SELF'
}


export class Node{
  constructor(public tag:any, public type:nodeType, public props = [] as Prop[], public child=[] as Node[]){
    this.tag = tag
    this.type = type
    this.props = props
    this.child = child
  }

  static create(tag:any, type:nodeType, props?:Prop[], child?:Node[]){
    return new Node(tag, type, props, child)
  } 
}

export class Prop{
  constructor(public type:propType, public name:string,  public value: any,){
    this.name = name
    this.value = value
    this.type = type
  }

  static create(type:propType, name:string, value:any){
    return new Prop(type, name, value)
  }
}

export enum propType {
  NATIVE = '__NATIVE',
  EVENT = '__EVENT',
  DYNAMIC = '__DYNAMIC'
}
