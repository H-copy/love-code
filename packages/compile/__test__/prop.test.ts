import {
  BaseNativeProp,
  BaseSelfProp,
  BaseDynamiceProp,
} from '../src/prop'


describe('baseProp', () => {

  test('BaseNativeProp', () => {
    expect(BaseNativeProp.create('id', 'native').stringify()).toBe(`id='native'`)
  })

  test('BaseSelfProp', () => {
    expect(BaseSelfProp.create('disabeld').stringify()).toBe(`disabeld`)
    expect(BaseSelfProp.create('disabeld', false).stringify()).toBe(`disabeld='false'`)
  })

  test('BaseDynamiceProp', () => {
    expect(BaseDynamiceProp.create('empty', null).stringify()).toBe(`empty=null`)
  })
  
})