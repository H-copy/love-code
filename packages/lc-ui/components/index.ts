import { App } from 'vue'
import { Move, moveHooks } from './move'
import { TypeDropDown } from './type-dropdown'
import { PropsPanel } from './props-panel'
import { PropsItem } from './props-item'

const components = {
  Move,
  TypeDropDown,
  PropsPanel,
  PropsItem
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
  moveHooks
}