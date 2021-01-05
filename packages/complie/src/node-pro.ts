import {
  Node,
  nodeType,
  Prop,
  propType
} from './node'
import {
  isArray, isFunction, isString
} from './assert'

function createTypeNode(type:nodeType){
  return (tag: any, props?:Prop|Prop[], child?:Node|Node[]) =>{
    if(!isArray(child)&&child){
      child = [child]
    }
    if(!isArray(props) && props){
      props = [props]
    }
    return Node.create(tag, type, props, child)
  }
}


export const createTagNode = createTypeNode(nodeType.TAG)
export const createCmpNode = createTypeNode(nodeType.COMPONENT)
export const createTextNode = createTypeNode(nodeType.TEXT)
export const createDynamicNode = createTypeNode(nodeType.DYNAMIC)
export const createSelfNode = createTypeNode(nodeType.SELF)

function createTypeProp(type:propType){
  return (name:string, value:any) => {
    return Prop.create(type, name, value)
  }
}

export const createNativeProp = createTypeProp(propType.NATIVE)
export const createEventProp = (name: string, value: string |((...arg: any[]) => any)) => {
  if (!isFunction(value) && !isString(value)) {
    throw new Error(`事件必须为函数或属性字符: ${value}`)
  }

  return Prop.create(propType.EVENT, name, value)
}
export const createDynamicProp = createTypeProp(propType.DYNAMIC)
