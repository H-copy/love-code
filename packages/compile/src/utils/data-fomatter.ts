import { 
  isArray,
  isObject,
  isFunction,
  isUndefined,
  isString
} from './assert'


export function parseBase(data:any):string{
  if (isUndefined(data)) {
    return "undefined"
  }
  return JSON.stringify(data)
}

export function parseArray(arr:any[]):string{
  
  return `[${arr.map(item => {

    if(isArray(item)){
      return parseArray(item)
    }

    if(isFunction(item)){
      return item.toString()
    }

    if(isObject(item)){
      return parseObj(item)
    }
    
    return parseBase(item)

  }).join(',')}]`
  
}

export function parseObj(data:{[s:string]: unknown}):string{
  const d = Object.entries(data).reduce((acc, [key, val]) =>{

    let d
    
    const setData = (data: any) => {
      return `${acc}${acc ? ',' : ''}${key}:${data}`
    }

    if(isArray(val)){
      d = parseArray(val)
    }

    if(isFunction(val)){
      d = val.toString()
    }

    if(isObject(val)){
      d = parseObj(val)
    }
    
    if(!d){
      d = parseBase(val)
    }
    
    return setData(d)
    
    
  }, '')

  return `{${d}}`
}


export function dataFormatter(data:any):string{
  if(isObject(data)){
    return parseObj(data)
  }

  if(isArray(data)){
    return parseArray(data)
  }

  if (isFunction(data)) {
    return data.toString()
  }

  if (isString(data)) {
    return data
  }

  return parseBase(data)
}