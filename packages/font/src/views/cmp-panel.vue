<template>
  <div class='cmp-panel'>
    
    <div @mousedown='onSelect(key, item)' v-for='(item, key) of cmpList' :key='key'>
      <a-button block>
        {{ item.name }}
      </a-button>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { Cmp } from '../types'

export default defineComponent({
  setup(__, ctx){
    const store = useStore()
    console.log(store)
    const cmpList = computed(() => {
      return store.state.s_components.cmpList
    })
    const onSelect = (key: string, cmp: Cmp) => {
      console.log(key, cmp)
      ctx.emit('select', { key, cmp })
    }
    
    return {
      cmpList,
      onSelect
    }
  }
})
</script>
