import {
  baseTagNode, baseTextNode,
} from '../src/node'

import {
  baseNativeProp,
  // BaseSelfProp
} from '../src/prop'

import {
  vSelf,
  vTagNode,
} from '../src/v-node'

import {
  vEventProp,
  vModelProp,
  // VEventProp,
} from '../src/v-prop'


describe('v-node', () => {
  test('base warp v', () => {
    const Input = vSelf('l-input')
      .addProp(
        baseNativeProp('class', 'user-name'),
        vModelProp('name')
      )
    const root = baseTagNode('div')
      .addProp(
        baseNativeProp('id', 'user'),
      ).addChild(
        Input
      )

    expect(root.stringify()).toBe(`<div id='user'> <l-input class='user-name' v-model='name'/> </div>`)
  })

  test('v warp base', () => {
    const text = baseTextNode('click me')
    const Button = vTagNode('l-button')
    .addProp(
      baseNativeProp('class', 'submit'),
      vEventProp('click', () => "ok")
    ).addChild(
      text    
    )
    expect(Button.stringify()).toBe(`<l-button class='submit' v-on:click='() => "ok"'> click me </l-button>`)
  })
  
})