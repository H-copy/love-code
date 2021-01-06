import {
  baseNodeType,
} from './node'

export function isTag(data: any): data is baseNodeType.TAG {
  return data === baseNodeType.TAG
}

export function isText(data: any): data is baseNodeType.TEXT {
  return data === baseNodeType.TEXT
}

export function isSelf(data: any): data is baseNodeType.SELF {
  return data === baseNodeType.SELF
}

export function isCDATA(data: any): data is baseNodeType.CDATA {
  return data === baseNodeType.CDATA
}

