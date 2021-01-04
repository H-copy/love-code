export function type(data:any){
  return data.toString().match(/[a-zA-Z]+/igm)[1].toLowerCase()
}

export const isArray = (data: any) => type(data) === 'array'
export const isString = (data: any) => type(data) === 'string'
export const isFunction = (data: any) => type(data) === 'function'
export const isObject = (data: any) => type(data) === 'object'
export const isEventName = (data: any) => (/^on[A-Z]+[a-z]+$/).test(data)
