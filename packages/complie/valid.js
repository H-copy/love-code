export function type(data){
  return Object.prototype.toString.call(data).match(/[a-zA-Z]+/igm)[1].toLowerCase()
}

export const isArray = data => type(data) === 'array'
export const isString = data => type(data) === 'string'
export const isFunction = data => type(data) === 'function'
export const isObject = data => type(data) === 'object'
export const isEventName = data => (/^on[A-Z]+[a-z]+$/).test(data)
