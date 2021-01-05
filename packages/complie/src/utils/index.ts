
// 多空格转单空格
export function oneSpace(tmp:string):string {
  return tmp.replace(/\s+/igm, ' ')
}

// 首字母大写
export function firstUpperCase(name: string): string{
  return name.slice(0, 1).toUpperCase() + name.slice(1)
}