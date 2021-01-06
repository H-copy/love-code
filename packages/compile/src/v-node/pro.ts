import { tagNameFormatter } from 'src/utils'
import * as node from '../node'

import {
  isArray,
  isString
} from '../utils/assert'

import {
  VProp
} from '../v-prop'

function createTypeNode(type:node.baseNodeType){
  return (tag: any, props?:VProp|VProp[], child?:node.BaseNode|node.BaseNode[]) =>{
    if(!isArray(child)&&child){
      child = [child]
    }
    if(!isArray(props) && props){
      props = [props]
    }
    
    
    return node.BaseNode.create<VProp>(tag, type, props, child)
  }
}

export const createTagNode = createTypeNode(node.baseNodeType.TAG)
export const createTextNode = createTypeNode(node.baseNodeType.TEXT)
export const createSelfNode = createTypeNode(node.baseNodeType.SELF)
export const createCmpNode = (tag: any, props?:VProp|VProp[], child?:node.BaseNode|node.BaseNode[]) => {
  let _tag = isString(tag) ? tag : tag.name
    if (!_tag) {
      throw new Error(`未找到标签名: ${_tag}`)
  }
  _tag = tagNameFormatter(_tag)
  return createTagNode(tag, props, child)
}
