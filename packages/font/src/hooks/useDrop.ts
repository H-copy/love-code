import { ColSize } from 'ant-design-vue/lib/grid/Col'
import {
  ref,
  watch,
} from 'vue'

import { useBool } from './useBool'

export interface AnyFunction {
  (...args: any): any
}

// 数据获取标识
const DATA_SIGN = 'DRAG'

export function getDragDataSign() {
  return DATA_SIGN
}

export function domDragCallback() {
  return (data: any) => (e: DragEvent) => {
    /* eslint-disable-next-line no-unused-expressions */
    e.dataTransfer?.setData(DATA_SIGN, JSON.stringify(data))
  }
}

/**
 * DOM 绑定拖拽事件
 * @returns { { elems, handlers, bindEle } } 
 * - elems Ref 已绑定元素列表
 * - handlers Ref 数据绑定函数
 * - bindEle any => element => void 接收事件传参，返回dom元素收集器
 * @example
 * const { bindEle } = useDrag()
 * bindEle(document.querySelector('#move-box'), fin)
 */
export function useDrag(dataSign = DATA_SIGN) {
  // 元素列表
  const elems = ref<HTMLElement[]>([])
  // 数据绑定函数
  const handlers = ref<AnyFunction[]>([])

  watch(elems, (val, oldVal) => {
    console.log('>>>>>', val, oldVal)
    if (oldVal) {
      oldVal.forEach((ele: HTMLElement, index: number) => {
        ele.removeEventListener('onDragstart', handlers.value[index])
        handlers.value.splice(index, 1)
        elems.value.splice(index, 1)
      })
    }

    console.log('val', val)
    
    if (val) {
      val.forEach((ele: HTMLElement, index: number) => {
        console.log('ele', ele.setAttribute)
        ele.setAttribute('draggable', 'true')
        ele.addEventListener('dragstart', handlers.value[index])
      })
    }
  })

  // 生成数据绑定函数 
  const bindEle = <T>(data: T) => (ele?: HTMLElement) => {
    if (!ele) { return }
    handlers.value = [...handlers.value, (e: DragEvent) => {
      /* eslint-disable-next-line no-unused-expressions */
      e.dataTransfer?.setData(dataSign, JSON.stringify(data))
    }]
    
    elems.value = [...elems.value, ele]
  }

  return { elems, handlers, bindEle }
}

export interface DragEvents {
  dragover?: (e: DragEvent) => void
  dragenter?: (e: DragEvent) => void
  dragleave?: (e: DragEvent) => void
  dragstart?: (e: DragEvent) => void
  dragend?: (e: DragEvent) => void
  drop?: (e: DragEvent) => void
  paste?: (e: DragEvent) => void
}


export interface DragCallbackType {
  onDom?(domStr: string, e: DragEvent): void
  onUri?(url: string, e: DragEvent): void
  onFiles?(files: DataTransfer['files'], e: DragEvent): void
  onText?(text: string, e: DragEvent): void
  onAny?(e: DragEvent): void
}

// 函数存在既运行
function hasAndRun(fn?: (...args: any) => any, ...args: any[]) {
  if (fn) {
    fn(...args)
  }
}

/**
 * 拖拽区hook
 * @param { Object } options 
 * - onDom dom拖拽释放回调
 * - onUri uri拖拽释放回调
 * - onFiles file拖拽释放回调
 * - onText text拖拽释放回调
 * 
 * @returns { array  }
 * - props 拖拽监听函数
 * - isHovering 是否进入监听区
 */
export function useDragArea(
  drag = {} as DragCallbackType,
  events = {} as DragEvents,
  dataSign = DATA_SIGN
) {
  const optionsRef = ref(drag)
  const { state: isHovering, setTrue: startHover, setFalse: endHover } = useBool()
  const { state: isRun, setTrue: startRun, setFalse: endRun } = useBool()

  const callback = (dataTransfer: DataTransfer | null, event: DragEvent) => {
    if (dataTransfer === null) {
      return
    }

    const url = dataTransfer.getData('text/uri-list')
    const dom = dataTransfer.getData(dataSign)

    const {
      onDom,
      onUri,
      onFiles,
      onText,
      onAny
    } = optionsRef.value

    if (dom && onDom) {
      onDom(JSON.parse(dom), event)
      return
    }

    if (url && onUri) {
      onUri(url, event)
      return
    }

    if (dataTransfer.files && dataTransfer.files.length && onFiles) {
      onFiles(dataTransfer.files, event)
      return
    }

    if (dataTransfer.items && dataTransfer.items.length && onText) {
      dataTransfer.items[0].getAsString((text) => { onText(text, event) })
      return
    }

    if (onAny) {
      onAny(event)
    }
  }

  const {
    dragover,
    dragenter,
    dragleave,
    dragstart,
    dragend,
    paste,
    drop
  } = events

  const dragEvents = {
    dragover: (e: DragEvent) => { hasAndRun(dragover, e) },
    dragenter: (e: DragEvent) => { e.preventDefault(); startHover(); hasAndRun(dragenter, e) },
    dragleave: (e: DragEvent) => { endHover(); hasAndRun(dragleave, e) },
    dragstart: (e: DragEvent) => { e.preventDefault(); startRun(); hasAndRun(dragstart, e) },
    dragend: (e: DragEvent) => { e.preventDefault(); endRun(); hasAndRun(dragend, e) },
    paste: (e: DragEvent) => { callback(e.dataTransfer, e); hasAndRun(paste, e) },
    drop: (e: DragEvent) => {
      e.preventDefault();
      endHover();
      callback(e.dataTransfer, e);
      hasAndRun(drop, e)
    }
  }

  return {
    dragEvents,
    isHovering,
    isRun
  }
}
