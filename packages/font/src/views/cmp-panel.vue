<template>
  <div class='cmp-panel'>
    
    <div 
      draggable='true'
      @mousedown='onSelect(key, item)' 
      v-for='(item, key) of cmpList' 
      @dragstart='e => bindDragstart({ id: null, key })(e)'
      :key='key'>
        {{ item.name }}
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { Cmp } from '../types'
import { useDrag } from '../hooks'

export default defineComponent({
  setup(__, ctx){
    const store = useStore()
    const cmpList = computed(() => {
      return store.state.s_components.cmpList
    })
    const onSelect = (key: string, cmp: Cmp) => {
      ctx.emit('select', { key, cmp })
    }

    const { bindDragstart } = useDrag()
    
    return {
      cmpList,
      onSelect,
      bindDragstart
    }
  }
})
</script>
