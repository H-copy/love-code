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

export function parseNode(node: Node) {
  const props = parseProps(node.props)
  const _child = node.child ? node.child.map(item => parseNode(item)) : []
  
  const child = _child.reduce((slots:any, next:any) => {

    const { slotName } = next.props || 'default'
    delete next.props.slotName
    const currentSlot = slots[slotName] || []
    slots[slotName] = [...currentSlot, next]
    
    
  }, {} as {[s:string]: any[]} )
  
  return [
    node.tag,
    props,
    child || {}
  ]
  
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
