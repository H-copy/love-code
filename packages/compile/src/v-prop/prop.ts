import {
  Prop,
} from '../prop'

export enum VPropType{
  // vue
  FOR = '__FOR',
  SLOT = '__SLOT',
  MODEL = '__MODEL',
  IF = '__IF',
  EVENT = '__EVENT',
  DIRECTIVE = '__DIRECTIVE',
  REF = '__REF',
  DYNAMIC = '__DYNAMIC',
  
  // 原生
  NATIVE = '__NATIVE',
  SELF = '__SELF',
}

export class VProp implements Prop<VPropType, any> {
  constructor(public type:VPropType, public name:string,  public value?:string){
    this.name = name
    this.value = value
    this.type = type
  }

  static create(type:VPropType, name:string, value?:any){
    return new VProp(type, name, value)
  }
}




