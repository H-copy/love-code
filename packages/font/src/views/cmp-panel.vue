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
import { useDrag } from '../hooks'
import { CmpMod } from '../creator'

export default defineComponent({
  setup(__, ctx){
    const store = useStore()
    const cmpList = computed(() => {
      return store.state.s_components.cmpList
    })
    const onSelect = (key: string, mod: CmpMod) => {
      ctx.emit('select', { key, mod })
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
