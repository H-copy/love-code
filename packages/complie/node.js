export class Node{
  constructor( tag, type, props, child=[]){
    this.tag = tag
    this.type = type
    this.props = props
    this.child = child
  }

  static create(tag, type, props, child){
    return new Node(tag, type, props, child)
  } 
}

export const nodeType = {
  TAG: '__TAG',
  COMPONENT: '__COMPONENT',
  DYNAMIC: '__DYNAMIC',
  TEXT: '__TEXT',
  SELF: '__SELF'
}


export class Prop{
  constructor(name, type, value){
    this.name = name
    this.value = value
    this.type = type
  }

  static create(name, value, type){
    return new Prop(name, value, type)
  }
}

export const propType = {
  NATIVE: '__NATIVE',
  EVENT: '__EVENT',
  DYNAMIC: '__DYNAMIC'
}
