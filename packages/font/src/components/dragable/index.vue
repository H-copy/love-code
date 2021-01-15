<style lang='stylus' scoped>
$color = orange
.dragable{
  position absolute
  border 1px dashed $color
  $pointSize=12px
  &-point{
    position absolute
    width $pointSize
    height $pointSize
    border-radius $pointSize
    border 1px solid $color
    transition all .3s
    &:hover{
      transform scale(1.5, 1.5)
    }
  }
  $position = $pointSize/2 * -1
  .topLeft{
    top $position
    left $position
    cursor nw-resize
  }
  .topRight{
    top $position
    right $position
    cursor ne-resize
  }
  .centerLeft{
    top 0
    bottom 0
    left $position
    margin auto
    cursor w-resize
  }
  .centerRight{
    top 0
    bottom 0
    right $position
    margin auto
    cursor e-resize
  }
  .bottomLeft{
    left $position
    bottom $position
    cursor sw-resize
  }
  .bottomRight{
    right $position
    bottom $position
    cursor se-resize
  }
}
</style>
<template>
  <div class='dragable'>
    <slot></slot>
      <div
      class='dragable-point'
      v-for='point of points'
      @mousedown.stop='onPointMousedown'
      :class='point'
      :key='point'>
      </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'

// enum points {
//   'topLeft',
//   'topRight',
//   'centerLeft',
//   'centerRight',
//   'bottomLeft',
//   'bottomRight'
// }

const points = [
  'topLeft',
  'topRight',
  'centerLeft',
  'centerRight',
  'bottomLeft',
  'bottomRight'
]

export default defineComponent({
  setup() {
    const onPointMousedown = (...args: any[]) => {
      console.log('args', args)
    }
    return {
      points,
      onPointMousedown
    }
  }
})
</script>
