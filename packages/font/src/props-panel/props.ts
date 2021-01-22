export interface Prop{
  component: any,
  key: string
  label?: string,
  default?: any
}

export interface PropGroup {
  [c: string]: {
    title: string
    props: { [k: string]: Prop }
  }
}
