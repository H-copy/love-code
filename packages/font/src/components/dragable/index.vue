<style lang='stylus' scoped>
$color = orange
.dragable{
  position absolute
  border 1px dashed $color
  $pointSize=10px
  &-point{
    position absolute
    width $pointSize
    height $pointSize
    border-radius $pointSize
    border 1px solid $color
    background white
    transition all .3s
    z-index: 1
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
  .middleTop{
    top $position
    left 0
    right 0
    margin auto
    cursor n-resize
  }
  .middleBottom{
    bottom $position
    left 0
    right 0
    margin auto
    cursor s-resize
    
  }
  .middleLeft{
    top 0
    bottom 0
    left $position
    margin auto
    cursor w-resize
  }
  .middleRight{
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
  <div class='dragable' :style='moveBlockStyle' @mousedown.stop='onMouseDown' >
    <slot></slot>
      <div
      class='dragable-point'
      v-for='type of movePoints'
      @mousedown.stop='e => onPointMousedown(e, moveBlock, type)'
      :class='type'
      :key='type'>
      </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import {
  useMoveBlock,
  useMovePoint,
  movePoints,
  MoveBlock
} from './hooks'

export default defineComponent({
  setup(){
    const {
      moveBlock,
      moveBlockStyle,
      updateBlock,
      mouseMoveLock,
      onMouseDown
    } = useMoveBlock()
    
    const update = (d: MoveBlock) => {
      updateBlock(mouseMoveLock(d))
    }
    const {
      startState,
      onPointMousedown
    } = useMovePoint(update)
    return {
      movePoints,
      moveBlockStyle,
      moveBlock,
      onPointMousedown,
      onMouseDown
    }
  }
})
</script>
