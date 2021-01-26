import { assert } from 'vx-tools'


export function parseBase(data:any):string{
  if (assert.isUndefined(data)) {
    return "undefined"
  }
  return JSON.stringify(data)
}

export function parseArray(arr:any[]):string{
  
  return `[${arr.map(item => {

    if(assert.isArray(item)){
      return parseArray(item)
    }

    if(assert.isFunction(item)){
      return item.toString()
    }

    if(assert.isObject(item)){
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

    if(assert.isArray(val)){
      d = parseArray(val)
    }

    if(assert.isFunction(val)){
      d = val.toString()
    }

    if(assert.isObject(val)){
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
  if(assert.isObject(data)){
    return parseObj(data)
  }

  if(assert.isArray(data)){
    return parseArray(data)
  }

  if (assert.isFunction(data)) {
    return data.toString()
  }

  if (assert.isString(data)) {
    return data
  }

  return parseBase(data)
}