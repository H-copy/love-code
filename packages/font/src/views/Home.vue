<style lang='stylus' scoped>
.love-code{
  padding 20px
  position relative
  // display flex;
  // justify-content center;
  // text-align center;
}
.box{
  box-size border-box
  width 200px
  height 200px
  border 1px solid #eee
}
</style>
<template>
  <div class="love-code">
    <!-- <HtmlTag :root='Root' /> -->
    <Dragable :data="cmpSize" @update='moveBlockUpdate'>
      <div class='box' :style='style'></div>
    </Dragable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
// import VHN from '../components/VHN.vue'
// import { Root } from './model'
// import HtmlTag from '../components/html-tag'
import { MoveBlock, Dragable } from '../components/dragable'

export default defineComponent({
  components: {
    // VHN,
    // HtmlTag,
    Dragable
  },
  setup() {
    const cmpSize = ref({
      width: 200,
      height: 200
    })
    const style = computed(() => {
      const { width, height } = cmpSize.value
      return {
        width: `${width}px`,
        height: `${height}px`
      }
    })

    const moveBlockUpdate = (d: MoveBlock) => {
      cmpSize.value = {
        width: d.width,
        height: d.height
      }
    }
    
    return {
      cmpSize,
      style,
      moveBlockUpdate
      // Root,
    }
  }
})
</script>
