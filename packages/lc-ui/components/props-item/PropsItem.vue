<style lang='stylus' scoped>
@import '../_assets/stylus/reset.stylus'
@import '../_assets/stylus/variable.stylus'
@import '../_assets/stylus/tools.stylus'

$cmp = prefixCls(props-item)

.{$cmp}{

  &.horizontal{
    .{$cmp}{
      &.label{
        margin-bottom 10px
      }
    }
  }

  &.vertical{
    display flex
    justify-content space-between
    align-items stretch
  }
  
}

</style>
<template>
  <div :class='classNames.item'>
    <label v-if='label' :class='classNames.label'>
      {{ label }}
      <slot name='label'></slot>
    </label>
    <slot name='default'></slot>
  </div>
</template>
<script lang='ts'>
import {
  defineComponent,
  PropType,
  ref
} from "vue"

import componentName from '../_utils/componentName'
import className from "../_utils/className"

type LayoutType = 'horizontal' | 'vertical'

export default defineComponent({
  name: componentName('props-item'),
  props: {
    label: {
      type: String,
      default: ''
    },
    layoutType: {
      type: String as PropType<LayoutType>,
      default: 'horizontal'
    }
  },
  setup(props){
    const classNames = ref({
      item: [className('props-item'), props.layoutType],
      label: className('props-item-label')
    })
    
    return {
      classNames
    }
  }
})
</script>