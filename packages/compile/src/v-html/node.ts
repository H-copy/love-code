import * as assert from '../utils/assert'
import { tagNameFormatter } from '../utils'
import { Node, nodeType } from '../node'
import { oneSpace } from '../utils'
import { parseProps } from './prop'

export function parse(node: Node): string {

  if (node.type === nodeType.DYNAMIC) {
    return oneSpace(`{{ ${node.tag} }}`)
  }

  if (node.type === nodeType.TEXT) {
    return node.tag
  }

  if (node.type === nodeType.TAG) {
    const child = node.child ? node.child.reduce((acc, next) => { return `${acc} ${parse(next)}` }, '') : ''
    const props = parseProps(node.props)
    const tag = tagNameFormatter(node.tag)
    return oneSpace(`<${tag} ${props}> ${child} </${tag}>`) 
  }


  if (node.type === nodeType.SELF) {
    const props = parseProps(node.props)
    const tag = tagNameFormatter(node.tag)
    return oneSpace(`<${tag} ${props}/>`)
  }

  if (node.type === nodeType.COMPONENT) {
    let tag = assert.isString(node.tag) ? node.tag : node.tag.name
    if (!tag) {
      throw new Error(`未找到标签名: ${tag}`)
    }

    tag = tagNameFormatter(tag)
    const child = node.child ? node.child.reduce((acc, next) => { return `${acc} ${parse(next)}` }, '') : ''
    const props = parseProps(node.props)
    return oneSpace(`<${tag} ${props}> ${child} </${tag}>`)
  }

  throw new Error(`未找到比配的节点类型: ${node}`)
}



