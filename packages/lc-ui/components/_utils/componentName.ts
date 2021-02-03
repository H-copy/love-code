export const CLASS_PREFIX = 'lc-'

/**
 * 组件名称
 * @param cmpName
 * @returns
 * @example
 * componentName('cmp') => lc-cmp
 */
export default function componentName(cmpName: string): string{
  return `${CLASS_PREFIX}${cmpName}`
}
