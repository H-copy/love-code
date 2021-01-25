import { Ref } from 'vue'
import { createStore } from 'vuex'
import components, { MODULE_NAME as cmpName } from './components'
import props, { MODULE_NAME as propName } from './props'

import { TTag } from '../creator'
import { isNumber } from '../utils/assert'

export default createStore({
  state: {
    nodes: {} as { [k: string]: TTag },
    globalCtx: {} as Ref,
    active: null as TTag | null
  },
  mutations: {
    
    pushNewTag(state, node: TTag){
      state.nodes[node.id] = node
    },

    removeTag(state, node: TTag) {
      const parentNode = node.parentId ? state.nodes[node.parentId] : null
      const _index = parentNode ? parentNode.children.findIndex(
        (c) => c.id === node.id
      ) : undefined
      if (isNumber(_index)) {
        parentNode!.children.splice(_index, 1)
      }
      Reflect.deleteProperty(state.nodes, node.id)
    },

    setActive(state, node: TTag) {
      console.log('active', node, state.active)
      if (state.active && state.active.id === node.id) {
        return
      }
      state.active = node
    },

    cleanActive(state) {
      state.active = null
    },
    
    resetGlobalCtx(state, globalCtx: Ref) {
      state.globalCtx = globalCtx
    }

  },

  getters: {
    currentProp(state) {
      return state.active ? state.active.props : null
    }
  },
  
  modules: {
    [cmpName]: components,
    [propName]: props
  },
})
