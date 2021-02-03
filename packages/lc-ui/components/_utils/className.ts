import { assert } from 'vx-tools'

export const CLASS_PREFIX = 'lc-'
export function className(className: string[]): {[k: string]: string}
export function className(className: string): string

/**
 * 组件名称添加库前缀
 * @param className 类名或类配置
 * @returns
 * 
 * @example
 * 1. cmpName(name) => lc-name
 * 2. cmpName(['header', 'footer']) => { header: 'lc-header', 'footer': 'lc-footer' }
 */
export default function className(className: string | string[]): (string | {[k: string]: string}) {
  
  if(assert.isArray(className)){
    return className.reduce((acc, next) => {
      return { ...acc, [next]: `${CLASS_PREFIX}${next}` }
    }, {})
  }
  
  return `${CLASS_PREFIX}${className}`
}
