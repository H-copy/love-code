import {
  baseTagNode,
  baseTextNode,
  baseNativeProp,

  vTagNode,
  vTextNode,
  vModelProp
} from '@love-code/complie'
import {
  Input,
  Button
} from 'ant-design-vue'

export const Root = baseTagNode('div').addProp(
  baseNativeProp('class', 'container')
)

export const UserNameText = vTextNode('userName')
export const UserName = vTagNode(Input).addProp(
  baseNativeProp('class', 'user-name'),
  vModelProp('value', 'userName'),
)

export const Submit = vTagNode(Button).addProp(
  baseNativeProp('type', 'primary'),
).addChild(
  baseTextNode('click me')
)

Root.addChild(UserNameText, UserName, Submit)
