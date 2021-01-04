/**
 * 类型断言
 */
export function type(data: any) {
  const t = Object.prototype.toString.call(data).match(/[a-zA-Z]+/igm)
  return t ? t[1].toLowerCase() : 'undefined'
}

export const isArray = (data: any): data is any[] => type(data) === 'array'
export const isString = (data: any): data is string => type(data) === 'string'
export const isFunction = (data: any): data is (...data:any) => any => type(data) === 'function'
export const isObject = (data: any): data is {[s:string]: any} => type(data) === 'object'
export const isEventName = (data: any): data is string => (/^on[A-Z]+[a-z]+$/).test(data)
