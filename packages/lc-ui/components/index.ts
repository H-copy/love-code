import { App } from 'vue'
import { Move, moveHooks } from './move'
import { TypeDropDown } from './type-dropdown'
import { PropsPanel } from './props-panel'
import { PropsItem } from './props-item'
import { InputNumber } from './input-number'
import { InputSize } from './input-size'
import { SaSelect } from './sa-select'
import { SizeUnit } from './size-unit'

const components = {
  Move,
  TypeDropDown,
  PropsPanel,
  PropsItem,
  InputNumber,
  InputSize,
  SaSelect,
  SizeUnit,
}


function install(V: App) {
  Object.values(components).map(cp => {
    console.log(cp.name, cp)
    V.component(cp.name, cp)
  })
}

export default {
  install
}

export {
  Move,
  moveHooks,
  TypeDropDown,
  PropsPanel,
  PropsItem,
  InputNumber,
  InputSize,
  SaSelect,
  SizeUnit,
}