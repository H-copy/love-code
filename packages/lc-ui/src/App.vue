<style lang="stylus" scoped>
.container{
  width: 500px;
  margin: auto;
}
.box{
  border: 1px solid #eee
}
</style>
<template>
  <div class="container">
    <Move :data='info' @update='update' >
      <div class='box' :style='style'></div>
    </Move>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Move, MoveBlock } from '../components'

export default defineComponent({
  components: {
    Move
  },
  setup(){
    const info = ref({
      width: 100,
      height: 100
    })

    const style = computed(() => {
      const { width, height } = info.value
      return {
        width: `${width}px`,
        height: `${height}px`
      }
    })

     const update = (d: MoveBlock) => {
      info.value = {
        width: d.width,
        height: d.height
      }
    }
    
    return {
      info,
      style,
      update
    }
  }
})
</script>
