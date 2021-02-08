import { 
  h, 
  defineComponent, 
  PropType
} from 'vue'
import { Select } from 'ant-design-vue'
import componentName from '../_utils/componentName'

export type SelectType = 'DEFAULT' | 'OPTIONS' 

export interface OptionItem{
  label:string
  value:unknown
  slot?:any // eslint-disable-line  @typescript-eslint/no-explicit-any
  [key:string]:unknown
}

export interface SelectProps{
  _options?:OptionItem[]
  options?:OptionItem[]
  [key:string]:unknown
}

export interface EmptyOption{
  label: string
  value: string
  [key:string]: any // eslint-disable-line  @typescript-eslint/no-explicit-any
}

/**
 * 构建 options 配置
 * @summary
 * 通过将 slot 替换 label 实现自定义选项
 * @param _options
 */
function buildItems(_options:OptionItem[] = []){
  return _options.map(
    (item) => {
      const { label, slot, ...itemProps } = item
      return { label: slot || label, ...itemProps }
    }
  )
}

export default defineComponent({
  name: componentName('select'),
  props: {
    type: {
      type: String as PropType<SelectType>,
      default: 'DEFAULT'
    },
    showEmptyOptions: {
      type: Boolean,
      default: false
    },
    emptyOptions: {
      type: Object as PropType<EmptyOption>,
      default: () => ({ label: '全部', value: null, key: 90000 })
    }
  },
  render() {
    const { showEmptyOptions, emptyOptions, type } = this
    const { $attrs, $slots } = this
    const { 
      _options, 
      ...conf 
    } = $attrs as SelectProps

    const options = showEmptyOptions ? [emptyOptions, ...(_options || [])] : _options
    
    if(type === 'OPTIONS'){
      return h(
        Select,
        {
          options: options,
          ...conf
        },
        $slots
      )
    }

    // 默认自定义配置
    const Items = buildItems(options || [])
    return h(
      Select,
      {
        options: Items,
        ...conf
      },
      $slots
    )
  }
})
