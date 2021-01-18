export interface Cmp {
  component: any,
  name: string,
  img?: string,
  props?: { [k: string]: any },
}

export interface CmpMap {
  [k: string]: Cmp
}
