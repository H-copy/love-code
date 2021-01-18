import { createStore } from 'vuex'
import { Node } from '@love-code/complie'
import components, { MODULE_NAME } from './components'
import { Cmp } from '../types'

export default createStore({
  state: {
    newCmp: {} as Cmp,
    nodes: [] as Node[]
  },
  mutations: {
    readCmp(state, cmp: Cmp){
      state.newCmp = cmp
    },
    pushNewNode(state, node: Node){
      state.nodes.push(node)
    }
  },
  modules: {
    [MODULE_NAME]: components
  },
})
