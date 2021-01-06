import * as Node from '../node'
import * as Prop from '../prop'

export interface ParseProps{
  (props:any):string
}

export function parse(n: Node.BaseNode, parseProps:ParseProps = baseParseProps) {
  const props = parseProps(n.props)

  if (Node.isText(n.type)) {
    return n.tag
  }

  if (Node.isSelf(n.type)) {
    return `<${n.tag} ${props}/>`
  }
  
  if (Node.isTag(n.type)) {
    const children: string = n.children.map(child => parse(child)).join(' ') || ''
    return `<${n.tag}${props ? ' ' + props : ''}> ${children} </${n.tag}>`
  }
  
}

export function baseParseProps(props: Prop.BaseProp[]):string {
  return props.map(prop => baseParseProp(prop)).join(' ')
}

export function baseParseProp(prop: Prop.BaseProp):string {

  if (Prop.isNative(prop.type)) {
    return `${prop.name}='${prop.value}'`
  }

  if (Prop.isDynamice(prop.type)) {
    return `${prop.name}=${prop.value}`
  }

  if (Prop.isSelf(prop.type)) {
    return prop.name
  }
  
  console.error(`未找到匹配prop类型: ${JSON.stringify(prop, null, 2)}`)

  return ''
}
