export interface Prop<T, V>{
  name: string
  value?: V
  type: T
}

export class BaseProp implements Prop<basePropType, string>{
  constructor(public type:basePropType, public name:string,  public value?:string){
    this.name = name
    this.value = value
    this.type = type
  }

  static create(type:basePropType, name:string, value?:any){
    return new BaseProp(type, name, value)
  }
}

export enum basePropType {
  NATIVE = '__NATIVE',
  SELF = '__SELF',
  DYNAMIC = '__DYNAMIC'
}

