import {
  computed,
  defineComponent,
  PropType,
  ref,
  Ref
} from 'vue'

import {
  Tag,
  isNativeTag,
  isDynamicTag,
  isSlefTag,
  isTextTag,

  isNativeProp,
  isSlefProp,
  isEventProp
} from '@love-code/compile'

import * as assert from '../../utils/assert'

function render(node: Tag, globalCtx: Ref<any>){
  const Cmp = computed(() => {
    return node.tag
  })

  const _props = computed(() => {
    if (!node.props){
      return {}
    }
    return node.props.reduce((acc: any, next: any) => {
      if (isNativeProp(next) || isSlefProp(next)){
        return { ...acc, [next.name]: next.value }
      }

      if (isEventProp(next)){
        const { directive, value } = next
        const eventName = directive.arg
        const _p = assert.isString(next.value) ? globalCtx.value[next.value] : value
        return { ...acc, [eventName]: _p }
      }
      
      return { ...acc, next }
    }, {})
  })

  if (isTextTag(node)){
    return Cmp.value
  }

  if (isSlefTag(node)){
    return <Cmp.value {..._props} />
  }
  
  const _children = computed<Tag[]>(() => {
    const _c: Tag[] = (node as Tag).children || []
    return _c.map((child: Tag) => render(child, globalCtx))
  })
  return <Cmp.value {..._props.value}> { _children.value } </Cmp.value>
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
    const globalCtx = ref({
      submit: () => console.log('submit')
    })
    return () => render(props.node, globalCtx)
  }
})

export default Tag
