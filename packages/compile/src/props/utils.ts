import {
  Prop,
  Props
} from './props'
import * as assert from '../utils/assert'

export function buildPropsByList(p?: Prop[]): Props {
  if (assert.isUndefined(p)) {
    return {}
  }
  
  return p.reduce((acc, next) => {
    return { ...acc, [next.name]: next }
  }, {} as Props)
}
