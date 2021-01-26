import { App } from 'vue'
import { Move, moveHooks } from './move'


const components = {
  Move,
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