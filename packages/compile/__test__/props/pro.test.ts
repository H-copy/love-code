import {
  BasePropType,
  prop,
  nativeProp,
  IS_PROP,
  selfProp,
  vDirective,
  VPropType,
  vDirectiveNameFormatter,
  vDirectiveProp,
  vEventProp,
  vDynamiceProp,
  vModelProp,
  vSlotProp,
  vIfProp,
  vRefProp
} from '../../src/props'


describe('props base', () => {

  test('prop', () => {
    const p = prop(
      'propType',
      'propName',
      'propValue'
    )

    expect(p).toMatchObject({
      isProp: IS_PROP,
      type: 'propType',
      name: 'propName',
      value: 'propValue'
    })
    
  })

  test('nativeProp', () => {
    
    const p = nativeProp(
      'id',
      'prop'
    )

    expect(p).toMatchObject({
      type: BasePropType.NATIVE,
      name: 'id',
      value: 'prop'
    })
    
  })

  test('selfProp', () => {
    const p = selfProp('disabled')
    expect(p).toMatchObject({
      type: BasePropType.SELF,
      name: 'disabled',
      value: true
    })
  })
  
})

describe('prop vprop', () => {

  test('vDirectiveNameFormatter', () => {
    expect(vDirectiveNameFormatter({
      name: 'h-move',
      arg: 'container',
    })).toBe('h-move:container')

    expect(vDirectiveNameFormatter({
      name: 'v-on',
      arg: 'click',
      modifiers: ['stop'],
    })).toBe('v-on:click.stop')

    expect(vDirectiveNameFormatter({
      name: 'v-on',
      arg: 'event',
      modifiers: ['stop'],
      isDynamic: true,
    })).toBe('v-on:[event].stop')

    expect(vDirectiveNameFormatter({
      name: 'v-move',
      arg: 'event',
      modifiers: ['stop'],
      isDynamic: true,
      isSelf: true
    })).toBe('v-move')

  })

  test('vDirective', () => {
    const directive = {
      name: 'h-move',
      arg: 'container',
    }
    const value = {
      x: 10,
      y: 10
    }

    const p = vDirective(
      VPropType.DIRECTIVE,
      directive,
      value
    )

    expect(p).toMatchObject({
      type: VPropType.DIRECTIVE,
      name: vDirectiveNameFormatter(directive),
      value,
      directive
    })
    
  })

  test('vDirective', () => {
    const directive = {
      name: 'h-size',
      arg: 'width'
    }
    const p = vDirectiveProp(directive, 10)
    expect(p).toMatchObject({
      type: VPropType.DIRECTIVE,
      directive,
      name: vDirectiveNameFormatter(directive),
      value: 10
    })
  })

  test('vEventProp arg is string', () => {
    const p = vEventProp('click', 'onClick')
    expect(p).toMatchObject({
      type: VPropType.EVENT,
      name: 'v-on:click',
      value: 'onClick',
      directive: {
        name: 'v-on',
        arg: 'click'
      }
    })
  })

  test('vEventProp arg is function', () => {
    const value = () => 'onClick'
    const p = vEventProp('click', value)
    expect(p.value).toBe(value)
  })

  test('vEventProp full conf', () => {
    const directive = {
      arg: 'mousedown',
      modifiers: ['stop'],
      isDynamic: true
    }
    const p = vEventProp(directive, 'onMove')
    expect(p).toMatchObject({
      type: VPropType.EVENT,
      name: vDirectiveNameFormatter({...directive, name: 'v-on'}),
      directive,
      value: 'onMove',
    })
  })

  test('vDynamiceProp', () => {
    const value = ['a', 'b']
    const p = vDynamiceProp('class', value)
    expect(p).toMatchObject({
      type: VPropType.DYNAMIC,
      name: 'v-bind:class',
      value,
      directive: {
        name: 'v-bind',
        arg: 'class'
      }
    })
  })

  test('vModelProp only value', () => {
    const value = ['a', 'b']
    const p = vModelProp(value)
    expect(p).toMatchObject({
      type: VPropType.MODEL,
      name: 'v-model',
      value,
      directive: {
        name: 'v-model',
      }
    })
  })

  test('vModelProp arg', () => {
    const p = vModelProp('change', 'list')
    expect(p).toMatchObject({
      type: VPropType.MODEL,
      name: 'v-model:change',
      value: 'list',
      directive: {
        name: 'v-model',
        arg: 'change'
      }
    })
  })

  test('vModelProp directive', () => {
    const directive = {
      arg: 'click',
      modifiers: ['stop']
    }
    const p = vModelProp(directive, 'list')
    expect(p).toMatchObject({
      type: VPropType.MODEL,
      name: 'v-model:click.stop',
      value: 'list',
      directive: {
        name: 'v-model',
        ...directive
      }
    })
  })

  test('vSlotProp not argments', () => {
    expect(vSlotProp()).toMatchObject({
      type: VPropType.SLOT,
      name: 'v-slot:default',
      directive: {
        name: 'v-slot',
        arg: 'default'
      }
    })
  })

  test('vSlotProp', () => {
    expect(vSlotProp('foot')).toMatchObject({
      type: VPropType.SLOT,
      name: 'v-slot:foot',
      directive: {
        name: 'v-slot',
        arg: 'foot'
      }
    })
  })

  test('vIfProp boolean', () => {
    expect(vIfProp(true)).toMatchObject({
      type: VPropType.IF,
      name: 'v-if',
      value: true,
      directive: {
        name: 'v-if',
      }
    })
  })

  test('vIfProp string', () => {
    expect(vIfProp('visibal')).toMatchObject({
      type: VPropType.IF,
      name: 'v-if',
      value: 'visibal',
      directive: {
        name: 'v-if',
      }
    })
  })

  test('vRefProp string', () => {
    expect(vRefProp('ele')).toMatchObject({
      type: VPropType.REF,
      name: 'ref',
      value: 'ele',
      directive: {
        name: 'ref'
      }
    })
  })

  test('vRefProp function', () => {
    const value = (ele:HTMLElement) => console.log(ele) 
    expect(vRefProp(value)).toMatchObject({
      type: VPropType.REF,
      name: 'ref',
      value,
      directive: {
        name: 'ref'
      }
    })
  })

})