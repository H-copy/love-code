export interface Prop {
  name: string
  type: string
  value?: any
  stringify(): string
  [s:string]:any
}

type PropsType = '__props'

export interface Props{
  [s: string]: Prop | PropsType
  __isProps: PropsType
}

export enum basePropType {
  NATIVE = '__NATIVE',
  SELF = '__SELF',
  DYNAMIC = '__DYNAMIC'
}


export class BaseProp implements Prop{
  constructor(public type:basePropType, public name:string,  public value?:string){
    this.name = name
    this.value = value
    this.type = type
  }

  stringify():string {
    return `${this.name}=${ "'" + this.value + "'" || '' }`
  }

  static create(type:basePropType, name:string, value?:any){
    return new BaseProp(type, name, value)
  }
}


export class BaseNativeProp extends BaseProp{
  constructor(public name: string, public value?: string) {
    super(basePropType.NATIVE, name, value)
  }

  stringify() {
    return `${this.name}='${this.value}'`
  }

  static create(name:string, value?:any){
    return new BaseNativeProp(name, value)
  }
}


export class BaseSelfProp extends BaseProp{
  constructor(public name: string, public value?: string) {
    super(basePropType.SELF, name, value)
  }

  stringify() {
    return this.value === undefined ? `${this.name}` : super.stringify() 
  }

  static create(name:string, value?:any){
    return new BaseSelfProp(name, value)
  }
}



export class BaseDynamiceProp extends BaseProp{
  constructor(public name: string, public value?: string) {
    super(basePropType.DYNAMIC, name, value)
  }

  stringify() {
    return `${this.name}=${this.value}`
  }

  static create(name:string, value?:any){
    return new BaseDynamiceProp(name, value)
  }
}
