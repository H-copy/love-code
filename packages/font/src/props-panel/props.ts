export interface Prop{
  component: any,
  key: string,
  label?: string,
  default?: any,
  options?: any
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