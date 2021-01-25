# 拖拽容器

## 使用
```js

// html
<Move :data='initSize' @update='update' >
  <div :style='style'></div>
</Move>

// ts
import { Move, MoveBlock } from './components/move'

export default defineComponent({
  components: {
    Move
  },
  setup(){
    const intiSize = ref({
      width: 100,
      heiht: 100
    })

    const style = computed(() => {
      const { width, height } = initSize.value
      return {
        width: `${width}px`,
        height: `${height}px`
      }
    })

    const update = (d: MoveBlock) => {
      initSiz.value = {
        width: d.width,
        height: d.height
      }
    }
    
    return {
      intiSize,
      style,
      update
    }
  }
})

```

## 参数

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| unit | string | px | 单位
| data | Obejct | { width: 100, height: 100, top: 0, bottom: 0, left: 0, right: 0 } | 初始位置及尺寸 |

## 事件
| 名称 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| update | 拖拽更新数据 | { width, height, top, bottom, left, right } | |


## move hooks

### MovePoint 拖拽点定义
```js

type MovePoint = 'topLeft'
  | 'topRight'
  | 'middleLeft'
  | 'middleRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'middleTop'
  | 'middleBottom'

```

### MoveBlock 容器参数
```js
export interface MoveBlock {
  [s: string]: number
}
```

### 点位坐标
``` js
export interface Position {
  x: number
  y: number
}
```

### StartState 鼠标触发时的初始状态
``` js
export interface StartState {
  preMoveBlock: MoveBlock
  type: MovePoint | ''
  startX: number
  startY: number
}
```

### 拖拽点事件函数
根据初始点位信息计算新坐标位置
``` js
export interface MoveEvent {
  (diff: Position, start: StartState): MoveBlock
}
```
### useMovePoint 拖拽点逻辑
封装各个拖拽点计算方法

#### 参数
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| ctx | SetupContext |  | 上下文环境 |
| updateBlock | fn(d: MoveBlock):void | | 点位移动时触发更新函数 |

#### 周期事件
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| pointMouseDown | startState | 鼠标键按下, 返回初始状态 |
| pointMouseMove | diff | 鼠标移动, 返回计算后的插值 |
| pointMouseUp | | 鼠标键抬起 |

#### 返回
| 名称 | 类型 | 说明 |
| --- | --- | --- |
| startState | StartState | 鼠标按下时的初始状态 |
| onPointMousedown | (e: MouseEvent, preMoveBlock: MoveBlock, t: MovePoint):void | 鼠标按下后，触发拖拽监听 |


## useMoveBlock 拖拽容器逻辑
封装拖拽容易移动计算方法

### 参数
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| ctx | SetupContext |  | 上下文环境 |

### 周期事件
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| blockMouseDown | moveBlock | 鼠标键按下事件 容器初始状态 |
| blockMouseMove | moveBlock | 鼠标移动事件，容器状态 |
| blockMouseDown | { startX, startY } | 鼠标键抬起事件, 当前鼠标位置 |

#### 返回
| 名称 | 类型 | 默认值 |说明 |
| --- | --- | --- | --- |
| unit | Ref<string> | px | 单位 |
| moveBlock | Ref<moveBlock> |  | 当前容器状态 |
| moveBlockStyle | Computed<moveBlock> | | 容器计算样式 |
| updateBlock | fn(d: MoveBlock) | | 容器状态更新 |
| mouseMoveLock | fn(d: MovewBlock): MovewBlock  | | 尺寸边界计算 |
| onMouseDown | fn(e: MouseEvent) | | 拖拽监听触发 |