import {
  computed,
  defineComponent,
  isRef,
  PropType,
  ref,
  Ref
} from 'vue'

import { useStore } from 'vuex'

import {
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
import { BabySitter } from '../baby-sitter'
import { TTag } from '../../creator'


function render(node: TTag, globalCtx: Ref<any>){
  const Cmp = computed(() => {
    return node.tag
  })

  const _props = computed(() => {
    if (!node.props){
      return {}
    }
    return Object.values(node.props).reduce((acc: any, next: any) => {
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
        const _p = assert.isString(value) ? (globalCtx.value[value] || value) : value
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
    return <BabySitter id={ node.id }> { Cmp.value } </BabySitter> 
  }

  if (isSlefTag(node)){
    return <BabySitter id={ node.id }>
            <Cmp.value {..._props} />
           </BabySitter>
  }

  if (isDynamicTag(node)){
    return <BabySitter id={ node.id }> 
            { globalCtx.value[node.tag] }
          </BabySitter>
  }

  const _children = computed(() => {
    const _c: TTag[] = (node as TTag).children || []
    return _c.map((child: TTag) => render(child, globalCtx))
  })

  if (_props.value.IF === false){
    return null
  }
  
  return <BabySitter id={ node.id }> 
          <Cmp.value { ..._props.value }> { _children.value } </Cmp.value>
        </BabySitter>
}

const tag = defineComponent({
  name: 'tag',
  props: {
    node: {
      type: Object as PropType<TTag>,
      required: true
    },
    globalCtx: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const store = useStore()
    const globalCtx = ref({ ...props.globalCtx })
    store.commit('resetGlobalCtx', globalCtx)
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

export default tag
