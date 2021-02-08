import { assert } from 'vx-tools'

export const CLASS_PREFIX = 'lc-'
export function className(className: string[]): string[]
export function className(className: {[k: string]: boolean}): {[k: string]: boolean}
export function className(className: string): string

/**
 * 组件名称添加库前缀
 * @param className 类名或类配置
 * @returns
 * 
 * @example
 * cmpName(name) => lc-name
 */

export default function className(className: string | string[] | {[k: string]: boolean}): (string | string[] |{[k: string]: boolean}) {

  if(assert.isString(className)){
    return `${CLASS_PREFIX}${className}`
  }
  
  if(assert.isArray(className)){
    return className.map(item => `${CLASS_PREFIX}${item}`) 
  }

  if(assert.isObject(className)){
    return Object.entries(className).reduce((acc, [key, status]) =>{
      return { ...acc, [`${CLASS_PREFIX}${key}`]: status }
    }, {})
  }
  
  console.error(`类名必须为字符，数组，对象: ${className}`)
  return ''
}
