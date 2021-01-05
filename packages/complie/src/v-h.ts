import {
  Node,
  nodeType,
  Prop,
  propType,
} from './node'

import {
  isEventName,
  isSlotName
} from './utils/assert'

function h(v: any) {
  
}

import {
  firstUpperCase
} from './utils/index'

function parseNode(node: Node) {
  const props = parseProps(node.props)
  const child = node.child ? node.child.map(item => parseNode(item)) : []
  
  const t = child.reduce((acc, next:) => {

    if (next.props.slot) {
      
    }
    
  }, {} as {[s:string]: any} )
  
  return [
    node.tag,
    props,
    t || {}
  ]
  
}

function parseNodeChild() {
  return nod
}

export interface VProp{
  [s:string]:any
}

function parseProps(props: Prop[]) {
  return props.reduce((acc:VProp, next:Prop) => {
    let slot = ''

    if (next.type == propType.EVENT && !isEventName(next.name)) {
      next.name = `on${firstUpperCase(next.name)}`
    }

    if (isSlotName(next.name)) {
      slot = next.name.split(':')[1] || 'default' 
    }

    return {
      ...acc,
      slot,
      [next.name]: next.value,
    }

  }, {} as VProp )
}
