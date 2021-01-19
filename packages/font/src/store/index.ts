import { createStore } from 'vuex'
import { Tag } from '@love-code/compile'
import components, { MODULE_NAME } from './components'
import { Cmp } from '../types'

export default createStore({
  state: {
    newCmp: {} as Cmp,
    nodes: [] as Tag[]
  },
  mutations: {
    readCmp(state, cmp: Cmp){
      state.newCmp = cmp
    },
    pushNewTag(state, node: Tag){
      state.nodes.push(node)
    }
  },
  modules: {
    [MODULE_NAME]: components
  },
})
