
/**
 * 多空格转单空格
 * @param tmp 
 * @returns
 */
export function oneSpace(tmp:string):string {
  return tmp.replace(/\s+/igm, ' ')
}

/**
 * 首字母大写
 * @param name 
 * @returns
 */
export function firstUpperCase(name: string): string{
  return name.slice(0, 1).toUpperCase() + name.slice(1)
}

/**
 * 驼峰名称转类名
 * @param tagName 
 * @returns
 * @example
 * ``` typescript
 * tagNameFormatter('ABC)
 * => 'a-b-c'
 * ```
 */
export function tagNameFormatter(tagName: string) {
  const wordList = tagName.split('')
  return wordList.map((word, index) => /[A-Z]+/gm.test(word) ? `${index === 0 ? '' : '-'}${word.toLowerCase()}` : word).join('')
}
