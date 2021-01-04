

export enum nodeType {
  TAG =  '__TAG',
  COMPONENT =  '__COMPONENT',
  DYNAMIC =  '__DYNAMIC',
  TEXT =  '__TEXT',
  SELF =  '__SELF'
}


export class Node{
  constructor(public tag:any, public type:nodeType, public props:Prop[], public child=[] as any[]){
    this.tag = tag
    this.type = type
    this.props = props
    this.child = child
  }

  static create(tag:any, type:nodeType, props:Prop[], child:any[]){
    return new Node(tag, type, props, child)
  } 
}

export class Prop{
  constructor(public name:string,  public value: any, public type:propType,){
    this.name = name
    this.value = value
    this.type = type
  }

  static create(name:string, value:any, type:propType){
    return new Prop(name, value, type)
  }
}

export enum propType {
  NATIVE = '__NATIVE',
  EVENT = '__EVENT',
  DYNAMIC = '__DYNAMIC'
}
