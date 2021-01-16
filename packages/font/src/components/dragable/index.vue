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
  <div class='dragable' :style='containerStyle'>
    <slot></slot>
      <div
      class='dragable-point'
      v-for='type of points'
      @mousedown.stop='e => onPointMousedown(e, type)'
      :class='type'
      :key='type'>
      </div>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent, ref } from 'vue'

type Point = 'topLeft' 
              | 'topRight' 
              | 'middleLeft' 
              | 'middleRight' 
              | 'bottomLeft' 
              | 'bottomRight'
              | 'middleTop'
              | 'middleBottom'

const points: Point[] = [
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
  'middleTop',
  'middleBottom',
  'middleLeft',
  'middleRight',
]

interface Position {
  x: number
  y: number
}

interface PointEvent {
  [k: string]: (diff: Position) => void
}

export default defineComponent({
  setup() {
    const unit = 'px'
    const containerSize = ref<{[k: string]: number}>({
      width: 120,
      height: 120,
      top: 10,
      bottom: 0,
      left: 10,
      right: 0,
    })
    const updateContainerSize = (data: {[k: string]: number }) => {
      const _data = { ...containerSize.value, ...data }
      if (_data.width <= 0){
        _data.width = 0
      }
      if (_data.height <= 0){
        _data.height = 0
      }
      containerSize.value = _data
    }
    const startState = ref({
      preContainer: { ...containerSize.value },
      type: '',
      startX: 0,
      startY: 0
    })
    const containerStyle = computed(() => {
      return Object.entries(containerSize.value).reduce((acc, [key, val]) => {
        return { ...acc, [key]: `${val}${unit}` }
      }, {})
    })
    const round = (n: number) => Math.round(n)
    const mouseMoveLock = (d: {[k: string]: number}) => {
      // 防止尺寸为零时，元素移动
      const _d = { ...d }
      if (_d.width <= 0){
        _d.width = 0
        _d.left = containerSize.value.left
      }
      
      if (_d.height <= 0){
        _d.height = 0
        _d.top = containerSize.value.top
      }
      return _d
    }
    const pointEvents: PointEvent = {
      topLeft: (diff: Position) => {
        const { preContainer } = startState.value
        const _d = {
          width: preContainer.width - diff.x,
          height: preContainer.height - diff.y,
          top: preContainer.top + diff.y,
          left: preContainer.left + diff.x,
        }
        updateContainerSize(mouseMoveLock(_d))
      },
      topRight: (diff: Position) => {
        const { preContainer } = startState.value
        const _d = {
          width: preContainer.width + diff.x,
          height: preContainer.height - diff.y,
          top: preContainer.top + diff.y,
        }
        updateContainerSize(mouseMoveLock(_d))
      },
      middleTop: (diff: Position) => {
        const { preContainer } = startState.value
        const _d = {
          height: preContainer.height - diff.y,
          top: preContainer.top + diff.y,
        }
        updateContainerSize(mouseMoveLock(_d))
      },
      middleBottom: (diff: Position) => {
        const { preContainer } = startState.value
        const _d = {
          height: preContainer.height + diff.y,
        }
        updateContainerSize(mouseMoveLock(_d))
      },
      middleLeft: (diff: Position) => {
        const { preContainer } = startState.value
        const _d = {
          width: preContainer.width - diff.x,
          left: preContainer.left + diff.x,
        }
        updateContainerSize(mouseMoveLock(_d))
      },
      middleRight: (diff: Position) => {
        const { preContainer } = startState.value
        const _d = {
          width: preContainer.width + diff.x,
        }
        updateContainerSize(mouseMoveLock(_d))
      },
      bottomLeft: (diff: Position) => {
        const { preContainer } = startState.value
        const _d = {
          width: preContainer.width - diff.x,
          height: preContainer.height + diff.y,
          left: preContainer.left + diff.x,
        }
        if (_d.width <= 0){
          _d.width = 0
          _d.left = containerSize.value.left
        }
        updateContainerSize(mouseMoveLock(_d))
      },
      bottomRight: (diff: Position) => {
        const { preContainer } = startState.value
        const _d = {
          width: preContainer.width + diff.x,
          height: preContainer.height + diff.y
        }
        updateContainerSize(mouseMoveLock(_d))
      },
    }

    const onPointMousedown = (e: MouseEvent, t: Point) => {
      startState.value = {
        type: t,
        preContainer: { ...containerSize.value },
        startX: e.clientX,
        startY: e.clientY
      }
      
      const size = { ...containerSize.value }
      const cb = (event: MouseEvent) => {
        const { startX, startY, type } = startState.value
        const diff = {
          x: event.clientX - startX,
          y: event.clientY - startY 
        }
        const setFn = pointEvents[type]
        if (setFn){
          setFn(diff)
        }
      }
      
      document.addEventListener('mousemove', cb)
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', cb)
      })
    }
    return {
      points,
      containerStyle,
      onPointMousedown
    }
  }
})
</script>
