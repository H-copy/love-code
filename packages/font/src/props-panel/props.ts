import {
  PropCreate
} from '../creator'

export interface Prop{
  component: any,
  name: string,
  createType: PropCreate
  label?: string,
  options?: any,
}

export interface PropGroupItem{
  title: string
  props: { [k: string]: Prop }
}

export interface PropGroup {
  [p: string]: PropGroupItem
}

export interface CmpPropGroup {
  [c: string]: PropGroup
}