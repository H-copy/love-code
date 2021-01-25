<style lang='stylus' scoped>
$color = orange
.move{
  position absolute
  border 1px dashed transparent
  $pointSize=10px
  &:hover{
    border-color $color
    .move-point{
      opacity 1
    }
  }
  &-point{
    opacity 0
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
  <div class='move' :style='moveBlockStyle' @mousedown.stop='onMouseDown' >
    <slot></slot>
      <div
      class='move-point'
      v-for='type of movePoints'
      @mousedown.stop='e => onPointMousedown(e, moveBlock, type)'
      :class='type'
      :key='type'>
      </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, PropType, watch } from 'vue'
import {
  useMoveBlock,
  useMovePoint,
  movePoints,
  MoveBlock
} from './hooks'

export default defineComponent({
  props: {
    unit: {
      type: String,
      default: 'px'
    },
    data: {
      type: Object as PropType<MoveBlock>,
      default: () => ({
        width: 100,
        height: 100,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      })
    }
  },
  setup(props, ctx){
    const {
      unit,
      moveBlock,
      moveBlockStyle,
      updateBlock,
      mouseMoveLock,
      onMouseDown
    } = useMoveBlock(ctx)
    
    const update = (d: MoveBlock) => {
      updateBlock(mouseMoveLock(d))
    }
    const {
      onPointMousedown
    } = useMovePoint(ctx, update)

    watch(() => props.unit, () => {
      unit.value = props.unit
    }, { immediate: true })
    
    updateBlock(props.data)
    
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
