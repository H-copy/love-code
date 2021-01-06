import {
  BaseProp,
  basePropType
} from './prop'

export const createNativeProp = (name:string, value:string) => {
  return BaseProp.create(basePropType.NATIVE, name, value)
}

export const createSelfProp = (name: string) => {
  return BaseProp.create(basePropType.SELF, name)
}

export const createDynamicProp = (name: string, value: string) => {
  return BaseProp.create(basePropType.DYNAMIC, name, value)
}