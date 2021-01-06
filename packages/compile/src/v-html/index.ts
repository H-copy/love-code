import {
  VProp,
  isNative,
  isSelf,
  
  isDynamice,
  isEvent,
  isFor,
  isSlot,
  isModel,
  isIf,
  isRef,

} from '../v-prop'
import { dataFormatter } from '../utils/data-fomatter'
import { isFunction, isString } from 'src/utils/assert'


export function vParseProps(props: VProp[]) {
  return props.map(prop => vParseProp(prop)).join(' ')
}


const parseMap = [
  [ isNative, nativePase ],
  [ isSelf, selfPase ],
  [ isDynamice, dynamicPase ],
  [ isEvent, eventParse ]
]

export function vParseProp(prop: VProp) {
  const bingo = parseMap.find(([_if]) => _if(prop))
  
  if (bingo) {
    return bingo[2](prop)
  }
  
  console.error(`未找到匹配prop类型: ${JSON.stringify(prop, null, 2)}`)
  return ''
}


function nativePase(prop: VProp) {
  return `${prop.name}='${dataFormatter(prop.value)}'`
}

function selfPase(prop: VProp) {
  return prop.name
}

function eventParse(prop: VProp) {
  if (isString(prop.value)) {
    return `@${prop.name}='${prop.value}'`
  }

  if (isFunction(prop.value)) {
    return `@${prop.name}='${(prop.value as (...args:any) => any).toString()}'`
  }
  
  console.error(`事件porp必须为字符或函数表达式: ${JSON.stringify(prop)}`)
  
  return ''
}

function dynamicPase(prop: VProp) {
  if (isString(prop.value)) {
      return `:${prop.name}='${prop.value}'` 
    }
  return `:${prop.name}='${dataFormatter(prop.value)}'`
}
