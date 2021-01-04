import * as assert from './assert'
import { Node, Prop, nodeType, propType } from './node'
import { dataFormatter } from './data-fomatter'

export function parse(node: Node):string{

  if(node.type === nodeType.DYNAMIC){
    return `{{ ${node.tag} }}`
  }

  if(node.type === nodeType.TEXT){
    return node.tag
  }
  
  if(node.type === nodeType.TAG){
    const child = node.child ? node.child.reduce((acc, next) => { return `${acc} ${parse(next)}` }, '') : ''
    const props = parseProps(node.props)
    const tag = tagNameFormatter(node.tag)
    return `<${tag} ${props}> ${child} </${tag}>`
  }
  

  if(node.type === nodeType.SELF){
    const props = parseProps(node.props)
    const tag = tagNameFormatter(node.tag)
    return `<${tag} ${props}/>`
  }

  if(node.type === nodeType.COMPONENT){
    let tag = assert.isString(node.tag) ? node.tag : node.tag.name
    if(!tag){
      throw new Error(`未找到标签名: ${tag}`)
    }

    tag = tagNameFormatter(tag)
    const child = node.child ? node.child.reduce((acc, next) => { return `${acc} ${parse(next)}` }, '') : ''
    const props = parseProps(node.props)
    return `<${tag} ${props}> ${child} </${tag}>`
  }
  
  throw new Error(`未找到比配的节点类型: ${node}`)
}

function parseProps(props: Prop | Prop[]){
  if(!props){return ''}
  if(assert.isArray(props)){
    return (props as Prop[]).reduce((acc, prop) => {
      return `${acc} ${parseProp(prop)}`
    }, '')
  }
  
  return parseProp(props as Prop)
}

function parseProp(prop:Prop){
  
  if(prop.type === propType.NATIVE){
    return `${prop.name}=${dataFormatter(prop.value)}`
  }

  if(prop.type === propType.DYNAMIC){
    return `:${prop.name}='${dataFormatter(prop.value)}'`
  }

  if(prop.type === propType.EVENT){
    return `@${prop.name}=${ prop.value.toString() }`
  }

  console.warn(`未找到属性类型: ${prop}`)
  return ''
}

export function tagNameFormatter(tagName:string){
  const wordList = tagName.split('')
  return wordList.map((word, index) => /[A-Z]+/gm.test(word) ? `${index === 0 ? '' : '-'}${word.toLowerCase()}` : word ).join('')
}
