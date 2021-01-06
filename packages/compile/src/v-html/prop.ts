import {
  Prop,
  propType
} from '../prop'
import * as assert from '../utils/assert'
import { dataFormatter } from '../utils/data-fomatter'

export function parseProps(props: Prop | Prop[]) {
  if (!props) { return '' }
  if (assert.isArray(props)) {
    return (props as Prop[]).reduce((acc, prop) => {
      return `${acc} ${parseProp(prop)}`
    }, '')
  }

  return parseProp(props as Prop)
}

export function parseProp(prop: Prop) {

  if (prop.type === propType.NATIVE) {
    // id='myId'
    return `${prop.name}='${dataFormatter(prop.value)}'`
  }

  if (prop.type === propType.DYNAMIC) {
    // :prop='dynamicVal'
    if (assert.isString(prop.value)) {
      return `:${prop.name}='${prop.value}'` 
    }
    // :prop='["name", 23]'
    // :prop='{name: "coco"}'
    return `:${prop.name}='${dataFormatter(prop.value)}'`
  }

  if (prop.type === propType.EVENT) {
    // @click='onClick'
    // @click='() => {}'
    return `@${prop.name}='${prop.value.toString()}'`
  }

  // if (prop.type === propType.SELF) {
  //   return 
  // }

  console.warn(`未找到属性类型: ${prop}`)
  return ''
}