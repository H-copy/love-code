import {
  baseNodeType,
  BaseNode,
} from './node'

import {
  isArray
} from '../utils/assert'

import {
  BaseProp
} from '../prop'

function createTypeNode(type:baseNodeType){
  return (tag: any, props?:BaseProp|BaseProp[], child?:BaseNode|BaseNode[]) =>{
    if(!isArray(child)&&child){
      child = [child]
    }
    if(!isArray(props) && props){
      props = [props]
    }
    
    return new BaseNode(tag, type, props, child)
  }
}

export const createTagNode = createTypeNode(baseNodeType.TAG)
export const createTextNode = createTypeNode(baseNodeType.TEXT)
export const createSelfNode = createTypeNode(baseNodeType.SELF)

