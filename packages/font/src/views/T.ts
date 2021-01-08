import {
  baseTagNode,
  baseNativeProp
} from '@love-code/complie'

// import {
//   Input
// } from 'ant-design-vue'

export function createInput(){
  const container = baseTagNode('div').addProp(
    baseNativeProp('class', 'container')
  )
  
  return container
}