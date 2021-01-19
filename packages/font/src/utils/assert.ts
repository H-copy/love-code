/**
 * 类型断言
 */
export function type(data: any) {
  const t = Object.prototype.toString.call(data).match(/[a-zA-Z]+/igm)
  return t ? t[1].toLowerCase() : 'undefined'
}

// 基础类型
export const isArray = (data: any): data is any[] => type(data) === 'array'
export const isString = (data: any): data is string => type(data) === 'string'
export const isFunction = (data: any): data is typeof Function => type(data) === 'function'
export const isObject = (data: any): data is {[s: string]: any} => type(data) === 'object'
export const isUndefined = (data: any): data is undefined => data === undefined
export const isNull = (data: any): data is null => data === null

// 特定类型
export const isEventName = (data: any): data is string => (/^on[A-Z]+[a-z]+$/).test(data)
export const isSlotName = (data: any): data is string => (/^v-slot(\\:{1}[a-zA-Z]+)?$/).test(data)
