import { ref, computed, SetupContext } from 'vue'

type MovePoint = 'topLeft'
  | 'topRight'
  | 'middleLeft'
  | 'middleRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'middleTop'
  | 'middleBottom'

export const movePoints: MovePoint[] = [
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
  'middleTop',
  'middleBottom',
  'middleLeft',
  'middleRight',
]

export interface MoveBlock {
  [s: string]: number
}

export interface Position {
  x: number
  y: number
}

export interface StartState {
  preMoveBlock: MoveBlock
  type: MovePoint | ''
  startX: number
  startY: number
}

export interface MoveEvent {
  (diff: Position, start: StartState): MoveBlock
}

export const topLeft: MoveEvent = (diff: Position, start: StartState) => {
  const { preMoveBlock } = start
  return {
    width: preMoveBlock.width - diff.x,
    height: preMoveBlock.height - diff.y,
    top: preMoveBlock.top + diff.y,
    left: preMoveBlock.left + diff.x,
  }
}

export const topRight: MoveEvent = (diff: Position, start: StartState) => {
  const { preMoveBlock } = start
  return {
    width: preMoveBlock.width + diff.x,
    height: preMoveBlock.height - diff.y,
    top: preMoveBlock.top + diff.y,
  }
}

export const middleTop: MoveEvent = (diff: Position, start: StartState) => {
  const { preMoveBlock } = start
  return {
    height: preMoveBlock.height - diff.y,
    top: preMoveBlock.top + diff.y,
  }
}

export const middleBottom: MoveEvent = (diff: Position, start: StartState) => {
  const { preMoveBlock } = start
  return {
    height: preMoveBlock.height + diff.y
  }
}

export const middleLeft: MoveEvent = (diff: Position, start: StartState) => {
  const { preMoveBlock } = start
  return {
    width: preMoveBlock.width - diff.x,
    left: preMoveBlock.left + diff.x,
  }
}

export const middleRight: MoveEvent = (diff: Position, start: StartState) => {
  const { preMoveBlock } = start
  return {
    width: preMoveBlock.width + diff.x,
  }
}

export const bottomLeft: MoveEvent = (diff: Position, start: StartState) => {
  const { preMoveBlock } = start
  return {
    width: preMoveBlock.width - diff.x,
    height: preMoveBlock.height + diff.y,
    left: preMoveBlock.left + diff.x,
  }
}

export const bottomRight: MoveEvent = (diff: Position, start: StartState) => {
  const { preMoveBlock } = start
  return {
    width: preMoveBlock.width + diff.x,
    height: preMoveBlock.height + diff.y
  }
}


export function useMovePoint(ctx: SetupContext, updateBlock: (d: MoveBlock) => void) {
  const eventMap: { [s: string]: MoveEvent } = {
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    middleTop,
    middleBottom,
    middleLeft,
    middleRight,
  }

  const startState = ref<StartState>({
    preMoveBlock: {},
    type: '',
    startX: 0,
    startY: 0
  })

  const onPointMousedown = (e: MouseEvent, preMoveBlock: MoveBlock, t: MovePoint) => {
    startState.value = {
      type: t,
      preMoveBlock: { ...preMoveBlock },
      startX: e.clientX,
      startY: e.clientY
    }

    const cb = (event: MouseEvent) => {
      const { startX, startY, type } = startState.value
      const diff = {
        x: event.clientX - startX,
        y: event.clientY - startY
      }
      const setFn = eventMap[type]
      if (setFn) {
        updateBlock(setFn(diff, startState.value))
      }
      ctx.emit('pointMouseMove', { ...diff })
    }
    ctx.emit('pointMouseDown', { ...startState.value })
    document.addEventListener('mousemove', cb)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', cb)
      ctx.emit('pointMouseUp')
    })
  }

  return {
    startState,
    onPointMousedown
  }
}

export function useMoveBlock(ctx: SetupContext) {
  const unit = ref('px')
  const moveBlock = ref<MoveBlock>({
    width: 120,
    height: 120,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })

  const updateBlock = (data: { [k: string]: number }) => {
    const _data = { ...moveBlock.value, ...data }
    if (_data.width <= 0) {
      _data.width = 0
    }
    if (_data.height <= 0) {
      _data.height = 0
    }
    moveBlock.value = _data
    ctx.emit('update', { ...moveBlock.value })
  }

  // 防止尺寸为零时，元素移动
  const mouseMoveLock = (d: { [k: string]: number }) => {
    const _d = { ...d }
    if (_d.width <= 0) {
      _d.width = 0
      _d.left = moveBlock.value.left
    }

    if (_d.height <= 0) {
      _d.height = 0
      _d.top = moveBlock.value.top
    }
    return _d
  }
  const moveBlockStyle = computed(() => {
    return Object.entries(moveBlock.value).reduce((acc, [key, val]) => {
      return { ...acc, [key]: `${val}${unit.value}` }
    }, {})
  })

  const prePosition = ref({
    startX: 0,
    startY: 0
  })

  const onMouseMove = (e: MouseEvent) => {
    const { startX, startY } = prePosition.value
    const diff = {
      x: e.clientX - startX,
      y: e.clientY - startY
    }
    prePosition.value = {
      startX: e.clientX,
      startY: e.clientY
    }
    const { top, left } = moveBlock.value

    updateBlock({
      top: top + diff.y,
      left: left + diff.x
    })
    ctx.emit('blockMouseDown', moveBlock.value)
  }

  const onMouseUp = () => {
    ctx.emit('blockMouseUp')
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('moouseup', onMouseUp)
  }

  const onMouseDown = (e: MouseEvent) => {
    prePosition.value = {
      startX: e.clientX,
      startY: e.clientY
    }
    ctx.emit('blockMouseDown', { ...prePosition.value })
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return {
    unit,
    moveBlock,
    moveBlockStyle,
    updateBlock,
    mouseMoveLock,
    onMouseDown
  }
}
