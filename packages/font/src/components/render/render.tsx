import {
  computed,
  defineComponent,
  isRef,
  PropType,
  ref,
  Ref
} from 'vue'

import {
  Tag,
  isDynamicTag,
  isSlefTag,
  isTextTag,

  isNativeProp,
  isSlefProp,
  isEventProp,
  isDynamicProp,
  isIfProp,
  isModelProp,
  // isRefProp,
  // isSlotProp,
  // isForProp
} from '@love-code/compile'

import * as assert from '../../utils/assert'
import { firstUpperCase } from '../../utils'

function render(node: Tag, globalCtx: Ref<any>){
  const Cmp = computed(() => {
    return node.tag
  })

  const _props = computed(() => {
    if (!node.props){
      return {}
    }
    return node.props.reduce((acc: any, next: any) => {
      // baseType
      if (isNativeProp(next) || isSlefProp(next)){
        return { ...acc, [next.name]: next.value }
      }
      
      // vue directive
      
      // event
      if (isEventProp(next)){
        const { directive, value } = next
        let eventName = directive.arg
        const _p = assert.isString(next.value) ? globalCtx.value[next.value] : value
        eventName = assert.isEventName(eventName) ? eventName : `on${firstUpperCase(eventName)}`
        return assert.isFunction(_p) ? { ...acc, [eventName]: _p } : acc
      }
      
      if (isDynamicProp(next)){
        const { directive, value } = next
        const propName = directive.arg
        const _p = assert.isString(propName) ? globalCtx.value[propName] : value
        return { ...acc, [propName]: _p }
      }      

      if (isIfProp(next)){
        let _p = assert.isString(next.value) ? globalCtx.value[next.value] : next.value
        _p = assert.isFunction(_p) ? _p() : _p
        return { ...acc, IF: assert.isBoolean(_p) ? _p : !!_p }
      }

      if (isModelProp(next)){
        const { directive, value } = next
        const { arg, isDynamic } = directive
        let _arg = arg
        if (isDynamic){
          _arg = globalCtx.value[arg]
        }
        
        if (assert.isString(value)){
          /* eslint-disable-next-line no-param-reassign */
          return { ...acc, [_arg]: globalCtx.value[value], [`onUpdate:${_arg}`]: (data: any) => { globalCtx.value[value] = data } }
        }

        /* eslint-disable-next-line no-param-reassign */
        return {
          ...acc,
          [_arg]: isRef(value) ? value.value : value,
          [`onUpdate:${_arg}`]: (data: any) => {
            const _v = isRef(value) ? value : next
            _v.value = data    
          }
        }
      }

      // TODO
      // if (isRefProp(next)){}
      // if (isSlotProp(next)){}
      // if (isForProp(next)){}
      
      return { ...acc, next }
    }, {})
  })

  if (isTextTag(node)){
    return Cmp.value
  }

  if (isSlefTag(node)){
    return <Cmp.value {..._props} />
  }

  if (isDynamicTag(node)){
    return globalCtx.value[node.tag]
  }

  const _children = computed<Tag[]>(() => {
    const _c: Tag[] = (node as Tag).children || []
    return _c.map((child: Tag) => render(child, globalCtx))
  })

  if (_props.value.IF === false){
    return null
  }
  
  return <Cmp.value { ..._props.value }> { _children.value } </Cmp.value>
}

const Tag = defineComponent({
  name: 'tag',
  props: {
    node: {
      type: Object as PropType<Tag>,
      required: true
    },
    globalCtx: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const globalCtx = ref({ ...props.globalCtx })
    return () => {
      try {
        return render(props.node, globalCtx)
      } catch (error) {
        console.log('RENDER ERR:', error)
        return error
      }
    }
  }
})

export default Tag
