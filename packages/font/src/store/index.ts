import { Ref } from 'vue'
import { createStore } from 'vuex'
import { Tag } from '@love-code/compile'
import components, { MODULE_NAME } from './components'
import { Cmp } from '../types'

export default createStore({
  state: {
    newCmp: {} as Cmp,
    nodes: [] as Tag[],
    globalCtx: {} as Ref
  },
  mutations: {
    readCmp(state, cmp: Cmp){
      state.newCmp = cmp
    },
    pushNewTag(state, node: Tag){
      state.nodes.push(node)
    },
    resetGlobalCtx(state, globalCtx: Ref) {
      console.log('change', globalCtx)
      state.globalCtx = globalCtx
    }
  },
  modules: {
    [MODULE_NAME]: components
  },
})
