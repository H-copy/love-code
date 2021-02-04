<style lang='stylus' scoped>
@import '../_assets/stylus/reset.stylus'
@import '../_assets/stylus/variable.stylus'
@import '../_assets/stylus/tools.stylus'

$cmp = prefixCls(props-item)

.{$cmp}{
  & + &{
    margin-top $margin_sm
  }
  
  .{$cmp}-label{
    display flex
    align-items center
  }

  &.horizontal{
    .{$cmp}-label{
      display block
      margin-bottom $margin_sm
    }
  }

  &.vertical{
    display flex
    justify-content space-between
    align-items stretch
    
    .{$cmp}-label{
      margin-right $margin_sm
    }
  }
}

</style>
<template>
  <div :class='classNames.item'>
    <label v-if='label' :class='classNames.label'>
      {{ label }}
    </label>
    <slot name='label'></slot>
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